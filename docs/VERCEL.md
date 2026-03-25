# Deploying on Vercel

## Project root

Either layout works:

1. **Repository root** (root `vercel.json`): static output `apps/web/dist`, serverless entry `api/contact.ts`.
2. **`apps/web` as Vercel Root Directory** (`apps/web/vercel.json`): static output `dist`, serverless entry **`apps/web/api/contact.ts`** (re-exports the same handler from `apps/api`).

In both cases, `POST /api/contact` runs on Vercel and needs mail-related env vars **on that Vercel project** (Railway env does not apply here unless `VITE_API_URL` points the browser at Railway).

## Environment variables (Vercel → Settings → Environment Variables)

Set production values to match what you need for `processContactPost` (see `apps/api/.env.example`):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | **Preferred on Vercel** — HTTPS sending (set with `RESEND_FROM_EMAIL`); avoids SMTP egress issues |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `no-reply@yourdomain.com` or `Name <no-reply@…>` |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | SMTP fallback when `RESEND_API_KEY` is unset |
| `SMTP_SECURE` | `true` if using port 465 |
| `SMTP_REQUIRE_TLS` | For port 587, `false` only if STARTTLS breaks your host (default: require TLS) |
| `CONTACT_TO_EMAIL` | Inbox for submissions |
| `CONTACT_FROM_EMAIL` | Optional “From” for internal notification (SMTP / Resend fallback addressing) |
| `AUTO_REPLY_FROM_EMAIL` | Optional “From” for customer auto-reply |
| `SITE_PUBLIC_URL` | Your live site URL (defaults for several behaviors) |
| `CONTACT_EMAIL_PUBLIC_ORIGIN` | **Recommended** if `SITE_PUBLIC_URL` on this project is the API host: set to the **static site** origin (e.g. `https://baterino.com`) so logo/icons in the confirmation email resolve |
| `SOCIAL_FACEBOOK_URL`, `SOCIAL_LINKEDIN_URL` | Optional |

### Mail fails / “sender” rejected

**Resend:** verify the domain and sender in the Resend dashboard; check function logs for `[contact] Resend send failed`.

**SMTP:** Most providers only allow **From** addresses that match the authenticated account or a verified alias.

1. Leave `CONTACT_FROM_EMAIL` and `AUTO_REPLY_FROM_EMAIL` unset so both use `SMTP_USER`, **or** set verified addresses.
2. Check Vercel **function logs** for send errors.
3. Port **587**: use `SMTP_SECURE=false` (or omit); port **465**: set `SMTP_SECURE=true`.

Do **not** set `VITE_API_URL` if the site and `/api` are on the same Vercel deployment (default).

## Local dev

`pnpm dev` still runs the Express API on port 3001 with Vite proxying `/api` to it.
