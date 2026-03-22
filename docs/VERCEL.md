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
| `SMTP_REQUIRE_TLS` | For port 587, `false` only if STARTTLS breaks your host (default: require TLS) |
| `CONTACT_TO_EMAIL` | Inbox for submissions |
| `CONTACT_FROM_EMAIL` | Optional “From” for internal notification; defaults to `SMTP_USER` |
| `AUTO_REPLY_FROM_EMAIL` | Optional “From” for customer auto-reply; defaults to `CONTACT_FROM_EMAIL`, then `SMTP_USER` |

### Mail fails / “sender” rejected

Most SMTP providers only allow **From** addresses that match the authenticated account or a **verified sender/alias** on that account.

1. Leave `CONTACT_FROM_EMAIL` and `AUTO_REPLY_FROM_EMAIL` unset so both use `SMTP_USER`, **or** set them to addresses your provider has verified for that SMTP login.
2. Check Vercel (or Railway) **function logs** for `[contact] internal sendMail failed` or `auto-reply sendMail failed` — the message often includes the SMTP error (e.g. 535, 553).
3. Port **587**: use `SMTP_SECURE=false` (or omit); port **465**: set `SMTP_SECURE=true`.
| `SITE_PUBLIC_URL` | Your live URL, no trailing slash (email logo links) |
| `SOCIAL_FACEBOOK_URL`, `SOCIAL_LINKEDIN_URL` | Optional |

Do **not** set `VITE_API_URL` if the site and `/api` are on the same Vercel deployment (default).

## Local dev

`pnpm dev` still runs the Express API on port 3001 with Vite proxying `/api` to it.
