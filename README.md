# Baterino Global

pnpm monorepo: **apps/web** (Vite + React + TypeScript + Tailwind + i18next) and **apps/api** (Node + Express + TypeScript). Multilanguage (en, es, id, zh, ro), SEO-friendly, Inter font.

## Setup

```bash
pnpm install
```

Copy env examples and set values as needed:

- **Root / web:** `cp apps/web/.env.example apps/web/.env` — set `VITE_SITE_URL` for production canonicals and sitemap.
- **API:** `cp apps/api/.env.example apps/api/.env` — optional; `PORT` defaults to 3001.

## Development

Run both apps:

```bash
pnpm dev
```

Or separately:

- **Web:** `pnpm dev:web` — Vite dev server (port 5173), proxies `/api` to the API
- **API:** `pnpm dev:api` — Express on port 3001

## Environment variables

| Variable        | App  | Description                                      |
|----------------|------|--------------------------------------------------|
| `VITE_SITE_URL`| web  | Base URL for canonicals and sitemap (build time)|
| `PORT`         | api  | API server port (default 3001)                    |

## Features

- **Vite + React + TS + Tailwind** — `apps/web`
- **Inter font** — Google Fonts in `index.html`; typography scale: `text-display-*`, `text-heading-*`, `text-body-*`, etc.
- **Multilanguage** — react-i18next; locale in URL; 5 languages (en, es, id, zh, ro); browser detection; language dropdown
- **SEO** — react-helmet-async; per-page meta, canonical, `lang`, Open Graph; `public/robots.txt` and `public/sitemap.xml`
- **API** — `GET /api/greeting` returns localized message; send `Accept-Language`
- **Layout** — Site max 1440px, content max 1200px; responsive

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `pnpm dev`     | Run web + API in parallel  |
| `pnpm build`   | Build all apps             |
| `pnpm typecheck` | Type-check all apps       |
| `pnpm lint`      | Lint web app (ESLint)     |
| `pnpm format`    | Format web app (Prettier) |
| `pnpm test`      | Run web app tests (Vitest)|

## Build

```bash
pnpm build
```

Set `VITE_SITE_URL` when building the web app for correct canonical and sitemap URLs.
