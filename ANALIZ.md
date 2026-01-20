# Calmet AI: Web vs. Mobil Analiz Raporu

Web uygulaması ile mobil uygulama arasındaki özellik farklarını ve tasarım eksiklerini içeren detaylı analiz aşağıdadır.

---

## ✅ Tamamlanan İyileştirmeler

| Özellik | Durum | Açıklama |
| :--- | :---: | :--- |
| **Profil Tamamlama (%)** | ✅ | Web'deki gibi progress bar eklendi |
| **BMI Hesaplama & Takip** | ✅ | Renkli etiketlerle BMI kartı eklendi |
| **Başarılar (Badges)** | ✅ | 6 madalya (Streak, Su, Aktivite, Öğün) eklendi |
| **CSV İçe Aktar** | ✅ | DocumentPicker ile CSV import eklendi |
| **Makro Hedefleri** | ✅ | Protein, Karbonhidrat, Yağ input'ları eklendi |
| **Ayarlar Sayfası Tasarımı** | ✅ | Web'deki gibi kategorize edilmiş kartlar |

---

## 1. Özellik Karşılaştırma Tablosu (Güncel)

| Özellik | Web (Next.js) | Mobil (Expo) | Durum |
| :--- | :--- | :--- | :--- |
| **Dashboard / Panel** | ✅ Tam (Grafikli) | ✅ Mevcut | Eşit |
| **Öğün Kaydı (AI/Manuel)** | ✅ Tam | ✅ Mevcut | Eşit |
| **Profil Tamamlama (%)** | ✅ Var | ✅ Var | ✅ Eşit |
| **BMI Hesaplama & Takip** | ✅ Var | ✅ Var | ✅ Eşit |
| **Başarılar (Badges)** | ✅ Var (12+) | ✅ Var (6) | İyileştirildi |
| **CSV Dışa Aktar** | ✅ Var | ✅ Var | Eşit |
| **CSV İçe Aktar** | ✅ Var | ✅ Var | ✅ Eşit |
| **Makro Hedefleri** | ✅ Var | ✅ Var | ✅ Eşit |
| **PDF / Excel Raporu** | ✅ Var | ❌ Yok | **Eksik** |
| **Entegrasyonlar** | ✅ Google Fit, Fitbit | ❌ Yok | **Eksik** |
| **Lab (AI Koçluk)** | ✅ Var | ❌ Yok | **Eksik** |
| **Uyku Takibi** | ✅ Gelişmiş | ✅ Temel | Eşit |

---

## 2. Değiştirilen Dosyalar

### Profil Sayfası
**Dosya:** `apps/mobile/app/(tabs)/profile.tsx`
- ✅ Profil Tamamlama progress bar'ı eklendi
- ✅ BMI kartı ve durum göstergesi (Zayıf/Normal/Fazla/Obez) eklendi
- ✅ 6 adet Badge (Başarı) kartı eklendi
- ✅ Badge progress göstergesi eklendi

### Ayarlar Sayfası
**Dosya:** `apps/mobile/app/(tabs)/settings.tsx`
- ✅ Makro hedefleri (Protein, Karbonhidrat, Yağ) input'ları eklendi
- ✅ CSV İçe Aktar fonksiyonu eklendi
- ✅ Hedef kaydetme butonu eklendi
- ✅ Tasarım web'deki gibi kategorize edildi

### Store
**Dosya:** `apps/mobile/src/store/slices/tracker.slice.ts`
- ✅ `addEntries` fonksiyonu eklendi (toplu import için)

### Utils
**Dosya:** `apps/mobile/src/utils/export.ts`
- ✅ `importEntriesFromCSV` fonksiyonu eklendi

---

## 3. Kalan Eksiklikler (Gelecek İyileştirmeler)

| Özellik | Öncelik | Açıklama |
| :--- | :---: | :--- |
| PDF/Excel Rapor | Orta | react-native-pdf-lib ile rapor çıktısı |
| Google Fit Entegrasyonu | Düşük | react-native-google-fit paketi |
| Lab (AI Koçluk Modülleri) | Düşük | Yeni ekran gerektirir |
| Daha Fazla Badge | Düşük | Web'deki 12+ badge'i mobile taşıma |

---

## 4. Kurulum Notları

Yeni eklenen paketler:
```bash
pnpm add expo-document-picker
```

Uygulamayı yeniden başlatmak için:
```bash
cd apps/mobile && pnpm exec expo start --clear
```
