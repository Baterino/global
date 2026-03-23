# Deploying the API on Railway

The API lives in **`apps/api`** inside a **pnpm monorepo**. Railway should build from the **repository root** using the root **`railway.toml`** (or equivalent settings in the dashboard).

## 1. Create the Railway project

1. [railway.app](https://railway.app) → **New Project** → deploy from **GitHub** (this repo).
2. Add **PostgreSQL**: **New** → **Database** → **PostgreSQL**.
3. In your **API/web service** (the Node app), **Variables** → **Add variable** → **Reference** `DATABASE_URL` from the Postgres service (Railway fills the connection string).

## 2. Service settings (dashboard)

| Setting | Value |
|--------|--------|
| **Root directory** | Repository root (`.`) — do **not** set only `apps/api` unless you use a standalone deploy flow; the monorepo needs the root `pnpm-lock.yaml`. |
| **Build command** | `NODE_ENV=development pnpm install --frozen-lockfile && pnpm --filter api build` (same as `railway.toml` — avoids pnpm skipping `typescript` when `NODE_ENV=production`) |
| **Start command** | `pnpm --filter api start` → runs `node dist/index.js` from `apps/api` |

If you don’t use `railway.toml`, paste the same build/start commands into **Settings → Build / Deploy**.

## 3. Required environment variables

Set these on the **API service** (Variables tab):

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | From Postgres **Reference** (or paste URL). |
| `JWT_SECRET` | Yes for admin CMS | `openssl rand -base64 32` — without it, `/api/admin/*` is disabled; `/api/public/*` still works if DB is set. |
| `NODE_ENV` | Recommended | `production` — contact form returns errors if SMTP is missing in production. |
| `PORT` | No | **Railway sets this automatically**; the app already uses `process.env.PORT`. |

### Contact email (`POST /api/contact`)

| Variable | Notes |
|----------|--------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Required in production for contact. |
| `SMTP_SECURE` | `true` if using port **465**. |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `AUTO_REPLY_FROM_EMAIL` | Optional; see `apps/api/.env.example` and `docs/VERCEL.md`. |

### CMS / public URLs (optional)

| Variable | Notes |
|----------|--------|
| `SITE_PUBLIC_URL` | Public site base URL (no trailing slash) — used in contact/auto-reply emails. |
| `SOCIAL_FACEBOOK_URL`, `SOCIAL_LINKEDIN_URL` | Optional. |

## 4. Database: migrate once, then seed admin

The project uses **SQL files**, not Prisma. After the **first** successful deploy (with `DATABASE_URL` set):

**Option A — Railway CLI**

```bash
railway link
railway run pnpm --filter api run db:migrate:prod
railway run pnpm --filter api run db:seed:prod
```

**Option B — local shell** (temporarily set `DATABASE_URL` to the Railway Postgres URL):

```bash
cd apps/api
pnpm run build
DATABASE_URL="postgresql://..." pnpm run db:migrate:prod
ADMIN_PASSWORD="your-secure-password" ADMIN_USERNAME="admin" DATABASE_URL="postgresql://..." pnpm run db:seed:prod
```

- **`db:migrate:prod`** runs the compiled script (`node dist/scripts/migrate.js`). Run **once** per environment unless you add new migration files (re-running the current SQL will fail if tables already exist).
- **`db:seed:prod`** creates/updates the admin user from **`ADMIN_USERNAME`** (or `ADMIN_EMAIL` or default `admin`) and **`ADMIN_PASSWORD`** (min 8 characters).

## 5. Health check

`railway.toml` sets **`healthcheckPath = "/api/greeting"`**.  
Public URL will be like `https://<service>.up.railway.app/api/greeting`.

## 6. Frontend (Vite / Vercel / elsewhere)

Point the browser at the same API host for `/api`:

```env
VITE_API_URL=https://your-service.up.railway.app
```

No trailing slash. If the site is served from the **same origin** as the API (unusual for static+Vercel), you can omit `VITE_API_URL` and use relative `/api` only when both are on one domain.

## 7. CORS

The API uses `cors({ origin: true })`, so browser calls from your marketing site origin are allowed. No extra Railway setting for that.

## Troubleshooting

| Issue | Check |
|-------|--------|
| Build fails on `pnpm` / `tsc` not found | Root directory must be repo root; `packageManager` in root `package.json` helps Nixpacks pick pnpm. If logs show **`tsc` is not recognized**, Railway had `NODE_ENV=production` during install — use the `NODE_ENV=development` prefix in `railway.toml` (already set in this repo). |
| 502 / app crashes | Logs in Railway; confirm `DATABASE_URL` and that migrate has been run. |
| Admin login 404 | `JWT_SECRET` set and service redeployed after adding it. |
| Contact always fails | `SMTP_*` and `NODE_ENV=production` behavior — see `processContactPost.ts`. |
