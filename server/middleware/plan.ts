import { Request, Response, NextFunction } from "express";
import { db } from "../db";
import { orgs } from "@shared/schema";
import { eq } from "drizzle-orm";

const PLAN_RANK: Record<string, number> = { free: 0, starter: 1, pro: 2, enterprise: 3 };

// Usage: router.get("/premium-feature", requireAuth, requirePlan("pro"), handler)
export function requirePlan(minPlan: "starter" | "pro" | "enterprise") {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const [org] = await db.select({ plan: orgs.plan }).from(orgs).where(eq(orgs.id, req.user.orgId));
    if (!org) return res.status(404).json({ error: "Org not found" });

    const currentRank = PLAN_RANK[org.plan] ?? 0;
    const requiredRank = PLAN_RANK[minPlan] ?? 1;

    if (currentRank < requiredRank) {
      return res.status(402).json({
        error: "Plan upgrade required",
        currentPlan: org.plan,
        requiredPlan: minPlan,
      });
    }

    next();
  };
}
