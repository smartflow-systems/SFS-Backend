import { Router } from "express";
import { db } from "../db";
import { orgs, users, subscriptions, products } from "@shared/schema";
import { eq } from "drizzle-orm";
import { requireAuth, requireRole } from "../middleware/auth";

const router = Router();

// GET /api/orgs/me — current org details + team
router.get("/me", requireAuth, async (req, res) => {
  const [org] = await db.select().from(orgs).where(eq(orgs.id, req.user!.orgId));
  if (!org) return res.status(404).json({ error: "Org not found" });

  const team = await db
    .select({ id: users.id, email: users.email, firstName: users.firstName, lastName: users.lastName, role: users.role, isActive: users.isActive, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.orgId, org.id));

  const subs = await db
    .select({ product: products, subscription: subscriptions })
    .from(subscriptions)
    .leftJoin(products, eq(subscriptions.productId, products.id))
    .where(eq(subscriptions.orgId, org.id));

  res.json({ org, team, subscriptions: subs });
});

// PATCH /api/orgs/me — update org name (owner only)
router.patch("/me", requireAuth, requireRole("owner"), async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const [updated] = await db
    .update(orgs)
    .set({ name, updatedAt: new Date() })
    .where(eq(orgs.id, req.user!.orgId))
    .returning();

  res.json(updated);
});

// DELETE /api/orgs/members/:userId — remove a team member (owner/admin only)
router.delete("/members/:userId", requireAuth, requireRole("owner", "admin"), async (req, res) => {
  const targetId = req.params.userId;

  const [target] = await db.select().from(users).where(eq(users.id, targetId));
  if (!target || target.orgId !== req.user!.orgId) return res.status(404).json({ error: "User not found" });
  if (target.role === "owner") return res.status(403).json({ error: "Cannot remove the org owner" });

  await db.update(users).set({ isActive: false }).where(eq(users.id, targetId));
  res.json({ message: "Member removed" });
});

export default router;
