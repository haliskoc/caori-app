# Cal AI MVP

Manual-first health tracker with optional Auth0 login and Neon-backed sync.

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run dev
```

## Environment Variables

Create `.env.local` based on `.env.example`:

- `AUTH0_SECRET`
- `AUTH0_BASE_URL` (ex: `http://localhost:3000`)
- `AUTH0_ISSUER_BASE_URL`
- `AUTH0_CLIENT_ID`
- `AUTH0_CLIENT_SECRET`
- `DATABASE_URL` (Neon pooled connection string recommended for Vercel)

## Auth0 Setup (Google + Apple)

1. Create a **Regular Web App** in Auth0.
2. Add callback URLs:
   - `http://localhost:3000/api/auth/callback`
   - `https://YOUR_DOMAIN/api/auth/callback`
3. Add logout URLs:
   - `http://localhost:3000`
   - `https://YOUR_DOMAIN`
4. Enable **Google** and **Apple** connections under Authentication > Social.

## Data Modes

- Logged out: localStorage only.
- Logged in: Neon Postgres via `/api/v1/*` routes.
- Settings page includes a **"Cihazdaki kayıtları taşı"** button for migration.

## Database

Schemas live in `src/lib/schema.ts`. Run:

```bash
npm run db:push
```

## Deploy

- Frontend: Vercel
- Database: Neon
- Auth: Auth0

Set all environment variables in Vercel project settings.
