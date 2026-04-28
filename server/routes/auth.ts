import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { db } from "../db";
import { users, orgs, invitations } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";
import { requireAuth } from "../middleware/auth";
import { randomBytes } from "crypto";
import type { SFSTokenPayload } from "@shared/schema";

const router = Router();
const secret = process.env.SFS_JWT_SECRET!;

const registerSchema = z.object({
  orgName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

function makeSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function signToken(payload: SFSTokenPayload) {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

// POST /api/auth/register — creates org + owner user
router.post("/register", async (req, res) => {
  try {
    const body = registerSchema.parse(req.body);

    const baseSlug = makeSlug(body.orgName);
    const existing = await db.select().from(orgs).where(eq(orgs.slug, baseSlug));
    const slug = existing.length ? `${baseSlug}-${randomBytes(3).toString("hex")}` : baseSlug;

    const passwordHash = await bcrypt.hash(body.password, 12);

    const [org] = await db.insert(orgs).values({ name: body.orgName, slug }).returning();
    const [user] = await db.insert(users).values({
      orgId: org.id,
      email: body.email,
      passwordHash,
      firstName: body.firstName,
      lastName: body.lastName,
      role: "owner",
    }).returning();

    const payload: SFSTokenPayload = {
      userId: user.id,
      orgId: org.id,
      email: user.email,
      role: "owner",
      plan: "free",
    };

    res.status(201).json({ token: signToken(payload), user: { ...payload, firstName: user.firstName, lastName: user.lastName }, org });
  } catch (err: any) {
    if (err.code === "23505") return res.status(409).json({ error: "Email already registered" });
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const [row] = await db
      .select({ user: users, org: orgs })
      .from(users)
      .leftJoin(orgs, eq(users.orgId, orgs.id))
      .where(and(eq(users.email, email), eq(users.isActive, true)));

    if (!row?.org) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, row.user.passwordHash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, row.user.id));

    const payload: SFSTokenPayload = {
      userId: row.user.id,
      orgId: row.org.id,
      email: row.user.email,
      role: row.user.role,
      plan: row.org.plan,
    };

    res.json({
      token: signToken(payload),
      user: { ...payload, firstName: row.user.firstName, lastName: row.user.lastName },
      org: row.org,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/auth/me — validate token + return current user
router.get("/me", requireAuth, async (req, res) => {
  const { userId, orgId } = req.user!;

  const [row] = await db
    .select({ user: users, org: orgs })
    .from(users)
    .leftJoin(orgs, eq(users.orgId, orgs.id))
    .where(eq(users.id, userId));

  if (!row) return res.status(404).json({ error: "User not found" });

  res.json({
    userId,
    orgId,
    email: row.user.email,
    role: row.user.role,
    plan: row.org?.plan,
    firstName: row.user.firstName,
    lastName: row.user.lastName,
    org: row.org,
  });
});

// POST /api/auth/invite — owner/admin sends an invite link
router.post("/invite", requireAuth, async (req, res) => {
  if (!["owner", "admin"].includes(req.user!.role)) {
    return res.status(403).json({ error: "Only owners and admins can invite" });
  }

  const schema = z.object({ email: z.string().email(), role: z.enum(["admin", "member"]).default("member") });
  const { email, role } = schema.parse(req.body);

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await db.insert(invitations).values({ orgId: req.user!.orgId, email, role, token, expiresAt });

  res.json({ message: "Invitation created", inviteToken: token, expiresAt });
});

// POST /api/auth/accept-invite — new user accepts an invite
router.post("/accept-invite", async (req, res) => {
  const schema = z.object({
    token: z.string(),
    password: z.string().min(8),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  });

  try {
    const { token, password, firstName, lastName } = schema.parse(req.body);

    const [invite] = await db
      .select()
      .from(invitations)
      .where(and(eq(invitations.token, token), gt(invitations.expiresAt, new Date())));

    if (!invite || invite.acceptedAt) return res.status(400).json({ error: "Invalid or expired invite" });

    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(users).values({
      orgId: invite.orgId,
      email: invite.email,
      passwordHash,
      firstName,
      lastName,
      role: invite.role,
    }).returning();

    await db.update(invitations).set({ acceptedAt: new Date() }).where(eq(invitations.id, invite.id));

    const [org] = await db.select().from(orgs).where(eq(orgs.id, invite.orgId));

    const payload: SFSTokenPayload = {
      userId: user.id,
      orgId: org.id,
      email: user.email,
      role: user.role,
      plan: org.plan,
    };

    res.status(201).json({ token: jwt.sign(payload, secret, { expiresIn: "7d" }), user: payload, org });
  } catch (err: any) {
    if (err.code === "23505") return res.status(409).json({ error: "Email already registered" });
    if (err instanceof z.ZodError) return res.status(400).json({ error: err.errors });
    res.status(500).json({ error: "Failed to accept invite" });
  }
});

export default router;
