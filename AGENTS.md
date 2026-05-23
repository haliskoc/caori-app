# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-23T12:42:29Z
**Commit:** 9ea3f8a
**Branch:** main

## OVERVIEW

Cal AI (product: **Calmet**) — Turkish health & fitness tracker. Manual-first, optional cloud sync. pnpm Turborepo monorepo: Next.js 16 web + Expo 54 mobile + shared TypeScript package.

## STRUCTURE

```
.
├── apps/
│   ├── web/            # Next.js 16 App Router (client + API)
│   └── mobile/         # Expo SDK 54 (React Native 0.81)
├── packages/
│   └── shared/         # Shared types, utils, i18n, locales
├── turbo.json          # Turborepo task pipeline
├── pnpm-workspace.yaml
├── tsconfig.base.json  # Strict, ES2022, bundler resolution
└── eslint.config.mjs   # Flat config (ESLint v9), parser only
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Web app pages | `apps/web/src/app/*/page.tsx` | Next.js App Router (23 routes) |
| Web API endpoints | `apps/web/src/app/api/v1/*/route.ts` | 17 route groups, all use `getApiPrincipal()` |
| Web state management | `apps/web/src/components/providers/tracker-provider.tsx` | 1,182 lines — single source of truth |
| Database schema (web) | `apps/web/src/lib/database/schema.ts` | Drizzle ORM + Neon PostgreSQL |
| Mobile screens | `apps/mobile/src/screens/` | 21 screens, React Navigation |
| Mobile state | `apps/mobile/src/providers/TrackerProvider.tsx` | Context-based, 446 lines |
| Mobile local DB | `apps/mobile/src/db/` | SQLite via expo-sqlite |
| Shared types | `packages/shared/src/types/index.ts` | Entry, Goals, ReportData, etc. |
| Translations | `packages/shared/src/locales/` | 6 languages (tr, en, es, fr, ru, pt) |
| AI backend | `apps/web/src/app/api/v1/chat/route.ts` | Groq + Google Gemini |
| Food data sources | `apps/web/src/lib/food/` | USDA, FoodRepo, OpenFoodFacts |
| Comprehensive architecture guide | `apps/web/CLAUDE.md` | 174 lines — read first for web |

## CODE MAP — Key Files

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `TrackerProvider` | Context | `apps/web/src/components/providers/tracker-provider.tsx` | Central state: entries, goals, settings, audit |
| `buildReportData` | Function | `apps/web/src/lib/features/report.ts` | Report engine: aggregates, trends, insights |
| `AppNavigator` | Component | `apps/mobile/src/navigation/AppNavigator.tsx` | All routing: 5 tabs + 10 stacks |
| `initDb` | Function | `apps/mobile/src/db/` | SQLite schema init + migration |
| `t()` | Function | `packages/shared/src/i18n/index.ts` | Translation function (shared) |
| `normalizeEntry` | Function | `apps/web/src/lib/core/utils.ts` | Entry validation/normalization |
| `proxy` | Middleware | `apps/web/src/lib/core/proxy.ts` | Auth0 middleware for `/auth/*` sessions |
| Largest file | Page | `apps/web/src/app/report/page.tsx` | 2,416 lines — report/charts page |

## CONVENTIONS

### Monorepo
- pnpm 9.14.0, `node-linker=hoisted`
- Turborepo v2: `build` depends on `^build`, `lint` depends on `^build`
- Global dependency on `**/.env.*local` (cache busts on env change)
- `@calai/shared` is transpiled by web (`transpilePackages`), bundled by mobile (metro)

### TypeScript
- Strict mode everywhere, ES2022 target, `bundler` moduleResolution
- Web overrides target to ES2017 (Next.js), mobile uses `react-native` JSX
- `@/` alias → `./src/` in both apps
- `noEmit: true` (Next.js/Expo handle compilation)

### Styling
- **Web**: Tailwind CSS v4 (CSS-based config via `@theme inline` in `globals.css`). Emerald accent `#10b981`. Two modes: default + `data-app="true"`. Custom animations (`fade-up`, `float`, `app-rise`). Print styles for A4 reports.
- **Mobile**: React Native `StyleSheet` + `expo-linear-gradient`. Theme system: light/dim modes, 4 accent colors (emerald/amber/rose/sky). Fonts: SpaceGrotesk + Archivo.

### State Management
- React Context only — no Redux, Zustand, or Jotai
- Web: `Auth0Provider` → `LocaleProvider` → `TrackerProvider` → `AppShell`
- Mobile: `AppProvider` (auth) → `TrackerProvider` (data) → `AppNavigator`
- Both apps have a monolithic `TrackerProvider` — extend it for new state, don't introduce new stores

### API Routes (Web)
- All under `/api/v1/*` — Next.js route handlers
- Auth via `getApiPrincipal()` from `lib/auth/api-auth.ts`
- DB via `getDb()` from `lib/database/db.ts`
- Development: real Auth0 sessions when env vars are set; API uses `getApiPrincipal()` session/bearer

### i18n
- Custom system, `t()` function, Turkish-first
- Keys are Turkish sentences, values are localized strings (~1057 keys)
- Locale files in 3 places: `packages/shared/src/locales/`, `apps/web/src/locales/`, `apps/web/public/locales/`
- Web wraps shared i18n with localStorage persistence; mobile wraps with expo-localization

### Data Architecture
- **Dual storage**: localStorage (offline, keys prefixed `calai.`) + Neon PostgreSQL (cloud, Auth0-authenticated)
- **Remote falls back to local** on API failure
- **On login**: local entries auto-imported to cloud in batches of 200
- **Mobile**: SQLite only, no cloud sync in current version
- **Shared types** in `@calai/shared/types` — add new types there, not in app code

## ANTI-PATTERNS (THIS PROJECT)

### Never Do
- **Use DB enums** (`pgEnum`) — removed for Neon migration stability. Use `text()` + runtime validation instead.
- **Add new state management library** — Context pattern is established. Extend `TrackerProvider`.
- **Add types in app code** — they belong in `packages/shared/src/types/`, then re-export. Web proxies via `lib/core/types.ts`.
- **Write directly to localStorage** outside `TrackerProvider`.
- **Skip localStorage fallback** on API calls — dual storage is a deliberate architecture.
- **Edit `next-env.d.ts`** — auto-generated, run `next dev` to regenerate.
- **Re-enable `react-hooks/set-state-in-effect`** — intentionally disabled in ESLint config.

### Be Careful With
- **Auth0 env vars** (`AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_SECRET`, etc.) must be set for login and cloud API sync.
- **The proxy middleware** intercepts ALL requests, not just API routes — non-standard pattern.
- **Locale file duplication** — 3 locations exist, changes must sync or drift will occur.
- **App name mismatch**: package is `calai`, product is `Calmet`.

## COMMANDS

```bash
# Development
pnpm dev:web          # Next.js dev server (:3000)
pnpm dev:mobile       # Expo dev server

# Build & Lint
pnpm build            # turbo run build (topological)
pnpm lint             # turbo run lint

# Database (web only)
pnpm db:push          # Drizzle push to Neon DB
pnpm db:generate      # Generate migration files

# Single workspace
pnpm --filter @calai/web dev
pnpm --filter @calai/mobile lint

# Clean
pnpm clean            # turbo clean + rm node_modules
```

## NOTES

- **No CI/CD configured** — no GitHub Actions, no Docker (was removed in c78c8e7)
- **No tests** — greenfield for testing infrastructure
- **Vercel deployment**: `calmet-app.vercel.app`, env vars in `apps/web/docs/vercel.env.example`
- **Environment**: Required vars include `AUTH0_*`, `DATABASE_URL`, `GROQ_API_KEY`. Dummy dev values committed in `apps/web/.env`.
- **CLAUDE.md** at `apps/web/CLAUDE.md` has in-depth web architecture (174 lines) — read it before touching web code.
- **Turkish-first** documentation: most docs (`ANALIZ.md`, `HATALAR.MD`, `PROJE_RAPORU.md`) are in Turkish.
- **Custom agent dirs**: `.omo/` (orchestration state), `.kiro/` (tooling config), `.codex` (metadata) — not standard, don't delete.
