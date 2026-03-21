# Deploying on Vercel

## Project root

Use the **repository root** as the Vercel project root (where the root `vercel.json` lives), not `apps/web` only. That way:

- The static site is built from `apps/web`
- The **serverless** handler at `api/contact.ts` handles `POST /api/contact`

## Environment variables (Vercel → Settings → Environment Variables)

Add the same values you use in `apps/api/.env` for production:

| Variable | Purpose |
|----------|---------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Send mail (required in production) |
| `SMTP_SECURE` | `true` if using port 465 |
| `CONTACT_TO_EMAIL` | Inbox for submissions |
| `CONTACT_FROM_EMAIL` | Optional “From” for outbound mail |
| `AUTO_REPLY_FROM_EMAIL` | Optional “From” for customer auto-reply |
| `SITE_PUBLIC_URL` | Your live URL, no trailing slash (email logo links) |
| `SOCIAL_FACEBOOK_URL`, `SOCIAL_LINKEDIN_URL` | Optional |

Do **not** set `VITE_API_URL` if the site and `/api` are on the same Vercel deployment (default).

## Local dev

`pnpm dev` still runs the Express API on port 3001 with Vite proxying `/api` to it.
