# apps/web/src/lib — AGENTS.md

**The brain of the web app.** 7 subdomains, 31 files. All business logic, auth, data access, AI, and integrations live here.

## STRUCTURE

```
lib/
├── ai/               # Groq + Google Gemini integration (1 file)
├── auth/             # Auth0, API auth, security (3 files)
├── core/             # Engine: flags, i18n, proxy, storage, theme, types, utils (7 files)
├── database/         # Drizzle schema + DB client + audit (3 files)
├── features/         # Service modules: activity, csv, measurements, report, sleep, voice/ (7+1)
├── food/             # Food data: USDA, FoodRepo, OpenFoodFacts, library (6 files)
└── integrations/     # Brave Search, Google Fit (3 files)
```

## WHERE TO LOOK

| Task | File | Notes |
|------|------|-------|
| DB schema | `database/schema.ts` | Drizzle ORM — 8+ tables, must follow conventions |
| DB client | `database/db.ts` | `getDb()` + `ensureUser()` |
| API auth | `auth/api-auth.ts` | `getApiPrincipal()` — used by all route handlers |
| Auth0 config | `auth/auth0.ts` | Session management, Google + Apple |
| Proxy middleware | `core/proxy.ts` | Auth0 middleware for `/auth/*`; app pages local-first |
| i18n engine | `core/i18n.ts` | Wraps shared i18n with localStorage + dynamic fetch |
| Storage layer | `core/storage.ts` | localStorage keys prefixed `calai.` |
| Types proxy | `core/types.ts` | Re-exports `@calai/shared` — add new types upstream |
| Utils proxy | `core/utils.ts` | Re-exports `@calai/shared` + normalization |
| Feature flags | `core/flags.ts` | Read/write feature flags |
| Theme | `core/theme.ts` | Theme toggling (note: `applyTheme` is a stub) |
| Report engine | `features/report.ts` | 691 lines — aggregates, trends, insights |
| CSV export | `features/csv.ts` | CSV generation for entries |
| Activity service | `features/activity.ts` | Activity entry logic |
| Sleep service | `features/sleep.ts` | Sleep entry CRUD logic |
| Measurements | `features/measurements.ts` | Body measurement CRUD |
| Profile service | `features/profile.ts` | User profile operations |
| Reminders | `features/reminders.ts` | Reminder scheduling logic |
| Voice chat | `features/voice/voice-chat.ts` | Web Speech API wrappers |
| Food library | `food/food-library.ts` | Custom food catalog CRUD |
| USDA | `food/usda.ts` | USDA FoodData Central API |
| FoodRepo | `food/foodrepo.ts` | FoodRepo API integration |
| OpenFoodFacts | `food/off.ts` | OFF product lookup + barcode |
| Google Fit | `integrations/google-fit.ts` | OAuth + data sync |
| Brave Search | `integrations/brave-search.ts` | Web search integration |
| AI service | `ai/ai.ts` | Groq/Gemini provider abstraction |
| Security | `auth/security.ts` | CSRF, input sanitization |

## DOMAIN-BY-DOMAIN CONVENTIONS

### `database/`
- **No `pgEnum`** — use `text()` + runtime validation (removed for Neon stability)
- Migrations via `drizzle-kit` (`pnpm db:generate`, `pnpm db:push`)
- Schema at `database/schema.ts` — read it before designing new tables
- Tables use `userId` foreign key to `users.id` with `ON DELETE CASCADE`

### `auth/`
- **`api-auth.ts`**: `getApiPrincipal()` — session cookie or Bearer JWT; returns null when unauthenticated
- **`auth0.ts`**: Session management. Google + Apple connections only.
- **`security.ts`**: CSRF via `isSameOrigin()`, input sanitization helpers

### `core/`
- **`types.ts`** + **`utils.ts`**: Proxy re-exports from `@calai/shared`. Add new shared types to `packages/shared/src/types/`, not here.
- **`proxy.ts`**: Runs Auth0 middleware on all matched routes (handles `/auth/login`, callback, logout). App pages stay public for local-first use.
- **`storage.ts`**: All localStorage keys are prefixed `calai.` (e.g., `calai.entries.v1`). Version keys (`.v1`, `.v2`) for schema migration.
- **`i18n.ts`**: Wraps shared i18n. Locales loaded from `/locales/{code}.json` at runtime. localStorage persistence of selected locale.
- **`flags.ts`**: Feature flags read from `user_settings.flags` JSONB. Use `updateFlags()` in TrackerProvider.
- **`theme.ts`**: Note: `applyTheme()` is a no-op stub (removes data attributes, doesn't apply theme).

### `features/`
- Each file is a self-contained service module
- `report.ts` is the most complex (691 lines) — buildReportData returns full `ReportData`
- `voice/voice-chat.ts` uses Web Speech API (SpeechRecognition + SpeechSynthesis)

### `food/`
- Three external APIs: USDA (FDC API), FoodRepo, OpenFoodFacts
- `food-library.ts` for user's custom food catalog
- `food-utils.ts` for shared food utility functions
- `food-sources.ts` for food search aggregator

### `integrations/`
- Google Fit: OAuth flow under `/api/integrations/google/`
- Brave Search: Used by AI chat for web search (rate-limited per user)

### `ai/`
- Groq SDK for fast inference, Google Gemini for complex tasks
- System prompt constraints in `/api/v1/chat/route.ts` — must return JSON only

## ANTI-PATTERNS

- **Don't add `pgEnum`** — use `text()` columns instead
- **Don't add types here** — they go in `packages/shared/src/types/`
- **Don't bypass the proxy** when adding middleware logic
- **Don't write directly to localStorage** — go through TrackerProvider
- **Don't add new state management** — extend TrackerProvider context
- **Don't edit `next-env.d.ts`** — auto-generated
- **Don't skip localStorage fallback** on API failure — dual storage is intentional

## KEY FILES BY SIZE

| File | Lines | Role |
|------|-------|------|
| `features/report.ts` | 691 | Report computation engine |
| `features/voice/voice-chat.ts` | 328 | Speech recognition/synthesis |
| `database/schema.ts` | 190 | All DB table definitions |
| `core/i18n.ts` | ~150 | i18n wrapper with persistence |
| `core/storage.ts` | ~100 | localStorage CRUD layer |
