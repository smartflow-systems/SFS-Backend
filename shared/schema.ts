import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planEnum = pgEnum('plan', ['free', 'starter', 'pro', 'enterprise']);
export const roleEnum = pgEnum('role', ['owner', 'admin', 'member']);
export const subscriptionStatusEnum = pgEnum('subscription_status', ['active', 'inactive', 'trialing', 'cancelled', 'past_due']);

// One row per client company
export const orgs = pgTable("orgs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  plan: planEnum("plan").notNull().default('free'),
  stripeCustomerId: text("stripe_customer_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: roleEnum("role").notNull().default('member'),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Catalog of all SFS products
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
});

// Which org has access to which product + at what plan tier
export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  productId: varchar("product_id").notNull().references(() => products.id),
  plan: planEnum("plan").notNull().default('free'),
  status: subscriptionStatusEnum("status").notNull().default('active'),
  stripeSubscriptionId: text("stripe_subscription_id"),
  trialEndsAt: timestamp("trial_ends_at"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Invite team members to an org
export const invitations = pgTable("invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orgId: varchar("org_id").notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  email: text("email").notNull(),
  role: roleEnum("role").notNull().default('member'),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrgSchema = createInsertSchema(orgs).omit({ id: true, createdAt: true, updatedAt: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true, lastLoginAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({ id: true, createdAt: true, updatedAt: true });

export type Org = typeof orgs.$inferSelect;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Invitation = typeof invitations.$inferSelect;
export type InsertOrg = z.infer<typeof insertOrgSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

// JWT payload — same shape used by ALL SFS apps
export interface SFSTokenPayload {
  userId: string;
  orgId: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
}
