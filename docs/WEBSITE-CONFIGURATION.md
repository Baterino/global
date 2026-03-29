# Baterino Global — website configuration & stack

Short reference so we remember **what this repo uses** and **where things run**. Update this file when domains or providers change.

---

## Stack (this monorepo)

| Layer | Technology |
|--------|------------|
| **Monorepo** | `pnpm` workspaces (`apps/web`, `apps/api`) |
| **Marketing site** | React 18, TypeScript, Vite, Tailwind-style CSS (`apps/web`) |
| **Routing / i18n** | React Router, `i18next` — locales: `en`, `es`, `id`, `zh`, `ro` |
| **SEO** | `react-helmet-async`, build-time sitemap (`scripts/generate-sitemap.mjs`) |
| **Admin CMS** | SPA under `/admin` — articles, use cases, media (`apps/web/src/admin`) |
| **Public API** | Express (`apps/api`) — JWT admin routes, public JSON, contact processing helpers |
| **Database** | PostgreSQL (`pg`), SQL migrations in `apps/api/db/migrations` |
| **Object storage** | Cloudflare R2 (S3-compatible, `@aws-sdk/client-s3`) — CMS uploads + static `/images` sync |
| **Email (API / Vercel fn)** | Resend (preferred) or SMTP (`nodemailer`) |
| **Contact on Vercel** | Serverless `api/contact.ts` (see `vercel.json`) — can use Resend/SMTP env on **Vercel** |

---

## Where it runs (hosting)

| Service | Role |
|---------|------|
| **Vercel** | Production **static web** build (`apps/web`), SPA rewrites, **serverless `POST /api/contact`**. Env: `VITE_*` at build time; mail vars for the contact function. See **[VERCEL.md](./VERCEL.md)**. |
| **Railway** | **Node API** (`apps/api`): admin + public API, **Postgres**, optional long-running workloads. Env: `DATABASE_URL`, `JWT_SECRET`, R2*, mail, `SITE_PUBLIC_URL`, etc. See **`apps/api/.env.example`**. |
| **Cloudflare** | **R2** buckets (e.g. media + static images), **public buckets / custom domains** (e.g. `media.*`, `cdn.*`), API tokens (`R2_*`, optional `R2_IMAGES_*`). Sync script: `pnpm --filter api sync:public-images`. |
| **GitHub** | Source: `Baterino/global` (or your fork) — CI/deploy triggers for Vercel. |
| **SiteGround / registrar** | *Operational (not in repo):* domain registration, **DNS** A/CNAME to Vercel, MX for mail if inbox lives there, or subdomains toward Cloudflare. Document your real DNS map elsewhere if needed. |

**Important split:** Full **CMS** needs the **Railway API** + DB. Browsers call it via **`VITE_API_URL`** when the site is only on Vercel. **`POST /api/contact`** on the **same Vercel project** does not replace the Railway API unless you only use that endpoint.

---

## Domains & assets (typical pattern)

| Purpose | Example (adjust to your DNS) |
|---------|-------------------------------|
| **Canonical site** | `VITE_SITE_URL` — public marketing URL (sitemap, canonicals) |
| **API** | Railway URL or `https://api.<domain>` — **`VITE_API_URL`** |
| **CDN / static images** | **`VITE_ASSET_BASE_URL`** = R2 static bucket public origin (e.g. `https://cdn.baterino.com`) — aligns with **`R2_IMAGES_PUBLIC_URL`** on sync |
| **CMS / article images** | **`R2_PUBLIC_URL`** — media bucket browser URL |
| **OG / social** | Prefer production + CDN URLs in built `index.html` and per-route `SEOHead` |

---

## Admin & CMS

- **Login:** `/admin/login` (JWT).
- **Setup & roles:** **[ADMIN.md](./ADMIN.md)**.
- **Env:** `JWT_SECRET`, `ADMIN_EMAIL` / `ADMIN_PASSWORD` (seed), `DATABASE_URL`, R2 for uploads.

---

## Frontend env (build) — `apps/web/.env.example`

| Variable | Purpose |
|----------|---------|
| `VITE_SITE_URL` | Canonical site origin (no trailing slash). |
| `VITE_API_URL` | Railway API base if different from the page origin. |
| `VITE_ASSET_BASE_URL` | R2/CDN origin for `/images/*` in production. |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 (optional). |
| `VITE_SOCIAL_*` | Footer / overrides (optional). |

---

## Backend env — `apps/api/.env.example`

High level: **Postgres**, **JWT**, **admin seed**, **contact mail** (Resend/SMTP), **`SITE_PUBLIC_URL`**, **R2** (`R2_ACCOUNT_ID`, keys, `R2_BUCKET_NAME`, `R2_PUBLIC_URL`, optional `R2_IMAGES_*` for second bucket/token), **`CONTACT_EMAIL_PUBLIC_ORIGIN`** for email templates loading site assets.

---

## Useful commands

```bash
pnpm dev                    # web + api (parallel)
pnpm --filter web build     # sitemap + typecheck + Vite build
pnpm --filter api db:migrate
pnpm --filter api sync:public-images
```

---

## Related docs

- **[VERCEL.md](./VERCEL.md)** — Vercel root directory, contact function env, mail debugging.
- **[ADMIN.md](./ADMIN.md)** — CMS, DB seed, production notes.

---

*Last intent: one-page map of stack + Vercel + Railway + Cloudflare (+ DNS/email host). Edit when production URLs or providers change.*
