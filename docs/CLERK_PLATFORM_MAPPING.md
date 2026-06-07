# Clerk Platform Mapping Foundation

## Status

Planning and shared-type foundation only. Clerk is not connected, no Clerk SDK is
installed, and existing authentication and billing behavior remains unchanged.

## Intended Ownership

SFS-Backend should become the SmartFlow control plane for identity mappings,
organisation membership, product permissions, Stripe-backed entitlements, and
cross-product access decisions.

Clerk would own authentication identity and organisation membership events.
SFS-Backend would own internal IDs, product permissions, billing entitlements,
and the final authorization decision for SmartFlow products.

## Mapping Model

| External record | SFS record | Mapping purpose |
|---|---|---|
| Clerk user ID | SFS user ID | Resolve an authenticated Clerk identity to the internal SmartFlow user |
| Clerk organisation ID | SFS organisation ID | Resolve the active Clerk organisation to the internal tenant |
| Clerk membership ID | SFS organisation membership | Represent a user's role and permissions within one organisation |
| Clerk role and permission keys | SFS product permissions | Translate external membership claims into stable internal authorization keys |
| Stripe customer and subscription IDs | SFS entitlement | Grant an organisation access to a product and plan for a defined period |

The shared planning interfaces are defined in
`shared/clerk-platform-mapping.ts`. They do not import Clerk or Stripe SDKs and
must not be treated as persisted schema.

## Identity Resolution

A future authenticated request should be resolved in this order:

1. Verify the Clerk session or token.
2. Resolve `clerkUserId` to an active SFS user.
3. Resolve the active `clerkOrgId` to an active SFS organisation.
4. Resolve the Clerk membership to an active SFS organisation membership.
5. Translate membership role and permission keys into SFS product permissions.
6. Load current SFS entitlements for the organisation and requested product.
7. Authorize the action using both permission and entitlement state.

Clerk identity claims should identify the caller, but SFS-Backend should remain
the authority for product access and billing entitlements.

## Roles, Permissions, And Entitlements

Roles are organisation-scoped bundles of permissions. Permissions should be
stable action keys such as:

- `organisation:read`
- `organisation:manage`
- `members:manage`
- `billing:manage`
- `products:read`
- `products:grant`
- `barber-booker:access`
- `social-scale-booster:access`

An entitlement answers whether an organisation can access a product and plan.
A permission answers whether a member can perform an action. Product access
should require both when the action is product-scoped.

Stripe IDs are external references, not authorization decisions by themselves.
Stripe webhook processing should update SFS entitlement state, and product
routes should read that normalized state.

## Future Route Protection Map

No route protection is changed by this document.

| Route | Future protection expectation |
|---|---|
| `GET /health` | Public health check |
| `POST /api/debug/post-test` | Remove outside development or restrict to platform operators |
| `POST /api/auth/register` | Legacy local-auth route; retire or isolate during Clerk migration |
| `POST /api/auth/login` | Legacy local-auth route; retire or isolate during Clerk migration |
| `POST /api/auth/accept-invite` | Replace or reconcile with Clerk organisation invitations |
| `GET /api/auth/me` | Require Clerk identity resolution and active organisation membership |
| `POST /api/auth/invite` | Require `members:manage`; later use or reconcile with Clerk invitations |
| `GET /api/orgs/me` | Require `organisation:read` and active membership |
| `PATCH /api/orgs/me` | Require `organisation:manage` |
| `DELETE /api/orgs/members/:userId` | Require `members:manage` and same-organisation checks |
| `GET /api/products` | May remain public if the catalog is intentionally public |
| `GET /api/products/mine` | Require active membership |
| `GET /api/products/:slug/access` | Require active membership; evaluate permission plus entitlement |
| `POST /api/products/seed` | Require platform-operator permission, not tenant owner alone |
| `POST /api/products/grant` | Require platform-operator permission or a controlled billing workflow |
| `POST /api/billing/create-checkout` | Require active membership and `billing:manage` |
| `POST /api/billing/portal` | Require active membership and `billing:manage` |
| `POST /api/billing/webhook` | Keep Clerk-independent; require valid Stripe webhook signature |

## Existing Conflicts To Resolve Before Connection

1. `users.orgId` allows one organisation per user. Clerk users can belong to
   multiple organisations, so membership needs to become a separate concept.
2. `users.role` is user-scoped rather than membership-scoped.
3. `users.passwordHash` is required. Clerk-managed users should not require a
   local password hash.
4. `users.email` is globally unique and currently acts as a login identifier.
   Future identity mapping should use Clerk user ID as the external identity key.
5. Local registration, login, invitations, bcrypt passwords, and SFS JWT
   issuance overlap with responsibilities Clerk would own.
6. `SFSTokenPayload` contains one `orgId`, role, and plan. Those claims can
   become stale and do not represent multi-organisation membership.
7. Organisation plan state exists in `orgs.plan`, while product-specific access
   exists in `subscriptions`. A normalized entitlement should be the product
   access authority.
8. Stripe checkout currently maps customers to organisations, which is aligned
   with the target model, but billing routes do not distinguish billing managers
   from other authenticated members.
9. Product seeding and manual grants currently allow any tenant owner. These are
   platform-level operations and need separate platform-operator authorization.
10. The existing invitation table overlaps with Clerk organisation invitations
    and needs an explicit source-of-truth decision.

## Proposed Migration Phases

1. Agree on stable internal permission and product keys.
2. Add persisted external identity and organisation mapping fields or tables
   through a separately reviewed migration.
3. Introduce organisation memberships without removing local auth.
4. Add Clerk webhook ingestion with idempotency and audit records.
5. Add Clerk request verification behind a feature flag.
6. Reconcile Stripe subscriptions into normalized SFS entitlements.
7. Move protected routes to permission plus entitlement checks.
8. Retire legacy local auth only after all active users and organisations are
   reconciled.

Each phase requires a separate implementation and security review.
