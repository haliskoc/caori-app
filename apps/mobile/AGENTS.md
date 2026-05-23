# apps/mobile — AGENTS.md

**Architecture**: Expo SDK 54 + React Native 0.81. Local-first, offline-capable. No cloud sync.

## OVERVIEW

21 screens, 5 bottom tabs, 10 stack routes. Context-based state (AppProvider + TrackerProvider). SQLite local DB. Shared types/utils/i18n from `@calai/shared`.

## STRUCTURE

```
src/
├── screens/          # 21 screen components (flat, no subdirs)
├── components/       # features/ (widgets) + ui/ (primitives)
├── lib/              # 22 flat service modules + food/ subdir
├── db/               # SQLite (connection, schema, init)
├── navigation/       # AppNavigator.tsx (React Navigation)
└── providers/        # AppProvider (auth) + TrackerProvider (data)
```

## WHERE TO LOOK

| Task | File | Notes |
|------|------|-------|
| Entry point | `App.tsx` | Font loading → providers → navigator |
| Routing | `src/navigation/AppNavigator.tsx` | Bottom tabs + native stacks |
| All screens | `src/screens/` | 21 files, named exports |
| Auth (local) | `src/lib/auth.ts` | SHA256 + SecureStore, guest mode |
| State | `src/providers/TrackerProvider.tsx` | 446 lines, entries/goals/settings |
| DB | `src/db/` | SQLite via expo-sqlite, no ORM |
| Theme | `src/lib/theme.ts` | Light/dim modes, 4 accent colors |
| NLP parser | `src/lib/voice.ts` | Turkish/English quick entry commands |
| Report engine | `src/lib/report.ts` | 632 lines, aggregates + insights |

## SCREENS (21)

| Screen | Tab/Stack | Purpose |
|--------|-----------|---------|
| `DashboardScreen` | Tab 1 | Daily summary, quick-add, widgets |
| `AddEntryScreen` | Tab 2 | Food/water/activity/sleep forms |
| `HistoryScreen` | Tab 3 | Filtered entry log, undo delete |
| `ReportScreen` | Tab 4 | Analytics, CSV/PDF export |
| `SettingsScreen` | Tab 5 | Theme, locale, flags, sub-pages |
| `ProfileScreen` | Stack | User profile, stats |
| `GoalsScreen` | Stack | Goal targets |
| `MeasurementsScreen` | Stack | Body measurements |
| `FoodLibraryScreen` | Stack | Custom food catalog |
| `FoodSearchScreen` | Stack | Barcode + OpenFoodFacts search |
| `SleepScreen` | Stack | Sleep tracking |
| `ChatScreen` | Stack | Rule-based AI assistant |
| `OnboardingScreen` | Stack | New user profile wizard |
| `LoginScreen` | Stack | Email login |
| `RegisterScreen` | Stack | Email registration |
| `PricingScreen` | Stack | Subscription plans |
| `PremiumScreen` | Stack | Premium activation |
| `HelpScreen` | Stack | Help center |
| `FaqScreen` | Stack | FAQ |
| `ContactScreen` | Stack | Contact form |
| `LegalScreen` | Stack | Terms/privacy/KVKK |

## PROVIDER TREE

```
App.tsx
└── GestureHandlerRootView
    └── SafeAreaProvider
        └── AppProvider (auth context)
            └── TrackerProvider (data context)
                └── AppNavigator (tabs + stacks)
```

**AppProvider** initializes DB on mount, restores session from SecureStore, creates guest user if no session.

**TrackerProvider** is monolithic: entries, goals, measurements, foodLibrary, auditLog, theme, daily/weekly summaries. All mutation functions persist to SQLite → update local state → optionally audit.

## DATABASE

- Engine: `expo-sqlite` (async + sync with fallback)
- File: `calai.db`
- Tables: `users`, `goals`, `entries`, `food_library`, `profiles`, `user_settings`, `audit_log`, `measurements`, `sleep_logs`, `integrations`
- No ORM — raw SQL via `run()`, `all()`, `getFirst()`
- Migration: `CREATE TABLE IF NOT EXISTS` + `ALTER TABLE ADD COLUMN` with try/catch
- All tables have `user_id` with `FOREIGN KEY ... ON DELETE CASCADE`

## AUTH (LOCAL, NOT AUTH0)

- **Registration**: Email + password → SHA256 with random salt → SQLite
- **Login**: Fetch user by email, compare hashes
- **Session**: `expo-secure-store` (fallback AsyncStorage)
- **Guest mode**: Auto-create guest user on first launch
- **No Auth0** — auth is entirely local

## KEY DIFFERENCES FROM WEB

| Aspect | Mobile | Web |
|--------|--------|-----|
| DB | Local SQLite | Neon PostgreSQL (Drizzle) |
| Auth | Local email/SHA256 | Auth0 |
| UI | RN StyleSheet | Tailwind CSS v4 |
| AI | Rule-based local | Groq + Gemini APIs |
| Backend | None (all local) | Next.js API routes |
| Cloud sync | Not supported | Auth0 → Neon |
| Camera | Barcode scanning | N/A |

## CONVENTIONS

- **Screen files**: Named export matching filename (`export function DashboardScreen`)
- **State mutations**: Always persist to DB first, then update local state
- **New features**: Add screen in `screens/`, register in `AppNavigator.tsx`, add lib module in `lib/`
- **Theme access**: `const { theme } = useTracker()` — returns `AppTheme` with ~20 tokens
- **Translations**: `t("Turkish key")` from `@calai/shared/i18n`

## ANTI-PATTERNS

- **Don't introduce new state management** — extend TrackerProvider
- **Don't call web API routes from mobile** — no network backend in this version
- **Don't add Auth0 to mobile** — local auth is the established pattern
- **Don't nest screens in subdirectories** — keep the 21-screen flat structure
- **Don't bypass SQLite persistence** in state mutations

## MOBILE-ONLY FEATURES

- Camera/barcode scanning (expo-camera)
- Push notifications (expo-notifications)
- Speech synthesis (expo-speech)
- File system access (expo-file-system, expo-document-picker)
- Haptic feedback (expo-haptics)
- Secure storage (expo-secure-store)
