# Deploying API to Railway

## 1. Create Railway Project

1. Go to [railway.app](https://railway.app) and create a project
2. Add a **PostgreSQL** database (New → Database → PostgreSQL)
3. Add your API as a service (from GitHub or local)

## 2. Environment Variables

In your API service, add these variables (Railway → your service → Variables):

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Auto-filled when you add Postgres. Or copy from Postgres service → Connect → Postgres URL |
| `JWT_SECRET` | Generate with `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Admin login email (e.g. admin@baterino.com) |
| `ADMIN_PASSWORD` | Admin login password |

## 3. Build & Deploy

Railway will run `pnpm install` and your build command. Ensure your `package.json` has:

```json
{
  "scripts": {
    "build": "prisma generate && tsc",
    "start": "node dist/index.js"
  }
}
```

## 4. Run Migrations

After first deploy, run migrations to create tables:

```bash
# Set DATABASE_URL to your Railway Postgres URL, then:
cd apps/api
npx prisma migrate deploy
pnpm db:seed
```

Or add a one-off migration step in Railway's deploy.

## 5. Seed Admin User

```bash
DATABASE_URL="your-railway-postgres-url" pnpm db:seed
```

This creates the admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
