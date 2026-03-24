# Baterino Global

pnpm monorepo: **apps/web** (Vite + React + TypeScript + Tailwind + i18next) and **apps/api** (Node + Express — **greeting** + **contact email**). Multilanguage (en, es, id, zh, ro), SEO-friendly.

## Setup

```bash
pnpm install
```

Copy env examples:

- **Web:** `cp apps/web/.env.example apps/web/.env` — set `VITE_SITE_URL` for production canonicals and sitemap. Set **`VITE_API_URL`** if the API is not same-origin (e.g. separate API host).
- **API:** `cp apps/api/.env.example apps/api/.env` — SMTP and contact settings for `POST /api/contact`. See **`docs/VERCEL.md`** for production mail.

## Development

```bash
pnpm dev
```

- **Web:** Vite on port **5173**, proxies `/api` → **3001**
- **API:** Express on **3001** — `GET /api/greeting`, `POST /api/contact`

Or: `pnpm dev:web` / `pnpm dev:api` separately.

## API (email)

The Express app only exposes:

- **`GET /api/greeting`** — localized JSON (optional for the site)
- **`POST /api/contact`** — contact form → SMTP (see `apps/api/src/contact/processContactPost.ts`)

No database or admin CMS.

## Deploy

- **Frontend:** e.g. Vercel — build `apps/web`, set `VITE_SITE_URL` / `VITE_API_URL` as needed.
- **API + mail:** any Node host, or use Vercel serverless **`api/contact.ts`** at repo root for contact only (see **`docs/VERCEL.md`**).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Web + API in parallel |
| `pnpm build` | Build all apps |
| `pnpm typecheck` | Type-check all |
| `pnpm lint` / `format` / `test` | Web app |

## Features

- **Vite + React + TS + Tailwind** — `apps/web`
- **Multilanguage** — react-i18next; locale in URL
- **SEO** — react-helmet-async; `public/robots.txt`, `public/sitemap.xml`
- **Contact** — `POST /api/contact` (Express or Vercel serverless)
