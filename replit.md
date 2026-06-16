# DJ Scaffolding

A modern, fully animated website and admin CMS for DJ Scaffolding — a scaffolding contractor based in Great Yarmouth, Norfolk.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/dj-scaffolding run dev` — run the frontend (port 19030)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Optional env: `ADMIN_PASSWORD` — overrides default admin password (default: `djscaffolding2024`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth)
- `lib/db/src/schema/` — Drizzle DB schema (contact.ts, content.ts, services.ts)
- `artifacts/api-server/src/routes/` — Express route handlers
- `artifacts/dj-scaffolding/src/` — React frontend (pages/, components/)
- `lib/api-client-react/src/generated/` — generated React Query hooks

## Architecture decisions

- Admin auth uses simple in-memory session store + HTTP-only cookie. Password set via `ADMIN_PASSWORD` env var (default for dev: `djscaffolding2024`). Not suitable for multi-instance deploy without switching to DB-backed sessions.
- Content sections are keyed strings in the DB (`hero`, `about`, `about_teaser`, `why_us`, `cta`) — the admin can edit these live.
- Services are fully DB-driven and CRUD-manageable from the admin panel.
- Contact form submissions are stored in the DB and viewable from the admin dashboard.

## Product

- Public site: Home, Services, About, Contact pages with full animations and scroll reveals
- Admin panel at `/admin` — password-protected CMS to edit text, services, and view contact messages
- WhatsApp quick contact button (wa.me/447939352899)
- Animated counters, parallax hero, staggered card animations

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- After each OpenAPI spec change, re-run codegen before using the updated types
- The `about_teaser` content section key must exist in the DB (seeded on first run)
- Admin session is in-memory — restarts clear all sessions (users must log in again)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
