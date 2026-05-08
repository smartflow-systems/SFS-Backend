# 🗺️ SMARTFLOW SYSTEMS (SFS) — FULL REPO ROADMAP & AUDIT

> Generated: May 2026 | Status: Living Document | Total: 52 repos

---

## 📊 TOTAL REPO COUNT
- **smartflow-systems org**: 52 repos
- **boweazy personal**: 3 repos (all should be removed)
- **GRAND TOTAL**: 55 repos examined

---

## 🏗️ CATEGORY 1 — CORE INFRASTRUCTURE & BACKEND

### ✅ `SFS-Backend`
- **What it is**: The primary full-stack monolith. Node.js/TypeScript + React/Vite + Drizzle ORM + PostgreSQL + shadcn/ui.
- **Job**: Central API + dashboard platform. The beating heart of SFS.
- **Status**: Active. Has AGENTS.md, design guidelines, test files.
- **Needs**: Proper Dockerfile, production deployment pipeline, auth integration from sfs-auth-core.
- **Keep**: ✅ YES — Primary repo.

### ⚠️ `sfs-core-services` (OVERLAPS WITH SFS-Backend)
- **What it is**: Core backend services and API infrastructure. TypeScript. 9 open issues.
- **Job**: Core backend services for the SFS ecosystem.
- **Status**: Active but heavily overlaps with SFS-Backend.
- **Needs**: Decision — is this a microservices layer or a duplicate of SFS-Backend?
- **Keep**: ⚠️ EVALUATE — Likely consolidate into SFS-Backend or define clear separation of concerns.

### ✅ `sfs-auth-core` (PRIVATE)
- **What it is**: Lean authentication microservice. JWT, Stripe, user management. Private repo.
- **Job**: Centralized auth/billing for all SFS products.
- **Status**: Clean skeleton, early implementation.
- **Needs**: Full implementation, deploy, integrate across all products.
- **Keep**: ✅ YES — 🔴 Critical. Nothing ships correctly without this.

### ✅ `sfs-core-utils` (PRIVATE)
- **What it is**: Shared utilities, scripts, docs, and themes. JavaScript. Private repo.
- **Job**: Internal shared library — helper functions, scripts, docs used across SFS repos.
- **Status**: Active (last updated March 2026).
- **Needs**: Document what’s in here and which repos depend on it.
- **Keep**: ✅ YES — Private shared utilities library.

### ✅ `sfs-n8n`
- **What it is**: Self-hosted n8n automation server via Docker Compose. Pre-built workflows, sales closer agent.
- **Job**: Business automation backbone — lead follow-up, email sequences, CRM triggers, webhooks.
- **Status**: Functional. Workflows need expanding.
- **Needs**: More workflow templates, connection to sfs-backend webhooks.
- **Keep**: ✅ YES — Automation layer is essential.

---

## 📱 CATEGORY 2 — SOCIAL MEDIA & MARKETING TOOLS

> ⚠️ **OVERLAP ALERT** — 4 repos doing similar things. Consolidation is critical.

### ✅ `SFS-SocialPowerhouse`
- **What it is**: Most complete social media management platform. Full-stack, real OAuth, Docker, Jest tests.
- **Job**: Publish, schedule, manage social content. The real production social tool.
- **Status**: Most mature social tool. Has `OAUTH_SETUP.md`, `REAL_PUBLISHING_GUIDE.md`.
- **Needs**: Live OAuth credentials, production hosting, analytics connection.
- **Keep**: ✅ YES — This is THE social media tool. All others should feed into it.

### ⚠️ `SFS-AIbofs-social-media`
- **What it is**: Python/Flask + Node hybrid. SQLite in repo, bots interface, booking, shop pages.
- **Job**: AI-powered social bots, booking automation.
- **Status**: Messy — `.bak` files, mixed languages, SQLite committed.
- **Needs**: Remove SQLite, pick one language, merge bot logic into SocialPowerhouse.
- **Keep**: ⚠️ MERGE/CLEANUP

### ⚠️ `SocialScaleBooster`
- **What it is**: Enterprise social scale platform. TypeScript, CodeQL, Codecov, agents. 17 open issues.
- **Job**: Social media growth/scaling.
- **Status**: Mature CI setup but overlaps with SocialPowerhouse.
- **Keep**: ⚠️ REVIEW — May be redundant. Evaluate for merge or archive.

### ⚠️ `SocialScaleBoosterAIbot`
- **What it is**: AI bot version of SocialScaleBooster. Python + Node, `.backup` files, mystery `sede2PHCA` file.
- **Job**: AI-powered social scaling bot.
- **Status**: Unstable — many deployment fix docs, committed backup files.
- **Keep**: ⚠️ CLEANUP/MERGE — Too much overlap.

### ✅ `sfs-marketing-toolkit`
- **What it is**: Full-stack marketing tools (email, campaigns, funnels). TypeScript. 9 open issues.
- **Job**: Marketing campaign creation and management.
- **Status**: Clean structure, standard SFS stack.
- **Keep**: ✅ YES — Different from social tools (focuses on campaigns, not posting).

### ✅ `sfs-marketing-and-growth`
- **What it is**: Booking + marketing platform. SendGrid integrated. ConvertKit/Mailchimp not yet implemented. TypeScript. 15 open issues.
- **Job**: Marketing automation with email delivery (SendGrid), booking flows.
- **Status**: Active development. Partially implemented.
- **Needs**: Complete ConvertKit + Mailchimp integrations. Clarify overlap with sfs-marketing-toolkit.
- **Keep**: ✅ YES — But define clear boundary vs sfs-marketing-toolkit.

---

## 📈 CATEGORY 3 — ANALYTICS & DATA

### ✅ `sfs-analytics-engine`
- **What it is**: Full-stack analytics platform. Compliance docs, launch checklist, migrations. 26 open issues.
- **Job**: Track metrics, generate reports, dashboards for all SFS products.
- **Status**: Well-documented. Has `WHATS-BUILT.md`, `COMPLIANCE-STATUS.md`, `LAUNCH-READY.md`.
- **Needs**: Live data connections from all SFS products, production hosting.
- **Keep**: ✅ YES — Core BI tool.

### ⚠️ `sfs-revenue-analytics`
- **What it is**: Simple revenue/MRR tracking. Just `server.js`, `css/`, `js/`. JavaScript.
- **Job**: Track revenue, MRR, Stripe payment data.
- **Status**: Simple/early.
- **Keep**: ⚠️ MERGE INTO sfs-analytics-engine as a revenue module.

### ✅ `SFSDataQueryEngine`
- **What it is**: Full-stack with Prisma ORM (not Drizzle), middleware, security model docs.
- **Job**: Natural language / structured data querying. Smart search across SFS databases.
- **Status**: Mature — has CHANGELOG, SECURITY-MODEL, Prisma migrations.
- **Needs**: Standardize to Drizzle OR document why Prisma is used here.
- **Keep**: ✅ YES — Unique functionality.

### ✅ `DataScrapeInsights`
- **What it is**: Full-stack data scraping and insights. TypeScript. 12 open issues.
- **Job**: Web scraping, competitor analysis, market data collection.
- **Status**: Active.
- **Needs**: Anti-bot compliance, rate limiting, analytics engine integration.
- **Keep**: ✅ YES — Unique product.

---

## 🎨 CATEGORY 4 — DESIGN SYSTEM & UI

### ✅ `sfs-design-system`
- **What it is**: Design system server — tokens, component docs, style references. CSS.
- **Job**: Single source of truth for SFS visual design.
- **Status**: Clean. Working Dockerfile.
- **Keep**: ✅ YES

### ✅ `smartflow-theme-package`
- **What it is**: NPM-publishable SFS theme package. Brown/black/gold aesthetic. CSS + JS.
- **Job**: Drop-in theme install for any SFS or client project.
- **Status**: Polished. Has INSTALL.md, QUICK_START.md.
- **Needs**: Publish to npm. Auto-update pipeline.
- **Keep**: ✅ YES — 🔴 CRITICAL.

### ⚠️ `sfs-theme-package` (POSSIBLE DUPLICATE)
- **What it is**: Another theme package repo. JavaScript. Last updated Nov 2025.
- **Job**: Same as smartflow-theme-package?
- **Status**: Possibly an older version or abandoned fork.
- **Needs**: Compare contents with `smartflow-theme-package`. Archive if redundant.
- **Keep**: ❌ LIKELY REMOVE — Consolidate into `smartflow-theme-package`.

### ✅ `sfs-genesis-template`
- **What it is**: React 19 + TypeScript + Vite starter template. Brown/black/gold theme, glassmorphism UI. 11 open issues.
- **Job**: Official SFS project starter template. One-command bootstrap for any new SFS app.
- **Status**: Active. The proper replacement for `demo-repository`.
- **Needs**: Make this the canonical new-repo starting point. Link from org README.
- **Keep**: ✅ YES — This makes `demo-repository` fully obsolete.

### ✅ `sfs-brand-assets`
- **What it is**: Centralized brand asset management. Logos, images, design resources. CSS.
- **Job**: Single source for all SFS brand files — logos, icons, imagery.
- **Status**: Active (updated May 2026).
- **Needs**: Ensure all repos pull from here instead of storing their own copies.
- **Keep**: ✅ YES — Critical for brand consistency.

---

## 🖥️ CATEGORY 5 — DASHBOARDS & PORTALS

### ✅ `sfs-white-label-dashboard`
- **What it is**: White-label SaaS dashboard. Multi-tenant. `MULTI_TENANT_GUIDE.md`. TypeScript. 9 open issues.
- **Job**: Give clients their own branded SFS-powered dashboard.
- **Status**: Well-documented. Org repo is canonical.
- **Needs**: Auth integration with sfs-auth-core, production deployment.
- **Keep**: ✅ YES

### ✅ `smartflow-hub`
- **What it is**: Unified dashboard for all SFS products. Claude AI integration. JavaScript.
- **Job**: Central portal / front door to all SFS products.
- **Status**: Clean. AGENTS.md, CLAUDE.md present.
- **Needs**: Auth SSO, links to all products.
- **Keep**: ✅ YES

### ✅ `sfs-status-page`
- **What it is**: System status page. TypeScript.
- **Job**: Public-facing uptime/status monitor for all SFS services.
- **Status**: Active (updated May 2026).
- **Needs**: Connect to all SFS service health checks, make public URL.
- **Keep**: ✅ YES — Essential for SaaS credibility.

---

## 🤖 CATEGORY 6 — AI & AUTOMATION

### ✅ `AICompanionBot`
- **What it is**: Next.js AI chatbot. TypeScript. 8 open issues.
- **Job**: Conversational AI assistant for SFS users or as white-label chatbot product.
- **Status**: Clean structure.
- **Needs**: AI provider integration (OpenAI/Claude), deployment.
- **Keep**: ✅ YES

### ✅ `sfs-claude-skills`
- **What it is**: Claude Code skills library (auth-setup, ci-config, db-prisma, deploy-replit, health-check, multi-tenant, readme-gen, repo-setup, stripe-integration, theme-enforcer).
- **Job**: Reusable Claude Code automation skills for applying SFS standards.
- **Status**: Active. Has a temp file that needs removing.
- **Needs**: Remove `.gitignore.tmp` temp file. Add deploy-render, deploy-railway skills.
- **Keep**: ✅ YES

### ✅ `codegpt`
- **What it is**: SFS-branded AI coding assistant. JavaScript. Static + server.js.
- **Job**: AI coding tool product.
- **Status**: Working frontend. Empty Dockerfile.
- **Needs**: Fill Dockerfile, connect to AI backend.
- **Keep**: ✅ YES

---

## 🏢 CATEGORY 7 — CRM & BUSINESS TOOLS

### ✅ `SFSAPDemoCRM`
- **What it is**: Full-stack CRM demo. TypeScript, Docker, gpts/ folder.
- **Job**: Sales demo — shows SFS CRM capabilities to prospects.
- **Status**: Demo/sales tool.
- **Keep**: ✅ YES — Sales asset.

### ✅ `sfs-business-suite`
- **What it is**: All-in-one business management. TypeScript. 9 open issues.
- **Job**: Invoicing, contracts, team management.
- **Status**: Standard SFS structure.
- **Keep**: ✅ YES

### ✅ `sfs-project-manager`
- **What it is**: Project/task management. TypeScript. 9 open issues.
- **Job**: Task tracking and team collaboration.
- **Status**: Standard SFS structure.
- **Keep**: ✅ YES

### ✅ `sfs-invoice-billing`
- **What it is**: Invoice generation and billing management with payment tracking. TypeScript. 7 open issues.
- **Job**: Create/send invoices, track payments, manage billing for SFS clients.
- **Status**: Active (updated May 2026).
- **Needs**: Stripe integration (connect to sfs-auth-core billing layer).
- **Keep**: ✅ YES — Revenue-critical feature.

### ✅ `FinancePlatform`
- **What it is**: Finance platform. No language listed, no description. Created Sept 2025.
- **Job**: Unknown — needs inspection.
- **Status**: Possibly empty or abandoned. Last updated Dec 2025.
- **Needs**: Inspect contents. If empty/abandoned, archive it. If active, define its role vs sfs-invoice-billing.
- **Keep**: ⚠️ INSPECT — Likely archive or merge into sfs-invoice-billing.

---

## 🔧 CATEGORY 8 — DEVOPS & INFRASTRUCTURE

### ✅ `sfs-deploy-hub`
- **What it is**: Multi-repo deployment orchestration. CSS (UI). Working Dockerfile.
- **Job**: Central deployment management for all SFS products.
- **Status**: Has working Dockerfile — better than most.
- **Keep**: ✅ YES

### ✅ `sfs-control-tower`
- **What it is**: Operations control center. Monitors all 26 SFS repos. CSS. 12 open issues.
- **Job**: System monitoring, orchestration, agent actions, security.
- **Status**: Active. Working Dockerfile.
- **Keep**: ✅ YES

### ✅ `sfs-control-center`
- **What it is**: Unified monitoring dashboard. Jest + Playwright. CI/CD integration.
- **Job**: Centralized QA/testing for all SFS products.
- **Status**: Has comprehensive test infrastructure.
- **Keep**: ✅ YES

### ✅ `sfs-url-shortener`
- **What it is**: URL shortening service with analytics and custom domain support. CSS. 7 open issues.
- **Job**: Branded short links for SFS marketing, campaigns, social posts.
- **Status**: Active (updated May 2026).
- **Needs**: Analytics connection to sfs-analytics-engine.
- **Keep**: ✅ YES — Useful standalone tool and marketing asset.

### ✅ `sfs-embed-sdk`
- **What it is**: JavaScript SDK for embedding SmartFlow widgets and components. TypeScript. 16 open issues.
- **Job**: Let external sites embed SFS widgets (chat, booking, analytics) with one script tag.
- **Status**: Active (updated May 2026). 16 open issues suggests active development.
- **Needs**: Publishing to npm/CDN, documentation.
- **Keep**: ✅ YES — Key growth/distribution channel.

---

## 🔑 CATEGORY 9 — SECURITY & NETWORKING

### ✅ `SFSPersonalVPN`
- **What it is**: Personal VPN management dashboard. JavaScript.
- **Job**: VPN access for SFS team, potentially a product.
- **Status**: Has upgrade notes, active development.
- **Needs**: Decide: internal tool or commercial product?
- **Keep**: ✅ YES — Define purpose.

### ✅ `SecureUSBVault`
- **What it is**: Secure USB vault application. TypeScript. 1 open issue.
- **Job**: Secure file storage/encryption for USB drives. Security product.
- **Status**: Active (last updated Dec 2025).
- **Needs**: Inspect scope — is this a standalone product or internal tool?
- **Keep**: ✅ YES — Niche but valuable security product.

---

## 🌐 CATEGORY 10 — CLIENT-FACING PRODUCTS

### ✅ `Barber-booker-v1`
- **What it is**: Vertical SaaS for barbershops. Google OAuth, email, Render deploy. TypeScript. 10 open issues.
- **Job**: Appointment booking for barbershops. Template for vertical SaaS expansion.
- **Status**: v1 — `IMPLEMENTATION_STATUS.md` present.
- **Needs**: v2 plan, expand to other verticals.
- **Keep**: ✅ YES — Template for SFS vertical SaaS strategy.

### ✅ `SmartFlowSite`
- **What it is**: Main SFS marketing/landing site. Python. 1 open issue.
- **Job**: Public-facing website. Marketing, pricing, lead capture.
- **Status**: Active and content-rich.
- **Keep**: ✅ YES

### ✅ `WebsiteBuilder`
- **What it is**: Website builder tool. JavaScript. 7 open issues.
- **Job**: Let SFS clients build their own websites (drag-and-drop or template-based).
- **Status**: Active (updated May 2026). Created June 2025 — one of the older repos.
- **Needs**: Inspect current feature state. Define target user.
- **Keep**: ✅ YES — High-value product if functional.

### ✅ `sfs-knowledge-base`
- **What it is**: Documentation and knowledge base management. CSS. 10 open issues.
- **Job**: Centralized docs, help articles, FAQs for SFS products and clients.
- **Status**: Active (updated May 2026).
- **Needs**: Populate with actual SFS documentation, link from all products.
- **Keep**: ✅ YES — Critical for support and onboarding.

### ✅ `sfs-comms-hub`
- **What it is**: Communication hub — email, SMS, notification management. TypeScript. 8 open issues.
- **Job**: Centralized messaging layer for all SFS products. Handles transactional email, SMS alerts, push notifications.
- **Status**: Active (updated May 2026).
- **Needs**: Integration with sfs-n8n for automation, connect to sfs-marketing-and-growth.
- **Keep**: ✅ YES — Key infrastructure. Every product needs comms.

### ✅ `sfs-video-platform`
- **What it is**: Video hosting, streaming, and management. CSS. 9 open issues.
- **Job**: Host/stream video content for SFS products or as a standalone product.
- **Status**: Active (updated May 2026).
- **Needs**: Define: internal video hosting or SaaS product (like Vimeo alternative)?
- **Keep**: ✅ YES — But define scope clearly.

### ✅ `Asset-Manager`
- **What it is**: Asset management. TypeScript. Replit origin.
- **Job**: Manage digital assets — files, media, documents.
- **Status**: Recent (April 2026). Small repo.
- **Needs**: Inspect if this overlaps with `sfs-brand-assets`. Define unique value.
- **Keep**: ⚠️ EVALUATE — May overlap with sfs-brand-assets.

---

## 📱 CATEGORY 11 — MOBILE

### ✅ `sfs-mobile-app`
- **What it is**: React Native / Expo app. CSS. 
- **Job**: Mobile access to SFS products (iOS + Android).
- **Status**: Early stage.
- **Needs**: Core screens, API integration, auth, App Store submission.
- **Keep**: ✅ YES — Needs significant investment.

---

## 🛣️ CATEGORY 12 — DEMOS & MARKETING SAMPLES

### ⚠️ `smartflow-ecommerce-demo`
- **What it is**: E-commerce demo. JavaScript. Old (created June 2025, last updated Dec 2025).
- **Job**: Demo e-commerce site powered by SFS.
- **Status**: Possibly stale.
- **Needs**: Either update to be a live demo or archive.
- **Keep**: ⚠️ EVALUATE — Archive if outdated.

---

## 🗑️ WHAT TO REMOVE / ARCHIVE

### ❌ `SmartFlowSystems` (ALREADY ARCHIVED)
- Replit dump. Archived. Delete or leave archived.

### ❌ `WaterloggedDistortedVisitor`
- Replit auto-generated repo name. JavaScript. No SFS purpose.
- **Action**: DELETE.

### ❌ `SFSSmartflow-Hub` (PRIVATE)
- Private Replit duplicate of `smartflow-hub`.
- **Action**: Archive or delete. Use org `smartflow-hub` instead.

### ❌ `sfs-ssb`
- No description, no language, no content visible.
- **Action**: Inspect — if empty, DELETE.

### ❌ `demo-repository`
- Generic GitHub demo template. `sfs-genesis-template` fully replaces this.
- **Action**: DELETE or redirect to sfs-genesis-template.

### ❌ `boweazy/ComfyUI`
- Open-source AI image tool fork. No SFS relevance.
- **Action**: DELETE.

### ❌ `boweazy/ConsoleApplication2`
- Old C++ learning project.
- **Action**: DELETE.

### ❌ `boweazy/sfs-white-label-dashboard`
- Duplicate of org repo. Causes confusion.
- **Action**: Archive or delete.

---

## 🚨 CRITICAL ISSUES ACROSS ALL REPOS

### 1. Empty Dockerfiles
Many repos have 0-byte Dockerfiles. Docker deployment is broken for those repos.

**Repos confirmed with empty Dockerfiles:**
`codegpt`, `SFS-AIbofs-social-media`, `sfs-project-manager`, `sfs-business-suite`, `sfs-marketing-toolkit`, `AICompanionBot`, `SFSPersonalVPN`, `SocialScaleBoosterAIbot`, `SFS-SocialPowerhouse`, `SFSAPDemoCRM`, `sfs-mobile-app`

### 2. Theme Files Copy-Pasted Everywhere
`sfs-complete-theme.css`, `sfs-circuit-flow.js`, `sfs-hamburger-menu.js` are copy-pasted into nearly every repo. Creates maintenance nightmare.

**Fix**: All repos install `smartflow-theme-package` instead.

### 3. Two Duplicate Theme Repos
`sfs-theme-package` and `smartflow-theme-package` both exist. One must be the canonical source.

**Fix**: Compare, archive `sfs-theme-package`, standardize on `smartflow-theme-package`.

### 4. Auth Not Integrated
Every repo has `SFS_AUTH_INTEGRATION.md` but no actual implementation. `sfs-auth-core` exists but connects to nothing.

**Fix**: Implement sfs-auth-core fully, integrate across all products.

### 5. Backup/Temp Files in Git
| Repo | Files |
|---|---|
| `SocialScaleBoosterAIbot` | `.backup` files, `test.txt`, `sede2PHCA` |
| `sfs-analytics-engine` | `package.json.bak`, `server.js.backup` |
| `SFSDataQueryEngine` | `README.md.backup`, `files(3)/` dir |
| `sfs-claude-skills` | `.gitignore.tmp.12372.1764495124170` |
| `SFS-AIbofs-social-media` | `main.py.bak`, `main.py.bak-stable` |

### 6. SQLite Database Committed
`SFS-AIbofs-social-media` has `data.sqlite`, `data.sqlite-shm`, `data.sqlite-wal` in version control. Must be removed.

### 7. Two ORM Systems
Most repos use **Drizzle**. `SFSDataQueryEngine` uses **Prisma**. Standardize on one.

### 8. Mixed Languages Per Service
`SFS-AIbofs-social-media` and `SocialScaleBoosterAIbot` mix Python and Node in the same repo.

### 9. Overlapping Repos with No Clear Ownership
- `sfs-core-services` vs `SFS-Backend` — what’s the difference?
- `sfs-invoice-billing` vs `FinancePlatform` — same domain
- `Asset-Manager` vs `sfs-brand-assets` — may overlap
- `sfs-marketing-toolkit` vs `sfs-marketing-and-growth` — both marketing

---

## 🗓️ RECOMMENDED ROADMAP PRIORITIES

### 🔴 PHASE 1 — CLEAN UP (This Week)
1. Delete: `WaterloggedDistortedVisitor`, `sfs-ssb`, `demo-repository`, `boweazy/ComfyUI`, `boweazy/ConsoleApplication2`, `boweazy/sfs-white-label-dashboard`
2. Archive: `SmartFlowSystems` (already archived), `SFSSmartflow-Hub`, `smartflow-ecommerce-demo` (if stale)
3. Remove all backup/temp files from repos
4. Remove SQLite from `SFS-AIbofs-social-media`
5. Remove copy-pasted SFS theme files from all repos — replace with `smartflow-theme-package`
6. Archive `sfs-theme-package` — standardize on `smartflow-theme-package`

### 🟠 PHASE 2 — CONSOLIDATE (Next 30 Days)
1. Implement `sfs-auth-core` fully — connect to SFS-Backend, white-label-dashboard, SocialPowerhouse, smartflow-hub
2. Fill all empty Dockerfiles
3. Decide social tool consolidation: SocialScaleBooster + AIbofs + SocialScaleBoosterAIbot → merge into SFS-SocialPowerhouse
4. Merge `sfs-revenue-analytics` into `sfs-analytics-engine`
5. Clarify `sfs-core-services` vs `SFS-Backend` — merge or define separation
6. Clarify `sfs-marketing-toolkit` vs `sfs-marketing-and-growth` — merge or define boundaries
7. Inspect + decide: `FinancePlatform`, `Asset-Manager`
8. Standardize ORM — Drizzle everywhere (migrate SFSDataQueryEngine from Prisma)

### 🟡 PHASE 3 — BUILD (Next 60 Days)
1. `sfs-mobile-app` — core screens + API integration
2. `smartflow-hub` — SSO via sfs-auth-core, link all products
3. `sfs-control-center` — CI/CD running across all repos
4. `sfs-n8n` — expand automation workflows
5. Publish `smartflow-theme-package` to npm
6. Publish `sfs-embed-sdk` to npm/CDN
7. `sfs-comms-hub` — wire up transactional email/SMS across all products
8. `sfs-status-page` — connect to all service health checks, make public

### 🟢 PHASE 4 — SCALE (Next 90 Days)
1. White-label dashboard — production client onboarding
2. Barber-booker-v2 + expand to other verticals
3. `AICompanionBot` — AI provider connected, ship as product
4. `sfs-video-platform` — define scope, connect to SFS products
5. `sfs-knowledge-base` — populate with SFS docs, link from all products
6. `sfs-invoice-billing` — Stripe live, connect to sfs-auth-core billing
7. `DataScrapeInsights` — compliance review, rate limiting, production
8. `WebsiteBuilder` — assess feature state, ship or sunset

---

## 📋 COMPLETE REPO REFERENCE TABLE (52 repos)

| Repo | Category | Keep? | Priority |
|---|---|---|---|
| SFS-Backend | Core | ✅ | High |
| sfs-core-services | Core | ⚠️ Evaluate | Medium |
| sfs-auth-core | Core | ✅ | 🔴 Critical |
| sfs-core-utils | Core | ✅ | High |
| sfs-n8n | Automation | ✅ | High |
| SFS-SocialPowerhouse | Social | ✅ | High |
| SFS-AIbofs-social-media | Social | ⚠️ Cleanup | Medium |
| SocialScaleBooster | Social | ⚠️ Review | Medium |
| SocialScaleBoosterAIbot | Social | ⚠️ Cleanup | Medium |
| sfs-marketing-toolkit | Marketing | ✅ | Medium |
| sfs-marketing-and-growth | Marketing | ✅ | Medium |
| sfs-analytics-engine | Analytics | ✅ | High |
| sfs-revenue-analytics | Analytics | ⚠️ Merge | Low |
| SFSDataQueryEngine | Data | ✅ | Medium |
| DataScrapeInsights | Data | ✅ | Medium |
| sfs-design-system | Design | ✅ | High |
| smartflow-theme-package | Design | ✅ | 🔴 Critical |
| sfs-theme-package | Design | ❌ Remove | Immediate |
| sfs-genesis-template | Design | ✅ | High |
| sfs-brand-assets | Design | ✅ | High |
| sfs-white-label-dashboard | Dashboard | ✅ | High |
| smartflow-hub | Portal | ✅ | High |
| sfs-status-page | Portal | ✅ | High |
| AICompanionBot | AI | ✅ | Medium |
| sfs-claude-skills | AI/Dev | ✅ | High |
| codegpt | AI | ✅ | Medium |
| SFSAPDemoCRM | CRM | ✅ | Medium |
| sfs-business-suite | Business | ✅ | Medium |
| sfs-project-manager | Business | ✅ | Medium |
| sfs-invoice-billing | Business | ✅ | High |
| FinancePlatform | Business | ⚠️ Inspect | Low |
| sfs-deploy-hub | DevOps | ✅ | High |
| sfs-control-tower | DevOps | ✅ | High |
| sfs-control-center | QA | ✅ | High |
| sfs-url-shortener | DevOps | ✅ | Medium |
| sfs-embed-sdk | SDK | ✅ | High |
| SFSPersonalVPN | Security | ✅ | Low |
| SecureUSBVault | Security | ✅ | Low |
| Barber-booker-v1 | Product | ✅ | Medium |
| SmartFlowSite | Marketing | ✅ | High |
| WebsiteBuilder | Product | ✅ | Medium |
| sfs-knowledge-base | Docs | ✅ | High |
| sfs-comms-hub | Comms | ✅ | High |
| sfs-video-platform | Media | ✅ | Medium |
| Asset-Manager | Assets | ⚠️ Evaluate | Low |
| sfs-mobile-app | Mobile | ✅ | High |
| smartflow-ecommerce-demo | Demo | ⚠️ Evaluate | Low |
| demo-repository | Template | ❌ Remove | Immediate |
| SmartFlowSystems | REMOVE | ❌ | Immediate |
| WaterloggedDistortedVisitor | REMOVE | ❌ | Immediate |
| SFSSmartflow-Hub | REMOVE | ❌ | Immediate |
| sfs-ssb | REMOVE | ❌ | Immediate |
| boweazy/ComfyUI | REMOVE | ❌ | Immediate |
| boweazy/ConsoleApplication2 | REMOVE | ❌ | Immediate |
| boweazy/sfs-white-label-dashboard | REMOVE | ❌ | Immediate |

---

## 🏆 TOP 5 HIGHEST-VALUE ACTIONS RIGHT NOW

1. **Implement sfs-auth-core** — Every product needs auth. Nothing ships correctly without it.
2. **Publish smartflow-theme-package to npm** — One install removes copy-paste debt from 20+ repos.
3. **Fill Dockerfiles** — Can’t deploy what won’t containerize.
4. **Consolidate the 4 social media repos** — Pick SFS-SocialPowerhouse. Archive or merge the rest.
5. **Wire up sfs-comms-hub** — Every product needs email/SMS. It’s currently disconnected.
