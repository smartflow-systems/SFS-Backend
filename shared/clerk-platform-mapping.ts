/**
 * Planning-only interfaces for a future Clerk-to-SFS platform mapping.
 *
 * These types do not represent persisted schema and must not be used to imply
 * that Clerk, Stripe, or any external identity provider is connected.
 */

export type SFSMappingStatus = "pending" | "active" | "suspended" | "disabled";

export type SFSEntitlementStatus =
  | "pending"
  | "trialing"
  | "active"
  | "past_due"
  | "cancelled"
  | "expired";

export type SFSProductPlan = "free" | "starter" | "pro" | "enterprise";

export type SFSOrganisationRole = "owner" | "admin" | "member";

export type SFSProductPermission =
  | "organisation:read"
  | "organisation:manage"
  | "members:manage"
  | "billing:manage"
  | "products:read"
  | "products:grant"
  | "barber-booker:access"
  | "social-scale-booster:access";

export interface ClerkUserSFSMapping {
  clerkUserId: string;
  sfsUserId: string;
  status: SFSMappingStatus;
}

export interface ClerkOrganisationSFSMapping {
  clerkOrgId: string;
  sfsOrganisationId: string;
  status: SFSMappingStatus;
}

export interface ClerkMembershipSFSMapping {
  clerkMembershipId: string;
  clerkUserId: string;
  clerkOrgId: string;
  sfsUserId: string;
  sfsOrganisationId: string;
  sfsMembershipId: string;
  role: SFSOrganisationRole;
  permissions: SFSProductPermission[];
  status: SFSMappingStatus;
}

export interface SFSRolePermissionMapping {
  clerkRoleKey: string;
  clerkPermissionKeys: string[];
  sfsRole: SFSOrganisationRole;
  sfsPermissions: SFSProductPermission[];
}

export interface SFSProductEntitlement {
  sfsOrganisationId: string;
  productSlug: string;
  plan: SFSProductPlan;
  status: SFSEntitlementStatus;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  startsAt?: string;
  trialEndsAt?: string;
  currentPeriodEndsAt?: string;
  endsAt?: string;
}

export interface SFSResolvedAccessContext {
  clerkUserId: string;
  clerkOrgId: string;
  sfsUserId: string;
  sfsOrganisationId: string;
  sfsMembershipId: string;
  role: SFSOrganisationRole;
  permissions: SFSProductPermission[];
  entitlements: SFSProductEntitlement[];
}
