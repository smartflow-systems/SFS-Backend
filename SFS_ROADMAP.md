# 🗺️ SMARTFLOW SYSTEMS (SFS) — FULL REPO ROADMAP & AUDIT

> Generated: May 2026 | Status: Living Document

---

## 📊 TOTAL REPO COUNT
- **smartflow-systems org**: ~30 repos
- **boweazy personal**: 3 repos (2 should be removed)
- **TOTAL**: ~33 repos examined

---

## 🏗️ CATEGORY 1 — CORE INFRASTRUCTURE & BACKEND

### ✅ `SFS-Backend`
- **What it is**: The primary full-stack monolith. Node.js/TypeScript backend with React/Vite frontend. Uses Drizzle ORM, PostgreSQL, shadcn/ui components, Tailwind CSS.
- **Job**: Central API + dashboard platform. The beating heart of SFS.
- **Status**: Active. Has AGENTS.md, design guidelines, multiple test files.
- **Needs**: Proper Dockerfile (exists but needs filling), production deployment pipeline, auth integration from sfs-auth-core.
- **Keep**: ✅ YES — Primary repo.

### ✅ `sfs-auth-core`
- **What it is**: Lean authentication microservice. No client layer. Just `server/`, `shared/`, Drizzle config.
- **Job**: Centralized JWT/session auth for all SFS products. Single sign-on backbone.
- **Status**: Early/clean stage — minimal files, very focused.
- **Needs**: Full implementation (routes, middleware), deployment, integration docs for each other repo.
- **Keep**: ✅ YES — Critical missing piece. Every repo references `SFS_AUTH_INTEGRATION.md` but this is the actual implementation.

### ✅ `sfs-n8n`
- **What it is**: Self-hosted n8n automation server via Docker Compose. Has pre-built workflow JSONs and a `sales-closer-agent.md`.
- **Job**: Business automation backbone — lead follow-up, email sequences, CRM triggers, webhook handling.
- **Status**: Functional setup. Workflows need expanding.
- **Needs**: More workflow templates, connection to sfs-backend webhooks, documented integration.
- **Keep**: ✅ YES — Automation layer is essential.

---

## 📱 CATEGORY 2 — SOCIAL MEDIA & MARKETING TOOLS

> ⚠️ **OVERLAP ALERT** — Too many repos doing similar things. Consolidation needed.

### ✅ `SFS-SocialPowerhouse`
- **What it is**: The most complete social media management platform. Full-stack with OAuth setup, real publishing (not mock), multiple platform integrations, Docker, render.yaml, Jest tests.
- **Job**: Publish, schedule, manage social media content across platforms. The real production social tool.
- **Status**: Most mature of the social tools. Has `OAUTH_SETUP.md`, `REAL_PUBLISHING_GUIDE.md`, `POWERHOUSE_FEATURES.md`.
- **Needs**: Live OAuth credentials, production hosting, connection to analytics engine.
- **Keep**: ✅ YES — This is THE social media tool.

### ⚠️ `SFS-AIbofs-social-media`
- **What it is**: Python/Flask + Node hybrid. Has SQLite database, bots interface, booking, shop pages, social scale demo.
- **Job**: AI-powered social media bots, booking automation, demo interface.
- **Status**: Active development, messy — has `.bak` files, mixed Python/JS approaches, SQLite committed to repo.
- **Needs**: Cleanup — remove SQLite files from git, pick one language (Python OR Node), integrate into SocialPowerhouse OR keep as standalone bot layer.
- **Keep**: ⚠️ MERGE/CLEANUP — Absorb bot functionality into SocialPowerhouse. Remove SQLite from repo.

### ⚠️ `SocialScaleBooster`
- **What it is**: Enterprise-level social scale platform with CodeQL, Codecov, agents system.
- **Job**: Social media growth/scaling tool.
- **Status**: Appears mature (enterprise CI tools) but overlaps heavily with SocialPowerhouse.
- **Needs**: Decision — is this a separate product or duplicate of SocialPowerhouse?
- **Keep**: ⚠️ REVIEW — May be redundant with SocialPowerhouse. Evaluate for merge or archive.

### ⚠️ `SocialScaleBoosterAIbot`
- **What it is**: AI bot version of SocialScaleBooster. Has Python + Node, API folder, multiple DEPLOYMENT docs, backup files committed to repo.
- **Job**: AI-powered social scaling bot.
- **Status**: Has many deployment fix docs suggesting instability. Has `.backup` files, `test.txt`, `sede2PHCA` (mystery file) committed.
- **Needs**: Major cleanup — remove backup files, `test.txt`, `sede2PHCA` mystery file. Consolidate into SFS-AIbofs or SocialPowerhouse.
- **Keep**: ⚠️ CLEANUP/MERGE — Too much overlap. Clean up or absorb into main social tool.

### ✅ `sfs-marketing-toolkit`
- **What it is**: Full-stack app focused on marketing tools (email, campaigns, funnels).
- **Job**: Marketing campaign creation and management.
- **Status**: Clean structure, standard SFS stack.
- **Needs**: Feature development, connection to analytics.
- **Keep**: ✅ YES — Different enough from social media tools (focuses on campaigns, not social posting).

---

## 📈 CATEGORY 3 — ANALYTICS & DATA

### ✅ `sfs-analytics-engine`
- **What it is**: Full-stack analytics platform. Has compliance docs, launch-ready checklist, deployment guide, migrations.
- **Job**: Track metrics, generate reports, show dashboards for SFS products and client businesses.
- **Status**: Well-documented. Has `WHATS-BUILT.md`, `COMPLIANCE-STATUS.md`, `LAUNCH-READY.md`.
- **Needs**: Live data connections from all other SFS products, production hosting.
- **Keep**: ✅ YES — Core business intelligence tool.

### ⚠️ `sfs-revenue-analytics`
- **What it is**: Simpler revenue-focused analytics. Just `server.js`, `css/`, `js/` — lightweight.
- **Job**: Track revenue, MRR, payment data specifically (Stripe focused).
- **Status**: Simple/early stage.
- **Needs**: Either expand into full product or merge into analytics-engine as a module.
- **Keep**: ⚠️ EVALUATE — Consider merging into sfs-analytics-engine as a revenue module.

### ✅ `SFSDataQueryEngine`
- **What it is**: Full-stack with Prisma ORM (not Drizzle like others), middleware layer, tools, vendor, config folders. Has security model docs.
- **Job**: Natural language / structured data querying across SFS databases. Powers smart search and data retrieval.
- **Status**: More mature than most — has CHANGELOG, SECURITY-MODEL, Prisma migrations, proper structure.
- **Needs**: Standardize ORM to Drizzle (rest of SFS uses Drizzle) OR document why Prisma is used here. Integration with analytics engine.
- **Keep**: ✅ YES — Unique functionality not duplicated elsewhere.

### ✅ `DataScrapeInsights`
- **What it is**: Full-stack data scraping and insights platform. Has `branding/` folder (unique). Drizzle, migrations.
- **Job**: Web scraping, competitor analysis, market data collection.
- **Status**: Active development.
- **Needs**: Anti-bot compliance docs, rate limiting, integration with analytics engine output.
- **Keep**: ✅ YES — Unique product.

---

## 🎨 CATEGORY 4 — DESIGN SYSTEM & UI

### ✅ `sfs-design-system`
- **What it is**: The design system server — serves design tokens, component docs, style references.
- **Job**: Single source of truth for SFS visual design. Actual Dockerfile with content.
- **Status**: Clean. Has server, shared, docs, actual filled Dockerfile.
- **Needs**: Publish documentation site, keep synced with smartflow-theme-package.
- **Keep**: ✅ YES — Essential for consistency.

### ✅ `smartflow-theme-package`
- **What it is**: NPM-publishable theme package. Has `dist/`, `examples/`, `index.js`, `index.d.ts`, `install-to-project.sh`. The actual package.json shows it can be installed.
- **Job**: Drop-in theme package that any SFS product or client project can install. One command = SFS branding.
- **Status**: Most polished infrastructure repo. Has INSTALL.md, QUICK_START.md, PACKAGE_SUMMARY.md.
- **Needs**: Publish to npm (or GitHub Packages). Version bump strategy. Auto-update pipeline when design tokens change.
- **Keep**: ✅ YES — 🔴 CRITICAL. Every repo should use this instead of copy-pasting SFS theme files manually.

### ⚠️ PROBLEM: Duplicated theme files in every repo
Almost every repo has these files copy-pasted:
- `sfs-circuit-flow.js`
- `sfs-complete-theme.css`
- `sfs-hamburger-menu.js`
- `sfs-currency-config.json`
- `tailwind.preset.js`

**ACTION NEEDED**: Remove these from individual repos and have them import from `smartflow-theme-package` instead. This is significant technical debt.

---

## 🖥️ CATEGORY 5 — DASHBOARDS & PORTALS

### ✅ `sfs-white-label-dashboard`
- **What it is**: White-label SaaS dashboard. Multi-tenant architecture. Has `MULTI_TENANT_GUIDE.md`, `DEPLOYMENT_GUIDE.md`, `SFS_AUTH_INTEGRATION.md`.
- **Job**: Give clients their own branded dashboard powered by SFS. Reseller/agency product.
- **Status**: Well-documented. Both org repo and boweazy fork exist (see remove list).
- **Needs**: Auth integration with sfs-auth-core, production deployment.
- **Keep**: ✅ YES — Revenue-generating white-label product.

### ✅ `smartflow-hub`
- **What it is**: Next.js app with render.yaml. The main SFS product hub/portal.
- **Job**: Central login portal where users access all SFS products. The front door.
- **Status**: Clean Next.js setup. AGENTS.md, CLAUDE.md present.
- **Needs**: Auth integration, links to all SFS products, proper landing experience.
- **Keep**: ✅ YES — The front door to everything.

---

## 🤖 CATEGORY 6 — AI & AUTOMATION

### ✅ `AICompanionBot`
- **What it is**: Next.js app with an AI companion chatbot. Has `app/` folder (Next.js app router), drizzle, client/server/shared.
- **Job**: Conversational AI assistant for SFS users or as a white-label chatbot product.
- **Status**: Clean structure.
- **Needs**: AI provider integration (OpenAI/Claude), deployment.
- **Keep**: ✅ YES — AI chat is a key differentiator product.

### ✅ `sfs-claude-skills`
- **What it is**: Library of Claude Code skills as zip archives. Skills: auth-setup, ci-config, db-prisma, deploy-replit, health-check, multi-tenant, readme-gen, repo-setup, stripe-integration, theme-enforcer.
- **Job**: Reusable automation skills for Claude Code to apply SFS standards to any repo automatically.
- **Status**: Active and unique. Has `.gitignore.tmp` temp file that should be removed.
- **Needs**: Remove temp file (`.gitignore.tmp.12372.1764495124170`). Add more skills (deploy-render, deploy-railway, sfs-analytics-connect).
- **Keep**: ✅ YES — Massive time saver for maintaining SFS standards.

### ✅ `codegpt`
- **What it is**: Static HTML/JS/CSS site with server.js. Has SFS theme files, currency config, circuit flow animation.
- **Job**: CodeGPT AI coding assistant interface / SFS-branded AI tool.
- **Status**: Working frontend. Empty Dockerfile.
- **Needs**: Fill Dockerfile, connect to actual AI backend.
- **Keep**: ✅ YES — AI coding tool product.

---

## 🏢 CATEGORY 7 — CRM & BUSINESS TOOLS

### ✅ `SFSAPDemoCRM`
- **What it is**: Full-stack CRM demo. Has Docker, gpts/ folder, SFS design system files, drizzle.
- **Job**: Demonstrate SFS CRM capabilities to prospects. The sales demo tool.
- **Status**: Demo/sales tool. Has `.sfs/` hidden folder.
- **Needs**: Keep updated as core CRM evolves. Potentially make it a real lite CRM product.
- **Keep**: ✅ YES — Sales/demo asset.

### ✅ `sfs-business-suite`
- **What it is**: Full-stack business suite. Standard SFS structure.
- **Job**: All-in-one business tools (invoicing, contracts, team management).
- **Status**: Early/standard structure.
- **Needs**: Feature development. Define what differentiates it from other SFS tools.
- **Keep**: ✅ YES — Bundle product opportunity.

### ✅ `sfs-project-manager`
- **What it is**: Full-stack project management app.
- **Job**: Task/project tracking for SFS users and their teams.
- **Status**: Standard SFS structure.
- **Needs**: Feature parity with tools like Asana-lite, Trello-lite.
- **Keep**: ✅ YES — Sticky product category.

---

## 🔧 CATEGORY 8 — DEVOPS & INFRASTRUCTURE

### ✅ `sfs-deploy-hub`
- **What it is**: Deployment infrastructure repo. Has an actual filled Dockerfile. Client folder, server folder, docs.
- **Job**: Central deployment management — deploy SFS products to various platforms.
- **Status**: Has working Dockerfile.
- **Needs**: Expand deploy scripts, CI/CD pipelines, multi-environment support.
- **Keep**: ✅ YES — Critical devops tool.

### ✅ `sfs-control-tower`
- **What it is**: Orchestration and agent actions hub. Has `AGENT_ACTIONS_GUIDE.md`, `SFS_SECURITY_CLEANUP_REPORT.md`, security docs, startup guide.
- **Job**: Oversee all SFS systems, run automated agents, security monitoring.
- **Status**: Active. Has an actual working Dockerfile.
- **Needs**: Connect to monitoring, alerts, auto-remediation.
- **Keep**: ✅ YES — Operations/monitoring layer.

### ✅ `sfs-control-center`
- **What it is**: QA/Testing infrastructure. Has Jest, Playwright, `.testing-templates/`, `tests/`, CI/CD integration guide.
- **Job**: Centralized testing for all SFS products. Run E2E and unit tests.
- **Status**: Has `CI_CD_INTEGRATION.md`, comprehensive test docs.
- **Needs**: Actual test coverage across all other SFS repos, GitHub Actions integration.
- **Keep**: ✅ YES — QA layer is essential.

---

## 🔑 CATEGORY 9 — SECURITY & NETWORKING

### ✅ `SFSPersonalVPN`
- **What it is**: Personal VPN application. Has `UPGRADE_SUMMARY.md`, config folder, full SFS theme.
- **Job**: Secure VPN access for SFS team and potentially as a product offering.
- **Status**: Has upgrade notes suggesting active development.
- **Needs**: Decide: internal tool or commercial product? If commercial, needs billing integration.
- **Keep**: ✅ YES — But define its purpose clearly.

---

## 🌐 CATEGORY 10 — CLIENT-FACING PRODUCTS

### ✅ `Barber-booker-v1`
- **What it is**: Vertical SaaS for barber shops. Full-stack with Google OAuth, email setup, Render deployment.
- **Job**: Appointment booking system for barbershops. Template for SFS vertical SaaS products.
- **Status**: Has v1 in name suggesting v2 planned. `IMPLEMENTATION_STATUS.md` present.
- **Needs**: v2 planning, expansion to other verticals (nail salons, spas).
- **Keep**: ✅ YES — Proof of concept for SFS vertical SaaS strategy.

### ✅ `SmartFlowSite`
- **What it is**: The main SmartFlow Systems marketing/landing website.
- **Job**: Public-facing website. Marketing, pricing, features, lead capture.
- **Status**: Active and content-rich.
- **Needs**: Keep current with all products, SEO optimization.
- **Keep**: ✅ YES — Front door to the brand.

---

## 📱 CATEGORY 11 — MOBILE

### ✅ `sfs-mobile-app`
- **What it is**: React Native / Expo app. Has `App.tsx`, `app.json`, `index.ts`, src/ folder.
- **Job**: Mobile access to SFS products (iOS + Android).
- **Status**: Early stage. Empty Dockerfile (irrelevant for mobile, should be removed).
- **Needs**: Core screens built, API integration with sfs-backend, auth with sfs-auth-core, App Store submission.
- **Keep**: ✅ YES — Mobile is essential. Needs significant development investment.

---

## 🗑️ WHAT TO REMOVE / ARCHIVE

### ❌ `boweazy/ComfyUI`
- **What it is**: A fork of the open-source ComfyUI AI image generation tool.
- **Why remove**: NOT an SFS project. Open-source fork in personal account with no SFS relevance.
- **Action**: Archive or delete from boweazy account.

### ❌ `boweazy/ConsoleApplication2`
- **What it is**: A C++ Visual Studio console application (.cpp, .sln, .vcxproj).
- **Why remove**: Completely unrelated to SFS. Old learning/test project.
- **Action**: Delete.

### ❌ `boweazy/sfs-white-label-dashboard`
- **What it is**: Personal account duplicate of `smartflow-systems/sfs-white-label-dashboard`.
- **Why remove**: Creates confusion about which is canonical. Work should happen in the org repo.
- **Action**: Archive or delete. Point collaborators to the org repo.

### ⚠️ `demo-repository`
- **What it is**: Minimal template repo with almost no content.
- **Why remove/replace**: Serves no purpose now that `sfs-claude-skills` has `sfs-repo-setup` skill.
- **Action**: Either turn into a proper SFS starter template OR delete.

---

## 🚨 CRITICAL ISSUES ACROSS ALL REPOS

### 1. Empty Dockerfiles
Many repos have `Dockerfile` with 0 bytes — Docker deployment is broken for those repos.

**Repos with empty Dockerfiles:**
- `codegpt`
- `SFS-AIbofs-social-media`
- `sfs-project-manager`
- `sfs-business-suite`
- `sfs-marketing-toolkit`
- `AICompanionBot`
- `SFSPersonalVPN`
- `SocialScaleBoosterAIbot`
- `SFS-SocialPowerhouse`
- `SFSAPDemoCRM`
- `sfs-mobile-app`

### 2. Theme Files Copy-Pasted Everywhere
`sfs-complete-theme.css`, `sfs-circuit-flow.js`, `sfs-hamburger-menu.js` are copy-pasted into nearly every single repo (same SHA hash = identical files). Creates a maintenance nightmare.

**Fix**: All repos should install `smartflow-theme-package` instead of copying files.

### 3. Auth Not Integrated
Every repo has a `SFS_AUTH_INTEGRATION.md` doc but no actual auth implementation. `sfs-auth-core` exists but isn't connected anywhere.

**Fix**: Implement and integrate sfs-auth-core across all products.

### 4. Backup/Temp Files Committed to Git
| Repo | Files |
|---|---|
| `SocialScaleBoosterAIbot` | `.backup` files, `test.txt`, `sede2PHCA` (mystery file) |
| `sfs-analytics-engine` | `package.json.bak`, `server.js.backup` |
| `SFSDataQueryEngine` | `README.md.backup.20251207-162438`, `files(3)/` dir |
| `sfs-claude-skills` | `.gitignore.tmp.12372.1764495124170` |
| `SFS-AIbofs-social-media` | `main.py.bak-20260328-stable`, `main.py.bak` |

### 5. SQLite Database Committed to Repo
`SFS-AIbofs-social-media` has `data.sqlite`, `data.sqlite-shm`, `data.sqlite-wal` committed. These must NEVER be in version control.

### 6. Two ORM Systems in Use
Most repos use **Drizzle ORM**. `SFSDataQueryEngine` uses **Prisma**. Standardize on one.

### 7. Mixed Languages Per Service
`SFS-AIbofs-social-media` and `SocialScaleBoosterAIbot` use both Python (Flask) and Node.js in the same repo. Each service should have one language.

---

## 🗓️ RECOMMENDED ROADMAP PRIORITIES

### 🔴 PHASE 1 — CLEAN UP (Do This Week)
1. Delete/archive: `boweazy/ComfyUI`, `boweazy/ConsoleApplication2`, `boweazy/sfs-white-label-dashboard`
2. Remove all backup/temp files from repos (`.bak`, `.backup`, temp files)
3. Remove SQLite databases from `SFS-AIbofs-social-media`
4. Remove mystery `sede2PHCA` file from `SocialScaleBoosterAIbot`
5. Remove copy-pasted SFS theme files from ALL repos — replace with `smartflow-theme-package` import

### 🟠 PHASE 2 — CONSOLIDATE (Next 30 Days)
1. Implement `sfs-auth-core` fully and connect to: sfs-backend, sfs-white-label-dashboard, SFS-SocialPowerhouse, smartflow-hub
2. Fill all empty Dockerfiles with proper production configs
3. Decide fate of overlapping social tools: SocialScaleBooster vs SFS-SocialPowerhouse vs SFS-AIbofs-social-media
4. Merge `sfs-revenue-analytics` into `sfs-analytics-engine` as a module
5. Standardize on Drizzle ORM across all repos (migrate SFSDataQueryEngine from Prisma)

### 🟡 PHASE 3 — BUILD (Next 60 Days)
1. Mobile app (`sfs-mobile-app`) — core screens and API integration
2. `smartflow-hub` — connect all products, SSO via sfs-auth-core
3. `sfs-control-center` — get CI/CD running across all repos
4. `sfs-n8n` — build out more automation workflows
5. Publish `smartflow-theme-package` to npm/GitHub Packages

### 🟢 PHASE 4 — SCALE (Next 90 Days)
1. White-label dashboard — production client onboarding
2. Barber-booker-v2 + expand to other verticals
3. AICompanionBot — connect to AI provider, ship as product
4. Revenue analytics — Stripe integration live
5. DataScrapeInsights — compliance review, rate limiting, production

---

## 📋 QUICK REFERENCE TABLE

| Repo | Category | Keep? | Priority |
|---|---|---|---|
| SFS-Backend | Core | ✅ | High |
| sfs-auth-core | Core | ✅ | 🔴 Critical |
| sfs-n8n | Automation | ✅ | High |
| SFS-SocialPowerhouse | Social | ✅ | High |
| SFS-AIbofs-social-media | Social | ⚠️ Cleanup | Medium |
| SocialScaleBooster | Social | ⚠️ Review | Medium |
| SocialScaleBoosterAIbot | Social | ⚠️ Cleanup | Medium |
| sfs-marketing-toolkit | Marketing | ✅ | Medium |
| sfs-analytics-engine | Analytics | ✅ | High |
| sfs-revenue-analytics | Analytics | ⚠️ Merge | Low |
| SFSDataQueryEngine | Data | ✅ | Medium |
| DataScrapeInsights | Data | ✅ | Medium |
| sfs-design-system | Design | ✅ | High |
| smartflow-theme-package | Design | ✅ | 🔴 Critical |
| sfs-white-label-dashboard | Dashboard | ✅ | High |
| smartflow-hub | Portal | ✅ | High |
| AICompanionBot | AI | ✅ | Medium |
| sfs-claude-skills | AI/Dev | ✅ | High |
| codegpt | AI | ✅ | Medium |
| SFSAPDemoCRM | CRM | ✅ | Medium |
| sfs-business-suite | Business | ✅ | Medium |
| sfs-project-manager | Business | ✅ | Medium |
| sfs-deploy-hub | DevOps | ✅ | High |
| sfs-control-tower | DevOps | ✅ | High |
| sfs-control-center | QA | ✅ | High |
| SFSPersonalVPN | Security | ✅ | Low |
| Barber-booker-v1 | Product | ✅ | Medium |
| SmartFlowSite | Marketing | ✅ | High |
| sfs-mobile-app | Mobile | ✅ | High |
| demo-repository | Template | ❌ Remove | — |
| boweazy/ComfyUI | REMOVE | ❌ | Immediate |
| boweazy/ConsoleApplication2 | REMOVE | ❌ | Immediate |
| boweazy/sfs-white-label-dashboard | REMOVE | ❌ | Immediate |

---

## 🏆 TOP 5 HIGHEST-VALUE ACTIONS RIGHT NOW

1. **Implement sfs-auth-core** — Every product needs auth. Nothing ships properly without it.
2. **Publish smartflow-theme-package to npm** — One install removes copy-paste debt from 20+ repos.
3. **Fill Dockerfiles** — Can't deploy what won't containerize.
4. **Consolidate social tools** — 4 overlapping repos is 3 too many. Pick SFS-SocialPowerhouse as the winner.
5. **Connect sfs-analytics-engine** — All products are flying blind without live analytics.
