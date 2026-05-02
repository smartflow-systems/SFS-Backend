import { Router, Request, Response } from "express";
import Stripe from "stripe";
import { db } from "../db";
import { orgs, subscriptions } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";

const router = Router();

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is required");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" });
}

const PLAN_PRICE_MAP: Record<string, string | undefined> = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
};

// POST /api/billing/create-checkout
// Creates a Stripe Checkout session for the org
router.post("/create-checkout", requireAuth, async (req: Request, res: Response) => {
  try {
    const stripe = getStripe();
    const { plan } = req.body as { plan: string };
    const priceId = PLAN_PRICE_MAP[plan];

    if (!priceId) {
      return res.status(400).json({ error: `Unknown plan: ${plan}` });
    }

    const [org] = await db.select().from(orgs).where(eq(orgs.id, req.user!.orgId));
    if (!org) return res.status(404).json({ error: "Org not found" });

    // Reuse existing Stripe customer or create one
    let customerId = org.stripeCustomerId ?? undefined;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: req.user!.email,
        metadata: { orgId: org.id, orgSlug: org.slug },
      });
      customerId = customer.id;
      await db.update(orgs).set({ stripeCustomerId: customerId }).where(eq(orgs.id, org.id));
    }

    const appUrl = process.env.APP_URL ?? "http://localhost:5000";
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/billing/cancel`,
      metadata: { orgId: org.id, plan },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("[billing] create-checkout error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// POST /api/billing/portal
// Opens the Stripe customer portal for subscription management
router.post("/portal", requireAuth, async (req: Request, res: Response) => {
  try {
    const stripe = getStripe();
    const [org] = await db.select().from(orgs).where(eq(orgs.id, req.user!.orgId));
    if (!org?.stripeCustomerId) {
      return res.status(400).json({ error: "No billing account found — subscribe first" });
    }

    const appUrl = process.env.APP_URL ?? "http://localhost:5000";
    const session = await stripe.billingPortal.sessions.create({
      customer: org.stripeCustomerId,
      return_url: `${appUrl}/dashboard`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("[billing] portal error:", err);
    res.status(500).json({ error: "Failed to open billing portal" });
  }
});

// POST /api/billing/webhook
// Stripe → DB sync. Must be registered BEFORE express.json() middleware.
router.post("/webhook", async (req: Request, res: Response) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"] as string;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[billing] STRIPE_WEBHOOK_SECRET not set");
    return res.status(500).send("Webhook secret not configured");
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error("[billing] webhook signature failed:", err);
    return res.status(400).send("Invalid signature");
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orgId = session.metadata?.orgId;
        const plan = session.metadata?.plan ?? "starter";
        const subId = session.subscription as string;
        if (!orgId) break;

        await db.update(orgs).set({ plan }).where(eq(orgs.id, orgId));

        const existing = await db.select().from(subscriptions).where(eq(subscriptions.orgId, orgId));
        if (existing.length > 0) {
          await db.update(subscriptions)
            .set({ plan, status: "active", stripeSubscriptionId: subId, updatedAt: new Date() })
            .where(eq(subscriptions.orgId, orgId));
        } else {
          const [product] = await db.select().from(subscriptions).limit(1);
          // Insert minimal subscription record — productId is optional context here
          await db.insert(subscriptions).values({
            orgId,
            productId: product?.productId ?? "sfs-platform",
            plan,
            status: "active",
            stripeSubscriptionId: subId,
          } as any);
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const subAny = sub as any;
        await db.update(subscriptions)
          .set({
            status: sub.status,
            currentPeriodEnd: subAny.current_period_end
              ? new Date(subAny.current_period_end * 1000)
              : undefined,
            updatedAt: new Date(),
          })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await db.update(subscriptions)
          .set({ status: "cancelled", updatedAt: new Date() })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));

        // Downgrade org to free
        const [record] = await db.select().from(subscriptions)
          .where(eq(subscriptions.stripeSubscriptionId, sub.id));
        if (record) {
          await db.update(orgs).set({ plan: "free" }).where(eq(orgs.id, record.orgId));
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const invoiceAny = invoice as any;
        const subId: string | undefined =
          invoiceAny.subscription ??
          invoice.parent?.subscription_details?.subscription ?? undefined;
        if (subId) {
          await db.update(subscriptions)
            .set({ status: "past_due", updatedAt: new Date() })
            .where(eq(subscriptions.stripeSubscriptionId, subId));
        }
        break;
      }
    }
  } catch (err) {
    console.error(`[billing] webhook handler error for ${event.type}:`, err);
  }

  res.json({ received: true });
});

export default router;
