# Mobile App Cloning - Calmet (Cal AI) - Master Todo List

## Project Overview

**Application Name**: Calmet (Cal AI)
**Type**: Health & Fitness Tracking Application (Calorie Counter & Wellness Tracker)
**Primary Language**: Turkish
**Current Tech Stack**: Next.js 16 + React 19 + Auth0 + Drizzle ORM + Neon PostgreSQL
**Target**: Convert to Expo/React Native mobile app

---

## 1. Discovery Phase

### 1.1 Project Structure Analysis
- [x] Repository structure analyzed (Monorepo with Turborepo)
- [x] Main app location: `/apps/web/`
- [x] Shared package: `/packages/shared/`
- [x] Environment configuration files identified

### 1.2 Technology Stack Identification

**Frontend:**
- [x] Framework: Next.js 16.1.1 (App Router)
- [x] React: 19.2.3
- [x] Styling: Tailwind CSS v4 with custom design tokens
- [x] State Management: React Context (TrackerProvider)
- [x] Icons: Lucide React
- [x] Charts: Recharts

**Backend:**
- [x] Database: Neon PostgreSQL (serverless)
- [x] ORM: Drizzle ORM 0.45.1
- [x] Authentication: Auth0 (@auth0/nextjs-auth0 v4.14.0)
- [x] API Routes: Next.js API routes under `/api/v1/`

**Third-Party Services:**
- [x] Auth0: Authentication (Google + Apple connections)
- [x] Open Food Facts API: Food/barcode search
- [x] Google Generative AI: AI features (optional flag)
- [x] Google Fit: Integration (optional flag)

**Build Tools:**
- [x] Turborepo: Monorepo management
- [x] pnpm: Package manager (v9.14.0)
- [x] TypeScript: v5.6.0

### 1.3 Domain Mapping

**Core Domains:**
1. **Authentication** (`/lib/auth/`, `/app/api/v1/mobile-auth/`)
2. **Entries Tracking** (`/app/api/v1/entries/`)
3. **Goals Management** (`/app/api/v1/goals/`)
4. **User Profile** (`/app/api/v1/profile/`)
5. **Settings & Preferences** (`/app/api/v1/settings/`)
6. **Food Library** (`/app/api/v1/food-library/`)
7. **Reports & Analytics** (`/app/api/v1/report/`)
8. **Measurements** (`/app/api/v1/measurements/`)
9. **Sleep Tracking** (`/app/api/v1/sleep/`)

---

---

## 2. Feature Inventory

### P0 Critical Features (Must Have)
- [ ] User authentication (Auth0)
- [ ] Food entry tracking (manual + search + barcode)
- [ ] Water intake tracking
- [ ] Activity/exercise tracking
- [ ] Daily summary dashboard
- [ ] Goal setting and tracking
- [ ] Weekly progress charts
- [ ] Profile management
- [ ] Settings (theme, reminders)
- [ ] Data persistence (local + cloud sync)

### P1 Important Features
- [ ] Voice entry (speech-to-text for logging)
- [ ] Food library (custom items + favorites)
- [ ] Barcode scanning with camera
- [ ] History view with filters
- [ ] Sleep tracking
- [ ] Body measurements tracking
- [ ] Weekly reports
- [ ] Share reports (via link/token)
- [ ] Onboarding flow
- [ ] Reminder notifications
- [ ] Offline mode with local storage

### P2 Nice-to-Have Features
- [ ] AI chat assistant
- [ ] Google Fit integration
- [ ] AI visual food recognition
- [ ] Premium features
- [ ] Advanced analytics
- [ ] CSV export/import

---

## 3. Screen Inventory

### Main Screens (Web Path → Mobile)
1. **Landing** (`/app/page.tsx`)
   - Hero section, features, login/signup
   - Mobile: Simplified landing

2. **Dashboard** (`/app/dashboard/page.tsx`)
   - Daily summary, quick add, water tracking, weekly charts
   - Mobile: Main home screen

3. **Add Entry** (`/app/add-entry/page.tsx`)
   - Tabs: Food, Water, Activity
   - Voice input, barcode scanner, food library
   - Mobile: Core functionality

4. **History** (`/app/history/page.tsx`)
   - Entry list, filters, search, edit/delete
   - Mobile: List view with swipe actions

5. **Profile** (`/app/profile/page.tsx`)
   - Personal info, body measurements, goals
   - Mobile: Form-based screens

6. **Settings** (`/app/settings/page.tsx`)
   - Theme, reminders, feature flags, data management
   - Mobile: Settings screens

7. **Report** (`/app/report/page.tsx`)
   - Weekly/monthly reports, progress charts, share
   - Mobile: Report view with export

8. **Sleep** (`/app/sleep/page.tsx`)
   - Sleep log entries, quality trends
   - Mobile: Sleep tracking screen

---

## 4. UI / UX Analysis

### Design Tokens

**Colors:**
```css
--background: #fffcf9 (warm off-white)
--surface: #ffffff
--ink: #1a1c1e (near black)
--muted: #64748b (slate gray)
--accent: #10b981 (emerald green - PRIMARY)
--accent-strong: #059669
--accent-soft: #d1fae5
```

**Typography:**
- Font: "Outfit", sans-serif
- Mono: "Space Mono"

**Spacing:** 4px grid system
**Border Radius:** 12px (xl), 16px (2xl), 9999px (full)

---

## 5. API Endpoints

**Authentication:**
- `POST /api/v1/mobile-auth` - Mobile token auth
- `GET /api/v1/user` - User info

**Entries:**
- `GET /api/v1/entries` - List entries
- `POST /api/v1/entries` - Create entry
- `DELETE /api/v1/entries/[id]` - Delete entry
- `PUT /api/v1/entries/[id]` - Update entry
- `POST /api/v1/entries/import` - Batch import

**Goals:**
- `GET /api/v1/goals` - Get goals
- `PUT /api/v1/goals` - Update goals

**Settings:**
- `GET /api/v1/settings` - Get settings
- `PUT /api/v1/settings` - Update settings

**Profile:**
- `GET /api/v1/profile` - Get profile
- `PUT /api/v1/profile` - Update profile

**Food Library:**
- `GET /api/v1/food-library` - List custom foods
- `POST /api/v1/food-library` - Add to library
- `PUT /api/v1/food-library/[id]` - Update
- `DELETE /api/v1/food-library/[id]` - Delete

**Food Search:**
- `GET /api/v1/food-search?q=` - Search Open Food Facts
- `GET /api/v1/food-search?barcode=` - Barcode lookup

**Measurements:**
- `GET /api/v1/measurements` - List
- `POST /api/v1/measurements` - Add
- `DELETE /api/v1/measurements/[id]` - Delete
- `POST /api/v1/measurements/import` - Import

**Sleep:**
- `GET /api/v1/sleep` - List
- `POST /api/v1/sleep` - Add
- `DELETE /api/v1/sleep/[id]` - Delete

**Reports:**
- `GET /api/v1/report` - Generate report
- `GET /api/v1/report/share` - Get share link
- `GET /api/v1/share/[token]` - View shared report

---

## 6. Data Models

**Entry Types:**
```typescript
type Entry = FoodEntry | WaterEntry | DrinkEntry | ActivityEntry | SleepEntry

interface FoodEntry {
  id: string;
  type: "food";
  name: string;
  calories: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  amountG?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  timestamp: string;
}
```

**Goals:**
```typescript
interface Goals {
  waterGoalMl: number;
  calorieGoal: number;
  activityGoalMin: number;
  mealGoalCount: number;
  weightGoalKg: number;
  proteinGoalG: number;
  carbsGoalG: number;
  fatGoalG: number;
  sleepGoalHours: number;
}
```

---

## 7. Mobile Navigation Structure

**Proposed Stack:**
```
Stack Navigator (Main)
├── Auth Stack (when not logged in)
│   ├── Landing
│   ├── Login
│   └── Onboarding
└── App Tabs (when logged in)
    ├── Dashboard (Home)
    ├── Add Entry (+)
    ├── History (List)
    ├── Reports (Chart)
    └── Profile (User)
        └── Settings (modal)
```

---

## 8. Offline Strategy

**Web:** localStorage fallback, manual import button
**Mobile:**
- AsyncStorage for offline data
- Sync queue for failed requests
- Background sync on connection restore
- Server-wins conflict resolution

---

## 9. Implementation Plan (Sprints)

### Sprint 0: Foundation (Week 1)
- [ ] Initialize Expo project with Expo Router
- [ ] Setup TypeScript and Tailwind (NativeWind)
- [ ] Create navigation structure
- [ ] Implement Auth0 authentication
- [ ] Create base UI components
- [ ] Setup API client layer

### Sprint 1: Core Screens (Week 2-3)
- [ ] Implement TrackerProvider
- [ ] Dashboard screen
- [ ] Add Entry screen (all tabs)
- [ ] Settings screen
- [ ] Profile screen
- [ ] Local storage (AsyncStorage)
- [ ] API integration

### Sprint 2: Enhanced Features (Week 4-5)
- [ ] History screen with filters
- [ ] Weekly charts
- [ ] Food library
- [ ] Barcode scanning
- [ ] Voice input
- [ ] Sleep tracking
- [ ] Measurements
- [ ] Offline mode

### Sprint 3: Polish (Week 6)
- [ ] Reports screen
- [ ] Share functionality
- [ ] Onboarding
- [ ] Reminder notifications
- [ ] Error handling
- [ ] Performance optimization

### Sprint 4: Launch (Week 7)
- [ ] Testing (unit, E2E)
- [ ] Crash reporting
- [ ] Analytics
- [ ] App store submission
- [ ] Beta testing
- [ ] Bug fixes

---

## 10. Open Questions

1. **Auth0**: React Native SDK or custom token flow?
2. **Barcode**: expo-camera or native module?
3. **Charts**: react-native-chart-kit, victory-native, or react-native-gifted-charts?
4. **Sync**: React Query or custom queue?
5. **Notifications**: OneSignal or expo-notifications?
6. **Analytics**: Mixpanel, Amplitude, or Firebase?
7. **Crash reporting**: Sentry or Crashlytics?
8. **Payments**: RevenueCat or Stripe (if needed)?
9. **Deep linking**: Implementation approach?
10. **E2E**: Detox or Expo EAS?

---

## 11. Key Files Reference

**Web App:** `/apps/web/src/`
**Shared:** `/packages/shared/src/`
**API:** `/apps/web/src/app/api/v1/`
**Components:** `/apps/web/src/components/`
**Pages:** `/apps/web/src/app/*/page.tsx`

**Files to Port:**
- TrackerProvider: `/apps/web/src/components/providers/tracker-provider.tsx`
- Types: `/packages/shared/src/types/index.ts`
- Utils: `/packages/shared/src/utils/index.ts`
- Storage: `/apps/web/src/lib/core/storage.ts`
- Theme: `/apps/web/src/lib/core/theme.ts`

---

## Original Turkish TODO (Preserved for Reference)

## Faz 1 - Proje Iskeleti ve Temel Kurulum
- [ ] Expo/React Native kurulumu, navigation (tab + stack)
- [ ] Tema altyapisi (light/dim), tasarim tokenlari
- [ ] Ortak tipler ve shared paket baglantisi
-[  ] dil altyapısının ayarlanması ve güncellenmesi her bölümde detaylı bir biçimde
-[  ]  local db yapılandırması

## Faz 2 - Kimlik ve Veri Modu
- [ ] Auth0 giris (Google + Apple)(şu an local olarak olsun auth0 entegrasyonu yeri uygulamaya has log in erkanı olsun tasarımı detaylı olsun arkaplan resmi olarak spor yaapn isnanlar olsun)
- [ ] Local vs bulut (Neon) veri modu, oturum kontrolu(bulut entegrasyonu altyaoısnı kur ileriki adımlarda bulut entegrasyonu olacak suppabase ondan dolatyı yerel etnegrasyon )
- [ ] Cihazdaki kayitlari buluta tasima(next)

## Faz 3 - Onboarding ve Profil Temelleri
- [ ] Onboarding anketi (hedef, spor seviyesi, ekipman, sakatlik, beklenti)
- [ ] Profil ekrani ve profil tamamlama yuzdesi

## Faz 4 - Cekirdek Modeller ve Local Storage
- [ ] Food/Drink/Water/Activity/Sleep/Measurement modelleri
- [ ] Local storage load/save altyapisi

## Faz 5 - Kayit Ekleme: Besin ve Icecek
- [ ] Manuel besin kaydi (kalori + makro + ogun tipi)
- [ ] Icecek kaydi (miktar, kalori, makro)

## Faz 6 - Kayit Ekleme: Su ve Aktivite
- [ ] Su kaydi ve hizli butonlar
- [ ] Aktivite kaydi (tur + sure + tahmini kalori)

## Faz 7 - Kayit Ekleme: Uyku ve Olcumler
- [ ] Uyku kaydi (baslangic/bitis, sure, kalite, not)
- [ ] Olcum kaydi (kilo/bel/kalca/gogus/vucut yag)

## Faz 8 - Dashboard ve Gunluk Ozet
- [ ] Gunluk ozet: kalori giris/cikis/net
- [ ] Su hedef halkasi, makro ozet kartlari
- [ ] Uyku ozeti widget

## Faz 9 - Gecmis ve Duzenleme
- [ ] Gecmis liste (tarih bazli gruplama)
- [ ] Filtreler, arama, siralama
- [ ] Duzenleme/silme ve undo
-[  ]  local db düzenlenmesi ve kontorlü

## Faz 10 - Ayarlar ve Veri Yonetimi
- [ ] Hedefler (kalori, su, aktivite, ogun, kilo, makrolar)
- [ ] Dil secimi (tr/en/es/fr/ru/pt)
- [ ] Hatirlatici ayarlari ve bildirim izni
- [ ] CSV ice/disa aktarim

## Faz 11 - Raporlama ve Paylasim
- [ ] Rapor: toplamlari, ortalamalar, haftalik sapma, gunluk detaylar
- [ ] Istatistikler: uyum skoru, aktif gun, top yiyecek/aktivite
- [ ] Grafik setleri ve olcum trendleri
- [ ] Rapor paylasimi (token, anonim, sureli)
- [ ] PDF/Excel export

## Faz 12 - Gelismis Ozellikler
- [ ] AI chat asistani (analiz, ogun oneri, besin bilgisi, loglama)
- [ ] Sesli ozellikler (speech-to-text, text-to-speech)
- [ ] Barkod tarama ve food search (OFF/FoodRepo/USDA)
- [ ] Yerel urun kutuphanesi (favori, barkod, gorsel)
- [ ] Entegrasyonlar: Health Connect, Apple Health, Garmin, Fitbit, Oura
- [ ] Google Fit entegrasyonu (webde pasif)
- [ ] Komut paleti hizli aksiyonlar
- [ ] Premium akisi + Help/FAQ/Contact/Legal sayfalari

---

**Last Updated:** 2025-01-21
