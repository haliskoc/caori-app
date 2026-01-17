# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cal AI is a health and fitness tracking application with a **manual-first, optional cloud sync** architecture. Users can track calories, water intake, and activities entirely offline using localStorage, with optional Auth0 authentication for cloud synchronization via Neon PostgreSQL.

The app is primarily localized in Turkish.

## Development Commands

```bash
# Development
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database (Drizzle ORM)
npm run db:generate  # Generate migration files from schema changes
npm run db:push      # Push schema directly to Neon database (skips migration files)
```

## Architecture

### Dual Storage Strategy

The application operates in two modes, determined by authentication state:

- **Local Mode** (logged out): All data stored in localStorage keys prefixed with `calai.`
- **Remote Mode** (logged in): Data synced to Neon Postgres via `/api/v1/*` endpoints

Key behaviors:
- Remote mode gracefully falls back to localStorage on API failures
- On login, local entries are auto-imported to cloud in batches (200 per batch)
- On reconnection, pending local entries sync to cloud
- Settings page has "Cihazdaki kayıtları taşı" button to manually trigger import

### Provider Hierarchy

```
Auth0Provider (authentication)
└── LocaleProvider (i18n - Turkish)
    └── TrackerProvider (central state management)
        └── AppShell (layout & navigation)
```

**TrackerProvider** (`src/components/tracker-provider.tsx`) is the single source of truth for:
- Entries (food, water, activity)
- Goals (calories, water, activity, meals, weight)
- Settings (theme, reminders, feature flags)
- Audit log (user action tracking)

### Data Flow

1. **Adding entries** (`addFood`, `addWater`, `addActivity`):
   - Remote mode: POST to `/api/v1/entries`, then call `loadRemoteData()`
   - On API failure: Falls back to localStorage
   - Local mode: Directly update state, persisted via useEffect

2. **Loading remote data** (`loadRemoteData`):
   - Fetches entries, goals, settings, and audit log in parallel
   - Merges remote entries with local entries (remote takes precedence)
   - Normalizes all entries for consistency

3. **Entry normalization** (`normalizeEntry`):
   - Validates timestamps, defaults to ISO string if invalid
   - Ensures valid enums (mealType, activityType)
   - Sanitizes numeric values with `Number.isFinite()` checks

### Database Schema

Core tables (defined in `src/lib/schema.ts`):
- `users` - Auth0 user_id reference
- `entries` - All health entries (type discriminates: food/water/activity)
- `goals` - User's daily targets
- `profiles` - User profile information
- `user_settings` - Preferences stored as JSONB (theme, reminder, flags)
- `food_library` - Custom food catalog with nutrition data
- `google_fit_tokens` - OAuth tokens for Google Fit integration
- `audit_log` - User action tracking

### API Structure

```
/api/v1/
├── entries/          # CRUD for health entries
│   └── import/       # Batch import endpoint
├── goals/            # User goals (GET/PUT)
├── settings/         # User preferences (GET/PUT)
└── audit/            # Audit log (GET/POST/DELETE)

/api/integrations/
└── google/           # Google Fit OAuth flow
```

All authenticated routes require `credentials: "include"` for session cookies.

### Key Libraries

- **Drizzle ORM**: Database queries with type safety
- **Recharts**: Weekly progress charts on dashboard
- **Auth0 Next.js SDK**: Session management via `useUser()` hook
- **Lucide React**: Icon set

### Entry Types

All entries share base `Entry` type with discriminant `type` field:

```typescript
type Entry = FoodEntry | WaterEntry | ActivityEntry;

interface FoodEntry {
  type: "food";
  name: string;
  calories: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  amountG?: number;  // portion size
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
}

interface WaterEntry {
  type: "water";
  amountMl: number;
}

interface ActivityEntry {
  type: "activity";
  activityType: "walking" | "running" | "gym";
  durationMin: number;
  estimatedCalories: number;
}
```

### Internationalization

Custom i18n system in `src/lib/i18n.ts`. Use `t()` function for translations. All user-facing text should be Turkish.

### Feature Flags

Controlled via `user_settings.flags` JSONB column:
- Enable/disable features without deployment
- Accessed via `updateFlags()` in TrackerProvider

## Environment Setup

Required environment variables (see `.env.example`):

```bash
AUTH0_SECRET=              # 32-byte hex string
APP_BASE_URL=              # e.g., http://localhost:3000
AUTH0_DOMAIN=              # e.g., dev-xxxx.us.auth0.com
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
DATABASE_URL=              # Neon pooled connection string
```

### Auth0 Configuration

Create a **Regular Web App** with:
- Callback URLs: `/auth/callback`
- Logout URLs: `/` (root)
- Enabled connections: Google + Apple

## Deployment

- **Frontend**: Vercel (optimized for Next.js)
- **Database**: Neon (serverless PostgreSQL)
- **Auth**: Auth0

All environment variables must be set in Vercel project settings.
