# 📋 Calmet AI - Son Kullanıcıya Hazırlık Raporu

Bu rapor, mobil uygulamanın web sitesine göre eksikliklerini, API bağlantılarını ve uygulamayı App Store/Play Store'a yayınlamaya hazır hale getirmek için gerekli adımları detaylı olarak açıklamaktadır.

---

## 🔴 KRİTİK EKSİKLİKLER

### 1. Auth0 Yapılandırması (Kimlik Doğrulama)
**Durum:** ❌ YAPILANDIRILMADI

**Sorun:** `.env` dosyasında Auth0 değerleri boş:
```env
EXPO_PUBLIC_AUTH0_DOMAIN=
EXPO_PUBLIC_AUTH0_CLIENT_ID=
```

**Çözüm:**
1. [Auth0](https://auth0.com) hesabı oluşturun
2. "Native Application" türünde bir uygulama oluşturun
3. Callback URL olarak şunu ekleyin: `calmet://auth/callback`
4. `.env` dosyasını doldurun:
```env
EXPO_PUBLIC_AUTH0_DOMAIN=your-tenant.auth0.com
EXPO_PUBLIC_AUTH0_CLIENT_ID=your-client-id
```

**Risk:** Şu an kullanıcılar gerçek bir kimlik doğrulama yapmadan "misafir" olarak giriyor. Veri senkronizasyonu çalışmıyor.

---

### 2. API Base URL (Production)
**Durum:** ⚠️ YAPILANDIRILDI AMA DİKKAT GEREKTİRİR

**Mevcut:**
```
Development: http://192.168.16.107:3000/api/v1 (Yerel IP)
Production: https://calmet.vercel.app/api/v1
```

**Kontrol Listesi:**
- [ ] Production API'nin çalıştığını doğrulayın: `curl https://calmet.vercel.app/api/v1/health`
- [ ] CORS ayarlarının mobil isteklere izin verdiğini kontrol edin
- [ ] SSL sertifikasının geçerli olduğunu doğrulayın

---

### 3. Brave Search API Key
**Durum:** ❌ BOŞ

**Sorun:** `.env.local` dosyasında Brave API Key boş:
```env
BRAVE_SEARCH_API_KEY=""
```

**Etki:** AI asistanı web araması yapamaz.

**Çözüm:**
1. [Brave Search API](https://brave.com/search/api/) hesabı oluşturun
2. API key alın ve `.env.local` dosyasına ekleyin

---

## 🟡 ÖNEMLİ EKSİKLİKLER

### 4. Push Bildirimleri
**Durum:** ⚠️ KISMEN HAZIR

**Sorun:** `expo-notifications` paketi mevcut ama EAS Build gerektirir.

**Yapılması Gerekenler:**
1. Expo Go'da bildirimler çalışmaz, EAS Build yapılmalı
2. Android için Firebase Cloud Messaging yapılandırılmalı
3. iOS için Apple Push Notification Service yapılandırılmalı

**Adımlar:**
```bash
# EAS CLI kurulumu
npm install -g eas-cli

# EAS Build yapılandırması
eas build:configure

# Android build
eas build --platform android

# iOS build
eas build --platform ios
```

---

### 5. App Store / Play Store Gereksinimleri
**Durum:** ⚠️ HAZIRLIK GEREKİYOR

**Android (Play Store):**
- [ ] `app.json` → `android.package`: `com.calmet.ai` ✅
- [ ] Keystore oluşturulmalı
- [ ] Privacy Policy URL eklenmeli
- [ ] Uygulama açıklaması (Türkçe/İngilizce)
- [ ] Ekran görüntüleri (farklı boyutlarda)

**iOS (App Store):**
- [ ] `app.json` → `ios.bundleIdentifier`: `com.calmet.ai` ✅
- [ ] Apple Developer hesabı ($99/yıl)
- [ ] App Store Connect yapılandırması
- [ ] Privacy Policy URL
- [ ] App Store açıklaması ve ekran görüntüleri

---

### 6. Asset'ler (İkon ve Splash)
**Durum:** ⚠️ VARSAYILAN KULLANILIYOR

**Mevcut Dosyalar:**
```
assets/images/icon.png
assets/images/splash.png
assets/images/adaptive-icon.png (Android)
assets/images/favicon.png (Web)
```

**Kontrol Edilmeli:**
- [ ] İkon boyutları doğru mu? (1024x1024 önerilir)
- [ ] Splash ekranı markaya uygun mu?
- [ ] Adaptive icon düzgün görünüyor mu?

---

## 🟠 FONKSİYONEL EKSİKLİKLER

### 7. Web'de Olup Mobil'de Olmayan Özellikler

| Özellik | Web | Mobil | Öncelik |
|---------|-----|-------|---------|
| PDF/Excel Rapor | ✅ | ❌ | Yüksek |
| Lab (AI Koçluk Modülleri) | ✅ | ❌ | Orta |
| Entegrasyonlar (Google Fit) | ✅ | ❌ | Düşük |
| Tam Badge Sistemi (12+) | ✅ | 6 adet | Düşük |
| Tema Ayarları | ✅ | Kısıtlı | Düşük |
| Premium Ödeme | ✅ | ❌ | Yüksek |

---

### 8. Premium / Ödeme Sistemi
**Durum:** ❌ MOBİLDE YOK

**Web'de:**
- Stripe ile ödeme
- Aktivasyon kodu sistemi (`PREMIUM_ACTIVATION_KEY`)

**Mobil için gerekli:**
- [ ] In-App Purchase (iOS)
- [ ] Google Play Billing (Android)
- [ ] Alternatif: Aktivasyon kodu sistemi (mevcut web API'si kullanılabilir)

**Öneri:** İlk sürüm için aktivasyon kodu sistemi en hızlı çözüm.

---

## 🔵 API BAĞLANTILARI

### Mevcut API Endpoint'leri

| Endpoint | Web | Mobil | Durum |
|----------|-----|-------|-------|
| `/api/v1/entries` | ✅ | ✅ | Çalışıyor |
| `/api/v1/profile` | ✅ | ✅ | Çalışıyor |
| `/api/v1/goals` | ✅ | ✅ | Çalışıyor |
| `/api/v1/measurements` | ✅ | ✅ | Çalışıyor |
| `/api/v1/sleep` | ✅ | ✅ | Çalışıyor |
| `/api/v1/chat` | ✅ | ✅ | Çalışıyor |
| `/api/v1/food-search` | ✅ | ✅ | Çalışıyor |
| `/api/v1/report` | ✅ | ⚠️ | Kısmen |
| `/api/v1/premium` | ✅ | ❌ | Eksik |
| `/api/v1/integrations` | ✅ | ❌ | Eksik |

### API Key'ler

| Key | Dosya | Durum |
|-----|-------|-------|
| `USDA_FDC_API_KEY` | `.env` & `.env.local` | ✅ Yapılandırıldı |
| `GOOGLE_AI_API_KEY` | `.env.local` | ✅ Yapılandırıldı |
| `GROQ_API_KEY` | `.env.local` | ✅ Yapılandırıldı |
| `BRAVE_SEARCH_API_KEY` | `.env.local` | ❌ Boş |
| `AUTH0_DOMAIN` | `.env` (mobile) | ❌ Boş |
| `AUTH0_CLIENT_ID` | `.env` (mobile) | ❌ Boş |

---

## 📱 MOBİL UYGULAMA YAYINLAMA ADIMLARI

### Adım 1: EAS Build Yapılandırması
```bash
cd apps/mobile
npm install -g eas-cli
eas login
eas build:configure
```

### Adım 2: eas.json Oluşturma
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
```

### Adım 3: Production Build
```bash
# Android APK/AAB
eas build --platform android --profile production

# iOS IPA
eas build --platform ios --profile production
```

### Adım 4: Mağazaya Gönderme
```bash
# Play Store
eas submit --platform android

# App Store
eas submit --platform ios
```

---

## ✅ HIZLI DÜZELTME LİSTESİ

### Hemen Yapılması Gerekenler (1-2 Saat)
1. [ ] Auth0 hesabı oluşturup `.env` dosyasını doldurun
2. [ ] Production API'nin çalıştığını test edin
3. [ ] Asset'leri (ikon, splash) özelleştirin

### Kısa Vadede (1-2 Gün)
4. [ ] EAS Build yapılandırması
5. [ ] Push notification yapılandırması
6. [ ] Aktivasyon kodu sistemi (Premium için)

### Orta Vadede (1 Hafta)
7. [ ] PDF rapor özelliği
8. [ ] In-App Purchase entegrasyonu
9. [ ] App Store / Play Store gönderimi

---

## 📊 ÖZET

| Kategori | Durum | Açıklama |
|----------|-------|----------|
| **Temel Özellikler** | ✅ %85 | Çoğu özellik çalışıyor |
| **API Bağlantıları** | ⚠️ %70 | Auth0 eksik |
| **Premium/Ödeme** | ❌ %10 | Mobilde henüz yok |
| **Store Hazırlığı** | ⚠️ %40 | Build ve asset gerekli |
| **Genel Hazırlık** | ⚠️ %60 | 1-2 hafta ile yayına hazır |

---

## 🎯 ÖNCELİK SIRASI

1. **Auth0 Yapılandırması** - Kullanıcı girişi için kritik
2. **EAS Build** - Gerçek cihazda test için gerekli
3. **Asset'ler** - Marka kimliği için önemli
4. **Premium Sistem** - Gelir modeli için gerekli
5. **PDF Rapor** - Kullanıcı değeri yüksek
