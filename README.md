# Cal AI Monorepo

Yapay zeka destekli sağlık ve beslenme takip platformu.

## Yapı

- `apps/web`: Next.js tabanlı web uygulaması ve API.
- `apps/mobile`: Expo tabanlı mobil uygulama (Android/iOS).
- `packages/shared`: Web ve mobil arasında paylaşılan tipler, yardımcı fonksiyonlar ve dil dosyaları.

## Kurulum

```bash
# Bağımlılıkları yükle
pnpm install

# Web uygulamasını başlat
pnpm dev:web

# Mobil uygulamayı başlat
pnpm dev:mobile
```

## Teknolojiler

- **Web:** Next.js 15, Tailwind CSS, Lucide React, Recharts.
- **Mobile:** Expo, React Native, NativeWind.
- **Shared:** TypeScript, date-fns, nanoid.
- **Backend:** Next.js API Routes, Drizzle ORM, Neon (PostgreSQL).
- **AI:** Google Gemini, Groq.
- **Auth:** Auth0.
