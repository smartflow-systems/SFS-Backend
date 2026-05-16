# SFS-Backend — SmartFlow Systems Core Backend

[![SFS CI](https://github.com/smartflow-systems/SFS-Backend/actions/workflows/ci.yml/badge.svg)](https://github.com/smartflow-systems/SFS-Backend/actions/workflows/ci.yml)

Full-stack monolith powering the SmartFlow Systems platform. Node.js/TypeScript API + React/Vite frontend + Drizzle ORM + PostgreSQL.

## Stack

| Layer | Tech |
|---|---|
| Backend | Node.js 20+, Express 4.21, TypeScript 5.6 |
| Frontend | React 18.3, Vite, Wouter, TanStack Query |
| Database | Drizzle ORM, Neon Serverless PostgreSQL |
| Auth | Passport.js (local strategy), Express Session |
| UI | Radix UI, Tailwind CSS 3.4, Framer Motion |
| Payments | Stripe |

## Scripts

```bash
npm run dev       # Development server (tsx watch)
npm run build     # Build frontend + bundle server
npm start         # Production (node dist/index.js)
npm run check     # TypeScript type check
npm run db:push   # Push Drizzle schema to DB
npm run db:seed   # Seed database
```

## Environment

Copy `.env.example` to `.env` and set:

```
DATABASE_URL=postgresql://...
SESSION_SECRET=...
STRIPE_SECRET_KEY=...
```

## Health

`GET /health` → `{"ok":true}`

## Replit

Import from GitHub → set `DATABASE_URL`, `SESSION_SECRET`, `STRIPE_SECRET_KEY`. Port `${PORT:-5000}`.

## Agent Notes (see [AGENTS.md])

Show `[paths]`; VERIFY + UNDO before destructive ops; Bash uses `set -euo pipefail`. GitHub = source of truth.
