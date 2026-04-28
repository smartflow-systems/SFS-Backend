import { Router } from "express";
import { db } from "../db";
import { products, subscriptions, orgs } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { requireAuth, requireRole } from "../middleware/auth";
import { z } from "zod";

const router = Router();

// GET /api/products — all active SFS products
router.get("/", async (_req, res) => {
  const list = await db.select().from(products).where(eq(products.isActive, true));
  res.json(list);
});

// GET /api/products/mine — products this org is subscribed to (requires auth)
router.get("/mine", requireAuth, async (req, res) => {
  const rows = await db
    .select({ product: products, subscription: subscriptions })
    .from(subscriptions)
    .leftJoin(products, eq(subscriptions.productId, products.id))
    .where(and(eq(subscriptions.orgId, req.user!.orgId), eq(subscriptions.status, "active")));

  res.json(rows);
});

// POST /api/products/:slug/access — check if current org can access a product
router.get("/:slug/access", requireAuth, async (req, res) => {
  const [product] = await db.select().from(products).where(eq(products.slug, req.params.slug));
  if (!product) return res.status(404).json({ error: "Product not found" });

  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(and(
      eq(subscriptions.orgId, req.user!.orgId),
      eq(subscriptions.productId, product.id),
      eq(subscriptions.status, "active"),
    ));

  res.json({ hasAccess: !!sub, plan: sub?.plan ?? null, product });
});

// Admin: seed the SFS product catalog
router.post("/seed", requireAuth, requireRole("owner"), async (req, res) => {
  const sfsProducts = [
    { slug: "barber-booker", name: "Barber Booker", description: "Online booking system for barbershops and salons" },
    { slug: "social-scale-booster", name: "SocialScaleBooster", description: "Multi-platform social media automation" },
    { slug: "data-query-engine", name: "SFS Data Query Engine", description: "Natural language to SQL analytics" },
    { slug: "crm", name: "SFS CRM", description: "Customer relationship management" },
    { slug: "white-label-dashboard", name: "White Label Dashboard", description: "Multi-tenant admin platform" },
    { slug: "marketing-growth", name: "Marketing & Growth", description: "Booking, marketing, and growth tools" },
    { slug: "social-powerhouse", name: "Social Powerhouse", description: "Comprehensive social media management" },
    { slug: "data-scrape-insights", name: "DataScrape Insights", description: "AI-powered web scraping and analysis" },
  ];

  for (const p of sfsProducts) {
    await db.insert(products).values({ ...p, isActive: true }).onConflictDoNothing();
  }

  res.json({ message: "Product catalog seeded", count: sfsProducts.length });
});

// Admin: grant org access to a product
router.post("/grant", requireAuth, requireRole("owner"), async (req, res) => {
  const schema = z.object({
    orgId: z.string(),
    productSlug: z.string(),
    plan: z.enum(["free", "starter", "pro", "enterprise"]).default("free"),
  });

  try {
    const { orgId, productSlug, plan } = schema.parse(req.body);

    const [product] = await db.select().from(products).where(eq(products.slug, productSlug));
    if (!product) return res.status(404).json({ error: "Product not found" });

    const [sub] = await db.insert(subscriptions).values({
      orgId,
      productId: product.id,
      plan,
      status: "active",
    }).onConflictDoNothing().returning();

    res.json({ message: "Access granted", subscription: sub });
  } catch (err: any) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    res.status(500).json({ error: "Failed to grant access" });
  }
});

export default router;
