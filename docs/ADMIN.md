# Admin CMS (articles & use cases)

## Overview

- **URL:** `/admin` (login at `/admin/login`)
- **Roles:** **Admin** — full access including user management. **Contributor** — create/edit/publish articles and use cases; can delete only items they created; cannot manage users.
- **Database:** PostgreSQL (`DATABASE_URL`). Public site reads published content from `/api/public/*` (no JWT).

## Setup

1. **PostgreSQL** — create a database and set `DATABASE_URL` in `apps/api/.env` (see `apps/api/.env.example`).

2. **Migrate**

   ```bash
   pnpm --filter api db:migrate
   ```

3. **Secrets**

   - `JWT_SECRET` — required for `/api/admin/*` (sign in, CRUD). Use a long random string (e.g. `openssl rand -base64 32`).
   - Without `JWT_SECRET`, the API still serves `/api/public/*` if `DATABASE_URL` is set.

4. **Seed first admin**

   ```bash
   # apps/api/.env
   ADMIN_USERNAME=admin          # optional; defaults to ADMIN_EMAIL or "admin"
   ADMIN_PASSWORD=your-secure-password   # min 8 characters

   pnpm --filter api db:seed
   ```

5. **Run**

   ```bash
   pnpm dev
   ```

   Open `http://localhost:5173/admin/login` (Vite proxies `/api` to the API on `3001`).

## Production

- Deploy the **API** where `DATABASE_URL`, `JWT_SECRET`, and SMTP (for contact) are set.
- Deploy the **web** app with the same API origin, or set `VITE_API_URL` to the API base URL if it differs from the site.
- **Vercel:** today only `api/contact.ts` is serverless. Full CMS requires the Node API (e.g. Railway) with Postgres attached; point `VITE_API_URL` at that API if the site is on Vercel.

## Content model

### Blog articles (Insights)

- Shown on `/{locale}/company/insights` and `/{locale}/company/insights/:slug` when **status = published**.
- Merges with built-in static articles; same **slug** from the database overrides the static entry.
- Body is **HTML** (same patterns as existing articles). Use `__LOCALE__` in links; it is replaced with the visitor locale.

### Use cases

- Shown on `/{locale}/use-cases` when **status = published**.
- Merged **before** static JSON projects; same **project id** replaces the static row.
- **Specs** are stored as JSON (`capacity`, `country`, `powerCapacity`, etc.).

## API reference (summary)

| Method | Path | Auth |
|--------|------|------|
| POST | `/api/admin/login` | — |
| GET | `/api/admin/me` | Bearer |
| CRUD | `/api/admin/users` | Admin only |
| CRUD | `/api/admin/articles` | Bearer |
| CRUD | `/api/admin/use-cases` | Bearer |
| GET | `/api/public/articles` | — |
| GET | `/api/public/articles/slug/:slug` | — |
| GET | `/api/public/use-cases` | — |
