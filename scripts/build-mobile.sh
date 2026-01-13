#!/bin/bash
set -e

echo "🔧 Mobil build başlatılıyor..."

# Proje dizinine geç
cd "$(dirname "$0")/.."

# Dinamik route'ları geçici olarak taşı
echo "📦 Dinamik route'lar geçici olarak kaldırılıyor..."
mv src/app/api src/app/_api_backup
mv src/app/share src/app/_share_backup

# Build al
echo "🏗️ Next.js static export yapılıyor..."
npm run build

# Klasörleri geri yükle
echo "♻️ Route'lar geri yükleniyor..."
mv src/app/_api_backup src/app/api
mv src/app/_share_backup src/app/share

# Capacitor sync
echo "📱 Capacitor sync yapılıyor..."
npx cap sync

echo "✅ Mobil build tamamlandı!"
echo ""
echo "Sonraki adımlar:"
echo "  - Android: npx cap open android"
echo "  - iOS: npx cap open ios"
