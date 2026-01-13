#!/bin/bash
set -e

echo "🔧 Mobil build başlatılıyor..."

# Proje dizinine geç
cd "$(dirname "$0")/.."

# Build al with MOBILE_BUILD flag
echo "🏗️ Next.js static export yapılıyor..."
MOBILE_BUILD=true npm run build

# Capacitor sync
echo "📱 Capacitor sync yapılıyor..."
npx cap sync

echo "✅ Mobil build tamamlandı!"
echo ""
echo "Sonraki adımlar:"
echo "  - Android: npx cap open android"
echo "  - iOS: npx cap open ios"
