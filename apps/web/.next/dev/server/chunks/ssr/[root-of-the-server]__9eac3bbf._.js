module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/apps/web/src/lib/core/storage.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadEntries",
    ()=>loadEntries,
    "saveEntries",
    ()=>saveEntries
]);
const ENTRY_KEY = "calai.entries.v1";
function readStorage(key, fallback) {
    if ("TURBOPACK compile-time truthy", 1) {
        return fallback;
    }
    //TURBOPACK unreachable
    ;
}
function writeStorage(key, value) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function loadEntries() {
    return readStorage(ENTRY_KEY, []);
}
function saveEntries(entries) {
    writeStorage(ENTRY_KEY, entries);
}
}),
"[project]/packages/shared/src/types/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
}),
"[project]/packages/shared/src/locales/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"26\":\"26\",\"70\":\"70\",\"100\":\"100\",\"175\":\"175\",\"Hedeflerden sapma ve uyum skoru\":\"Deviation from goals and adherence score\",\"Yağ\":\"Fat\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"No measurements yet. Add them from the profile page.\",\"AI Destekli Sağlık Takibi\":\"AI-Powered Health Tracking\",\"Yaş\":\"Age\",\"q\":\"q\",\"Öğün\":\"Meal\",\"Beklentin\":\"Your expectation\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Balanced Meal Rhythm\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Calories burned is an estimate. User edits always take precedence.\",\"Ara\":\"Search\",\"Limit yarın sıfırlanır.\":\"Limit resets tomorrow.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Personalize your profile and clarify your goals.\",\"CSV dışa aktarıldı.\":\"CSV exported.\",\"Verilerini ciddiye alan sporcular için.\":\"For athletes who take their data seriously.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Fat goal\",\"Ölçüm güncellendi\":\"Measurement updated\",\"öğün\":\"meal\",\"Belirtilmedi\":\"Not specified\",\"Su\":\"Water\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Saving...\",\"Net\":\"Net\",\"Göğüs\":\"Chest\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"For your body\",\"Takip edilen gün\":\"Tracked days\",\"Preset veya özel miktar\":\"Preset or custom amount\",\"Limit doldu...\":\"Limit reached...\",\"Ücretsiz Başla\":\"Free trial\",\"Açık\":\"On\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profile saved.\",\"Kütüphane kaydı başarısız.\":\"Library save failed.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Image-based logging is currently disabled.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"This report is for informational purposes only. It does not provide medical advice.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Browser permission is required for reminders.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"PDF with charts + Excel export\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performance Status\",\"Protein hedefi\":\"Protein goal\",\"Toplam Su\":\"Total Water\",\"source\":\"source\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Disclaimer\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"AI Coach is currently only active in the AI Plus plan.\",\"Düzenle\":\"Edit\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Your activity time is below target. Adding 10–15 minutes daily helps.\",\"Daha İyi Bir Sen İçin\":\"For a Better You\",\"Hedefler\":\"Goals\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Calorie intake matches your target; keep the rhythm.\",\"Kilo (kg)\":\"Weight (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Unknown Product\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Account & Profile\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Chart\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI features are off by default.\",\"Aydınlık temaya dön\":\"Switch to light theme\",\"Toplam su\":\"Total water\",\"Cihazdaki kayıtları taşı\":\"Transfer local records\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Total entries\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"Hello! I am your Calmet AI Health Coach. How can I help you with your nutrition or workout goals today?\",\"Spor yeri\":\"Workout location\",\"Görsel Veri Analizi\":\"Visual Data Analysis\",\"Paylaş\":\"Share\",\"Excel Olarak İndir\":\"Download as Excel\",\"ekle yeni entry\":\"add new entry\",\"Makro Hedef Takibi\":\"Macro Goal Tracking\",\"Aktivite Hedefi Güçlü\":\"Strong Activity Target\",\"Akt. Kalori\":\"Act. Calories\",\"CSV içinde kayıt bulunamadı.\":\"No entries found in the CSV.\",\"Karbonhidrat Düşük\":\"Low Carbs\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"Kalori değeri tahminidir\":\"Calorie value is an estimate\",\"Ölçüm silindi\":\"Measurement deleted\",\"Ad Soyad\":\"Full Name\",\"Aktivite\":\"Activity\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Much more than just a tracking app. We blend scientific data with modern technology.\",\"Neden Calmet?\":\"Why Calmet?\",\"İçe aktarılıyor...\":\"Importing...\",\"Makro verisi oluştuğunda burada görünecek.\":\"It will appear here once macro data is available.\",\"Bel\":\"Waist\",\"Girilen ve yakılan kalori trendi\":\"Trend of calories in and out\",\"Günlük ort. su\":\"Avg. daily water\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Weight & Measurement Trends\",\"Ayarlar\":\"Settings\",\"AI Sağlık Koçu\":\"AI Health Coach\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Total calories\",\"Hedef Kilo (kg)\":\"Target Weight (kg)\",\"Profil sayfası\":\"Profile page\",\"Filtreyi temizle\":\"Clear filters\",\"kcal\":\"kcal\",\"E-posta ile Gönder\":\"Send via Email\",\"Kayıtların gün bazlı özeti\":\"Daily summary of entries\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Daily reminders via browser notifications.\",\"Aktivite Özeti\":\"Activity Summary\",\"Bu bağlantının süresi dolmuş.\":\"This link has expired.\",\"Su Girişi\":\"Water Entry\",\"Yeni kayıt ekle\":\"Add new entry\",\"Yerel cihaz modu\":\"Local device mode\",\"Kısa not (opsiyonel)...\":\"Short note (optional)...\",\"Bildirim izni açık.\":\"Notification permission granted.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Back\",\"Stres\":\"Stres\",\"Favori yap\":\"Mark as favorite\",\"Hedef yok\":\"No goal\",\"Vazgeç\":\"Cancel\",\"Hedef bilgisi henüz eklenmemiş.\":\"Goal info not added yet.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Top Activities\",\"CSV Dışa Aktar\":\"Export CSV\",\"Aktivite eklendi\":\"Activity added\",\"Protein\":\"Protein\",\"Sağlık Koçu\":\"Health Coach\",\"Öğün Ritmi Düşük\":\"Low Meal Rhythm\",\"Günlük hatırlatma\":\"Daily reminder\",\"Aktivite Süresi\":\"Activity Duration\",\"Cal AI Hatırlatma\":\"Calmet Reminder\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Enter injury details\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Sharing...\",\"Kayıt bulunamadı.\":\"No records found.\",\"Takip & Kayıt\":\"Tracking & Logs\",\"Raporu Aç\":\"Open Report\",\"Kullanım Şartları\":\"Terms of Use\",\"Çıkış\":\"Sign Out\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Thu\",\"Paylaşım ve Aktarım\":\"Sharing and Transfer\",\"Grafikler\":\"Charts\",\"KVKK\":\"Data Protection\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profile could not be saved. Try again.\",\"Español\":\"Spanish\",\"Uyum\":\"Adherence\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Create a quick entry by entering calories and selecting a meal.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Badges unlock based on streak, water, activity, and meal discipline goals.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Weekly Comparison\",\"Kısa açıklama\":\"Short description\",\"Hızlı\":\"Quick\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Account\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Streak Badges\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"No results found. Try a different keyword.\",\"Kilo & Ölçüm Takibi\":\"Weight & Measurement Tracking\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Bulk import (cloud)\",\"Tema güncellendi\":\"Theme updated\",\"Performans Analizi\":\"Performance Analysis\",\"Makrolar (g)\":\"Macros (g)\",\"Günlük Veri Kayıtları\":\"Daily Records\",\"ml\":\"ml\",\"En çok kalori getiren seçimler\":\"Highest calorie choices\",\"Kalori\":\"Calories\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Goal Alignment Score\",\"Hızlı Kalori Ekle\":\"Quick Calorie Add\",\"En Eski\":\"Oldest\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Food\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Activity looks low; even short walks help balance.\",\"Öğün Ritmi\":\"Meal Rhythm\",\"Paylaşım bağlantısı hazır.\":\"Share link is ready.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"No entries yet. Add your first entry.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"You're below your protein goal. Strengthen your daily protein intake.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Portuguese\",\"Entegrasyonlar\":\"Integrations\",\"unit\":\"unit\",\"Örn: 420\":\"E.g., 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Date\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Track macro balance week by week.\",\"Su hedefi\":\"Water goal\",\"dakika\":\"minutes\",\"Aktivite hedefi\":\"Activity goal\",\"Haftalık spor\":\"Weekly workouts\",\"Öğün Sayısı\":\"Meal Count\",\"Hemen Başla\":\"Get Started\",\"Manuel ürünler ve favoriler\":\"Manual products and favorites\",\"Seç\":\"Select\",\"Yerel ölçümler buluta taşındı\":\"Local measurements moved to the cloud\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Low Calorie Average\",\"Lütfen tüm soruları yanıtla.\":\"Please answer all questions.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Active Days\",\"Boy (cm)\":\"Height (cm)\",\"Profil kaydedilemedi.\":\"Profile could not be saved.\",\"Yürüyüş\":\"Walking\",\"Komut Paleti\":\"Command Palette\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Transferring...\",\"Analiz Notu\":\"Analysis Note\",\"Aranıyor...\":\"Searching...\",\"250 ml su ekle\":\"Add 250 ml water\",\"Hedef uyumunun en yüksek olduğu günler\":\"Days with the highest goal alignment\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Enter measurements regularly to clarify the trend.\",\"Akt. Süre\":\"Act. Duration\",\"Her Şey Tek Bir\":\"Everything in One\",\"Yasal\":\"Legal\",\"Kalori Giriş\":\"Calorie Intake\",\"Ortalama Aktivite\":\"Average Activity\",\"Paneli aç\":\"Open dashboard\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Body Fat %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Feature Flags\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Your water intake is below target. Adding 1–2 glasses during the day can help.\",\"Trendler\":\"Trends\",\"Yüksek\":\"Obese\",\"Fikri Mülkiyet\":\"Intellectual Property\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Please provide injury details.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Fat goal is low. Try adding healthy fat sources.\",\"Günlük Ort.\":\"Daily Avg.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Russian\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Some entries lack macro data. Choose products for clearer tracking.\",\"Aktivite Girişi\":\"Activity Entry\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Stairs\",\"Verilerin Kullanımı\":\"Usage of Data\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Strong Hydration\",\"İleri\":\"Next\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"The link is invalid or may have been removed.\",\"Kullanıcı\":\"User\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Finish\",\"a\":\"a\",\"Yemek Girişi\":\"Food Entry\",\"Konu\":\"Subject\",\"Haftalık Su Alımı\":\"Weekly water intake\",\"Kamera açılıyor...\":\"Opening camera...\",\"Favoriye kaydet\":\"Save to favorites\",\"refresh_token\":\"refresh_token\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Top Days\",\"Veri Sorumlusu\":\"Data Controller\",\"Doktor kısıtı\":\"Doctor restriction\",\"Henüz aktivite kaydı yok.\":\"No activity entries yet.\",\"Ana hedef\":\"Main goal\",\"Güncellendi\":\"Updated\",\"Bugün Özeti\":\"Today's Summary\",\"Motivasyon Notu\":\"Motivation Note\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Quick Add\",\"Tüm Zamanlar\":\"All Time\",\"Öğün hedefi\":\"Meal goal\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Activity looks good; staying active speeds your progress toward the goal.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"No entries match the filters.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"No credit card required. Start in seconds.\",\"Kalori hedefi\":\"Calorie goal\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Details\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"For those taking the first step to healthy life.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Total meals\",\"Yağ Hedefi (g)\":\"Fat Goal (g)\",\"Tüm ürünler\":\"All products\",\"Sıkça Sorulanlar\":\"FAQ\",\"Özet\":\"Overview\",\"Sadece favoriler\":\"Favorites only\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"No personalized analysis yet. Add more entries.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Carbs / Fat\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Take the First Step Today.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Dashboard\",\"Takip Sürekliliği Güçlü\":\"Tracking Consistency Strong\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Search product or enter manually...\",\"Atıştırmalık\":\"Snack\",\"Su (ml)\":\"Water (ml)\",\"Makro Dağılımı\":\"Macro Distribution\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Your modern and smart health tracking assistant. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Fat Goal\",\"Su Takibi\":\"Water Tracking\",\"Pzt\":\"Mon\",\"Akıllı Panelde.\":\"Smart Dashboard.\",\"Calmet AI\":\"Calmet AI\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"Data Protection Text\",\"İletişim\":\"Contact\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Features\",\"Plan Seçimi\":\"Plan Selection\",\"Güvenlik\":\"Security\",\"Değişiklikler\":\"Changes\",\"Toplanan Veriler\":\"Collected Data\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"A line appears when you add measurements.\",\"Yerel kayıtlar buluta taşındı\":\"Local entries moved to the cloud\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"Add your name\",\"Haftalık Sapma Analizi\":\"Weekly Deviation Analysis\",\"provider\":\"provider\",\"Ayar\":\"Settings\",\"ayarlar settings\":\"settings preferences\",\"Lütfen bu soruyu yanıtla.\":\"Please answer this question.\",\"su hızlı\":\"water quick\",\"AI Gücünü Keşfet\":\"Discover AI Power\",\"Paylaşım bulunamadı\":\"Share not found\",\"Henüz öğün kaydı yok.\":\"No meal entries yet.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Use\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"The link opens the public report view.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Calorie Balance\",\"Miktar (ml)\":\"Amount (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Compare averages to goals\",\"İşlenen Veri Kategorileri\":\"Processed Data Categories\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Your personal coach powered by AI.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Retention Period\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Meal goal days\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Update Goals\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Calories\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Add weight, waist, hip, and other measurements regularly.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Align the barcode in the frame.\",\"Profil tamamlama\":\"Profile completion\",\"Bisiklet\":\"Cycling\",\"Kalori (kcal)\":\"Calories (kcal)\",\"Urun\":\"Product\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Goal proximity\",\"Kahvaltı\":\"Breakfast\",\"Yağ (g)\":\"Fat (g)\",\"Hızlı Bağlantılar\":\"Quick Links\",\"Kaydet\":\"Save\",\"Paylaşılan Rapor\":\"Shared Report\",\"Tüm Öğünler\":\"All Meals\",\"Français\":\"French\",\"Kütüphane yüklenemedi.\":\"Library failed to load.\",\"Kişisel Bilgiler\":\"Personal Info\",\"Haftalık Sapma\":\"Weekly Deviation\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Enter a valid barcode.\",\"Süre (dk)\":\"Duration (min)\",\"Su takibi başladığında burada görünecek.\":\"It will appear here once water tracking starts.\",\"Yağ Hedefi Düşük\":\"Low Fat Target\",\"En Akıllı Yol.\":\"The Smartest Path.\",\"Aktivite Süresi Düşük\":\"Low Activity Duration\",\"Su eklendi\":\"Water added\",\"En Etkili Günler\":\"Most Effective Days\",\"Tüm Tipler\":\"All Types\",\"tema görünüm\":\"theme appearance\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Service Description\",\"Kütüphane yükleniyor...\":\"Loading library...\",\"Sağlıklı Yaşam\":\"Healthy Living\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Carbohydrate Goal\",\"Görünüm adı\":\"View name\",\"Kamera izni alınamadı.\":\"Camera permission could not be granted.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Daily limit reached. Try again tomorrow.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Entry Count\",\"Paylaşım oluşturulamadı.\":\"Share could not be created.\",\"Y\":\"F\",\"Karbonhidrat Hedefi (g)\":\"Carbohydrate Goal (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profile user\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manual\",\"Diyetisyen modu açık\":\"Dietitian mode on\",\"Favori\":\"Favorite\",\"Karbonhidrat\":\"Carbohydrate\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Highlights\",\"Başlangıç\":\"Start\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Activity added (local)\",\"Cmt\":\"Sat\",\"7 Günlük İlerleme Analizi\":\"7-Day Progress Analysis\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Search library\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Turkish\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Goals.\",\"Henüz kayıtlı ürün yok.\":\"No saved products yet.\",\"Kilitli\":\"Locked\",\"Geri al\":\"Undo\",\"Su Tüketimi\":\"Water Intake\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Data Management\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Search: meal, activity...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manual calorie entry\",\"Yakılan\":\"Burned\",\"Tema\":\"Theme\",\"Yemek eklendi\":\"Meal added\",\"rapor pdf export\":\"report pdf export\",\"Bizi nereden duydun?\":\"How did you hear about us?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Avg. Calories\",\"Net Değişim\":\"Net Change\",\"Aktivite süresi\":\"Activity duration\",\"Günlük öğün ritmi\":\"Daily meal rhythm\",\"Barkod bulunamadı.\":\"Barcode not found.\",\"Hedef uyum skoru\":\"Goal alignment score\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"Save as PDF\",\"Hedefler güncellendi\":\"Goals updated\",\"Keşfet\":\"Discover\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"If you increase tracking days, your progress curve will be clearer.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Amount (g)\",\"Akşam\":\"Dinner\",\"Karbonhidrat hedefi\":\"Carbohydrate goal\",\"Aktivite Rozetleri\":\"Activity Badges\",\"Suya Yaklaştın\":\"Close on Hydration\",\"Calmet nedir?\":\"What is Calmet?\",\"Sağlık platformlarını bağla\":\"Connect health platforms\",\"Not\":\"Note\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Notification permission denied.\",\"Ağırlık\":\"Weight Training\",\"Gün\":\"Day\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"Send Email\",\"Ortalama Su\":\"Average Water\",\"Abonelikler\":\"Subscriptions\",\"Sıkça Sorulan Sorular\":\"FAQ\",\"Favori güncellenemedi.\":\"Favorite could not be updated.\",\"Sal\":\"Tue\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Calorie Burn\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Overall Performance Summary\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barcode lookup failed.\",\"Hatırlatıcı güncellendi\":\"Reminder updated\",\"Toplu içe aktarma (cihaz)\":\"Bulk import (device)\",\"Ekle\":\"Add\",\"Toplam Kalori\":\"Total Calories\",\"Diyetisyen modu kapalı\":\"Dietitian mode off\",\"Abonelik & Ödeme\":\"Subscription & Payment\",\"CSV İçe Aktar\":\"Import CSV\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Activity intensity overview\",\"Beslenme Raporu\":\"Nutrition Report\",\"Profil\":\"Profile\",\"500 ml su ekle\":\"Add 500 ml water\",\"Ölçüm eklendi\":\"Measurement added\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filter and find entries quickly.\",\"Hatırlatıcılar\":\"Reminders\",\"error\":\"error\",\"Hesabım\":\"My Account\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Small steps start big changes. Keep going!\",\"Tahmini kalori\":\"Estimated calories\",\"Ürün\":\"Product\",\"Rozetler\":\"Badges\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Water added (local)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Underweight\",\"Akt.\":\"Act.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"History\",\"Günlük Kalori Hedefi\":\"Daily Calorie Goal\",\"kez tüketildi\":\"times consumed\",\"AI Görsel Tanıma\":\"AI Visual Recognition\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"You have reached your daily limit. You can try again tomorrow.\",\"Cum\":\"Fri\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"Calmet helps you reach your health goals in the shortest way with AI-powered diet calendars, meal templates, and in-depth analytics.\",\"Günlük Öğün Hedefi (adet)\":\"Daily Meal Goal (count)\",\"Net kalori\":\"Net calories\",\"Gizlilik Politikası\":\"Privacy Policy\",\"Paylaşmak için giriş yapın.\":\"Sign in to share.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Meal Badges\",\"Cal AI Rapor\":\"Calmet Report\",\"Kişiye Özel Diyet Takvimi\":\"Personalized Diet Calendar\",\"Ücretsiz\":\"Free\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Browser notifications are not supported.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Few meals include macro data. Add product details to sharpen tracking.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Highlights for key metrics\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"default\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Injury detail\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Share Link\",\"Ürün kütüphaneye kaydedildi.\":\"Product saved to the library.\",\"kg\":\"kg\",\"light\":\"light\",\"Giriş Yap\":\"Sign In\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Type at least 3 letters to search products.\",\"Kişisel Veri Güvenliği\":\"Personal Data Security\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Today's Summary\",\"Koşu\":\"Running\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Your Rights\",\"Güncel kilo\":\"Current weight\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"Badges appear after you add your first entries.\",\"Kapalı\":\"Off\",\"Ücretsiz Hesabını Oluştur\":\"Create Free Account\",\"Oto hesapla\":\"Auto calculate\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Could not save to cloud; saved to your device.\",\"Takip Sürekliliği Zayıf\":\"Tracking Consistency Low\",\"Kamera veya barkod numarası\":\"Camera or barcode number\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Weight\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"App Language\",\"Yemek adı\":\"Food name\",\"Yüzme\":\"Swimming\",\"Öğün kayıtları başladığında burada görünecek.\":\"Meal logs will appear here once you start logging.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"Write to us on the contact page; we will close your account securely.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"See Plans\",\"Enerji dengesinin hareketini takip edin.\":\"Track how your energy balance moves.\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"No data for the selected measurement.\",\"Aktivite (dk)\":\"Activity (min)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Daily Activity Goal (min)\",\"Görünüm Kaydet\":\"Save View\",\"Kişisel Analiz ve Motivasyon\":\"Personal Analysis & Motivation\",\"Haftalık Kalori Dengesi\":\"Weekly Calorie Balance\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Your browser does not support barcode scanning.\",\"Destek\":\"Support\",\"Yerel cihazınızda saklanır\":\"Stored on your device\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Injury\",\"Komut ara...\":\"Search commands...\",\"Makro Verisi Eksik\":\"Macro Data Missing\",\"Destek e-postamız:\":\"Our support email:\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Manually add walking, running, or gym activities.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan unlocks advanced analytics, unlimited entries, and custom reports.\",\"Dönem\":\"Period\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Upgrade to Premium\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Meal added (local)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Activity logs will appear here once you start logging.\",\"Protein Hedefi (g)\":\"Protein Goal (g)\",\"Günlük Detaylar\":\"Daily Details\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Auto Calorie Calculation\",\"Sil\":\"Delete\",\"Kalori, su ve makro değişimleri\":\"Calorie, water, and macro changes\",\"Kayıt güncellendi\":\"Entry updated\",\"Beslenme Tercihleri\":\"Nutrition Preferences\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Reach Your\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Highlights days closer to the goal.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV import/export (device or cloud).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Carb goal looks low. Increase it for better energy balance.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Last entry\",\"Kişisel Yorumlar\":\"Personal Insights\",\"Kopyala\":\"Copy\",\"Toplam ölçüm\":\"Total measurements\",\"İşleme Amaçları\":\"Processing Purposes\",\"Genel İstatistikler\":\"Overall Statistics\",\"Aktiviteye Yaklaştın\":\"Close on Activity\",\"Tarih/Saat\":\"Date/Time\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Meal rhythm looks scattered. Stabilizing main meals improves balance.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"No standout days yet.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Daily Water Goal (ml)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Close camera\",\"Paz\":\"Sun\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"English\",\"Kalori Ortalaması Yüksek\":\"High Calorie Average\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Feature flags updated\",\"Protein Hedefi Düşük\":\"Protein Target Low\",\"Bulut (Neon) aktif\":\"Cloud (Neon) active\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Goal Proximity\",\"Kalori girişi ve çıkışı\":\"Calories in and out\",\"Paketler\":\"Plans\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Product name is required for the library.\",\"Dikkat\":\"Alert\",\"Kayıt Geçmişi\":\"Log history\",\"İsim\":\"Name\",\"Mesajın\":\"Your message\",\"Aktivite Girdisi\":\"Activity Entry\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Enable dim theme\",\"Ortalama Kalori\":\"Average Calories\",\"Performans Özeti\":\"Performance Summary\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Low Hydration\",\"Protein Hedefi\":\"Protein Goal\",\"Ürün Kütüphanesi\":\"Product Library\",\"Sabit\":\"Sabit\",\"Öğle\":\"Lunch\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Product could not be deleted.\",\"Günlük ort. kalori\":\"Avg. daily calories\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Water tracking looks good; this pace supports recovery.\",\"panel dashboard home\":\"dashboard home overview\",\"Fazla\":\"Overweight\",\"K\":\"C\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Daily water trend\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"No data yet. First entries will populate the chart.\",\"Barkod ile bul\":\"Find by barcode\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Water Badges\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Ready Meal Templates\",\"Henüz haftalık veri yok.\":\"No weekly data yet.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barcode number\",\"Günlük hareket dakikaları\":\"Daily activity minutes\",\"PDF raporu aç\":\"Open PDF report\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Current streak\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Top Meals\",\"Aktivite temposunu görselleştirir.\":\"Visualizes your activity pace.\",\"Karbonhidrat (g)\":\"Carbohydrate (g)\",\"Hafta\":\"Week\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Detailed Charts\",\"Tahmini\":\"Estimated\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Features\",\"Rapor Dışa Aktarım\":\"Report Export\",\"Dil\":\"Language\",\"Ekipman durumu\":\"Equipment level\",\"Kalça\":\"Hip\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Your calorie intake, water consumption, and activity data are synced instantly. AI detects your deficiencies and warns you throughout the day.\",\"Barkod tara\":\"Scan barcode\",\"Güçlü\":\"Strong\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Close with Esc • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"No results found. You can enter calories manually.\",\"Aktivite kalorisi\":\"Activity calories\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Calorie Balance Looks Good\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"You can export PDF or Excel from the report screen.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"Could not read CSV. Check the format.\",\"Açıldı\":\"Unlocked\",\"Girilen ve tahmini yakılan kalori\":\"Intake and estimated calories burned\",\"Yerel profil\":\"Local profile\",\"image_url\":\"image_url\",\"Sapma\":\"Deviation\",\"Yardım Merkezi\":\"Help Center\",\"En Çok Tercih Edilen\":\"Most Popular\",\"Tüm kayıtların özet görünümü.\":\"Summary view of all entries.\",\"Kütüphaneye kaydet\":\"Save to library\",\"Premium modüllerini bu panelden yönetin.\":\"Manage premium modules from this panel.\",\"Ort. Protein\":\"Avg. Protein\",\"Spor seviyesi\":\"Fitness level\",\"Ücretlendirme\":\"Pricing\",\"textarea\":\"textarea\",\"Su Alımı\":\"Water Intake\",\"İzin Ver\":\"Allow\",\"Bir şeyler sor...\":\"Ask something...\",\"Pro Bağlantıları\":\"Pro Connections\",\"En Yeni\":\"Newest\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Notification permission not granted.\",\"Ayarları aç\":\"Open settings\",\"Rapor yükleniyor...\":\"Loading report...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Alignment Score\",\"dk\":\"min\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Camera access is not supported.\",\"Öğün düzenini gün gün izleyin.\":\"Track meal consistency day by day.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Entry deleted\",\"Kullanıcı Sorumlulukları\":\"User Responsibilities\",\"Rapor\":\"Report\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Meal goal rate\",\"Car\":\"Wed\",\"Kapat\":\"Close\",\"Kayıt Ol\":\"Sign Up\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"A weekly plan automatically generated based on your goals, habits, and daily schedule.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Clearly view daily, weekly, and monthly progress. Trends and deviations on a single screen.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Choose your meal from dietitian-approved templates without entering calories one by one.\",\"Pro'ya Yükselt\":\"Upgrade to Pro\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"You have reached your daily limit of 25 messages. See you tomorrow!\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"AI Coach is exclusive to the AI PLUS plan.\",\"Cevap üretilemedi.\":\"Response could not be generated.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"An error occurred. Please try again.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"AI service is currently not configured (GROQ_API_KEY missing). Please contact the administrator.\",\"Sesli giriş\":\"Voice entry\",\"Bir elma yedim ve 2 bardak su içtim.\":\"I ate an apple and drank 2 glasses of water.\",\"Konuş\":\"Speak\",\"Durdur\":\"Stop\",\"Dinleniyor...\":\"Listening...\",\"Söylediğin cümle burada görünecek.\":\"Your sentence will appear here.\",\"Sesli giriş desteklenmiyor.\":\"Voice entry is not supported.\",\"Sesli giriş anlaşılamadı.\":\"Voice entry could not be understood.\",\"Sesli giriş: {count} kayıt eklendi.\":\"Voice entry: {count} log(s) added.\",\"{count} öğünde kalori bulunamadı.\":\"Calories were missing for {count} meal(s).\",\"Mikrofon izni alınamadı.\":\"Microphone permission was denied.\",\"Ses tanıma hatası oluştu.\":\"Speech recognition failed.\",\"Fotoğraf ile Ekle\":\"Add by photo\",\"AI destekli yemek tanıma yakında aktif olacak.\":\"AI-powered food recognition will be available soon.\",\"Fotoğraf Yükle\":\"Upload photo\",\"Yakında\":\"Coming soon\",\"Fotoğraf ile ekleme bu sürümde aktif değil.\":\"Photo entry is not available in this version.\",\"Özel miktar (ml)\":\"Custom amount (ml)\",\"Uyku Aşamaları\":\"Sleep stages\",\"Derin/REM analizi yakında burada gösterilecek.\":\"Deep/REM analysis will be shown here soon.\",\"Hızlı Erişim\":\"Quick access\",\"Ölçümler\":\"Measurements\",\"PDF Raporu\":\"PDF report\",\"Detaylı raporu PDF olarak cihazına kaydet veya paylaş.\":\"Save or share the detailed report as PDF on your device.\",\"PDF Oluştur\":\"Create PDF\",\"Raporu Paylaş\":\"Share report\",\"Paylaşım sırasında hata oluştu.\":\"An error occurred while sharing.\",\"PDF oluşturulamadı.\":\"PDF could not be created.\",\"Kilo Değişimi\":\"Weight change\",\"Kilo verisi bulunamadı.\":\"No weight data found.\",\"Makro Besin Dağılımı\":\"Macro distribution\",\"Uyku Başlangıcı\":\"Sleep start\",\"Uyanış Zamanı\":\"Wake time\",\"Uyku Kalitesi\":\"Sleep quality\",\"Uyku Ekle\":\"Add sleep\",\"Uyku nasıldı? Rüyalar, uyanmalar...\":\"How was your sleep? Dreams, awakenings...\",\"Kötü\":\"Poor\",\"Orta\":\"Fair\",\"İyi\":\"Good\",\"Mükemmel\":\"Excellent\",\"Su Hatırlatıcısı\":\"Water reminder\",\"Yemek Hatırlatıcıları\":\"Meal reminders\",\"Uyku Hatırlatıcısı\":\"Sleep reminder\",\"Yatma Saati\":\"Bedtime\",\"Öğün Hatırlatıcısı\":\"Meal reminder\",\"Günlük su hedefini tamamlamayı unutma.\":\"Don't forget to reach your daily water goal.\",\"Kahvaltı kaydını eklemeyi unutma.\":\"Don't forget to log breakfast.\",\"Öğle öğününü eklemeyi unutma.\":\"Don't forget to log lunch.\",\"Akşam öğününü eklemeyi unutma.\":\"Don't forget to log dinner.\",\"Uyku düzenini korumak için hazırlanma zamanı.\":\"Time to prepare for sleep.\",\"Birimler\":\"Units\",\"Metrik\":\"Metric\",\"İmperyal\":\"Imperial\",\"Metrik (kg, cm)\":\"Metric (kg, cm)\",\"İmperyal (lb, in)\":\"Imperial (lb, in)\",\"Rozetler ve Başarımlar\":\"Badges & achievements\",\"Devam et\":\"Keep going\",\"7 Gün Seri\":\"7-day streak\",\"Su Disiplini\":\"Water discipline\",\"Öğün Dengesi\":\"Meal balance\",\"Aktivite Serisi\":\"Activity streak\",\"Uyku Rutini\":\"Sleep routine\",\"Haftalık Uyku\":\"Weekly sleep\",\"Makrolar\":\"Macros\",\"\\\"2 bardak su\\\" veya \\\"30 dk yürüdüm\\\"\":\"\\\"2 glasses of water\\\" or \\\"30 min walk\\\"\",\"+{value}\":\"+{value}\",\"/{value} ml\":\"/{value} ml\",\"1. Günlük kayıtları \\\"Ekle\\\" sekmesinden girin.\":\"1. Add daily entries from the \\\"Add\\\" tab.\",\"2. Rapor ekranında trendleri inceleyin.\":\"2. Review trends on the report screen.\",\"3. Ayarlardan hedeflerinizi güncelleyin.\":\"3. Update your goals from settings.\",\"AI Asistan\":\"AI Assistant\",\"Adres: İstanbul, Türkiye\":\"Address: Istanbul, Turkey\",\"Aktivasyon\":\"Activation\",\"Aktivasyon Kodu\":\"Activation Code\",\"Aktive Et\":\"Activate\",\"Aktivite Kaydet\":\"Save Activity\",\"Aktivite Kaydı\":\"Activity Entry\",\"Aktivite hedefi (dk)\":\"Activity goal (min)\",\"Analiz Et ve Kaydet\":\"Analyze and Save\",\"Antrenman yeri\":\"Workout location\",\"Aydınlık tema\":\"Light theme\",\"Barkod Tara\":\"Scan Barcode\",\"Bağlantı hatası. Sonra tekrar deneyin.\":\"Connection error. Try again later.\",\"Başlangıç (2024-09-21T23:00)\":\"Start (2024-09-21T23:00)\",\"Başlangıç (ISO)\":\"Start (ISO)\",\"Beklenti\":\"Expectation\",\"Bitiş (2024-09-22T07:00)\":\"End (2024-09-22T07:00)\",\"Bitiş (ISO)\":\"End (ISO)\",\"Bize ulaşın\":\"Contact us\",\"Bu e-posta zaten kayıtlı.\":\"This email is already registered.\",\"CSV İndir\":\"Download CSV\",\"Destek hattı\":\"Support line\",\"Detaylı analiz\":\"Detailed analysis\",\"Dim Mod\":\"Dim Mode\",\"Dim tema\":\"Dim theme\",\"Dışa Aktarım\":\"Export\",\"E-posta\":\"Email\",\"E-posta: support@calmet.local\":\"Email: support@calmet.local\",\"En eski\":\"Oldest\",\"En yeni\":\"Newest\",\"Excel (.xls)\":\"Excel (.xls)\",\"Favoriler\":\"Favorites\",\"Filtreler\":\"Filters\",\"Free\":\"Free\",\"Geri Al\":\"Undo\",\"Geçmiş\":\"History\",\"Giriş Sayfası\":\"Login Page\",\"Giriş başarısız. Bilgileri kontrol edin.\":\"Login failed. Check your details.\",\"Gizlilik\":\"Privacy\",\"Gizlilik & Şartlar\":\"Privacy & Terms\",\"Google Fit\":\"Google Fit\",\"Gönder\":\"Send\",\"Görünümü Kaydet\":\"Save View\",\"Günlük Hatırlatıcı\":\"Daily Reminder\",\"Günlük aktivite süresini artırmayı dene.\":\"Try increasing your daily activity time.\",\"Günlük hedef {value} L\":\"Daily target {value} L\",\"Günlük kalori girişi\":\"Daily calorie intake\",\"Günlük plan\":\"Daily plan\",\"Günlük Özet\":\"Daily Summary\",\"Gıda Ara\":\"Search Food\",\"HH:mm\":\"HH:mm\",\"Haftada kaç gün?\":\"How many days per week?\",\"Haftalık Trend\":\"Weekly Trend\",\"Haftalık antrenman günü\":\"Weekly workout days\",\"Hatırlatıcı\":\"Reminder\",\"Hayır, uygulama tamamen çevrimdışı çalışır.\":\"No, the app works completely offline.\",\"Hedef {value} saat\":\"Goal {value} hours\",\"Hedefleri Kaydet\":\"Save Goals\",\"Henüz kayıt yok. Ekle sekmesiyle başlayın.\":\"No entries yet. Start from the Add tab.\",\"Henüz uyku kaydı yok.\":\"No sleep logs yet.\",\"Hesap Oluştur\":\"Create Account\",\"Hızlı Komut\":\"Quick Command\",\"Hızlı Komutlar\":\"Quick Commands\",\"Hızlı giriş\":\"Quick entry\",\"Hızlı işlemler\":\"Quick actions\",\"Hızlı kayıt\":\"Quick log\",\"KVKK & Şartlar\":\"KVKK & Terms\",\"Kalan {value} ml\":\"Remaining {value} ml\",\"Kalori Dengeli\":\"Calories Balanced\",\"Kalori Eksik\":\"Calories Deficit\",\"Kalori Fazlası\":\"Calories Surplus\",\"Kalori In\":\"Calories In\",\"Kalori Out\":\"Calories Out\",\"Kalori alımın hedefin altında. Dengeli öğünlerle destekle.\":\"Your calorie intake is below target. Support it with balanced meals.\",\"Kalori alımın hedefle uyumlu.\":\"Your calorie intake matches the target.\",\"Kalori, su, aktivite\":\"Calories, water, activity\",\"Kalori/100g\":\"Calories/100g\",\"Kamera izni verilmedi. Ayarlardan izin verin.\":\"Camera permission denied. Grant permission in settings.\",\"Karb\":\"Carbs\",\"Karbonhidrat hedefin düşük. Enerji dengesini gözden geçir.\":\"Your carb target is low. Review your energy balance.\",\"Kaydol\":\"Sign Up\",\"Kayıt Düzenle\":\"Edit Entry\",\"Kayıt Ekle\":\"Add Entry\",\"Kayıt başarısız.\":\"Save failed.\",\"Kayıt silindi.\":\"Entry deleted.\",\"Kayıtlar\":\"Entries\",\"Kayıtlı Görünümler\":\"Saved Views\",\"Kayıtlı ürünler\":\"Saved products\",\"Kilo, bel, yağ\":\"Weight, waist, fat\",\"Kişisel bilgiler\":\"Personal information\",\"Kişisel plan\":\"Personal plan\",\"Kişisel tercihler\":\"Personal preferences\",\"Komut yaz\":\"Type a command\",\"Kullanım rehberi\":\"User guide\",\"Kütüphane\":\"Library\",\"Kılavuz\":\"Guide\",\"Liste\":\"List\",\"Makro Bilgisi\":\"Macro Info\",\"Makro değerlerini doldurdukça raporun doğruluğu artar.\":\"As you fill in macro values, the report accuracy improves.\",\"Mesaj yaz\":\"Type a message\",\"Motivasyon\":\"Motivation\",\"Onboarding Tamamla\":\"Complete Onboarding\",\"Open Food Facts\":\"Open Food Facts\",\"Ortalama kalori alımın hedefin üzerinde. Porsiyonları dengede tut.\":\"Your average calorie intake is above target. Keep portions balanced.\",\"Ortalama kalori alımın hedefinin altında. Dengeli ve yeterli öğün planlamaya odaklan.\":\"Your average calorie intake is below target. Focus on balanced and sufficient meal planning.\",\"Ortalama kalori alımın hedefinin üstünde. Porsiyonları biraz küçültmek fayda sağlar.\":\"Your average calorie intake is above target. Slightly reducing portions helps.\",\"Paketleri Gör\":\"View Plans\",\"Premium\":\"Premium\",\"Premium Aktivasyonu\":\"Premium Activation\",\"Premium kodunu girerek aktive edin.\":\"Activate by entering your premium code.\",\"Premium seçenekler\":\"Premium options\",\"Premium'a Geç\":\"Upgrade to Premium\",\"Protein hedefinin altındasın. Kaynak çeşitliliğini artır.\":\"You are below your protein target. Increase source variety.\",\"Raporu aç\":\"Open report\",\"SSS\":\"FAQ\",\"Saat\":\"Time\",\"Sağlıklı yağ kaynaklarıyla hedefi yakalayabilirsin.\":\"You can reach the target with healthy fat sources.\",\"Sağlıklı yaşamı kolaylaştır\":\"Make healthy living easier\",\"Sesli yanıt\":\"Voice response\",\"Spor\":\"Workout\",\"Su Ekle\":\"Add Water\",\"Su Hedefi\":\"Water Target\",\"Su Kaydı\":\"Water Entry\",\"Su hedefi (ml)\":\"Water target (ml)\",\"Su tüketimin iyi gidiyor.\":\"Your water intake is going well.\",\"Su tüketimini artırmak enerji seviyeni destekler.\":\"Increasing water intake supports your energy levels.\",\"Sık sorulan\":\"Common questions\",\"Sık sorulanlar\":\"Frequently asked questions\",\"Sınırsız rapor ve gelişmiş analiz\":\"Unlimited reports and advanced analysis\",\"Takip günlerini artırırsan ilerlemen daha net görünür.\":\"If you increase tracking days, your progress will be clearer.\",\"Taramayı Durdur\":\"Stop Scanning\",\"Telefon: +90 212 000 00 00\":\"Phone: +90 212 000 00 00\",\"Temel takip ve raporlar\":\"Basic tracking and reports\",\"Toplamlar\":\"Totals\",\"Tutarlılık\":\"Consistency\",\"Tüm veriler cihazında saklanır\":\"All data is stored on your device\",\"Tüm veriler cihazınızdaki yerel veritabanında saklanır.\":\"All data is stored in the local database on your device.\",\"Tümü\":\"All\",\"Uyku\":\"Sleep\",\"Uyku Kaydet\":\"Save Sleep\",\"Uyku Kaydı\":\"Sleep Entry\",\"Uyku hedefi (saat)\":\"Sleep target (hours)\",\"Uyku kayıtları\":\"Sleep logs\",\"Uyku Özeti\":\"Sleep Summary\",\"Verilerim nerede saklanıyor?\":\"Where is my data stored?\",\"Verileriniz yalnızca cihazınızda saklanır.\":\"Your data is stored only on your device.\",\"Vücut takibi\":\"Body tracking\",\"Yardım\":\"Help\",\"Yemek Ara\":\"Search Food\",\"Yemek Kaydet\":\"Save Food\",\"Yemek Kaydı\":\"Food Entry\",\"Yemek Kütüphanesi\":\"Food Library\",\"Yeni Uyku\":\"New Sleep\",\"Yeni Ölçüm\":\"New Measurement\",\"Yeni Ürün\":\"New Product\",\"Yerel Katalog\":\"Local Catalog\",\"Yerel katalog\":\"Local catalog\",\"Yerel yardımcı\":\"Local assistant\",\"Yükleniyor...\":\"Loading...\",\"{hours} saat {minutes} dk\":\"{hours} hr {minutes} min\",\"{value} değer\":\"{value} value\",\"{value} dk\":\"{value} min\",\"{value} gün\":\"{value} days\",\"{value} kcal\":\"{value} kcal\",\"{value} kcal / 100g\":\"{value} kcal / 100g\",\"{value} saat\":\"{value} hr\",\"Çıkış Yap\":\"Log Out\",\"Ölçüm Ekle\":\"Add Measurement\",\"Öğün Düzeni\":\"Meal Routine\",\"Öğün sayısını düzenli tutmak dengeyi artırır.\":\"Keeping meal count regular improves balance.\",\"Ürün Ekle\":\"Add Product\",\"Ürün adı\":\"Product name\",\"Ürün ara\":\"Search product\",\"İnternet bağlantısı gerekli mi?\":\"Is an internet connection required?\",\"İnternet bağlantısı olmadan çalışır.\":\"Works without an internet connection.\",\"İptal\":\"Cancel\",\"İçecek Kaydet\":\"Save Drink\",\"İçecek Kaydı\":\"Drink Entry\",\"İçecek adı\":\"Drink name\",\"İçgörüler\":\"Insights\",\"Şifre\":\"Password\",\"Premium Aktif\":\"Premium active\",\"Premium Pasif\":\"Premium inactive\",\"Aktivasyon kodu gerekli.\":\"Activation code is required.\",\"Kod en az {value} karakter olmalı.\":\"Code must be at least {value} characters.\",\"Premium aktif edildi.\":\"Premium activated.\",\"E-posta ve şifre zorunludur.\":\"Email and password are required.\",\"Ana Sayfa\":\"Home\",\"Oturum kontrol ediliyor…\":\"Checking session…\",\"Yükleniyor…\":\"Loading…\",\"Hesabınla devam et\":\"Continue with your account\",\"Kalori, su ve aktivite kayıtlarını güvenle bulutta sakla; telefon, tablet ve bilgisayardan kaldığın yerden devam et.\":\"Securely store calorie, water, and activity logs in the cloud and pick up where you left off on phone, tablet, and desktop.\",\"Verilerin şifreli olarak Neon üzerinde yedeklenir.\":\"Your data is backed up encrypted on Neon.\",\"Tüm cihazlardan eriş\":\"Access from all devices\",\"Giriş yaptığında kayıtların otomatik senkronize olur.\":\"When you sign in, your entries sync automatically.\",\"Güvenli oturum\":\"Secure sign-in\",\"Auth0 ile Google ve Apple ile güvenli oturum.\":\"Secure sessions with Google and Apple via Auth0.\",\"Google ile devam et\":\"Continue with Google\",\"Apple ile devam et\":\"Continue with Apple\",\"veya\":\"or\",\"E-posta ile devam et\":\"Continue with email\",\"Google veya Apple ile saniyeler içinde başla.\":\"Get started in seconds with Google or Apple.\",\"Giriş yaparak\":\"By signing in, you accept the\",\"Kullanım Koşulları\":\"Terms of Use\",\"ve\":\"and\",\"'nı kabul etmiş olursun.\":\".\",\"Giriş yapmadan devam et\":\"Continue without signing in\",\"Yerel cihazınızda saklanır — bulut senkronu için giriş gerekir.\":\"Stored on your device — sign in for cloud sync.\"}"));}),
"[project]/packages/shared/src/locales/tr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Hedeflerden sapma ve uyum skoru\":\"Hedeflerden sapma ve uyum skoru\",\"Yağ\":\"Yağ\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"Henüz ölçüm yok. Profil sayfasından ekleyin.\",\"AI Destekli Sağlık Takibi\":\"AI Destekli Sağlık Takibi\",\"Yaş\":\"Yaş\",\"q\":\"q\",\"Öğün\":\"Öğün\",\"Beklentin\":\"Beklentin\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Öğün Ritmi Dengeli\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\",\"Ara\":\"Ara\",\"Limit yarın sıfırlanır.\":\"Limit yarın sıfırlanır.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\",\"CSV dışa aktarıldı.\":\"CSV dışa aktarıldı.\",\"Verilerini ciddiye alan sporcular için.\":\"Verilerini ciddiye alan sporcular için.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Yağ hedefi\",\"Ölçüm güncellendi\":\"Ölçüm güncellendi\",\"öğün\":\"öğün\",\"Belirtilmedi\":\"Belirtilmedi\",\"Su\":\"Su\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Kaydediliyor...\",\"Net\":\"Net\",\"Göğüs\":\"Göğüs\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"Vücudun için\",\"Takip edilen gün\":\"Takip edilen gün\",\"Preset veya özel miktar\":\"Preset veya özel miktar\",\"Limit doldu...\":\"Limit doldu...\",\"Ücretsiz Başla\":\"Ücretsiz Başla\",\"Açık\":\"Açık\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profil kaydedildi.\",\"Kütüphane kaydı başarısız.\":\"Kütüphane kaydı başarısız.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Görüntü tabanlı loglama şu an kapalıdır.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Hatırlatma için tarayıcı izni gereklidir.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"Grafikli PDF + Excel çıktısı\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performans Durumu\",\"Protein hedefi\":\"Protein hedefi\",\"Toplam Su\":\"Toplam Su\",\"source\":\"source\",\"100\":\"100\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Sorumluluk Reddi\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"AI Koçu şu an sadece AI Plus paketinde aktif.\",\"Düzenle\":\"Düzenle\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\",\"Daha İyi Bir Sen İçin\":\"Daha İyi Bir Sen İçin\",\"Hedefler\":\"Hedefler\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\",\"Kilo (kg)\":\"Kilo (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Bilinmeyen Ürün\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Hesap & Profil\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Grafik\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI özellikleri varsayılan olarak kapalı\",\"Aydınlık temaya dön\":\"Aydınlık temaya dön\",\"Toplam su\":\"Toplam su\",\"Cihazdaki kayıtları taşı\":\"Cihazdaki kayıtları taşı\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Toplam kayıt\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\",\"Spor yeri\":\"Spor yeri\",\"Görsel Veri Analizi\":\"Görsel Veri Analizi\",\"Paylaş\":\"Paylaş\",\"Excel Olarak İndir\":\"Excel Olarak İndir\",\"ekle yeni entry\":\"ekle yeni entry\",\"Makro Hedef Takibi\":\"Makro Hedef Takibi\",\"Aktivite Hedefi Güçlü\":\"Aktivite Hedefi Güçlü\",\"Akt. Kalori\":\"Akt. Kalori\",\"CSV içinde kayıt bulunamadı.\":\"CSV içinde kayıt bulunamadı.\",\"Karbonhidrat Düşük\":\"Karbonhidrat Düşük\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"175\":\"175\",\"Kalori değeri tahminidir\":\"Kalori değeri tahminidir\",\"Ölçüm silindi\":\"Ölçüm silindi\",\"Ad Soyad\":\"Ad Soyad\",\"Aktivite\":\"Aktivite\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\",\"Neden Calmet?\":\"Neden Calmet?\",\"İçe aktarılıyor...\":\"İçe aktarılıyor...\",\"Makro verisi oluştuğunda burada görünecek.\":\"Makro verisi oluştuğunda burada görünecek.\",\"Bel\":\"Bel\",\"Girilen ve yakılan kalori trendi\":\"Girilen ve yakılan kalori trendi\",\"Günlük ort. su\":\"Günlük ort. su\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Kilo & Ölçüm Trendleri\",\"Ayarlar\":\"Ayarlar\",\"AI Sağlık Koçu\":\"AI Sağlık Koçu\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Toplam kalori\",\"Hedef Kilo (kg)\":\"Hedef Kilo (kg)\",\"Profil sayfası\":\"Profil sayfası\",\"Filtreyi temizle\":\"Filtreyi temizle\",\"kcal\":\"kcal\",\"E-posta ile Gönder\":\"E-posta ile Gönder\",\"Kayıtların gün bazlı özeti\":\"Kayıtların gün bazlı özeti\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Tarayıcı bildirimi ile günlük hatırlatma.\",\"Aktivite Özeti\":\"Aktivite Özeti\",\"Bu bağlantının süresi dolmuş.\":\"Bu bağlantının süresi dolmuş.\",\"Su Girişi\":\"Su Girişi\",\"Yeni kayıt ekle\":\"Yeni kayıt ekle\",\"Yerel cihaz modu\":\"Yerel cihaz modu\",\"Kısa not (opsiyonel)...\":\"Kısa not (opsiyonel)...\",\"Bildirim izni açık.\":\"Bildirim izni açık.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Geri\",\"Stres\":\"Stres\",\"Favori yap\":\"Favori yap\",\"Hedef yok\":\"Hedef yok\",\"Vazgeç\":\"Vazgeç\",\"Hedef bilgisi henüz eklenmemiş.\":\"Hedef bilgisi henüz eklenmemiş.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Öne Çıkan Aktiviteler\",\"CSV Dışa Aktar\":\"CSV Dışa Aktar\",\"Aktivite eklendi\":\"Aktivite eklendi\",\"Protein\":\"Protein\",\"Sağlık Koçu\":\"Sağlık Koçu\",\"Öğün Ritmi Düşük\":\"Öğün Ritmi Düşük\",\"Günlük hatırlatma\":\"Günlük hatırlatma\",\"Aktivite Süresi\":\"Aktivite Süresi\",\"Cal AI Hatırlatma\":\"Calmet Hatırlatma\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Sakatlık detayını yaz\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Paylaşılıyor...\",\"Kayıt bulunamadı.\":\"Kayıt bulunamadı.\",\"Takip & Kayıt\":\"Takip & Kayıt\",\"Raporu Aç\":\"Raporu Aç\",\"Kullanım Şartları\":\"Kullanım Şartları\",\"Çıkış\":\"Çıkış\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Per\",\"Paylaşım ve Aktarım\":\"Paylaşım ve Aktarım\",\"Grafikler\":\"Grafikler\",\"KVKK\":\"KVKK\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profil kaydedilemedi. Tekrar dene.\",\"Español\":\"İspanyolca\",\"Uyum\":\"Uyum\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Haftalık Karşılaştırma\",\"Kısa açıklama\":\"Kısa açıklama\",\"Hızlı\":\"Hızlı\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Hesap\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Seri Rozetleri\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"Sonuç bulunamadı. Farklı bir kelime deneyin.\",\"Kilo & Ölçüm Takibi\":\"Kilo & Ölçüm Takibi\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Toplu içe aktarma (bulut)\",\"Tema güncellendi\":\"Tema güncellendi\",\"Performans Analizi\":\"Performans Analizi\",\"Makrolar (g)\":\"Makrolar (g)\",\"Günlük Veri Kayıtları\":\"Günlük Veri Kayıtları\",\"ml\":\"ml\",\"En çok kalori getiren seçimler\":\"En çok kalori getiren seçimler\",\"Kalori\":\"Kalori\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Hedef Uyum Skoru\",\"Hızlı Kalori Ekle\":\"Hızlı Kalori Ekle\",\"En Eski\":\"En Eski\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Yemek\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\",\"Öğün Ritmi\":\"Öğün Ritmi\",\"Paylaşım bağlantısı hazır.\":\"Paylaşım bağlantısı hazır.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"Henüz kayıt yok. İlk girişinizi ekleyin.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Portekizce\",\"Entegrasyonlar\":\"Entegrasyonlar\",\"unit\":\"unit\",\"Örn: 420\":\"Örn: 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Tarih\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Makro dengesini haftalık ritimle izleyin.\",\"Su hedefi\":\"Su hedefi\",\"dakika\":\"dakika\",\"Aktivite hedefi\":\"Aktivite hedefi\",\"Haftalık spor\":\"Haftalık spor\",\"Öğün Sayısı\":\"Öğün Sayısı\",\"Hemen Başla\":\"Hemen Başla\",\"Manuel ürünler ve favoriler\":\"Manuel ürünler ve favoriler\",\"Seç\":\"Seç\",\"Yerel ölçümler buluta taşındı\":\"Yerel ölçümler buluta taşındı\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Kalori Ortalaması Düşük\",\"Lütfen tüm soruları yanıtla.\":\"Lütfen tüm soruları yanıtla.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Aktif Günler\",\"Boy (cm)\":\"Boy (cm)\",\"Profil kaydedilemedi.\":\"Profil kaydedilemedi.\",\"Yürüyüş\":\"Yürüyüş\",\"Komut Paleti\":\"Komut Paleti\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Taşınıyor...\",\"Analiz Notu\":\"Analiz Notu\",\"Aranıyor...\":\"Aranıyor...\",\"250 ml su ekle\":\"250 ml su ekle\",\"Hedef uyumunun en yüksek olduğu günler\":\"Hedef uyumunun en yüksek olduğu günler\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Ölçümleri düzenli girerek trendi netleştir.\",\"Akt. Süre\":\"Akt. Süre\",\"Her Şey Tek Bir\":\"Her Şey Tek Bir\",\"Yasal\":\"Yasal\",\"Kalori Giriş\":\"Kalori Giriş\",\"Ortalama Aktivite\":\"Ortalama Aktivite\",\"Paneli aç\":\"Paneli aç\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Vücut Yağ %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Özellik Bayrakları\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\",\"Trendler\":\"Trendler\",\"Yüksek\":\"Yüksek\",\"Fikri Mülkiyet\":\"Fikri Mülkiyet\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Lütfen sakatlık detayını yaz.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\",\"Günlük Ort.\":\"Günlük Ort.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Rusça\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\",\"Aktivite Girişi\":\"Aktivite Girişi\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Merdiven\",\"Verilerin Kullanımı\":\"Verilerin Kullanımı\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Su Takibi Güçlü\",\"İleri\":\"İleri\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"Bağlantı hatalı veya kaldırılmış olabilir.\",\"Kullanıcı\":\"Kullanıcı\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Bitir\",\"a\":\"a\",\"Yemek Girişi\":\"Yemek Girişi\",\"Konu\":\"Konu\",\"Haftalık Su Alımı\":\"Haftalık Su Alımı\",\"Kamera açılıyor...\":\"Kamera açılıyor...\",\"Favoriye kaydet\":\"Favoriye kaydet\",\"refresh_token\":\"refresh_token\",\"26\":\"26\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Zirve Günler\",\"Veri Sorumlusu\":\"Veri Sorumlusu\",\"Doktor kısıtı\":\"Doktor kısıtı\",\"Henüz aktivite kaydı yok.\":\"Henüz aktivite kaydı yok.\",\"Ana hedef\":\"Ana hedef\",\"Güncellendi\":\"Güncellendi\",\"Bugün Özeti\":\"Bugün Özeti\",\"Motivasyon Notu\":\"Motivasyon Notu\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Hızlı Ekleme\",\"Tüm Zamanlar\":\"Tüm Zamanlar\",\"Öğün hedefi\":\"Öğün hedefi\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"Filtrelere uygun kayıt bulunamadı.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"Kredi kartı gerekmez. Saniyeler içinde başla.\",\"Kalori hedefi\":\"Kalori hedefi\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Detaylar\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"Sağlıklı yaşama ilk adımı atanlar için.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Öğün toplamı\",\"Yağ Hedefi (g)\":\"Yağ Hedefi (g)\",\"Tüm ürünler\":\"Tüm ürünler\",\"Sıkça Sorulanlar\":\"Sıkça Sorulanlar\",\"Özet\":\"Özet\",\"Sadece favoriler\":\"Sadece favoriler\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Karbonhidrat / Yağ\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Bugün İlk Adımı At.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Panel\",\"Takip Sürekliliği Güçlü\":\"Takip Sürekliliği Güçlü\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Ürün Ara veya Manuel Gir...\",\"Atıştırmalık\":\"Atıştırmalık\",\"Su (ml)\":\"Su (ml)\",\"Makro Dağılımı\":\"Makro Dağılımı\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Yağ Hedefi\",\"Su Takibi\":\"Su Takibi\",\"Pzt\":\"Pzt\",\"Akıllı Panelde.\":\"Akıllı Panelde.\",\"Calmet AI\":\"Calmet AI\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"KVKK Aydınlatma Metni\",\"İletişim\":\"İletişim\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Özellikleri\",\"Plan Seçimi\":\"Plan Seçimi\",\"Güvenlik\":\"Güvenlik\",\"Değişiklikler\":\"Değişiklikler\",\"Toplanan Veriler\":\"Toplanan Veriler\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"Ölçüm eklediğinizde çizgi oluşur.\",\"Yerel kayıtlar buluta taşındı\":\"Yerel kayıtlar buluta taşındı\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"İsmini ekle\",\"Haftalık Sapma Analizi\":\"Haftalık Sapma Analizi\",\"provider\":\"provider\",\"Ayar\":\"Ayarlar\",\"ayarlar settings\":\"ayarlar settings\",\"Lütfen bu soruyu yanıtla.\":\"Lütfen bu soruyu yanıtla.\",\"su hızlı\":\"su hızlı\",\"AI Gücünü Keşfet\":\"AI Gücünü Keşfet\",\"Paylaşım bulunamadı\":\"Paylaşım bulunamadı\",\"Henüz öğün kaydı yok.\":\"Henüz öğün kaydı yok.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Kullan\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"Bağlantı açık rapor görünümüne yönlendirir.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Kalori Dengesi\",\"Miktar (ml)\":\"Miktar (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Ortalama değerler ile hedef karşılaştırması\",\"İşlenen Veri Kategorileri\":\"İşlenen Veri Kategorileri\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Yapay zeka gücüyle kişisel koçunuz.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Saklama Süresi\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Öğün hedef günleri\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Hedefleri Güncelle\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Kalori\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Barkodu kadraja alın.\",\"Profil tamamlama\":\"Profil tamamlama\",\"Bisiklet\":\"Bisiklet\",\"Kalori (kcal)\":\"Kalori (kcal)\",\"Urun\":\"Urun\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Hedefe yaklaşma\",\"Kahvaltı\":\"Kahvaltı\",\"Yağ (g)\":\"Yağ (g)\",\"Hızlı Bağlantılar\":\"Hızlı Bağlantılar\",\"Kaydet\":\"Kaydet\",\"Paylaşılan Rapor\":\"Paylaşılan Rapor\",\"Tüm Öğünler\":\"Tüm Öğünler\",\"Français\":\"Fransızca\",\"Kütüphane yüklenemedi.\":\"Kütüphane yüklenemedi.\",\"Kişisel Bilgiler\":\"Kişisel Bilgiler\",\"Haftalık Sapma\":\"Haftalık Sapma\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Geçerli bir barkod girin.\",\"Süre (dk)\":\"Süre (dk)\",\"Su takibi başladığında burada görünecek.\":\"Su takibi başladığında burada görünecek.\",\"Yağ Hedefi Düşük\":\"Yağ Hedefi Düşük\",\"En Akıllı Yol.\":\"En Akıllı Yol.\",\"Aktivite Süresi Düşük\":\"Aktivite Süresi Düşük\",\"Su eklendi\":\"Su eklendi\",\"En Etkili Günler\":\"En Etkili Günler\",\"Tüm Tipler\":\"Tüm Tipler\",\"tema görünüm\":\"tema görünüm\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Hizmet Tanımı\",\"Kütüphane yükleniyor...\":\"Kütüphane yükleniyor...\",\"Sağlıklı Yaşam\":\"Sağlıklı Yaşam\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Karbonhidrat Hedefi\",\"Görünüm adı\":\"Görünüm adı\",\"Kamera izni alınamadı.\":\"Kamera izni alınamadı.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Kayıt Sayısı\",\"Paylaşım oluşturulamadı.\":\"Paylaşım oluşturulamadı.\",\"Y\":\"Y\",\"Karbonhidrat Hedefi (g)\":\"Karbonhidrat Hedefi (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profil kullanıcı\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manuel\",\"Diyetisyen modu açık\":\"Diyetisyen modu açık\",\"Favori\":\"Favori\",\"Karbonhidrat\":\"Karbonhidrat\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Öne çıkanlar\",\"Başlangıç\":\"Başlangıç\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Aktivite eklendi (yerel)\",\"Cmt\":\"Cmt\",\"7 Günlük İlerleme Analizi\":\"7 Günlük İlerleme Analizi\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Kütüphanede ara\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Türkçe\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Gerçeğe Dönüştürün\",\"Henüz kayıtlı ürün yok.\":\"Henüz kayıtlı ürün yok.\",\"Kilitli\":\"Kilitli\",\"Geri al\":\"Geri al\",\"Su Tüketimi\":\"Su Tüketimi\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Veri Yönetimi\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Ara: öğün, aktivite...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manuel kalori girişi\",\"Yakılan\":\"Yakılan\",\"Tema\":\"Tema\",\"Yemek eklendi\":\"Yemek eklendi\",\"rapor pdf export\":\"rapor pdf export\",\"Bizi nereden duydun?\":\"Bizi nereden duydun?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Ort. Kalori\",\"Net Değişim\":\"Net Değişim\",\"Aktivite süresi\":\"Aktivite süresi\",\"Günlük öğün ritmi\":\"Günlük öğün ritmi\",\"Barkod bulunamadı.\":\"Barkod bulunamadı.\",\"Hedef uyum skoru\":\"Hedef uyum skoru\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"PDF Olarak Kaydet\",\"Hedefler güncellendi\":\"Hedefler güncellendi\",\"Keşfet\":\"Keşfet\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Miktar (g)\",\"Akşam\":\"Akşam\",\"Karbonhidrat hedefi\":\"Karbonhidrat hedefi\",\"Aktivite Rozetleri\":\"Aktivite Rozetleri\",\"Suya Yaklaştın\":\"Suya Yaklaştın\",\"Calmet nedir?\":\"Calmet nedir?\",\"Sağlık platformlarını bağla\":\"Sağlık platformlarını bağla\",\"Not\":\"Not\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Bildirim izni reddedildi.\",\"Ağırlık\":\"Ağırlık\",\"Gün\":\"Gün\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"E-posta Gönder\",\"Ortalama Su\":\"Ortalama Su\",\"Abonelikler\":\"Abonelikler\",\"Sıkça Sorulan Sorular\":\"Sıkça Sorulan Sorular\",\"Favori güncellenemedi.\":\"Favori güncellenemedi.\",\"Sal\":\"Sal\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Kalori Çıkış\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Genel Performans Özeti\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barkod aranamadı.\",\"Hatırlatıcı güncellendi\":\"Hatırlatıcı güncellendi\",\"Toplu içe aktarma (cihaz)\":\"Toplu içe aktarma (cihaz)\",\"Ekle\":\"Ekle\",\"Toplam Kalori\":\"Toplam Kalori\",\"Diyetisyen modu kapalı\":\"Diyetisyen modu kapalı\",\"Abonelik & Ödeme\":\"Abonelik & Ödeme\",\"CSV İçe Aktar\":\"CSV İçe Aktar\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Hareket yoğunluğu özeti\",\"Beslenme Raporu\":\"Beslenme Raporu\",\"Profil\":\"Profil\",\"500 ml su ekle\":\"500 ml su ekle\",\"Ölçüm eklendi\":\"Ölçüm eklendi\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filtreleyip kayıtları hızlıca bulun.\",\"Hatırlatıcılar\":\"Hatırlatıcılar\",\"error\":\"error\",\"Hesabım\":\"Hesabım\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Küçük adımlar büyük değişimi başlatır. Devam et!\",\"Tahmini kalori\":\"Tahmini kalori\",\"Ürün\":\"Ürün\",\"Rozetler\":\"Rozetler\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Su eklendi (yerel)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Zayıf\",\"Akt.\":\"Akt.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"Geçmiş Kayıtlar\",\"Günlük Kalori Hedefi\":\"Günlük Kalori Hedefi\",\"kez tüketildi\":\"kez tüketildi\",\"AI Görsel Tanıma\":\"AI Görsel Tanıma\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\",\"Cum\":\"Cum\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\",\"Günlük Öğün Hedefi (adet)\":\"Günlük Öğün Hedefi (adet)\",\"Net kalori\":\"Net kalori\",\"Gizlilik Politikası\":\"Gizlilik Politikası\",\"Paylaşmak için giriş yapın.\":\"Paylaşmak için giriş yapın.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Öğün Rozetleri\",\"Cal AI Rapor\":\"Calmet Rapor\",\"Kişiye Özel Diyet Takvimi\":\"Kişiye Özel Diyet Takvimi\",\"Ücretsiz\":\"Ücretsiz\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Tarayıcı bildirimleri desteklenmiyor.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Öne çıkan metrik değerlendirmeleri\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"varsayılan\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Sakatlık detayı\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Paylaşım Bağlantısı\",\"Ürün kütüphaneye kaydedildi.\":\"Ürün kütüphaneye kaydedildi.\",\"kg\":\"kg\",\"light\":\"light\",\"Giriş Yap\":\"Giriş Yap\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Ürün araması için en az 3 harf yazın.\",\"Kişisel Veri Güvenliği\":\"Kişisel Veri Güvenliği\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Bugünkü Özet\",\"Koşu\":\"Koşu\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Haklarınız\",\"Güncel kilo\":\"Güncel kilo\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"İlk kayıtlarını eklediğinde rozetler görünür.\",\"Kapalı\":\"Kapalı\",\"Ücretsiz Hesabını Oluştur\":\"Ücretsiz Hesabını Oluştur\",\"Oto hesapla\":\"Oto hesapla\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Buluta kaydedilemedi, cihazına kaydedildi.\",\"Takip Sürekliliği Zayıf\":\"Takip Sürekliliği Zayıf\",\"Kamera veya barkod numarası\":\"Kamera veya barkod numarası\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Kilo\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"Uygulama dili\",\"Yemek adı\":\"Yemek adı\",\"Yüzme\":\"Yüzme\",\"Öğün kayıtları başladığında burada görünecek.\":\"Öğün kayıtları başladığında burada görünecek.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"Planları Gör\",\"Enerji dengesinin hareketini takip edin.\":\"Enerji dengesinin hareketini takip edin.\",\"70\":\"70\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"Seçilen ölçüm için veri yok.\",\"Aktivite (dk)\":\"Aktivite (dk)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Günlük Aktivite Hedefi (dk)\",\"Görünüm Kaydet\":\"Görünüm Kaydet\",\"Kişisel Analiz ve Motivasyon\":\"Kişisel Analiz ve Motivasyon\",\"Haftalık Kalori Dengesi\":\"Haftalık Kalori Dengesi\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Tarayıcı barkod taramayı desteklemiyor.\",\"Destek\":\"Destek\",\"Yerel cihazınızda saklanır\":\"Yerel cihazınızda saklanır\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Sakatlık\",\"Komut ara...\":\"Komut ara...\",\"Makro Verisi Eksik\":\"Makro Verisi Eksik\",\"Destek e-postamız:\":\"Destek e-postamız:\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\",\"Dönem\":\"Dönem\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Premiuma Geç\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Yemek eklendi (yerel)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Aktivite kayıtları başladığında burada görünecek.\",\"Protein Hedefi (g)\":\"Protein Hedefi (g)\",\"Günlük Detaylar\":\"Günlük Detaylar\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Otomatik Kalori Hesaplama\",\"Sil\":\"Sil\",\"Kalori, su ve makro değişimleri\":\"Kalori, su ve makro değişimleri\",\"Kayıt güncellendi\":\"Kayıt güncellendi\",\"Beslenme Tercihleri\":\"Beslenme Tercihleri\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Hedeflerinizi\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Hedefe yaklaşan günleri vurgular.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV içe/dışa aktarma (cihaz veya bulut).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Son kayıt\",\"Kişisel Yorumlar\":\"Kişisel Yorumlar\",\"Kopyala\":\"Kopyala\",\"Toplam ölçüm\":\"Toplam ölçüm\",\"İşleme Amaçları\":\"İşleme Amaçları\",\"Genel İstatistikler\":\"Genel İstatistikler\",\"Aktiviteye Yaklaştın\":\"Aktiviteye Yaklaştın\",\"Tarih/Saat\":\"Tarih/Saat\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"Henüz öne çıkan gün yok.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Günlük Su Hedefi (ml)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Kamerayı kapat\",\"Paz\":\"Paz\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"İngilizce\",\"Kalori Ortalaması Yüksek\":\"Kalori Ortalaması Yüksek\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Özellik bayrakları güncellendi\",\"Protein Hedefi Düşük\":\"Protein Hedefi Düşük\",\"Bulut (Neon) aktif\":\"Bulut (Neon) aktif\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Hedeflere Yakınlık\",\"Kalori girişi ve çıkışı\":\"Kalori girişi ve çıkışı\",\"Paketler\":\"Paketler\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Kütüphane için ürün adı gerekli.\",\"Dikkat\":\"Dikkat\",\"Kayıt Geçmişi\":\"Kayıt Geçmişi\",\"İsim\":\"İsim\",\"Mesajın\":\"Mesajın\",\"Aktivite Girdisi\":\"Aktivite Girdisi\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Dim temayı aç\",\"Ortalama Kalori\":\"Ortalama Kalori\",\"Performans Özeti\":\"Performans Özeti\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Su Tüketimi Düşük\",\"Protein Hedefi\":\"Protein Hedefi\",\"Ürün Kütüphanesi\":\"Ürün Kütüphanesi\",\"Sabit\":\"Sabit\",\"Öğle\":\"Öğle\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Ürün silinemedi.\",\"Günlük ort. kalori\":\"Günlük ort. kalori\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Su takibin iyi, bu tempo toparlanmayı destekler.\",\"panel dashboard home\":\"panel dashboard home\",\"Fazla\":\"Fazla\",\"K\":\"K\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Günlük su trendi\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\",\"Barkod ile bul\":\"Barkod ile bul\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Su Rozetleri\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Hazır Öğün Şablonları\",\"Henüz haftalık veri yok.\":\"Henüz haftalık veri yok.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barkod numarası\",\"Günlük hareket dakikaları\":\"Günlük hareket dakikaları\",\"PDF raporu aç\":\"PDF raporu aç\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Mevcut seri\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Öne Çıkan Öğünler\",\"Aktivite temposunu görselleştirir.\":\"Aktivite temposunu görselleştirir.\",\"Karbonhidrat (g)\":\"Karbonhidrat (g)\",\"Hafta\":\"Hafta\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Detaylı Grafikler\",\"Tahmini\":\"Tahmini\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Özellikler\",\"Rapor Dışa Aktarım\":\"Rapor Dışa Aktarım\",\"Dil\":\"Dil\",\"Ekipman durumu\":\"Ekipman durumu\",\"Kalça\":\"Kalça\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\",\"Barkod tara\":\"Barkod tara\",\"Güçlü\":\"Güçlü\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Esc ile kapat • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\",\"Aktivite kalorisi\":\"Aktivite kalorisi\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Kalori Dengesi İyi\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"CSV okunamadı. Formatı kontrol edin.\",\"Açıldı\":\"Açıldı\",\"Girilen ve tahmini yakılan kalori\":\"Girilen ve tahmini yakılan kalori\",\"Yerel profil\":\"Yerel profil\",\"image_url\":\"image_url\",\"Sapma\":\"Sapma\",\"Yardım Merkezi\":\"Yardım Merkezi\",\"En Çok Tercih Edilen\":\"En Çok Tercih Edilen\",\"Tüm kayıtların özet görünümü.\":\"Tüm kayıtların özet görünümü.\",\"Kütüphaneye kaydet\":\"Kütüphaneye kaydet\",\"Premium modüllerini bu panelden yönetin.\":\"Premium modüllerini bu panelden yönetin.\",\"Ort. Protein\":\"Ort. Protein\",\"Spor seviyesi\":\"Spor seviyesi\",\"Ücretlendirme\":\"Ücretlendirme\",\"textarea\":\"textarea\",\"Su Alımı\":\"Su Alımı\",\"İzin Ver\":\"İzin Ver\",\"Bir şeyler sor...\":\"Bir şeyler sor...\",\"Sesli Konuş\":\"Sesli Konuş\",\"Sesli\":\"Sesli\",\"Dinlemeyi Durdur\":\"Dinlemeyi Durdur\",\"Dinleniyor...\":\"Dinleniyor...\",\"Otomatik Konuşma\":\"Otomatik Konuşma\",\"Otomatik Konuşmayı Kapat\":\"Otomatik Konuşmayı Kapat\",\"Konuşuyor...\":\"Konuşuyor...\",\"Yazılıyor...\":\"Yazılıyor...\",\"Pro Bağlantıları\":\"Pro Bağlantıları\",\"En Yeni\":\"En Yeni\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Bildirim izni verilmedi.\",\"Ayarları aç\":\"Ayarları aç\",\"Rapor yükleniyor...\":\"Rapor yükleniyor...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Uyum Skoru\",\"dk\":\"dk\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Kamera erişimi desteklenmiyor.\",\"Öğün düzenini gün gün izleyin.\":\"Öğün düzenini gün gün izleyin.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Kayıt silindi\",\"Kullanıcı Sorumlulukları\":\"Kullanıcı Sorumlulukları\",\"Rapor\":\"Rapor\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Öğün hedefi oranı\",\"Car\":\"Car\",\"Kapat\":\"Kapat\",\"Kayıt Ol\":\"Kayıt Ol\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\",\"Pro'ya Yükselt\":\"Pro'ya Yükselt\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"AI Koçu sadece AI PLUS paketine özeldir.\",\"Cevap üretilemedi.\":\"Cevap üretilemedi.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"Bir hata oluştu. Lütfen tekrar deneyin.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\",\"Sesli giriş\":\"Sesli giriş\",\"Bir elma yedim ve 2 bardak su içtim.\":\"Bir elma yedim ve 2 bardak su içtim.\",\"Konuş\":\"Konuş\",\"Durdur\":\"Durdur\",\"Söylediğin cümle burada görünecek.\":\"Söylediğin cümle burada görünecek.\",\"Sesli giriş desteklenmiyor.\":\"Sesli giriş desteklenmiyor.\",\"Sesli giriş anlaşılamadı.\":\"Sesli giriş anlaşılamadı.\",\"Sesli giriş: {count} kayıt eklendi.\":\"Sesli giriş: {count} kayıt eklendi.\",\"{count} öğünde kalori bulunamadı.\":\"{count} öğünde kalori bulunamadı.\",\"Mikrofon izni alınamadı.\":\"Mikrofon izni alınamadı.\",\"Ses tanıma hatası oluştu.\":\"Ses tanıma hatası oluştu.\",\"Ana Sayfa\":\"Ana Sayfa\",\"Oturum kontrol ediliyor…\":\"Oturum kontrol ediliyor…\",\"Yükleniyor…\":\"Yükleniyor…\",\"Hesabınla devam et\":\"Hesabınla devam et\",\"Kalori, su ve aktivite kayıtlarını güvenle bulutta sakla; telefon, tablet ve bilgisayardan kaldığın yerden devam et.\":\"Kalori, su ve aktivite kayıtlarını güvenle bulutta sakla; telefon, tablet ve bilgisayardan kaldığın yerden devam et.\",\"Verilerin şifreli olarak Neon üzerinde yedeklenir.\":\"Verilerin şifreli olarak Neon üzerinde yedeklenir.\",\"Tüm cihazlardan eriş\":\"Tüm cihazlardan eriş\",\"Giriş yaptığında kayıtların otomatik senkronize olur.\":\"Giriş yaptığında kayıtların otomatik senkronize olur.\",\"Güvenli oturum\":\"Güvenli oturum\",\"Auth0 ile Google ve Apple ile güvenli oturum.\":\"Auth0 ile Google ve Apple ile güvenli oturum.\",\"Google ile devam et\":\"Google ile devam et\",\"Apple ile devam et\":\"Apple ile devam et\",\"veya\":\"veya\",\"E-posta ile devam et\":\"E-posta ile devam et\",\"Google veya Apple ile saniyeler içinde başla.\":\"Google veya Apple ile saniyeler içinde başla.\",\"Giriş yaparak\":\"Giriş yaparak\",\"Kullanım Koşulları\":\"Kullanım Koşulları\",\"ve\":\"ve\",\"'nı kabul etmiş olursun.\":\"'nı kabul etmiş olursun.\",\"Giriş yapmadan devam et\":\"Giriş yapmadan devam et\",\"Yerel cihazınızda saklanır — bulut senkronu için giriş gerekir.\":\"Yerel cihazınızda saklanır — bulut senkronu için giriş gerekir.\"}"));}),
"[project]/packages/shared/src/locales/es.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Hedeflerden sapma ve uyum skoru\":\"Deviation from goals and adherence score\",\"Yağ\":\"Grasa\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"No measurements yet. Add them from the profile page.\",\"AI Destekli Sağlık Takibi\":\"Seguimiento de Salud con IA\",\"Yaş\":\"Age\",\"q\":\"q\",\"Öğün\":\"Meal\",\"Beklentin\":\"Your expectation\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Balanced Meal Rhythm\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Calories burned is an estimate. User edits always take precedence.\",\"Ara\":\"Search\",\"Limit yarın sıfırlanır.\":\"El límite se reinicia mañana.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Personalize your profile and clarify your goals.\",\"CSV dışa aktarıldı.\":\"CSV exported.\",\"Verilerini ciddiye alan sporcular için.\":\"Para atletas comprometidos.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Fat goal\",\"Ölçüm güncellendi\":\"Measurement updated\",\"öğün\":\"meal\",\"Belirtilmedi\":\"Not specified\",\"Su\":\"Agua\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Saving...\",\"Net\":\"Net\",\"Göğüs\":\"Chest\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"Para tu cuerpo\",\"Takip edilen gün\":\"Tracked days\",\"Preset veya özel miktar\":\"Preset or custom amount\",\"Limit doldu...\":\"Límite alcanzado...\",\"Ücretsiz Başla\":\"Gratis\",\"Açık\":\"On\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profile saved.\",\"Kütüphane kaydı başarısız.\":\"Library save failed.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Image-based logging is currently disabled.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"This report is for informational purposes only. It does not provide medical advice.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Browser permission is required for reminders.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"PDF with charts + Excel export\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performance Status\",\"Protein hedefi\":\"Protein goal\",\"Toplam Su\":\"Total Water\",\"source\":\"source\",\"100\":\"100\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Descargo de Responsabilidad\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"El Coach de IA solo está activo en el plan AI Plus.\",\"Düzenle\":\"Editar\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Your activity time is below target. Adding 10–15 minutes daily helps.\",\"Daha İyi Bir Sen İçin\":\"Para un Mejor Tú\",\"Hedefler\":\"Goals\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Calorie intake matches your target; keep the rhythm.\",\"Kilo (kg)\":\"Weight (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Unknown Product\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Cuenta y Perfil\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Chart\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI features are off by default.\",\"Aydınlık temaya dön\":\"Switch to light theme\",\"Toplam su\":\"Total water\",\"Cihazdaki kayıtları taşı\":\"Transferir registros locales\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Total entries\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"¡Hola! Soy tu Coach de Salud Calmet IA. ¿Cómo puedo ayudarte con tus objetivos de nutrición o entrenamiento hoy?\",\"Spor yeri\":\"Workout location\",\"Görsel Veri Analizi\":\"Visual Data Analysis\",\"Paylaş\":\"Share\",\"Excel Olarak İndir\":\"Download as Excel\",\"ekle yeni entry\":\"add new entry\",\"Makro Hedef Takibi\":\"Macro Goal Tracking\",\"Aktivite Hedefi Güçlü\":\"Strong Activity Target\",\"Akt. Kalori\":\"Act. Calories\",\"CSV içinde kayıt bulunamadı.\":\"No entries found in the CSV.\",\"Karbonhidrat Düşük\":\"Low Carbs\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"175\":\"175\",\"Kalori değeri tahminidir\":\"Calorie value is an estimate\",\"Ölçüm silindi\":\"Measurement deleted\",\"Ad Soyad\":\"Full Name\",\"Aktivite\":\"Actividad\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Mucho más que una simple aplicación de seguimiento. Combinamos datos científicos con tecnología moderna.\",\"Neden Calmet?\":\"¿Por qué Calmet?\",\"İçe aktarılıyor...\":\"Importando...\",\"Makro verisi oluştuğunda burada görünecek.\":\"It will appear here once macro data is available.\",\"Bel\":\"Waist\",\"Girilen ve yakılan kalori trendi\":\"Trend of calories in and out\",\"Günlük ort. su\":\"Avg. daily water\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Weight & Measurement Trends\",\"Ayarlar\":\"Ajustes\",\"AI Sağlık Koçu\":\"Coach de Salud IA\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Total calories\",\"Hedef Kilo (kg)\":\"Peso Objetivo (kg)\",\"Profil sayfası\":\"Profile page\",\"Filtreyi temizle\":\"Clear filters\",\"kcal\":\"kcal\",\"E-posta ile Gönder\":\"Enviar por email\",\"Kayıtların gün bazlı özeti\":\"Daily summary of entries\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Daily reminders via browser notifications.\",\"Aktivite Özeti\":\"Activity Summary\",\"Bu bağlantının süresi dolmuş.\":\"This link has expired.\",\"Su Girişi\":\"Water Entry\",\"Yeni kayıt ekle\":\"Add new entry\",\"Yerel cihaz modu\":\"Modo dispositivo local\",\"Kısa not (opsiyonel)...\":\"Short note (optional)...\",\"Bildirim izni açık.\":\"Notification permission granted.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Volver\",\"Stres\":\"Stres\",\"Favori yap\":\"Mark as favorite\",\"Hedef yok\":\"No goal\",\"Vazgeç\":\"Cancelar\",\"Hedef bilgisi henüz eklenmemiş.\":\"Goal info not added yet.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Top Activities\",\"CSV Dışa Aktar\":\"Exportar CSV\",\"Aktivite eklendi\":\"Activity added\",\"Protein\":\"Proteína\",\"Sağlık Koçu\":\"Coach de Salud\",\"Öğün Ritmi Düşük\":\"Low Meal Rhythm\",\"Günlük hatırlatma\":\"Recordatorio diario\",\"Aktivite Süresi\":\"Activity Duration\",\"Cal AI Hatırlatma\":\"Calmet Reminder\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Enter injury details\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Sharing...\",\"Kayıt bulunamadı.\":\"No records found.\",\"Takip & Kayıt\":\"Seguimiento y Registros\",\"Raporu Aç\":\"Abrir Informe\",\"Kullanım Şartları\":\"Términos\",\"Çıkış\":\"Cerrar sesión\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Jue\",\"Paylaşım ve Aktarım\":\"Intercambio y Transferencia\",\"Grafikler\":\"Charts\",\"KVKK\":\"Protección de Datos\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profile could not be saved. Try again.\",\"Español\":\"Español\",\"Uyum\":\"Adherence\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Create a quick entry by entering calories and selecting a meal.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Badges unlock based on streak, water, activity, and meal discipline goals.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Weekly Comparison\",\"Kısa açıklama\":\"Short description\",\"Hızlı\":\"Quick\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Cuenta\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Streak Badges\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"No results found. Try a different keyword.\",\"Kilo & Ölçüm Takibi\":\"Weight & Measurement Tracking\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Bulk import (cloud)\",\"Tema güncellendi\":\"Theme updated\",\"Performans Analizi\":\"Performance Analysis\",\"Makrolar (g)\":\"Macros (g)\",\"Günlük Veri Kayıtları\":\"Daily Records\",\"ml\":\"ml\",\"En çok kalori getiren seçimler\":\"Highest calorie choices\",\"Kalori\":\"Calorías\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Goal Alignment Score\",\"Hızlı Kalori Ekle\":\"Quick Calorie Add\",\"En Eski\":\"Oldest\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Food\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Activity looks low; even short walks help balance.\",\"Öğün Ritmi\":\"Meal Rhythm\",\"Paylaşım bağlantısı hazır.\":\"Share link is ready.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"No entries yet. Add your first entry.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"You're below your protein goal. Strengthen your daily protein intake.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Portugués\",\"Entegrasyonlar\":\"Integrations\",\"unit\":\"unit\",\"Örn: 420\":\"E.g., 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Date\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Track macro balance week by week.\",\"Su hedefi\":\"Water goal\",\"dakika\":\"minutes\",\"Aktivite hedefi\":\"Activity goal\",\"Haftalık spor\":\"Weekly workouts\",\"Öğün Sayısı\":\"Meal Count\",\"Hemen Başla\":\"Empezar\",\"Manuel ürünler ve favoriler\":\"Manual products and favorites\",\"Seç\":\"Select\",\"Yerel ölçümler buluta taşındı\":\"Local measurements moved to the cloud\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Low Calorie Average\",\"Lütfen tüm soruları yanıtla.\":\"Please answer all questions.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Active Days\",\"Boy (cm)\":\"Height (cm)\",\"Profil kaydedilemedi.\":\"Profile could not be saved.\",\"Yürüyüş\":\"Walking\",\"Komut Paleti\":\"Command Palette\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Transfiriendo...\",\"Analiz Notu\":\"Analysis Note\",\"Aranıyor...\":\"Searching...\",\"250 ml su ekle\":\"Add 250 ml water\",\"Hedef uyumunun en yüksek olduğu günler\":\"Days with the highest goal alignment\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Enter measurements regularly to clarify the trend.\",\"Akt. Süre\":\"Act. Duration\",\"Her Şey Tek Bir\":\"Todo en Uno\",\"Yasal\":\"Legal\",\"Kalori Giriş\":\"Calorie Intake\",\"Ortalama Aktivite\":\"Average Activity\",\"Paneli aç\":\"Open dashboard\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Body Fat %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Feature Flags\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Your water intake is below target. Adding 1–2 glasses during the day can help.\",\"Trendler\":\"Trends\",\"Yüksek\":\"Obese\",\"Fikri Mülkiyet\":\"Propiedad Intelectual\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Please provide injury details.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Fat goal is low. Try adding healthy fat sources.\",\"Günlük Ort.\":\"Daily Avg.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Ruso\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Some entries lack macro data. Choose products for clearer tracking.\",\"Aktivite Girişi\":\"Activity Entry\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Stairs\",\"Verilerin Kullanımı\":\"Uso de Datos\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Strong Hydration\",\"İleri\":\"Siguiente\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"The link is invalid or may have been removed.\",\"Kullanıcı\":\"User\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Finish\",\"a\":\"a\",\"Yemek Girişi\":\"Food Entry\",\"Konu\":\"Asunto\",\"Haftalık Su Alımı\":\"Weekly Water Intake\",\"Kamera açılıyor...\":\"Opening camera...\",\"Favoriye kaydet\":\"Save to favorites\",\"refresh_token\":\"refresh_token\",\"26\":\"26\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Top Days\",\"Veri Sorumlusu\":\"Responsable del Tratamiento\",\"Doktor kısıtı\":\"Doctor restriction\",\"Henüz aktivite kaydı yok.\":\"No activity entries yet.\",\"Ana hedef\":\"Main goal\",\"Güncellendi\":\"Updated\",\"Bugün Özeti\":\"Today's Summary\",\"Motivasyon Notu\":\"Motivation Note\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Quick Add\",\"Tüm Zamanlar\":\"All Time\",\"Öğün hedefi\":\"Meal goal\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Activity looks good; staying active speeds your progress toward the goal.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"No entries match the filters.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"Sin tarjeta. Empieza en segundos.\",\"Kalori hedefi\":\"Calorie goal\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Details\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"Para quienes dan su primer paso.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Total meals\",\"Yağ Hedefi (g)\":\"Fat Goal (g)\",\"Tüm ürünler\":\"All products\",\"Sıkça Sorulanlar\":\"Preguntas Frecuentes\",\"Özet\":\"Overview\",\"Sadece favoriler\":\"Favorites only\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"No personalized analysis yet. Add more entries.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Carbs / Fat\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Da el primer paso hoy.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Panel\",\"Takip Sürekliliği Güçlü\":\"Tracking Consistency Strong\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Search product or enter manually...\",\"Atıştırmalık\":\"Snack\",\"Su (ml)\":\"Water (ml)\",\"Makro Dağılımı\":\"Macro Distribution\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Tu asistente de salud moderno e inteligente. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Fat Goal\",\"Su Takibi\":\"Water Tracking\",\"Pzt\":\"Lun\",\"Akıllı Panelde.\":\"Panel Inteligente.\",\"Calmet AI\":\"Calmet IA\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"Texto de Protección de Datos\",\"İletişim\":\"Contacto\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Features\",\"Plan Seçimi\":\"Seleccion de Plan\",\"Güvenlik\":\"Seguridad\",\"Değişiklikler\":\"Cambios\",\"Toplanan Veriler\":\"Datos Recopilados\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"A line appears when you add measurements.\",\"Yerel kayıtlar buluta taşındı\":\"Local entries moved to the cloud\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"Add your name\",\"Haftalık Sapma Analizi\":\"Weekly Deviation Analysis\",\"provider\":\"provider\",\"Ayar\":\"Ajustes\",\"ayarlar settings\":\"settings preferences\",\"Lütfen bu soruyu yanıtla.\":\"Please answer this question.\",\"su hızlı\":\"water quick\",\"AI Gücünü Keşfet\":\"Descubrir IA\",\"Paylaşım bulunamadı\":\"Share not found\",\"Henüz öğün kaydı yok.\":\"No meal entries yet.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Use\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"The link opens the public report view.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Calorie Balance\",\"Miktar (ml)\":\"Amount (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Compare averages to goals\",\"İşlenen Veri Kategorileri\":\"Categorías de Datos Procesados\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Tu coach personal con IA.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Periodo de Retención\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Meal goal days\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Actualizar Metas\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Calories\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Add weight, waist, hip, and other measurements regularly.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Align the barcode in the frame.\",\"Profil tamamlama\":\"Profile completion\",\"Bisiklet\":\"Cycling\",\"Kalori (kcal)\":\"Calories (kcal)\",\"Urun\":\"Product\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Goal proximity\",\"Kahvaltı\":\"Breakfast\",\"Yağ (g)\":\"Fat (g)\",\"Hızlı Bağlantılar\":\"Enlaces Rápidos\",\"Kaydet\":\"Guardar\",\"Paylaşılan Rapor\":\"Shared Report\",\"Tüm Öğünler\":\"All Meals\",\"Français\":\"Francés\",\"Kütüphane yüklenemedi.\":\"Library failed to load.\",\"Kişisel Bilgiler\":\"Personal Info\",\"Haftalık Sapma\":\"Weekly Deviation\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Enter a valid barcode.\",\"Süre (dk)\":\"Duration (min)\",\"Su takibi başladığında burada görünecek.\":\"It will appear here once water tracking starts.\",\"Yağ Hedefi Düşük\":\"Low Fat Target\",\"En Akıllı Yol.\":\"El Camino más Inteligente.\",\"Aktivite Süresi Düşük\":\"Low Activity Duration\",\"Su eklendi\":\"Water added\",\"En Etkili Günler\":\"Most Effective Days\",\"Tüm Tipler\":\"All Types\",\"tema görünüm\":\"theme appearance\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Descripción del Servicio\",\"Kütüphane yükleniyor...\":\"Loading library...\",\"Sağlıklı Yaşam\":\"Vida Saludable\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Carbohydrate Goal\",\"Görünüm adı\":\"View name\",\"Kamera izni alınamadı.\":\"Camera permission could not be granted.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Límite diario alcanzado. Inténtalo de nuevo mañana.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Entry Count\",\"Paylaşım oluşturulamadı.\":\"Share could not be created.\",\"Y\":\"F\",\"Karbonhidrat Hedefi (g)\":\"Carbohydrate Goal (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profile user\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manual\",\"Diyetisyen modu açık\":\"Dietitian mode on\",\"Favori\":\"Favorite\",\"Karbonhidrat\":\"Carbohidrato\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Highlights\",\"Başlangıç\":\"Inicio\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Activity added (local)\",\"Cmt\":\"Sáb\",\"7 Günlük İlerleme Analizi\":\"Análisis de Progreso de 7 Días\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Search library\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Turco\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Metas.\",\"Henüz kayıtlı ürün yok.\":\"No saved products yet.\",\"Kilitli\":\"Locked\",\"Geri al\":\"Undo\",\"Su Tüketimi\":\"Water Intake\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Data Management\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Search: meal, activity...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manual calorie entry\",\"Yakılan\":\"Burned\",\"Tema\":\"Theme\",\"Yemek eklendi\":\"Meal added\",\"rapor pdf export\":\"report pdf export\",\"Bizi nereden duydun?\":\"How did you hear about us?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Avg. Calories\",\"Net Değişim\":\"Net Change\",\"Aktivite süresi\":\"Activity duration\",\"Günlük öğün ritmi\":\"Daily meal rhythm\",\"Barkod bulunamadı.\":\"Barcode not found.\",\"Hedef uyum skoru\":\"Goal alignment score\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"Save as PDF\",\"Hedefler güncellendi\":\"Goals updated\",\"Keşfet\":\"Descubrir\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"If you increase tracking days, your progress curve will be clearer.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Amount (g)\",\"Akşam\":\"Dinner\",\"Karbonhidrat hedefi\":\"Carbohydrate goal\",\"Aktivite Rozetleri\":\"Activity Badges\",\"Suya Yaklaştın\":\"Close on Hydration\",\"Calmet nedir?\":\"¿Qué es Calmet?\",\"Sağlık platformlarını bağla\":\"Connect health platforms\",\"Not\":\"Note\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Notification permission denied.\",\"Ağırlık\":\"Weight Training\",\"Gün\":\"Día\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"Enviar correo\",\"Ortalama Su\":\"Average Water\",\"Abonelikler\":\"Suscripciones\",\"Sıkça Sorulan Sorular\":\"FAQ\",\"Favori güncellenemedi.\":\"Favorite could not be updated.\",\"Sal\":\"Mar\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Calorie Burn\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Overall Performance Summary\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barcode lookup failed.\",\"Hatırlatıcı güncellendi\":\"Reminder updated\",\"Toplu içe aktarma (cihaz)\":\"Bulk import (device)\",\"Ekle\":\"Añadir\",\"Toplam Kalori\":\"Total Calories\",\"Diyetisyen modu kapalı\":\"Dietitian mode off\",\"Abonelik & Ödeme\":\"Suscripción y Pago\",\"CSV İçe Aktar\":\"Importar CSV\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Activity intensity overview\",\"Beslenme Raporu\":\"Nutrition Report\",\"Profil\":\"Perfil\",\"500 ml su ekle\":\"Add 500 ml water\",\"Ölçüm eklendi\":\"Measurement added\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filter and find entries quickly.\",\"Hatırlatıcılar\":\"Recordatorios\",\"error\":\"error\",\"Hesabım\":\"Mi Cuenta\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Small steps start big changes. Keep going!\",\"Tahmini kalori\":\"Estimated calories\",\"Ürün\":\"Producto\",\"Rozetler\":\"Badges\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Water added (local)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Underweight\",\"Akt.\":\"Act.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"History\",\"Günlük Kalori Hedefi\":\"Meta Diaria de Calorías\",\"kez tüketildi\":\"times consumed\",\"AI Görsel Tanıma\":\"AI Visual Recognition\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"Has alcanzado tu límite diario. Puedes volver a intentarlo mañana.\",\"Cum\":\"Vie\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"Calmet te ayuda a alcanzar tus objetivos de salud rápido con calendarios de dieta IA, plantillas y analíticas.\",\"Günlük Öğün Hedefi (adet)\":\"Meta Diaria de Comidas\",\"Net kalori\":\"Net calories\",\"Gizlilik Politikası\":\"Privacidad\",\"Paylaşmak için giriş yapın.\":\"Sign in to share.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Meal Badges\",\"Cal AI Rapor\":\"Calmet Report\",\"Kişiye Özel Diyet Takvimi\":\"Calendario de Dieta Personalizado\",\"Ücretsiz\":\"Gratis\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Browser notifications are not supported.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Few meals include macro data. Add product details to sharpen tracking.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Highlights for key metrics\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"default\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Injury detail\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Share Link\",\"Ürün kütüphaneye kaydedildi.\":\"Product saved to the library.\",\"kg\":\"kg\",\"light\":\"light\",\"Giriş Yap\":\"Entrar\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Type at least 3 letters to search products.\",\"Kişisel Veri Güvenliği\":\"Seguridad de Datos Personales\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Resumen de Hoy\",\"Koşu\":\"Running\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Sus Derechos\",\"Güncel kilo\":\"Current weight\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"Badges appear after you add your first entries.\",\"Kapalı\":\"Off\",\"Ücretsiz Hesabını Oluştur\":\"Crear Cuenta Gratis\",\"Oto hesapla\":\"Auto calculate\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Could not save to cloud; saved to your device.\",\"Takip Sürekliliği Zayıf\":\"Tracking Consistency Low\",\"Kamera veya barkod numarası\":\"Camera or barcode number\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Weight\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"Idioma de la aplicación\",\"Yemek adı\":\"Food name\",\"Yüzme\":\"Swimming\",\"Öğün kayıtları başladığında burada görünecek.\":\"Meal logs will appear here once you start logging.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"Escríbenos en la página de contacto; cerraremos tu cuenta de forma segura.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"Ver Planes\",\"Enerji dengesinin hareketini takip edin.\":\"Track how your energy balance moves.\",\"70\":\"70\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"No data for the selected measurement.\",\"Aktivite (dk)\":\"Activity (min)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Meta Diaria de Actividad (min)\",\"Görünüm Kaydet\":\"Save View\",\"Kişisel Analiz ve Motivasyon\":\"Personal Analysis & Motivation\",\"Haftalık Kalori Dengesi\":\"Weekly Calorie Balance\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Your browser does not support barcode scanning.\",\"Destek\":\"Soporte\",\"Yerel cihazınızda saklanır\":\"Stored on your device\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Injury\",\"Komut ara...\":\"Search commands...\",\"Makro Verisi Eksik\":\"Macro Data Missing\",\"Destek e-postamız:\":\"Soporte email:\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Manually add walking, running, or gym activities.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan unlocks advanced analytics, unlimited entries, and custom reports.\",\"Dönem\":\"Period\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Upgrade to Premium\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Meal added (local)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Activity logs will appear here once you start logging.\",\"Protein Hedefi (g)\":\"Protein Goal (g)\",\"Günlük Detaylar\":\"Daily Details\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Cálculo Automático de Calorías\",\"Sil\":\"Eliminar\",\"Kalori, su ve makro değişimleri\":\"Calorie, water, and macro changes\",\"Kayıt güncellendi\":\"Entry updated\",\"Beslenme Tercihleri\":\"Nutrition Preferences\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Alcanza tus\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Highlights days closer to the goal.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV import/export (device or cloud).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Carb goal looks low. Increase it for better energy balance.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Last entry\",\"Kişisel Yorumlar\":\"Personal Insights\",\"Kopyala\":\"Copiar\",\"Toplam ölçüm\":\"Total measurements\",\"İşleme Amaçları\":\"Fines del Tratamiento\",\"Genel İstatistikler\":\"Overall Statistics\",\"Aktiviteye Yaklaştın\":\"Close on Activity\",\"Tarih/Saat\":\"Date/Time\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Meal rhythm looks scattered. Stabilizing main meals improves balance.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"No standout days yet.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Meta Diaria de Agua (ml)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Close camera\",\"Paz\":\"Dom\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"Inglés\",\"Kalori Ortalaması Yüksek\":\"High Calorie Average\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Feature flags updated\",\"Protein Hedefi Düşük\":\"Protein Target Low\",\"Bulut (Neon) aktif\":\"Nube (Neon) activa\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Goal Proximity\",\"Kalori girişi ve çıkışı\":\"Calories in and out\",\"Paketler\":\"Planes\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Product name is required for the library.\",\"Dikkat\":\"Alert\",\"Kayıt Geçmişi\":\"Kayıt Geçmişi\",\"İsim\":\"Name\",\"Mesajın\":\"Tu mensaje\",\"Aktivite Girdisi\":\"Activity Entry\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Enable dim theme\",\"Ortalama Kalori\":\"Average Calories\",\"Performans Özeti\":\"Performance Summary\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Low Hydration\",\"Protein Hedefi\":\"Protein Goal\",\"Ürün Kütüphanesi\":\"Product Library\",\"Sabit\":\"Sabit\",\"Öğle\":\"Lunch\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Product could not be deleted.\",\"Günlük ort. kalori\":\"Avg. daily calories\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Water tracking looks good; this pace supports recovery.\",\"panel dashboard home\":\"dashboard home overview\",\"Fazla\":\"Overweight\",\"K\":\"C\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Daily water trend\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"No data yet. First entries will populate the chart.\",\"Barkod ile bul\":\"Find by barcode\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Water Badges\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Plantillas de Comidas Listas\",\"Henüz haftalık veri yok.\":\"No weekly data yet.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barcode number\",\"Günlük hareket dakikaları\":\"Daily activity minutes\",\"PDF raporu aç\":\"Open PDF report\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Current streak\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Top Meals\",\"Aktivite temposunu görselleştirir.\":\"Visualizes your activity pace.\",\"Karbonhidrat (g)\":\"Carbohydrate (g)\",\"Hafta\":\"Semana\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Gráficos Detallados\",\"Tahmini\":\"Estimated\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Características\",\"Rapor Dışa Aktarım\":\"Report Export\",\"Dil\":\"Language\",\"Ekipman durumu\":\"Equipment level\",\"Kalça\":\"Hip\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Tus datos de calorías, agua y actividad se sincronizan al instante. La IA detecta tus deficiencias.\",\"Barkod tara\":\"Scan barcode\",\"Güçlü\":\"Strong\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Close with Esc • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"No results found. You can enter calories manually.\",\"Aktivite kalorisi\":\"Activity calories\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Calorie Balance Looks Good\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"You can export PDF or Excel from the report screen.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"Could not read CSV. Check the format.\",\"Açıldı\":\"Unlocked\",\"Girilen ve tahmini yakılan kalori\":\"Intake and estimated calories burned\",\"Yerel profil\":\"Local profile\",\"image_url\":\"image_url\",\"Sapma\":\"Deviation\",\"Yardım Merkezi\":\"Centro de Ayuda\",\"En Çok Tercih Edilen\":\"Más Popular\",\"Tüm kayıtların özet görünümü.\":\"Summary view of all entries.\",\"Kütüphaneye kaydet\":\"Save to library\",\"Premium modüllerini bu panelden yönetin.\":\"Manage premium modules from this panel.\",\"Ort. Protein\":\"Avg. Protein\",\"Spor seviyesi\":\"Fitness level\",\"Ücretlendirme\":\"Precios\",\"textarea\":\"textarea\",\"Su Alımı\":\"Water Intake\",\"İzin Ver\":\"Permitir\",\"Bir şeyler sor...\":\"Pregunta algo...\",\"Pro Bağlantıları\":\"Pro Connections\",\"En Yeni\":\"Newest\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Notification permission not granted.\",\"Ayarları aç\":\"Open settings\",\"Rapor yükleniyor...\":\"Loading report...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Alignment Score\",\"dk\":\"min\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Camera access is not supported.\",\"Öğün düzenini gün gün izleyin.\":\"Track meal consistency day by day.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Entry deleted\",\"Kullanıcı Sorumlulukları\":\"Responsabilidades del Usuario\",\"Rapor\":\"Report\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Meal goal rate\",\"Car\":\"Mié\",\"Kapat\":\"Cerrar\",\"Kayıt Ol\":\"Registrarse\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"Un plan semanal generado automáticamente basado en tus objetivos, hábitos y horario diario.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Visualiza claramente el progreso diario, semanal y mensual. Tendencias y desviaciones en una sola pantalla.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Elige tu comida de plantillas aprobadas por dietistas sin ingresar calorías una por una.\",\"Pro'ya Yükselt\":\"Subir a Pro\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"Has alcanzado tu límite diario de 25 mensajes. ¡Te esperamos mañana!\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"El Coach de IA es exclusivo para el plan AI PLUS.\",\"Cevap üretilemedi.\":\"No se pudo generar una respuesta.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"Ocurrió un error. Por favor, inténtalo de nuevo.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"El servicio de IA no está configurado actualmente (falta GROQ_API_KEY). Por favor, contacte al administrador.\"}"));}),
"[project]/packages/shared/src/locales/fr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Hedeflerden sapma ve uyum skoru\":\"Deviation from goals and adherence score\",\"Yağ\":\"Gras\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"No measurements yet. Add them from the profile page.\",\"AI Destekli Sağlık Takibi\":\"Suivi de santé assisté par l'IA\",\"Yaş\":\"Age\",\"q\":\"q\",\"Öğün\":\"Meal\",\"Beklentin\":\"Your expectation\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Balanced Meal Rhythm\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Calories burned is an estimate. User edits always take precedence.\",\"Ara\":\"Search\",\"Limit yarın sıfırlanır.\":\"La limite est réinitialisée demain.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Personalize your profile and clarify your goals.\",\"CSV dışa aktarıldı.\":\"CSV exported.\",\"Verilerini ciddiye alan sporcular için.\":\"Pour les athlètes sérieux.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Fat goal\",\"Ölçüm güncellendi\":\"Measurement updated\",\"öğün\":\"meal\",\"Belirtilmedi\":\"Not specified\",\"Su\":\"Eau\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Saving...\",\"Net\":\"Net\",\"Göğüs\":\"Chest\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"Pour votre corps\",\"Takip edilen gün\":\"Tracked days\",\"Preset veya özel miktar\":\"Preset or custom amount\",\"Limit doldu...\":\"Limite atteinte...\",\"Ücretsiz Başla\":\"Gratuit\",\"Açık\":\"On\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profile saved.\",\"Kütüphane kaydı başarısız.\":\"Library save failed.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Image-based logging is currently disabled.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"This report is for informational purposes only. It does not provide medical advice.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Browser permission is required for reminders.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"PDF with charts + Excel export\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performance Status\",\"Protein hedefi\":\"Protein goal\",\"Toplam Su\":\"Total Water\",\"source\":\"source\",\"100\":\"100\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Clause de non-responsabilité\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"Le coach IA n'est actif que dans le forfait AI Plus.\",\"Düzenle\":\"Modifier\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Your activity time is below target. Adding 10–15 minutes daily helps.\",\"Daha İyi Bir Sen İçin\":\"Pour un meilleur vous\",\"Hedefler\":\"Goals\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Calorie intake matches your target; keep the rhythm.\",\"Kilo (kg)\":\"Weight (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Unknown Product\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Compte et profil\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Chart\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI features are off by default.\",\"Aydınlık temaya dön\":\"Switch to light theme\",\"Toplam su\":\"Total water\",\"Cihazdaki kayıtları taşı\":\"Transférer les enregistrements\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Total entries\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"Bonjour ! Je suis votre coach de santé Calmet IA. Comment puis-je vous aider avec vos objectifs de nutrition ou d'entraînement aujourd'hui ?\",\"Spor yeri\":\"Workout location\",\"Görsel Veri Analizi\":\"Visual Data Analysis\",\"Paylaş\":\"Share\",\"Excel Olarak İndir\":\"Download as Excel\",\"ekle yeni entry\":\"add new entry\",\"Makro Hedef Takibi\":\"Macro Goal Tracking\",\"Aktivite Hedefi Güçlü\":\"Strong Activity Target\",\"Akt. Kalori\":\"Act. Calories\",\"CSV içinde kayıt bulunamadı.\":\"No entries found in the CSV.\",\"Karbonhidrat Düşük\":\"Low Carbs\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"175\":\"175\",\"Kalori değeri tahminidir\":\"Calorie value is an estimate\",\"Ölçüm silindi\":\"Measurement deleted\",\"Ad Soyad\":\"Full Name\",\"Aktivite\":\"Activité\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Bien plus qu'une simple application de suivi. Nous mélangeons données scientifiques et technologie moderne.\",\"Neden Calmet?\":\"Pourquoi Calmet?\",\"İçe aktarılıyor...\":\"Importation...\",\"Makro verisi oluştuğunda burada görünecek.\":\"It will appear here once macro data is available.\",\"Bel\":\"Waist\",\"Girilen ve yakılan kalori trendi\":\"Trend of calories in and out\",\"Günlük ort. su\":\"Avg. daily water\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Weight & Measurement Trends\",\"Ayarlar\":\"Paramètres\",\"AI Sağlık Koçu\":\"Coach de santé IA\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Total calories\",\"Hedef Kilo (kg)\":\"Poids cible (kg)\",\"Profil sayfası\":\"Profile page\",\"Filtreyi temizle\":\"Clear filters\",\"kcal\":\"kcal\",\"E-posta ile Gönder\":\"Envoyer par e-mail\",\"Kayıtların gün bazlı özeti\":\"Daily summary of entries\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Daily reminders via browser notifications.\",\"Aktivite Özeti\":\"Activity Summary\",\"Bu bağlantının süresi dolmuş.\":\"This link has expired.\",\"Su Girişi\":\"Water Entry\",\"Yeni kayıt ekle\":\"Add new entry\",\"Yerel cihaz modu\":\"Mode appareil local\",\"Kısa not (opsiyonel)...\":\"Short note (optional)...\",\"Bildirim izni açık.\":\"Notification permission granted.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Retour\",\"Stres\":\"Stres\",\"Favori yap\":\"Mark as favorite\",\"Hedef yok\":\"No goal\",\"Vazgeç\":\"Annuler\",\"Hedef bilgisi henüz eklenmemiş.\":\"Goal info not added yet.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Top Activities\",\"CSV Dışa Aktar\":\"Exporter CSV\",\"Aktivite eklendi\":\"Activity added\",\"Protein\":\"Protéine\",\"Sağlık Koçu\":\"Coach de santé\",\"Öğün Ritmi Düşük\":\"Low Meal Rhythm\",\"Günlük hatırlatma\":\"Rappel quotidien\",\"Aktivite Süresi\":\"Activity Duration\",\"Cal AI Hatırlatma\":\"Calmet Reminder\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Enter injury details\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Sharing...\",\"Kayıt bulunamadı.\":\"No records found.\",\"Takip & Kayıt\":\"Suivi et journaux\",\"Raporu Aç\":\"Ouvrir le rapport\",\"Kullanım Şartları\":\"Conditions\",\"Çıkış\":\"Déconnexion\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Jeu\",\"Paylaşım ve Aktarım\":\"Partage et transfert\",\"Grafikler\":\"Charts\",\"KVKK\":\"Protection des données\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profile could not be saved. Try again.\",\"Español\":\"Espagnol\",\"Uyum\":\"Adherence\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Create a quick entry by entering calories and selecting a meal.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Badges unlock based on streak, water, activity, and meal discipline goals.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Weekly Comparison\",\"Kısa açıklama\":\"Short description\",\"Hızlı\":\"Quick\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Compte\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Streak Badges\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"No results found. Try a different keyword.\",\"Kilo & Ölçüm Takibi\":\"Weight & Measurement Tracking\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Bulk import (cloud)\",\"Tema güncellendi\":\"Theme updated\",\"Performans Analizi\":\"Performance Analysis\",\"Makrolar (g)\":\"Macros (g)\",\"Günlük Veri Kayıtları\":\"Daily Records\",\"ml\":\"ml\",\"En çok kalori getiren seçimler\":\"Highest calorie choices\",\"Kalori\":\"Calories\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Goal Alignment Score\",\"Hızlı Kalori Ekle\":\"Quick Calorie Add\",\"En Eski\":\"Oldest\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Food\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Activity looks low; even short walks help balance.\",\"Öğün Ritmi\":\"Meal Rhythm\",\"Paylaşım bağlantısı hazır.\":\"Share link is ready.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"No entries yet. Add your first entry.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"You're below your protein goal. Strengthen your daily protein intake.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Portugais\",\"Entegrasyonlar\":\"Integrations\",\"unit\":\"unit\",\"Örn: 420\":\"E.g., 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Date\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Track macro balance week by week.\",\"Su hedefi\":\"Water goal\",\"dakika\":\"minutes\",\"Aktivite hedefi\":\"Activity goal\",\"Haftalık spor\":\"Weekly workouts\",\"Öğün Sayısı\":\"Meal Count\",\"Hemen Başla\":\"Commencer\",\"Manuel ürünler ve favoriler\":\"Manual products and favorites\",\"Seç\":\"Select\",\"Yerel ölçümler buluta taşındı\":\"Local measurements moved to the cloud\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Low Calorie Average\",\"Lütfen tüm soruları yanıtla.\":\"Please answer all questions.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Active Days\",\"Boy (cm)\":\"Height (cm)\",\"Profil kaydedilemedi.\":\"Profile could not be saved.\",\"Yürüyüş\":\"Walking\",\"Komut Paleti\":\"Command Palette\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Transfert...\",\"Analiz Notu\":\"Analysis Note\",\"Aranıyor...\":\"Searching...\",\"250 ml su ekle\":\"Add 250 ml water\",\"Hedef uyumunun en yüksek olduğu günler\":\"Days with the highest goal alignment\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Enter measurements regularly to clarify the trend.\",\"Akt. Süre\":\"Act. Duration\",\"Her Şey Tek Bir\":\"Tout en un\",\"Yasal\":\"Légal\",\"Kalori Giriş\":\"Calorie Intake\",\"Ortalama Aktivite\":\"Average Activity\",\"Paneli aç\":\"Open dashboard\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Body Fat %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Feature Flags\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Your water intake is below target. Adding 1–2 glasses during the day can help.\",\"Trendler\":\"Trends\",\"Yüksek\":\"Obese\",\"Fikri Mülkiyet\":\"Propriété intellectuelle\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Please provide injury details.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Fat goal is low. Try adding healthy fat sources.\",\"Günlük Ort.\":\"Daily Avg.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Russe\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Some entries lack macro data. Choose products for clearer tracking.\",\"Aktivite Girişi\":\"Activity Entry\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Stairs\",\"Verilerin Kullanımı\":\"Utilisation des données\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Strong Hydration\",\"İleri\":\"Suivant\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"The link is invalid or may have been removed.\",\"Kullanıcı\":\"User\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Finish\",\"a\":\"a\",\"Yemek Girişi\":\"Food Entry\",\"Konu\":\"Sujet\",\"Haftalık Su Alımı\":\"Consommation d'eau hebdomadaire\",\"Kamera açılıyor...\":\"Opening camera...\",\"Favoriye kaydet\":\"Save to favorites\",\"refresh_token\":\"refresh_token\",\"26\":\"26\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Top Days\",\"Veri Sorumlusu\":\"Responsable du traitement\",\"Doktor kısıtı\":\"Doctor restriction\",\"Henüz aktivite kaydı yok.\":\"No activity entries yet.\",\"Ana hedef\":\"Main goal\",\"Güncellendi\":\"Updated\",\"Bugün Özeti\":\"Today's Summary\",\"Motivasyon Notu\":\"Motivation Note\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Quick Add\",\"Tüm Zamanlar\":\"All Time\",\"Öğün hedefi\":\"Meal goal\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Activity looks good; staying active speeds your progress toward the goal.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"No entries match the filters.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"Pas de carte. Commencez en quelques secondes.\",\"Kalori hedefi\":\"Calorie goal\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Details\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"Pour un premier pas vers une vie saine.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Total meals\",\"Yağ Hedefi (g)\":\"Fat Goal (g)\",\"Tüm ürünler\":\"All products\",\"Sıkça Sorulanlar\":\"FAQ\",\"Özet\":\"Overview\",\"Sadece favoriler\":\"Favorites only\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"No personalized analysis yet. Add more entries.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Carbs / Fat\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Faites le premier pas aujourd'hui.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Tableau\",\"Takip Sürekliliği Güçlü\":\"Tracking Consistency Strong\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Search product or enter manually...\",\"Atıştırmalık\":\"Snack\",\"Su (ml)\":\"Water (ml)\",\"Makro Dağılımı\":\"Macro Distribution\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Votre assistant de santé moderne et intelligent. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Fat Goal\",\"Su Takibi\":\"Water Tracking\",\"Pzt\":\"Lun\",\"Akıllı Panelde.\":\"Tableau de bord intelligent.\",\"Calmet AI\":\"Calmet IA\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"Texte de protection des données\",\"İletişim\":\"Contact\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Features\",\"Plan Seçimi\":\"Choix du forfait\",\"Güvenlik\":\"Sécurité\",\"Değişiklikler\":\"Changements\",\"Toplanan Veriler\":\"Données collectées\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"A line appears when you add measurements.\",\"Yerel kayıtlar buluta taşındı\":\"Local entries moved to the cloud\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"Add your name\",\"Haftalık Sapma Analizi\":\"Weekly Deviation Analysis\",\"provider\":\"provider\",\"Ayar\":\"Paramètres\",\"ayarlar settings\":\"settings preferences\",\"Lütfen bu soruyu yanıtla.\":\"Please answer this question.\",\"su hızlı\":\"water quick\",\"AI Gücünü Keşfet\":\"Découvrir l'IA\",\"Paylaşım bulunamadı\":\"Share not found\",\"Henüz öğün kaydı yok.\":\"No meal entries yet.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Use\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"The link opens the public report view.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Calorie Balance\",\"Miktar (ml)\":\"Amount (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Compare averages to goals\",\"İşlenen Veri Kategorileri\":\"Catégories de données traitées\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Votre coach personnel IA.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Période de rétention\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Meal goal days\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Mettre à jour les objectifs\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Calories\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Add weight, waist, hip, and other measurements regularly.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Align the barcode in the frame.\",\"Profil tamamlama\":\"Profile completion\",\"Bisiklet\":\"Cycling\",\"Kalori (kcal)\":\"Calories (kcal)\",\"Urun\":\"Product\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Goal proximity\",\"Kahvaltı\":\"Breakfast\",\"Yağ (g)\":\"Fat (g)\",\"Hızlı Bağlantılar\":\"Liens rapides\",\"Kaydet\":\"Enregistrer\",\"Paylaşılan Rapor\":\"Shared Report\",\"Tüm Öğünler\":\"All Meals\",\"Français\":\"Français\",\"Kütüphane yüklenemedi.\":\"Library failed to load.\",\"Kişisel Bilgiler\":\"Personal Info\",\"Haftalık Sapma\":\"Weekly Deviation\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Enter a valid barcode.\",\"Süre (dk)\":\"Duration (min)\",\"Su takibi başladığında burada görünecek.\":\"It will appear here once water tracking starts.\",\"Yağ Hedefi Düşük\":\"Low Fat Target\",\"En Akıllı Yol.\":\"Le chemin le plus intelligent.\",\"Aktivite Süresi Düşük\":\"Low Activity Duration\",\"Su eklendi\":\"Water added\",\"En Etkili Günler\":\"Most Effective Days\",\"Tüm Tipler\":\"All Types\",\"tema görünüm\":\"theme appearance\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Description du service\",\"Kütüphane yükleniyor...\":\"Loading library...\",\"Sağlıklı Yaşam\":\"Vie Saine\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Carbohydrate Goal\",\"Görünüm adı\":\"View name\",\"Kamera izni alınamadı.\":\"Camera permission could not be granted.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Limite quotidienne atteinte. Réessayez demain.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Entry Count\",\"Paylaşım oluşturulamadı.\":\"Le partage n'a pas pu être créé.\",\"Y\":\"F\",\"Karbonhidrat Hedefi (g)\":\"Carbohydrate Goal (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profile user\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manual\",\"Diyetisyen modu açık\":\"Dietitian mode on\",\"Favori\":\"Favorite\",\"Karbonhidrat\":\"Glucide\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Highlights\",\"Başlangıç\":\"Début\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Activity added (local)\",\"Cmt\":\"Sam\",\"7 Günlük İlerleme Analizi\":\"Analyse des progrès sur 7 jours\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Search library\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Turc\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Objectifs.\",\"Henüz kayıtlı ürün yok.\":\"No saved products yet.\",\"Kilitli\":\"Locked\",\"Geri al\":\"Undo\",\"Su Tüketimi\":\"Water Intake\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Data Management\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Search: meal, activity...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manual calorie entry\",\"Yakılan\":\"Burned\",\"Tema\":\"Theme\",\"Yemek eklendi\":\"Meal added\",\"rapor pdf export\":\"report pdf export\",\"Bizi nereden duydun?\":\"How did you hear about us?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Avg. Calories\",\"Net Değişim\":\"Net Change\",\"Aktivite süresi\":\"Activity duration\",\"Günlük öğün ritmi\":\"Daily meal rhythm\",\"Barkod bulunamadı.\":\"Barcode not found.\",\"Hedef uyum skoru\":\"Goal alignment score\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"Save as PDF\",\"Hedefler güncellendi\":\"Goals updated\",\"Keşfet\":\"Découvrir\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"If you increase tracking days, your progress curve will be clearer.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Amount (g)\",\"Akşam\":\"Dinner\",\"Karbonhidrat hedefi\":\"Carbohydrate goal\",\"Aktivite Rozetleri\":\"Activity Badges\",\"Suya Yaklaştın\":\"Close on Hydration\",\"Calmet nedir?\":\"Qu'est-ce que Calmet?\",\"Sağlık platformlarını bağla\":\"Connect health platforms\",\"Not\":\"Note\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Notification permission denied.\",\"Ağırlık\":\"Weight Training\",\"Gün\":\"Jour\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"Envoyer un e-mail\",\"Ortalama Su\":\"Average Water\",\"Abonelikler\":\"Abonnements\",\"Sıkça Sorulan Sorular\":\"FAQ\",\"Favori güncellenemedi.\":\"Favorite could not be updated.\",\"Sal\":\"Mar\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Calorie Burn\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Overall Performance Summary\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barcode lookup failed.\",\"Hatırlatıcı güncellendi\":\"Reminder updated\",\"Toplu içe aktarma (cihaz)\":\"Bulk import (device)\",\"Ekle\":\"Ajouter\",\"Toplam Kalori\":\"Total Calories\",\"Diyetisyen modu kapalı\":\"Dietitian mode off\",\"Abonelik & Ödeme\":\"Abonnement et paiement\",\"CSV İçe Aktar\":\"Importer CSV\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Activity intensity overview\",\"Beslenme Raporu\":\"Nutrition Report\",\"Profil\":\"Profil\",\"500 ml su ekle\":\"Add 500 ml water\",\"Ölçüm eklendi\":\"Measurement added\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filter and find entries quickly.\",\"Hatırlatıcılar\":\"Rappels\",\"error\":\"error\",\"Hesabım\":\"Mon Compte\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Small steps start big changes. Keep going!\",\"Tahmini kalori\":\"Estimated calories\",\"Ürün\":\"Produit\",\"Rozetler\":\"Badges\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Water added (local)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Underweight\",\"Akt.\":\"Act.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"History\",\"Günlük Kalori Hedefi\":\"Objectif calorique quotidien\",\"kez tüketildi\":\"times consumed\",\"AI Görsel Tanıma\":\"AI Visual Recognition\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"Vous avez atteint votre limite quotidienne. Vous pourrez réessayer demain.\",\"Cum\":\"Ven\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"Calmet vous aide à atteindre vos objectifs de santé grâce à l'IA.\",\"Günlük Öğün Hedefi (adet)\":\"Objectif de repas quotidien\",\"Net kalori\":\"Net calories\",\"Gizlilik Politikası\":\"Confidentialité\",\"Paylaşmak için giriş yapın.\":\"Sign in to share.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Meal Badges\",\"Cal AI Rapor\":\"Calmet Report\",\"Kişiye Özel Diyet Takvimi\":\"Calendrier de régime personnalisé\",\"Ücretsiz\":\"Gratuit\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Browser notifications are not supported.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Few meals include macro data. Add product details to sharpen tracking.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Highlights for key metrics\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"default\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Injury detail\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Share Link\",\"Ürün kütüphaneye kaydedildi.\":\"Product saved to the library.\",\"kg\":\"kg\",\"light\":\"light\",\"Giriş Yap\":\"Connexion\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Type at least 3 letters to search products.\",\"Kişisel Veri Güvenliği\":\"Sécurité des données personnelles\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Résumé du jour\",\"Koşu\":\"Running\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Vos droits\",\"Güncel kilo\":\"Current weight\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"Badges appear after you add your first entries.\",\"Kapalı\":\"Off\",\"Ücretsiz Hesabını Oluştur\":\"Créer un compte gratuit\",\"Oto hesapla\":\"Auto calculate\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Could not save to cloud; saved to your device.\",\"Takip Sürekliliği Zayıf\":\"Tracking Consistency Low\",\"Kamera veya barkod numarası\":\"Camera or barcode number\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Weight\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"Langue de l'application\",\"Yemek adı\":\"Food name\",\"Yüzme\":\"Swimming\",\"Öğün kayıtları başladığında burada görünecek.\":\"Meal logs will appear here once you start logging.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"Écrivez-nous sur la page de contact ; nous fermerons votre compte en toute sécurité.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"Voir les forfaits\",\"Enerji dengesinin hareketini takip edin.\":\"Track how your energy balance moves.\",\"70\":\"70\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"No data for the selected measurement.\",\"Aktivite (dk)\":\"Activity (min)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Objectif d'activité quotidien (min)\",\"Görünüm Kaydet\":\"Save View\",\"Kişisel Analiz ve Motivasyon\":\"Personal Analysis & Motivation\",\"Haftalık Kalori Dengesi\":\"Weekly Calorie Balance\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Your browser does not support barcode scanning.\",\"Destek\":\"Support\",\"Yerel cihazınızda saklanır\":\"Stored on your device\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Injury\",\"Komut ara...\":\"Search commands...\",\"Makro Verisi Eksik\":\"Macro Data Missing\",\"Destek e-postamız:\":\"Email support :\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Manually add walking, running, or gym activities.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan unlocks advanced analytics, unlimited entries, and custom reports.\",\"Dönem\":\"Period\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Upgrade to Premium\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Meal added (local)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Activity logs will appear here once you start logging.\",\"Protein Hedefi (g)\":\"Protein Goal (g)\",\"Günlük Detaylar\":\"Daily Details\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Calcul automatique des calories\",\"Sil\":\"Supprimer\",\"Kalori, su ve makro değişimleri\":\"Calorie, water, and macro changes\",\"Kayıt güncellendi\":\"Entry updated\",\"Beslenme Tercihleri\":\"Nutrition Preferences\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Atteignez vos\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Highlights days closer to the goal.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV import/export (device or cloud).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Carb goal looks low. Increase it for better energy balance.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Last entry\",\"Kişisel Yorumlar\":\"Personal Insights\",\"Kopyala\":\"Copier\",\"Toplam ölçüm\":\"Total measurements\",\"İşleme Amaçları\":\"Finalités du traitement\",\"Genel İstatistikler\":\"Overall Statistics\",\"Aktiviteye Yaklaştın\":\"Close on Activity\",\"Tarih/Saat\":\"Date/Time\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Meal rhythm looks scattered. Stabilizing main meals improves balance.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"No standout days yet.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Objectif d'eau quotidien (ml)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Close camera\",\"Paz\":\"Dim\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"Anglais\",\"Kalori Ortalaması Yüksek\":\"High Calorie Average\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Feature flags updated\",\"Protein Hedefi Düşük\":\"Protein Target Low\",\"Bulut (Neon) aktif\":\"Nuage (Neon) actif\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Goal Proximity\",\"Kalori girişi ve çıkışı\":\"Calories in and out\",\"Paketler\":\"Forfaits\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Product name is required for the library.\",\"Dikkat\":\"Alert\",\"Kayıt Geçmişi\":\"Historique des entrées\",\"İsim\":\"Name\",\"Mesajın\":\"Votre message\",\"Aktivite Girdisi\":\"Activity Entry\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Enable dim theme\",\"Ortalama Kalori\":\"Average Calories\",\"Performans Özeti\":\"Performance Summary\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Low Hydration\",\"Protein Hedefi\":\"Protein Goal\",\"Ürün Kütüphanesi\":\"Product Library\",\"Sabit\":\"Sabit\",\"Öğle\":\"Lunch\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Product could not be deleted.\",\"Günlük ort. kalori\":\"Avg. daily calories\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Water tracking looks good; this pace supports recovery.\",\"panel dashboard home\":\"dashboard home overview\",\"Fazla\":\"Overweight\",\"K\":\"C\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Daily water trend\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"No data yet. First entries will populate the chart.\",\"Barkod ile bul\":\"Find by barcode\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Water Badges\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Modèles de repas prêts\",\"Henüz haftalık veri yok.\":\"No weekly data yet.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barcode number\",\"Günlük hareket dakikaları\":\"Daily activity minutes\",\"PDF raporu aç\":\"Open PDF report\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Current streak\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Top Meals\",\"Aktivite temposunu görselleştirir.\":\"Visualizes your activity pace.\",\"Karbonhidrat (g)\":\"Carbohydrate (g)\",\"Hafta\":\"Semaine\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Graphiques détaillés\",\"Tahmini\":\"Estimated\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Fonctionnalités\",\"Rapor Dışa Aktarım\":\"Report Export\",\"Dil\":\"Language\",\"Ekipman durumu\":\"Equipment level\",\"Kalça\":\"Hip\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Vos données de calories, d'eau et d'activité sont synchronisées instantanément. L'IA détecte vos carences.\",\"Barkod tara\":\"Scan barcode\",\"Güçlü\":\"Strong\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Close with Esc • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"No results found. You can enter calories manually.\",\"Aktivite kalorisi\":\"Activity calories\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Calorie Balance Looks Good\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"You can export PDF or Excel from the report screen.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"Could not read CSV. Check the format.\",\"Açıldı\":\"Débloqué\",\"Girilen ve tahmini yakılan kalori\":\"Intake and estimated calories burned\",\"Yerel profil\":\"Local profile\",\"image_url\":\"image_url\",\"Sapma\":\"Deviation\",\"Yardım Merkezi\":\"Centre d'aide\",\"En Çok Tercih Edilen\":\"Le plus populaire\",\"Tüm kayıtların özet görünümü.\":\"Summary view of all entries.\",\"Kütüphaneye kaydet\":\"Save to library\",\"Premium modüllerini bu panelden yönetin.\":\"Manage premium modules from this panel.\",\"Ort. Protein\":\"Avg. Protein\",\"Spor seviyesi\":\"Fitness level\",\"Ücretlendirme\":\"Tarification\",\"textarea\":\"textarea\",\"Su Alımı\":\"Water Intake\",\"İzin Ver\":\"Autoriser\",\"Bir şeyler sor...\":\"Demandez quelque chose...\",\"Pro Bağlantıları\":\"Pro Connections\",\"En Yeni\":\"Newest\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Notification permission not granted.\",\"Ayarları aç\":\"Open settings\",\"Rapor yükleniyor...\":\"Loading report...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Alignment Score\",\"dk\":\"min\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Camera access is not supported.\",\"Öğün düzenini gün gün izleyin.\":\"Track meal consistency day by day.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Entry deleted\",\"Kullanıcı Sorumlulukları\":\"Responsabilités de l'utilisateur\",\"Rapor\":\"Report\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Meal goal rate\",\"Car\":\"Mer\",\"Kapat\":\"Fermer\",\"Kayıt Ol\":\"S'inscrire\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"Un plan hebdomadaire généré automatiquement en fonction de vos objectifs, de vos habitudes et de votre emploi du temps quotidien.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Visualisez clairement les progrès quotidiens, hebdomadaires et mensuels. Tendances et écarts sur un seul écran.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Choisissez votre repas parmi des modèles approuvés par des diététiciens sans saisir les calories une par une.\",\"Pro'ya Yükselt\":\"Passer à Pro\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"Vous avez atteint votre limite quotidienne de 25 messages. À demain !\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"Le coach IA est réservé au forfait AI PLUS.\",\"Cevap üretilemedi.\":\"La réponse n'a pas pu être générée.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"Une erreur est survenue. Veuillez réessayer.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"Le service IA n'est pas configuré actuellement (GROQ_API_KEY manquant). Veuillez contacter l'administrateur.\",\"Fotoğraf ile Ekle\":\"Ajouter par photo\",\"AI destekli yemek tanıma yakında aktif olacak.\":\"La reconnaissance des aliments par IA sera bientôt disponible.\",\"Fotoğraf Yükle\":\"Téléverser une photo\",\"Yakında\":\"Bientôt\",\"Fotoğraf ile ekleme bu sürümde aktif değil.\":\"L'ajout par photo n'est pas disponible dans cette version.\",\"Özel miktar (ml)\":\"Quantité personnalisée (ml)\",\"Uyku Aşamaları\":\"Phases du sommeil\",\"Derin/REM analizi yakında burada gösterilecek.\":\"L’analyse profond/REM sera bientôt affichée ici.\",\"Hızlı Erişim\":\"Accès rapide\",\"Ölçümler\":\"Mesures\",\"PDF Raporu\":\"Rapport PDF\",\"Detaylı raporu PDF olarak cihazına kaydet veya paylaş.\":\"Enregistrez ou partagez le rapport détaillé en PDF sur votre appareil.\",\"PDF Oluştur\":\"Créer un PDF\",\"Raporu Paylaş\":\"Partager le rapport\",\"Paylaşım sırasında hata oluştu.\":\"Une erreur est survenue lors du partage.\",\"PDF oluşturulamadı.\":\"Le PDF n'a pas pu être créé.\",\"Kilo Değişimi\":\"Variation du poids\",\"Kilo verisi bulunamadı.\":\"Aucune donnée de poids.\",\"Makro Besin Dağılımı\":\"Répartition des macronutriments\",\"Uyku Başlangıcı\":\"Début du sommeil\",\"Uyanış Zamanı\":\"Heure de réveil\",\"Uyku Kalitesi\":\"Qualité du sommeil\",\"Uyku Ekle\":\"Ajouter un sommeil\",\"Uyku nasıldı? Rüyalar, uyanmalar...\":\"Comment était votre sommeil ? Rêves, réveils...\",\"Kötü\":\"Mauvais\",\"Orta\":\"Moyen\",\"İyi\":\"Bon\",\"Mükemmel\":\"Excellent\",\"Su Hatırlatıcısı\":\"Rappel d’eau\",\"Yemek Hatırlatıcıları\":\"Rappels de repas\",\"Uyku Hatırlatıcısı\":\"Rappel de sommeil\",\"Yatma Saati\":\"Heure du coucher\",\"Öğün Hatırlatıcısı\":\"Rappel de repas\",\"Günlük su hedefini tamamlamayı unutma.\":\"N’oubliez pas d’atteindre votre objectif d’eau quotidien.\",\"Kahvaltı kaydını eklemeyi unutma.\":\"N’oubliez pas d’enregistrer le petit-déjeuner.\",\"Öğle öğününü eklemeyi unutma.\":\"N’oubliez pas d’enregistrer le déjeuner.\",\"Akşam öğününü eklemeyi unutma.\":\"N’oubliez pas d’enregistrer le dîner.\",\"Uyku düzenini korumak için hazırlanma zamanı.\":\"Il est temps de se préparer pour dormir.\",\"Birimler\":\"Unités\",\"Metrik\":\"Métrique\",\"İmperyal\":\"Impérial\",\"Metrik (kg, cm)\":\"Métrique (kg, cm)\",\"İmperyal (lb, in)\":\"Impérial (lb, in)\",\"Rozetler ve Başarımlar\":\"Badges et réussites\",\"Devam et\":\"Continue\",\"7 Gün Seri\":\"Série de 7 jours\",\"Su Disiplini\":\"Discipline eau\",\"Öğün Dengesi\":\"Équilibre des repas\",\"Aktivite Serisi\":\"Série d’activité\",\"Uyku Rutini\":\"Routine de sommeil\",\"Haftalık Uyku\":\"Sommeil hebdomadaire\",\"Makrolar\":\"Macros\"}"));}),
"[project]/packages/shared/src/locales/ru.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Hedeflerden sapma ve uyum skoru\":\"Deviation from goals and adherence score\",\"Yağ\":\"Жир\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"No measurements yet. Add them from the profile page.\",\"AI Destekli Sağlık Takibi\":\"Отслеживание здоровья с помощью ИИ\",\"Yaş\":\"Age\",\"q\":\"q\",\"Öğün\":\"Meal\",\"Beklentin\":\"Your expectation\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Balanced Meal Rhythm\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Calories burned is an estimate. User edits always take precedence.\",\"Ara\":\"Search\",\"Limit yarın sıfırlanır.\":\"Лимит обновится завтра.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Personalize your profile and clarify your goals.\",\"CSV dışa aktarıldı.\":\"CSV exported.\",\"Verilerini ciddiye alan sporcular için.\":\"Для серьезных спортсменов.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Fat goal\",\"Ölçüm güncellendi\":\"Measurement updated\",\"öğün\":\"meal\",\"Belirtilmedi\":\"Not specified\",\"Su\":\"Вода\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Saving...\",\"Net\":\"Net\",\"Göğüs\":\"Chest\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"Для вашего тела\",\"Takip edilen gün\":\"Tracked days\",\"Preset veya özel miktar\":\"Preset or custom amount\",\"Limit doldu...\":\"Лимит исчерпан...\",\"Ücretsiz Başla\":\"Бесплатно\",\"Açık\":\"On\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profile saved.\",\"Kütüphane kaydı başarısız.\":\"Library save failed.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Image-based logging is currently disabled.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"This report is for informational purposes only. It does not provide medical advice.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Browser permission is required for reminders.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"PDF with charts + Excel export\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performance Status\",\"Protein hedefi\":\"Protein goal\",\"Toplam Su\":\"Total Water\",\"source\":\"source\",\"100\":\"100\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Отказ от ответственности\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"ИИ-коуч активен только в плане AI Plus.\",\"Düzenle\":\"Редактировать\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Your activity time is below target. Adding 10–15 minutes daily helps.\",\"Daha İyi Bir Sen İçin\":\"Для лучшего тебя\",\"Hedefler\":\"Goals\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Calorie intake matches your target; keep the rhythm.\",\"Kilo (kg)\":\"Weight (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Unknown Product\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Аккаунт и профиль\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Chart\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI features are off by default.\",\"Aydınlık temaya dön\":\"Switch to light theme\",\"Toplam su\":\"Total water\",\"Cihazdaki kayıtları taşı\":\"Перенести записи\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Total entries\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"Привет! Я ваш ИИ-коуч по здоровью Calmet. Чем я могу помочь вам с питанием или тренировками сегодня?\",\"Spor yeri\":\"Workout location\",\"Görsel Veri Analizi\":\"Visual Data Analysis\",\"Paylaş\":\"Share\",\"Excel Olarak İndir\":\"Download as Excel\",\"ekle yeni entry\":\"add new entry\",\"Makro Hedef Takibi\":\"Macro Goal Tracking\",\"Aktivite Hedefi Güçlü\":\"Strong Activity Target\",\"Akt. Kalori\":\"Act. Calories\",\"CSV içinde kayıt bulunamadı.\":\"No entries found in the CSV.\",\"Karbonhidrat Düşük\":\"Low Carbs\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"175\":\"175\",\"Kalori değeri tahminidir\":\"Calorie value is an estimate\",\"Ölçüm silindi\":\"Measurement deleted\",\"Ad Soyad\":\"Full Name\",\"Aktivite\":\"Активность\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Гораздо больше, чем просто приложение для трекинга. Мы объединяем научные данные с современными технологиями.\",\"Neden Calmet?\":\"Почему Calmet?\",\"İçe aktarılıyor...\":\"Импорт...\",\"Makro verisi oluştuğunda burada görünecek.\":\"It will appear here once macro data is available.\",\"Bel\":\"Waist\",\"Girilen ve yakılan kalori trendi\":\"Trend of calories in and out\",\"Günlük ort. su\":\"Avg. daily water\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Weight & Measurement Trends\",\"Ayarlar\":\"Настройки\",\"AI Sağlık Koçu\":\"ИИ Коуч по здоровью\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Total calories\",\"Hedef Kilo (kg)\":\"Целевой вес (кг)\",\"Profil sayfası\":\"Profile page\",\"Filtreyi temizle\":\"Clear filters\",\"kcal\":\"ккал\",\"E-posta ile Gönder\":\"Отправить по почте\",\"Kayıtların gün bazlı özeti\":\"Daily summary of entries\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Daily reminders via browser notifications.\",\"Aktivite Özeti\":\"Activity Summary\",\"Bu bağlantının süresi dolmuş.\":\"This link has expired.\",\"Su Girişi\":\"Water Entry\",\"Yeni kayıt ekle\":\"Add new entry\",\"Yerel cihaz modu\":\"Локальный режим\",\"Kısa not (opsiyonel)...\":\"Short note (optional)...\",\"Bildirim izni açık.\":\"Notification permission granted.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Назад\",\"Stres\":\"Stres\",\"Favori yap\":\"Mark as favorite\",\"Hedef yok\":\"No goal\",\"Vazgeç\":\"Отмена\",\"Hedef bilgisi henüz eklenmemiş.\":\"Goal info not added yet.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Top Activities\",\"CSV Dışa Aktar\":\"Экспорт CSV\",\"Aktivite eklendi\":\"Activity added\",\"Protein\":\"Белок\",\"Sağlık Koçu\":\"Коуч по здоровью\",\"Öğün Ritmi Düşük\":\"Low Meal Rhythm\",\"Günlük hatırlatma\":\"Ежедневное напоминание\",\"Aktivite Süresi\":\"Activity Duration\",\"Cal AI Hatırlatma\":\"Calmet Reminder\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Enter injury details\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Sharing...\",\"Kayıt bulunamadı.\":\"No records found.\",\"Takip & Kayıt\":\"Трекинг и логи\",\"Raporu Aç\":\"Открыть отчет\",\"Kullanım Şartları\":\"Условия\",\"Çıkış\":\"Выход\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Чт\",\"Paylaşım ve Aktarım\":\"Обмен и передача\",\"Grafikler\":\"Charts\",\"KVKK\":\"Защита данных\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profile could not be saved. Try again.\",\"Español\":\"Испанский\",\"Uyum\":\"Adherence\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Create a quick entry by entering calories and selecting a meal.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Badges unlock based on streak, water, activity, and meal discipline goals.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Weekly Comparison\",\"Kısa açıklama\":\"Short description\",\"Hızlı\":\"Quick\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Аккаунт\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Streak Badges\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"No results found. Try a different keyword.\",\"Kilo & Ölçüm Takibi\":\"Weight & Measurement Tracking\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Bulk import (cloud)\",\"Tema güncellendi\":\"Theme updated\",\"Performans Analizi\":\"Performance Analysis\",\"Makrolar (g)\":\"Macros (g)\",\"Günlük Veri Kayıtları\":\"Daily Records\",\"ml\":\"мл\",\"En çok kalori getiren seçimler\":\"Highest calorie choices\",\"Kalori\":\"Калории\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Goal Alignment Score\",\"Hızlı Kalori Ekle\":\"Quick Calorie Add\",\"En Eski\":\"Oldest\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Food\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Activity looks low; even short walks help balance.\",\"Öğün Ritmi\":\"Meal Rhythm\",\"Paylaşım bağlantısı hazır.\":\"Share link is ready.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"No entries yet. Add your first entry.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"You're below your protein goal. Strengthen your daily protein intake.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Португальский\",\"Entegrasyonlar\":\"Integrations\",\"unit\":\"unit\",\"Örn: 420\":\"E.g., 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Date\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Track macro balance week by week.\",\"Su hedefi\":\"Water goal\",\"dakika\":\"minutes\",\"Aktivite hedefi\":\"Activity goal\",\"Haftalık spor\":\"Weekly workouts\",\"Öğün Sayısı\":\"Meal Count\",\"Hemen Başla\":\"Начать\",\"Manuel ürünler ve favoriler\":\"Manual products and favorites\",\"Seç\":\"Select\",\"Yerel ölçümler buluta taşındı\":\"Local measurements moved to the cloud\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Low Calorie Average\",\"Lütfen tüm soruları yanıtla.\":\"Please answer all questions.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Active Days\",\"Boy (cm)\":\"Height (cm)\",\"Profil kaydedilemedi.\":\"Profile could not be saved.\",\"Yürüyüş\":\"Walking\",\"Komut Paleti\":\"Command Palette\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Перенос...\",\"Analiz Notu\":\"Analysis Note\",\"Aranıyor...\":\"Searching...\",\"250 ml su ekle\":\"Add 250 ml water\",\"Hedef uyumunun en yüksek olduğu günler\":\"Days with the highest goal alignment\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Enter measurements regularly to clarify the trend.\",\"Akt. Süre\":\"Act. Duration\",\"Her Şey Tek Bir\":\"Все в одном\",\"Yasal\":\"Юридическая информация\",\"Kalori Giriş\":\"Calorie Intake\",\"Ortalama Aktivite\":\"Average Activity\",\"Paneli aç\":\"Open dashboard\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Body Fat %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Feature Flags\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Your water intake is below target. Adding 1–2 glasses during the day can help.\",\"Trendler\":\"Trends\",\"Yüksek\":\"Obese\",\"Fikri Mülkiyet\":\"Интеллектуальная собственность\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Please provide injury details.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Fat goal is low. Try adding healthy fat sources.\",\"Günlük Ort.\":\"Daily Avg.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Русский\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Some entries lack macro data. Choose products for clearer tracking.\",\"Aktivite Girişi\":\"Activity Entry\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Stairs\",\"Verilerin Kullanımı\":\"Использование данных\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Strong Hydration\",\"İleri\":\"Далее\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"The link is invalid or may have been removed.\",\"Kullanıcı\":\"User\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Finish\",\"a\":\"a\",\"Yemek Girişi\":\"Food Entry\",\"Konu\":\"Тема\",\"Haftalık Su Alımı\":\"Еженедельное потребление воды\",\"Kamera açılıyor...\":\"Opening camera...\",\"Favoriye kaydet\":\"Save to favorites\",\"refresh_token\":\"refresh_token\",\"26\":\"26\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Top Days\",\"Veri Sorumlusu\":\"Контролер данных\",\"Doktor kısıtı\":\"Doctor restriction\",\"Henüz aktivite kaydı yok.\":\"No activity entries yet.\",\"Ana hedef\":\"Main goal\",\"Güncellendi\":\"Updated\",\"Bugün Özeti\":\"Today's Summary\",\"Motivasyon Notu\":\"Motivation Note\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Quick Add\",\"Tüm Zamanlar\":\"All Time\",\"Öğün hedefi\":\"Meal goal\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Activity looks good; staying active speeds your progress toward the goal.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"No entries match the filters.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"Без кредитной карты.\",\"Kalori hedefi\":\"Calorie goal\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Details\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"Для первого шага.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Total meals\",\"Yağ Hedefi (g)\":\"Fat Goal (g)\",\"Tüm ürünler\":\"All products\",\"Sıkça Sorulanlar\":\"Часто задаваемые вопросы\",\"Özet\":\"Overview\",\"Sadece favoriler\":\"Favorites only\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"No personalized analysis yet. Add more entries.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Carbs / Fat\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Сделайте первый шаг сегодня.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Панель\",\"Takip Sürekliliği Güçlü\":\"Tracking Consistency Strong\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Search product or enter manually...\",\"Atıştırmalık\":\"Snack\",\"Su (ml)\":\"Water (ml)\",\"Makro Dağılımı\":\"Macro Distribution\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Ваш современный и умный помощник по здоровieu. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Fat Goal\",\"Su Takibi\":\"Water Tracking\",\"Pzt\":\"Пн\",\"Akıllı Panelde.\":\"Умная панель.\",\"Calmet AI\":\"Calmet ИИ\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"Текст о защите данных\",\"İletişim\":\"Контакты\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Features\",\"Plan Seçimi\":\"Выбор тарифа\",\"Güvenlik\":\"Безопасность\",\"Değişiklikler\":\"Изменения\",\"Toplanan Veriler\":\"Собранные данные\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"A line appears when you add measurements.\",\"Yerel kayıtlar buluta taşındı\":\"Local entries moved to the cloud\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"Add your name\",\"Haftalık Sapma Analizi\":\"Weekly Deviation Analysis\",\"provider\":\"provider\",\"Ayar\":\"Настройки\",\"ayarlar settings\":\"settings preferences\",\"Lütfen bu soruyu yanıtla.\":\"Please answer this question.\",\"su hızlı\":\"water quick\",\"AI Gücünü Keşfet\":\"Сила ИИ\",\"Paylaşım bulunamadı\":\"Share not found\",\"Henüz öğün kaydı yok.\":\"No meal entries yet.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Use\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"The link opens the public report view.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Calorie Balance\",\"Miktar (ml)\":\"Amount (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Compare averages to goals\",\"İşlenen Veri Kategorileri\":\"Категории данных\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Ваш личный коуч с ИИ.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Срок хранения\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Meal goal days\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Обновить цели\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Calories\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Add weight, waist, hip, and other measurements regularly.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Align the barcode in the frame.\",\"Profil tamamlama\":\"Profile completion\",\"Bisiklet\":\"Cycling\",\"Kalori (kcal)\":\"Calories (kcal)\",\"Urun\":\"Product\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Goal proximity\",\"Kahvaltı\":\"Breakfast\",\"Yağ (g)\":\"Fat (g)\",\"Hızlı Bağlantılar\":\"Quick Links\",\"Kaydet\":\"Сохранить\",\"Paylaşılan Rapor\":\"Shared Report\",\"Tüm Öğünler\":\"All Meals\",\"Français\":\"Французский\",\"Kütüphane yüklenemedi.\":\"Library failed to load.\",\"Kişisel Bilgiler\":\"Personal Info\",\"Haftalık Sapma\":\"Weekly Deviation\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Enter a valid barcode.\",\"Süre (dk)\":\"Duration (min)\",\"Su takibi başladığında burada görünecek.\":\"It will appear here once water tracking starts.\",\"Yağ Hedefi Düşük\":\"Low Fat Target\",\"En Akıllı Yol.\":\"Самый умный путь.\",\"Aktivite Süresi Düşük\":\"Low Activity Duration\",\"Su eklendi\":\"Water added\",\"En Etkili Günler\":\"Most Effective Days\",\"Tüm Tipler\":\"All Types\",\"tema görünüm\":\"theme appearance\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Описание услуги\",\"Kütüphane yükleniyor...\":\"Loading library...\",\"Sağlıklı Yaşam\":\"Здоровый образ жизни\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Carbohydrate Goal\",\"Görünüm adı\":\"View name\",\"Kamera izni alınamadı.\":\"Camera permission could not be granted.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Дневной лимит исчерпан. Попробуйте еще раз завтра.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Entry Count\",\"Paylaşım oluşturulamadı.\":\"Не удалось создать ссылку для 공유.\",\"Y\":\"F\",\"Karbonhidrat Hedefi (g)\":\"Carbohydrate Goal (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profile user\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manual\",\"Diyetisyen modu açık\":\"Dietitian mode on\",\"Favori\":\"Favorite\",\"Karbonhidrat\":\"Углевод\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Highlights\",\"Başlangıç\":\"Старт\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Activity added (local)\",\"Cmt\":\"Сб\",\"7 Günlük İlerleme Analizi\":\"Анализ прогресса за 7 дней\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Search library\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Турецкий\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Целей.\",\"Henüz kayıtlı ürün yok.\":\"No saved products yet.\",\"Kilitli\":\"Locked\",\"Geri al\":\"Undo\",\"Su Tüketimi\":\"Water Intake\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Data Management\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Search: meal, activity...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manual calorie entry\",\"Yakılan\":\"Burned\",\"Tema\":\"Theme\",\"Yemek eklendi\":\"Meal added\",\"rapor pdf export\":\"report pdf export\",\"Bizi nereden duydun?\":\"How did you hear about us?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Avg. Calories\",\"Net Değişim\":\"Net Change\",\"Aktivite süresi\":\"Activity duration\",\"Günlük öğün ritmi\":\"Daily meal rhythm\",\"Barkod bulunamadı.\":\"Barcode not found.\",\"Hedef uyum skoru\":\"Goal alignment score\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"Save as PDF\",\"Hedefler güncellendi\":\"Goals updated\",\"Keşfet\":\"Узнать больше\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"If you increase tracking days, your progress curve will be clearer.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Amount (g)\",\"Akşam\":\"Dinner\",\"Karbonhidrat hedefi\":\"Carbohydrate goal\",\"Aktivite Rozetleri\":\"Activity Badges\",\"Suya Yaklaştın\":\"Close on Hydration\",\"Calmet nedir?\":\"Что такое Calmet?\",\"Sağlık platformlarını bağla\":\"Connect health platforms\",\"Not\":\"Note\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Notification permission denied.\",\"Ağırlık\":\"Weight Training\",\"Gün\":\"День\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"Send Email\",\"Ortalama Su\":\"Average Water\",\"Abonelikler\":\"Подписки\",\"Sıkça Sorulan Sorular\":\"FAQ\",\"Favori güncellenemedi.\":\"Favorite could not be updated.\",\"Sal\":\"Вт\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Calorie Burn\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Overall Performance Summary\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barcode lookup failed.\",\"Hatırlatıcı güncellendi\":\"Reminder updated\",\"Toplu içe aktarma (cihaz)\":\"Bulk import (device)\",\"Ekle\":\"Добавить\",\"Toplam Kalori\":\"Total Calories\",\"Diyetisyen modu kapalı\":\"Dietitian mode off\",\"Abonelik & Ödeme\":\"Подписка и оплата\",\"CSV İçe Aktar\":\"Импорт CSV\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Activity intensity overview\",\"Beslenme Raporu\":\"Nutrition Report\",\"Profil\":\"Профиль\",\"500 ml su ekle\":\"Add 500 ml water\",\"Ölçüm eklendi\":\"Measurement added\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filter and find entries quickly.\",\"Hatırlatıcılar\":\"Напоминания\",\"error\":\"error\",\"Hesabım\":\"Мой аккаунт\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Small steps start big changes. Keep going!\",\"Tahmini kalori\":\"Estimated calories\",\"Ürün\":\"Продукт\",\"Rozetler\":\"Badges\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Water added (local)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Underweight\",\"Akt.\":\"Act.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"History\",\"Günlük Kalori Hedefi\":\"Цель по калориям\",\"kez tüketildi\":\"times consumed\",\"AI Görsel Tanıma\":\"AI Visual Recognition\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"Вы достигли дневного лимита. Вы можете попробовать снова завтра.\",\"Cum\":\"Пт\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"Calmet поможет вам достичь целей в области здоровья кратчайшим путем.\",\"Günlük Öğün Hedefi (adet)\":\"Цель по приемам пищи\",\"Net kalori\":\"Net calories\",\"Gizlilik Politikası\":\"Конфиденциальность\",\"Paylaşmak için giriş yapın.\":\"Sign in to share.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Meal Badges\",\"Cal AI Rapor\":\"Calmet Report\",\"Kişiye Özel Diyet Takvimi\":\"Персональный календарь диеты\",\"Ücretsiz\":\"Бесплатно\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Browser notifications are not supported.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Few meals include macro data. Add product details to sharpen tracking.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Highlights for key metrics\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"default\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Injury detail\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Share Link\",\"Ürün kütüphaneye kaydedildi.\":\"Product saved to the library.\",\"kg\":\"кг\",\"light\":\"light\",\"Giriş Yap\":\"Войти\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Type at least 3 letters to search products.\",\"Kişisel Veri Güvenliği\":\"Безопасность данных\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Сегодняшний отчет\",\"Koşu\":\"Running\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Ваши права\",\"Güncel kilo\":\"Current weight\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"Badges appear after you add your first entries.\",\"Kapalı\":\"Off\",\"Ücretsiz Hesabını Oluştur\":\"Создать бесплатный аккаунт\",\"Oto hesapla\":\"Auto calculate\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Could not save to cloud; saved to your device.\",\"Takip Sürekliliği Zayıf\":\"Tracking Consistency Low\",\"Kamera veya barkod numarası\":\"Camera or barcode number\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Weight\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"Язык приложения\",\"Yemek adı\":\"Food name\",\"Yüzme\":\"Swimming\",\"Öğün kayıtları başladığında burada görünecek.\":\"Meal logs will appear here once you start logging.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"Write to us on the contact page; we will close your account securely.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"Посмотреть тарифы\",\"Enerji dengesinin hareketini takip edin.\":\"Track how your energy balance moves.\",\"70\":\"70\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"No data for the selected measurement.\",\"Aktivite (dk)\":\"Activity (min)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Цель по активности (мин)\",\"Görünüm Kaydet\":\"Save View\",\"Kişisel Analiz ve Motivasyon\":\"Personal Analysis & Motivation\",\"Haftalık Kalori Dengesi\":\"Weekly Calorie Balance\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Your browser does not support barcode scanning.\",\"Destek\":\"Поддержка\",\"Yerel cihazınızda saklanır\":\"Stored on your device\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Injury\",\"Komut ara...\":\"Search commands...\",\"Makro Verisi Eksik\":\"Macro Data Missing\",\"Destek e-postamız:\":\"Наша почта:\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Manually add walking, running, or gym activities.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan unlocks advanced analytics, unlimited entries, and custom reports.\",\"Dönem\":\"Period\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Upgrade to Premium\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Meal added (local)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Activity logs will appear here once you start logging.\",\"Protein Hedefi (g)\":\"Protein Goal (g)\",\"Günlük Detaylar\":\"Daily Details\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Автоматический расчет калорий\",\"Sil\":\"Удалить\",\"Kalori, su ve makro değişimleri\":\"Calorie, water, and macro changes\",\"Kayıt güncellendi\":\"Entry updated\",\"Beslenme Tercihleri\":\"Nutrition Preferences\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Достигайте своих\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Highlights days closer to the goal.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV import/export (device or cloud).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Carb goal looks low. Increase it for better energy balance.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Last entry\",\"Kişisel Yorumlar\":\"Personal Insights\",\"Kopyala\":\"Копировать\",\"Toplam ölçüm\":\"Total measurements\",\"İşleme Amaçları\":\"Цели обработки\",\"Genel İstatistikler\":\"Overall Statistics\",\"Aktiviteye Yaklaştın\":\"Close on Activity\",\"Tarih/Saat\":\"Date/Time\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Meal rhythm looks scattered. Stabilizing main meals improves balance.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"No standout days yet.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Цель по воде (мл)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Close camera\",\"Paz\":\"Вс\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"Английский\",\"Kalori Ortalaması Yüksek\":\"High Calorie Average\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Feature flags updated\",\"Protein Hedefi Düşük\":\"Protein Target Low\",\"Bulut (Neon) aktif\":\"Облако (Neon) активно\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Goal Proximity\",\"Kalori girişi ve çıkışı\":\"Calories in and out\",\"Paketler\":\"Планы\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Product name is required for the library.\",\"Dikkat\":\"Alert\",\"Kayıt Geçmişi\":\"История записей\",\"İsim\":\"Name\",\"Mesajın\":\"Ваше сообщение\",\"Aktivite Girdisi\":\"Activity Entry\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Enable dim theme\",\"Ortalama Kalori\":\"Average Calories\",\"Performans Özeti\":\"Performance Summary\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Low Hydration\",\"Protein Hedefi\":\"Protein Goal\",\"Ürün Kütüphanesi\":\"Product Library\",\"Sabit\":\"Sabit\",\"Öğle\":\"Lunch\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Product could not be deleted.\",\"Günlük ort. kalori\":\"Avg. daily calories\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Water tracking looks good; this pace supports recovery.\",\"panel dashboard home\":\"dashboard home overview\",\"Fazla\":\"Overweight\",\"K\":\"C\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Daily water trend\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"No data yet. First entries will populate the chart.\",\"Barkod ile bul\":\"Find by barcode\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Water Badges\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Готовые шаблоны блюд\",\"Henüz haftalık veri yok.\":\"No weekly data yet.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barcode number\",\"Günlük hareket dakikaları\":\"Daily activity minutes\",\"PDF raporu aç\":\"Open PDF report\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Current streak\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Top Meals\",\"Aktivite temposunu görselleştirir.\":\"Visualizes your activity pace.\",\"Karbonhidrat (g)\":\"Carbohydrate (g)\",\"Hafta\":\"Неделя\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Подробные графики\",\"Tahmini\":\"Estimated\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Особенности\",\"Rapor Dışa Aktarım\":\"Report Export\",\"Dil\":\"Language\",\"Ekipman durumu\":\"Equipment level\",\"Kalça\":\"Hip\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Ваши данные о калориях, воде и активности синхронизируются мгновенно. ИИ обнаруживает недостатки.\",\"Barkod tara\":\"Scan barcode\",\"Güçlü\":\"Strong\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Close with Esc • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"No results found. You can enter calories manually.\",\"Aktivite kalorisi\":\"Activity calories\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Calorie Balance Looks Good\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"You can export PDF or Excel from the report screen.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"Could not read CSV. Check the format.\",\"Açıldı\":\"Открыто\",\"Girilen ve tahmini yakılan kalori\":\"Intake and estimated calories burned\",\"Yerel profil\":\"Local profile\",\"image_url\":\"image_url\",\"Sapma\":\"Deviation\",\"Yardım Merkezi\":\"Помощь\",\"En Çok Tercih Edilen\":\"Самый популярный\",\"Tüm kayıtların özet görünümü.\":\"Summary view of all entries.\",\"Kütüphaneye kaydet\":\"Save to library\",\"Premium modüllerini bu panelden yönetin.\":\"Manage premium modules from this panel.\",\"Ort. Protein\":\"Avg. Protein\",\"Spor seviyesi\":\"Fitness level\",\"Ücretlendirme\":\"Цeny\",\"textarea\":\"textarea\",\"Su Alımı\":\"Water Intake\",\"İzin Ver\":\"Разрешить\",\"Bir şeyler sor...\":\"Спросите что-нибудь...\",\"Pro Bağlantıları\":\"Pro Connections\",\"En Yeni\":\"Newest\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Notification permission not granted.\",\"Ayarları aç\":\"Open settings\",\"Rapor yükleniyor...\":\"Loading report...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Alignment Score\",\"dk\":\"мин\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Camera access is not supported.\",\"Öğün düzenini gün gün izleyin.\":\"Track meal consistency day by day.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Entry deleted\",\"Kullanıcı Sorumlulukları\":\"Обязанности пользователя\",\"Rapor\":\"Report\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Meal goal rate\",\"Car\":\"Ср\",\"Kapat\":\"Закрыть\",\"Kayıt Ol\":\"Регистрация\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"Еженедельный план, автоматически формируемый на основе ваших целей, привычек и ежедневного расписания.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Четко просматривайте ежедневный, еженедельный и ежемесячный прогресс. Тренды и отклонения на одном экране.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Выбирайте блюда из шаблонов, одобренных диетологами, не вводя калории по отдельности.\",\"Pro'ya Yükselt\":\"Перейти на Pro\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"Вы достигли суточного лимита в 25 сообщений. Ждем вас завтра!\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"ИИ-коуч доступен только в плане AI PLUS.\",\"Cevap üretilemedi.\":\"Не удалось сгенерировать ответ.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"Произошла ошибка. Пожалуйста, попробуйте еще раз.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"Сервис ИИ в данный момент не настроен (отсутствует GROQ_API_KEY). Пожалуйста, свяжитесь с администратором.\",\"Fotoğraf ile Ekle\":\"Добавить по фото\",\"AI destekli yemek tanıma yakında aktif olacak.\":\"Распознавание еды с ИИ скоро будет доступно.\",\"Fotoğraf Yükle\":\"Загрузить фото\",\"Yakında\":\"Скоро\",\"Fotoğraf ile ekleme bu sürümde aktif değil.\":\"Добавление по фото недоступно в этой версии.\",\"Özel miktar (ml)\":\"Свое количество (мл)\",\"Uyku Aşamaları\":\"Фазы сна\",\"Derin/REM analizi yakında burada gösterilecek.\":\"Анализ глубокого/REM сна скоро появится здесь.\",\"Hızlı Erişim\":\"Быстрый доступ\",\"Ölçümler\":\"Измерения\",\"PDF Raporu\":\"PDF-отчет\",\"Detaylı raporu PDF olarak cihazına kaydet veya paylaş.\":\"Сохраните или поделитесь подробным отчетом в PDF на устройстве.\",\"PDF Oluştur\":\"Создать PDF\",\"Raporu Paylaş\":\"Поделиться отчетом\",\"Paylaşım sırasında hata oluştu.\":\"Ошибка при создании ссылки.\",\"PDF oluşturulamadı.\":\"Не удалось создать PDF.\",\"Kilo Değişimi\":\"Изменение веса\",\"Kilo verisi bulunamadı.\":\"Нет данных о весе.\",\"Makro Besin Dağılımı\":\"Распределение макронутриентов\",\"Uyku Başlangıcı\":\"Начало сна\",\"Uyanış Zamanı\":\"Время пробуждения\",\"Uyku Kalitesi\":\"Качество сна\",\"Uyku Ekle\":\"Добавить сон\",\"Uyku nasıldı? Rüyalar, uyanmalar...\":\"Как прошел сон? Сны, пробуждения...\",\"Kötü\":\"Плохо\",\"Orta\":\"Средне\",\"İyi\":\"Хорошо\",\"Mükemmel\":\"Отлично\",\"Su Hatırlatıcısı\":\"Напоминание о воде\",\"Yemek Hatırlatıcıları\":\"Напоминания о еде\",\"Uyku Hatırlatıcısı\":\"Напоминание о сне\",\"Yatma Saati\":\"Время сна\",\"Öğün Hatırlatıcısı\":\"Напоминание о приеме пищи\",\"Günlük su hedefini tamamlamayı unutma.\":\"Не забудьте выполнить дневную норму воды.\",\"Kahvaltı kaydını eklemeyi unutma.\":\"Не забудьте добавить завтрак.\",\"Öğle öğününü eklemeyi unutma.\":\"Не забудьте добавить обед.\",\"Akşam öğününü eklemeyi unutma.\":\"Не забудьте добавить ужин.\",\"Uyku düzenini korumak için hazırlanma zamanı.\":\"Пора готовиться ко сну.\",\"Birimler\":\"Единицы\",\"Metrik\":\"Метрическая\",\"İmperyal\":\"Имперская\",\"Metrik (kg, cm)\":\"Метрическая (кг, см)\",\"İmperyal (lb, in)\":\"Имперская (фунты, дюймы)\",\"Rozetler ve Başarımlar\":\"Значки и достижения\",\"Devam et\":\"Продолжай\",\"7 Gün Seri\":\"Серия 7 дней\",\"Su Disiplini\":\"Дисциплина воды\",\"Öğün Dengesi\":\"Баланс питания\",\"Aktivite Serisi\":\"Серия активности\",\"Uyku Rutini\":\"Режим сна\",\"Haftalık Uyku\":\"Недельный сон\",\"Makrolar\":\"Макросы\"}"));}),
"[project]/packages/shared/src/locales/pt.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"Hedeflerden sapma ve uyum skoru\":\"Deviation from goals and adherence score\",\"Yağ\":\"Gordura\",\"Henüz ölçüm yok. Profil sayfasından ekleyin.\":\"No measurements yet. Add them from the profile page.\",\"AI Destekli Sağlık Takibi\":\"Rastreamento de Saúde com IA\",\"Yaş\":\"Age\",\"q\":\"q\",\"Öğün\":\"Meal\",\"Beklentin\":\"Your expectation\",\"Hesap güvenliğini korumak.\":\"Hesap güvenliğini korumak.\",\"Öğün Ritmi Dengeli\":\"Balanced Meal Rhythm\",\"Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.\":\"Calories burned is an estimate. User edits always take precedence.\",\"Ara\":\"Search\",\"Limit yarın sıfırlanır.\":\"O limite será redefinido amanhã.\",\"Profiliniz kişiselleşsin, hedefleriniz netleşsin.\":\"Personalize your profile and clarify your goals.\",\"CSV dışa aktarıldı.\":\"CSV exported.\",\"Verilerini ciddiye alan sporcular için.\":\"Para atletas sérios.\",\"Destek için: haliskoc200@gmail.com\":\"Destek için: haliskoc200@gmail.com\",\"Yağ hedefi\":\"Fat goal\",\"Ölçüm güncellendi\":\"Measurement updated\",\"öğün\":\"meal\",\"Belirtilmedi\":\"Not specified\",\"Su\":\"Água\",\"Detayları Gör\":\"Detayları Gör\",\"Her Şey Dahil (Pro Özellikler)\":\"Her Şey Dahil (Pro Özellikler)\",\"Genel uyum\":\"Genel uyum\",\"Kaydediliyor...\":\"Saving...\",\"Net\":\"Net\",\"Göğüs\":\"Chest\",\"Düzenlemeyi Kapat\":\"Düzenlemeyi Kapat\",\"Vücudun için\":\"Para seu corpo\",\"Takip edilen gün\":\"Tracked days\",\"Preset veya özel miktar\":\"Preset or custom amount\",\"Limit doldu...\":\"Limite atingido...\",\"Ücretsiz Başla\":\"Grátis\",\"Açık\":\"On\",\"4) Uyku / Stres / Ruh Hali Check-in\":\"4) Uyku / Stres / Ruh Hali Check-in\",\"Profil kaydedildi.\":\"Profile saved.\",\"Kütüphane kaydı başarısız.\":\"Library save failed.\",\"Görüntü tabanlı loglama şu an kapalıdır.\":\"Image-based logging is currently disabled.\",\"Bu rapor yalnızca bilgi amaçlıdır. Tıbbi tavsiye içermez.\":\"This report is for informational purposes only. It does not provide medical advice.\",\"Hatırlatma için tarayıcı izni gereklidir.\":\"Browser permission is required for reminders.\",\"Eksik veya yanlış verilerin düzeltilmesini isteme\":\"Eksik veya yanlış verilerin düzeltilmesini isteme\",\"Grafikli PDF + Excel çıktısı\":\"PDF with charts + Excel export\",\"meal_type\":\"meal_type\",\"Form gönderimi e-posta uygulaman üzerinden yapılır.\":\"Form gönderimi e-posta uygulaman üzerinden yapılır.\",\"Performans Durumu\":\"Performance Status\",\"Protein hedefi\":\"Protein goal\",\"Toplam Su\":\"Total Water\",\"source\":\"source\",\"100\":\"100\",\"Yönlendiriliyor...\":\"Yönlendiriliyor...\",\"Sorumluluk Reddi\":\"Aviso Legal\",\"AI Koçu şu an sadece AI Plus paketinde aktif.\":\"O Coach de IA está ativo apenas no plano AI Plus.\",\"Düzenle\":\"Editar\",\"Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur.\":\"Your activity time is below target. Adding 10–15 minutes daily helps.\",\"Daha İyi Bir Sen İçin\":\"Para um Você Melhor\",\"Hedefler\":\"Goals\",\"Kalori alımın hedefle uyumlu, ritmi koruyorsun.\":\"Calorie intake matches your target; keep the rhythm.\",\"Kilo (kg)\":\"Weight (kg)\",\"action\":\"action\",\"Bilinmeyen Ürün\":\"Unknown Product\",\"20:00\":\"20:00\",\"Hesap & Profil\":\"Conta e Perfil\",\"Daha Az Göster\":\"Daha Az Göster\",\"Grafik\":\"Chart\",\"-\":\"-\",\"Orta Yoğunluk\":\"Orta Yoğunluk\",\"AI özellikleri varsayılan olarak kapalı\":\"AI features are off by default.\",\"Aydınlık temaya dön\":\"Switch to light theme\",\"Toplam su\":\"Total water\",\"Cihazdaki kayıtları taşı\":\"Transferir registros locais\",\"Kullanım şartlarıyla ilgili sorular için\":\"Kullanım şartlarıyla ilgili sorular için\",\"Toplam kayıt\":\"Total entries\",\"Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?\":\"Olá! Eu sou o seu Coach de Saúde Calmet IA. Como posso ajudar com seus objetivos de nutrição ou treino hoje?\",\"Spor yeri\":\"Workout location\",\"Görsel Veri Analizi\":\"Visual Data Analysis\",\"Paylaş\":\"Share\",\"Excel Olarak İndir\":\"Download as Excel\",\"ekle yeni entry\":\"add new entry\",\"Makro Hedef Takibi\":\"Macro Goal Tracking\",\"Aktivite Hedefi Güçlü\":\"Strong Activity Target\",\"Akt. Kalori\":\"Act. Calories\",\"CSV içinde kayıt bulunamadı.\":\"No entries found in the CSV.\",\"Karbonhidrat Düşük\":\"Low Carbs\",\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\":\"Soruların, geri bildirimlerin ya da önerilerin için bize yaz.\",\"175\":\"175\",\"Kalori değeri tahminidir\":\"Calorie value is an estimate\",\"Ölçüm silindi\":\"Measurement deleted\",\"Ad Soyad\":\"Full Name\",\"Aktivite\":\"Atividade\",\"Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.\":\"Muito mais do que apenas um aplicativo de rastreamento. Combinamos dados científicos com tecnologia moderna.\",\"Neden Calmet?\":\"Por que Calmet?\",\"İçe aktarılıyor...\":\"Importando...\",\"Makro verisi oluştuğunda burada görünecek.\":\"It will appear here once macro data is available.\",\"Bel\":\"Waist\",\"Girilen ve yakılan kalori trendi\":\"Trend of calories in and out\",\"Günlük ort. su\":\"Avg. daily water\",\"Veri yok\":\"Veri yok\",\"9) Yemek Kütüphanesi (Favori Setler)\":\"9) Yemek Kütüphanesi (Favori Setler)\",\"Kilo & Ölçüm Trendleri\":\"Weight & Measurement Trends\",\"Ayarlar\":\"Configurações\",\"AI Sağlık Koçu\":\"Coach de Saúde IA\",\"Günlük Kalori & Su Takibi\":\"Günlük Kalori & Su Takibi\",\"Toplam kalori\":\"Total calories\",\"Hedef Kilo (kg)\":\"Peso Alvo (kg)\",\"Profil sayfası\":\"Profile page\",\"Filtreyi temizle\":\"Clear filters\",\"kcal\":\"kcal\",\"E-posta ile Gönder\":\"Enviar por E-mail\",\"Kayıtların gün bazlı özeti\":\"Daily summary of entries\",\"Hızlı Ekle\":\"Hızlı Ekle\",\"Tarayıcı bildirimi ile günlük hatırlatma.\":\"Daily reminders via browser notifications.\",\"Aktivite Özeti\":\"Activity Summary\",\"Bu bağlantının süresi dolmuş.\":\"This link has expired.\",\"Su Girişi\":\"Water Entry\",\"Yeni kayıt ekle\":\"Add new entry\",\"Yerel cihaz modu\":\"Modo dispositivo local\",\"Kısa not (opsiyonel)...\":\"Short note (optional)...\",\"Bildirim izni açık.\":\"Notification permission granted.\",\"Gizlilik ile ilgili talepler için\":\"Gizlilik ile ilgili talepler için\",\"Geri\":\"Voltar\",\"Stres\":\"Stres\",\"Favori yap\":\"Mark as favorite\",\"Hedef yok\":\"No goal\",\"Vazgeç\":\"Cancelar\",\"Hedef bilgisi henüz eklenmemiş.\":\"Goal info not added yet.\",\"Çar\":\"Çar\",\"Öne Çıkan Aktiviteler\":\"Top Activities\",\"CSV Dışa Aktar\":\"Exportar CSV\",\"Aktivite eklendi\":\"Activity added\",\"Protein\":\"Proteína\",\"Sağlık Koçu\":\"Coach de Saúde\",\"Öğün Ritmi Düşük\":\"Low Meal Rhythm\",\"Günlük hatırlatma\":\"Lembrete diário\",\"Aktivite Süresi\":\"Activity Duration\",\"Cal AI Hatırlatma\":\"Calmet Reminder\",\"name\":\"name\",\"Sakatlık detayını yaz\":\"Enter injury details\",\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\":\"Rapor paylaşımında artık süre ve anonimlik seçebilirsin.\",\"Paylaşılıyor...\":\"Sharing...\",\"Kayıt bulunamadı.\":\"No records found.\",\"Takip & Kayıt\":\"Rastreamento e Registros\",\"Raporu Aç\":\"Abrir Relatório\",\"Kullanım Şartları\":\"Termos\",\"Çıkış\":\"Sair\",\"Son 7 gün vs önceki 7 gün\":\"Son 7 gün vs önceki 7 gün\",\"Per\":\"Qui\",\"Paylaşım ve Aktarım\":\"Compartilhamento e Transferência\",\"Grafikler\":\"Charts\",\"KVKK\":\"Proteção de Dados\",\"Günlük 3 Öğün Kaydı\":\"Günlük 3 Öğün Kaydı\",\"Aktarım\":\"Aktarım\",\"Profil kaydedilemedi. Tekrar dene.\":\"Profile could not be saved. Try again.\",\"Español\":\"Espanhol\",\"Uyum\":\"Adherence\",\"Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.\":\"Create a quick entry by entering calories and selecting a meal.\",\"Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.\":\"Badges unlock based on streak, water, activity, and meal discipline goals.\",\"reminder_last_notified_day\":\"reminder_last_notified_day\",\"Haftalık Karşılaştırma\":\"Weekly Comparison\",\"Kısa açıklama\":\"Short description\",\"Hızlı\":\"Quick\",\"Hizmeti yasal ve dürüst şekilde kullanmak.\":\"Hizmeti yasal ve dürüst şekilde kullanmak.\",\"Hesap\":\"Conta\",\"AI Plus\":\"AI Plus\",\"Bulut Yedekleme (Güvenli)\":\"Bulut Yedekleme (Güvenli)\",\"Detaylı Analizler\":\"Detaylı Analizler\",\"Uyku ↔ Kalori\":\"Uyku ↔ Kalori\",\"Seri Rozetleri\":\"Streak Badges\",\"Yüksek Yoğunluk\":\"Yüksek Yoğunluk\",\"AI Koçu\":\"AI Koçu\",\"Sonuç bulunamadı. Farklı bir kelime deneyin.\":\"No results found. Try a different keyword.\",\"Kilo & Ölçüm Takibi\":\"Weight & Measurement Tracking\",\"Planlama ve koçluk araçları\":\"Planlama ve koçluk araçları\",\"Toplu içe aktarma (bulut)\":\"Bulk import (cloud)\",\"Tema güncellendi\":\"Theme updated\",\"Performans Analizi\":\"Performance Analysis\",\"Makrolar (g)\":\"Macros (g)\",\"Günlük Veri Kayıtları\":\"Daily Records\",\"ml\":\"ml\",\"En çok kalori getiren seçimler\":\"Highest calorie choices\",\"Kalori\":\"Calorias\",\"YENİ\":\"YENİ\",\"Hedef Uyum Skoru\":\"Goal Alignment Score\",\"Hızlı Kalori Ekle\":\"Quick Calorie Add\",\"En Eski\":\"Oldest\",\"Tarifi Aç\":\"Tarifi Aç\",\"Yemek\":\"Food\",\"Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.\":\"Activity looks low; even short walks help balance.\",\"Öğün Ritmi\":\"Meal Rhythm\",\"Paylaşım bağlantısı hazır.\":\"Share link is ready.\",\"status\":\"status\",\"Henüz kayıt yok. İlk girişinizi ekleyin.\":\"No entries yet. Add your first entry.\",\"Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir.\":\"You're below your protein goal. Strengthen your daily protein intake.\",\"Öncelikli Yeni Özellikler\":\"Öncelikli Yeni Özellikler\",\"Português\":\"Português\",\"Entegrasyonlar\":\"Integrations\",\"unit\":\"unit\",\"Örn: 420\":\"E.g., 420\",\"/auth/login\":\"/auth/login\",\"Tarih\":\"Date\",\"canvas\":\"canvas\",\"Makro dengesini haftalık ritimle izleyin.\":\"Track macro balance week by week.\",\"Su hedefi\":\"Water goal\",\"dakika\":\"minutes\",\"Aktivite hedefi\":\"Activity goal\",\"Haftalık spor\":\"Weekly workouts\",\"Öğün Sayısı\":\"Meal Count\",\"Hemen Başla\":\"Começar\",\"Manuel ürünler ve favoriler\":\"Manual products and favorites\",\"Seç\":\"Select\",\"Yerel ölçümler buluta taşındı\":\"Local measurements moved to the cloud\",\"Kinoalı yeşil salata\":\"Kinoalı yeşil salata\",\"Kalori Ortalaması Düşük\":\"Low Calorie Average\",\"Lütfen tüm soruları yanıtla.\":\"Please answer all questions.\",\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\":\"AI Plus kullanıcıları için günlük limit 25 mesajdır.\",\"Aktif Günler\":\"Active Days\",\"Boy (cm)\":\"Height (cm)\",\"Profil kaydedilemedi.\":\"Profile could not be saved.\",\"Yürüyüş\":\"Walking\",\"Komut Paleti\":\"Command Palette\",\"Premium Destek\":\"Premium Destek\",\"P\":\"P\",\"Taşınıyor...\":\"Transferindo...\",\"Analiz Notu\":\"Analysis Note\",\"Aranıyor...\":\"Searching...\",\"250 ml su ekle\":\"Add 250 ml water\",\"Hedef uyumunun en yüksek olduğu günler\":\"Days with the highest goal alignment\",\":\":\":\",\"Ölçümleri düzenli girerek trendi netleştir.\":\"Enter measurements regularly to clarify the trend.\",\"Akt. Süre\":\"Act. Duration\",\"Her Şey Tek Bir\":\"Tudo em Um\",\"Yasal\":\"Legal\",\"Kalori Giriş\":\"Calorie Intake\",\"Ortalama Aktivite\":\"Average Activity\",\"Paneli aç\":\"Open dashboard\",\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\":\"Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.\",\"Vücut Yağ %\":\"Body Fat %\",\"İşlemeye itiraz etme\":\"İşlemeye itiraz etme\",\"Doğru ve güncel bilgi sağlamak.\":\"Doğru ve güncel bilgi sağlamak.\",\"Özellik Bayrakları\":\"Feature Flags\",\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\":\"Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.\",\"Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.\":\"Your water intake is below target. Adding 1–2 glasses during the day can help.\",\"Trendler\":\"Trends\",\"Yüksek\":\"Obese\",\"Fikri Mülkiyet\":\"Propriedade Intelectual\",\"Pro\":\"Pro\",\"Lütfen sakatlık detayını yaz.\":\"Please provide injury details.\",\"Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene.\":\"Fat goal is low. Try adding healthy fat sources.\",\"Günlük Ort.\":\"Daily Avg.\",\"Yapay Zeka Promptları\":\"Yapay Zeka Promptları\",\"Haftalık skor -\":\"Haftalık skor -\",\"Русский\":\"Russo\",\"Enerji\":\"Enerji\",\"Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.\":\"Some entries lack macro data. Choose products for clearer tracking.\",\"Aktivite Girişi\":\"Activity Entry\",\"Mood\":\"Mood\",\"Reklamsız Deneyim\":\"Reklamsız Deneyim\",\"Trend ve Sapma Analizi\":\"Trend ve Sapma Analizi\",\"Merdiven\":\"Stairs\",\"Verilerin Kullanımı\":\"Uso de Dados\",\"user_id\":\"user_id\",\"Su Takibi Güçlü\":\"Strong Hydration\",\"İleri\":\"Próximo\",\"Su hedefini gün içinde 2 parçaya böl\":\"Su hedefini gün içinde 2 parçaya böl\",\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\":\"Calmet’i kullanmadan önce aşağıdaki şartları okuyun.\",\"injury\":\"injury\",\"type\":\"type\",\"Bağlantı hatalı veya kaldırılmış olabilir.\":\"The link is invalid or may have been removed.\",\"Kullanıcı\":\"User\",\"Uygulama performansını geliştirmek ve hataları gidermek.\":\"Uygulama performansını geliştirmek ve hataları gidermek.\",\"Bitir\":\"Finish\",\"a\":\"a\",\"Yemek Girişi\":\"Food Entry\",\"Konu\":\"Assunto\",\"Haftalık Su Alımı\":\"Weekly Water Intake\",\"Kamera açılıyor...\":\"Opening camera...\",\"Favoriye kaydet\":\"Save to favorites\",\"refresh_token\":\"refresh_token\",\"26\":\"26\",\"2) Kişisel Beslenme Planı\":\"2) Kişisel Beslenme Planı\",\"7) Gamification & Streak\":\"7) Gamification & Streak\",\"Zirve Günler\":\"Top Days\",\"Veri Sorumlusu\":\"Controlador de Dados\",\"Doktor kısıtı\":\"Doctor restriction\",\"Henüz aktivite kaydı yok.\":\"No activity entries yet.\",\"Ana hedef\":\"Main goal\",\"Güncellendi\":\"Updated\",\"Bugün Özeti\":\"Today's Summary\",\"Motivasyon Notu\":\"Motivation Note\",\"id\":\"id\",\"/ sonsuza kadar\":\"/ sonsuza kadar\",\"Hızlı Ekleme\":\"Quick Add\",\"Tüm Zamanlar\":\"All Time\",\"Öğün hedefi\":\"Meal goal\",\"Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.\":\"Activity looks good; staying active speeds your progress toward the goal.\",\"Düşüş\":\"Düşüş\",\"Filtrelere uygun kayıt bulunamadı.\":\"No entries match the filters.\",\"Kredi kartı gerekmez. Saniyeler içinde başla.\":\"Sem cartão de crédito.\",\"Kalori hedefi\":\"Calorie goal\",\"Paylaşım süresi\":\"Paylaşım süresi\",\"Detaylar\":\"Details\",\"theme_accent\":\"theme_accent\",\"Sağlıklı yaşama ilk adımı atanlar için.\":\"Para quem dá o primeiro passo.\",\"Bu hafta ritmi koru, hedeflere sadık kal.\":\"Bu hafta ritmi koru, hedeflere sadık kal.\",\"injury_detail\":\"injury_detail\",\"Öğün toplamı\":\"Total meals\",\"Yağ Hedefi (g)\":\"Fat Goal (g)\",\"Tüm ürünler\":\"All products\",\"Sıkça Sorulanlar\":\"Perguntas Frequentes\",\"Özet\":\"Overview\",\"Sadece favoriler\":\"Favorites only\",\"10) Gizlilik & Paylaşım\":\"10) Gizlilik & Paylaşım\",\"Henüz kişisel analiz yok. Daha fazla kayıt ekleyin.\":\"No personalized analysis yet. Add more entries.\",\"Protein / Karbonhidrat / Yağ\":\"Protein / Carbs / Fat\",\"theme_mode\":\"theme_mode\",\"Bugün İlk Adımı At.\":\"Dê o primeiro passo hoje.\",\"Uygulama kullanım verileri\":\"Uygulama kullanım verileri\",\"range\":\"range\",\"Panel\":\"Painel\",\"Takip Sürekliliği Güçlü\":\"Tracking Consistency Strong\",\"plan\":\"plan\",\"Ürün Ara veya Manuel Gir...\":\"Search product or enter manually...\",\"Atıştırmalık\":\"Snack\",\"Su (ml)\":\"Water (ml)\",\"Makro Dağılımı\":\"Macro Distribution\",\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\":\"Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.\",\"Hedeflere Uygula\":\"Hedeflere Uygula\",\"Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.\":\"Seu assistente de saúde moderno e inteligente. 2026 Calmet App Inc.\",\"Yağ Hedefi\":\"Fat Goal\",\"Su Takibi\":\"Water Tracking\",\"Pzt\":\"Seg\",\"Akıllı Panelde.\":\"Painel Inteligente.\",\"Calmet AI\":\"Calmet IA\",\"Detaylı Grafikler & Analizler\":\"Detaylı Grafikler & Analizler\",\"KVKK Aydınlatma Metni\":\"Texto de Proteção de Dados\",\"İletişim\":\"Contato\",\"sport_level\":\"sport_level\",\"AI Özellikleri\":\"AI Features\",\"Plan Seçimi\":\"Seleção de Plano\",\"Güvenlik\":\"Segurança\",\"Değişiklikler\":\"Alterações\",\"Toplanan Veriler\":\"Dados Coletados\",\"Detaylı raporu aç\":\"Detaylı raporu aç\",\"Ölçüm eklediğinizde çizgi oluşur.\":\"A line appears when you add measurements.\",\"Yerel kayıtlar buluta taşındı\":\"Local entries moved to the cloud\",\"workout_days\":\"workout_days\",\"Bu haftanın odak planı hazır.\":\"Bu haftanın odak planı hazır.\",\"calai_gfit_state\":\"calai_gfit_state\",\"İsmini ekle\":\"Add your name\",\"Haftalık Sapma Analizi\":\"Weekly Deviation Analysis\",\"provider\":\"provider\",\"Ayar\":\"Ajustes\",\"ayarlar settings\":\"settings preferences\",\"Lütfen bu soruyu yanıtla.\":\"Please answer this question.\",\"su hızlı\":\"water quick\",\"AI Gücünü Keşfet\":\"Descobrir Poder da IA\",\"Paylaşım bulunamadı\":\"Share not found\",\"Henüz öğün kaydı yok.\":\"No meal entries yet.\",\"Yükseliş\":\"Yükseliş\",\"Kullan\":\"Use\",\"Bağlantı açık rapor görünümüne yönlendirir.\":\"The link opens the public report view.\",\"Akıllı Beslenme Planlama\":\"Akıllı Beslenme Planlama\",\"Kalori Dengesi\":\"Calorie Balance\",\"Miktar (ml)\":\"Amount (ml)\",\"Ortalama değerler ile hedef karşılaştırması\":\"Compare averages to goals\",\"İşlenen Veri Kategorileri\":\"Categorias de Dados Processados\",\"Yapay zeka gücüyle kişisel koçunuz.\":\"Seu coach pessoal com IA.\",\"Mood ↔ Öğün\":\"Mood ↔ Öğün\",\"Saklama Süresi\":\"Período de Retenção\",\"barcode\":\"barcode\",\"Öğün hedef günleri\":\"Meal goal days\",\"/ ay\":\"/ ay\",\"Protein (g)\":\"Protein (g)\",\"Hedefleri Güncelle\":\"Atualizar Metas\",\"Hesabımı nasıl kapatırım?\":\"Hesabımı nasıl kapatırım?\",\"Paketimi nasıl yükseltirim?\":\"Paketimi nasıl yükseltirim?\",\"Net Kalori\":\"Net Calories\",\"Kilo, bel, kalça ve diğer ölçümleri düzenli ekleyin.\":\"Add weight, waist, hip, and other measurements regularly.\",\"Sapma uyarıları\":\"Sapma uyarıları\",\"disconnected\":\"disconnected\",\"Barkodu kadraja alın.\":\"Align the barcode in the frame.\",\"Profil tamamlama\":\"Profile completion\",\"Bisiklet\":\"Cycling\",\"Kalori (kcal)\":\"Calories (kcal)\",\"Urun\":\"Product\",\"Calmet - Sağlıklı Yaşam Takibi\":\"Calmet - Sağlıklı Yaşam Takibi\",\"Hedefe yaklaşma\":\"Goal proximity\",\"Kahvaltı\":\"Breakfast\",\"Yağ (g)\":\"Fat (g)\",\"Hızlı Bağlantılar\":\"Links Rápidos\",\"Kaydet\":\"Salvar\",\"Paylaşılan Rapor\":\"Shared Report\",\"Tüm Öğünler\":\"All Meals\",\"Français\":\"Francês\",\"Kütüphane yüklenemedi.\":\"Library failed to load.\",\"Kişisel Bilgiler\":\"Personal Info\",\"Haftalık Sapma\":\"Weekly Deviation\",\"Tüm kayıtlarını burada yönetebilirsin.\":\"Tüm kayıtlarını burada yönetebilirsin.\",\"Geçerli bir barkod girin.\":\"Enter a valid barcode.\",\"Süre (dk)\":\"Duration (min)\",\"Su takibi başladığında burada görünecek.\":\"It will appear here once water tracking starts.\",\"Yağ Hedefi Düşük\":\"Low Fat Target\",\"En Akıllı Yol.\":\"O Caminho mais Inteligente.\",\"Aktivite Süresi Düşük\":\"Low Activity Duration\",\"Su eklendi\":\"Water added\",\"En Etkili Günler\":\"Most Effective Days\",\"Tüm Tipler\":\"All Types\",\"tema görünüm\":\"theme appearance\",\"Temel Raporlar (Son 7 Gün)\":\"Temel Raporlar (Son 7 Gün)\",\"Silme veya yok etme talebinde bulunma\":\"Silme veya yok etme talebinde bulunma\",\"Hedeflere yakınlık ve haftalık sapma\":\"Hedeflere yakınlık ve haftalık sapma\",\"doctor_restriction\":\"doctor_restriction\",\"Kişisel verilerin işlenip işlenmediğini öğrenme\":\"Kişisel verilerin işlenip işlenmediğini öğrenme\",\"Kalori hesaplamaları neye göre yapılıyor?\":\"Kalori hesaplamaları neye göre yapılıyor?\",\"Hizmet Tanımı\":\"Descrição do Serviço\",\"Kütüphane yükleniyor...\":\"Loading library...\",\"Sağlıklı Yaşam\":\"Vida Saudável\",\"Öneriyi Uygula\":\"Öneriyi Uygula\",\"Karbonhidrat Hedefi\":\"Carbohydrate Goal\",\"Görünüm adı\":\"View name\",\"Kamera izni alınamadı.\":\"Camera permission could not be granted.\",\"Günlük limitin doldu. Yarın tekrar deneyebilirsin.\":\"Limite diário atingido. Tente novamente amanhã.\",\"AI\":\"AI\",\"Kayıt Sayısı\":\"Entry Count\",\"Paylaşım oluşturulamadı.\":\"Share could not be created.\",\"Y\":\"F\",\"Karbonhidrat Hedefi (g)\":\"Carbohydrate Goal (g)\",\"Tarif linki (opsiyonel)\":\"Tarif linki (opsiyonel)\",\"Uyku (saat)\":\"Uyku (saat)\",\"8) Koçluk Akışı\":\"8) Koçluk Akışı\",\"profil kullanıcı\":\"profile user\",\"Düşük Yoğunluk\":\"Düşük Yoğunluk\",\".\":\".\",\"Manuel\":\"Manual\",\"Diyetisyen modu açık\":\"Dietitian mode on\",\"Favori\":\"Favorite\",\"Karbonhidrat\":\"Carboidrato\",\"Makro\":\"Makro\",\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\":\"Takip, analiz ve kişiselleştirilmiş öneriler sunmak.\",\"Öne çıkanlar\":\"Highlights\",\"Başlangıç\":\"Início\",\"active\":\"active\",\"Aktivite eklendi (yerel)\":\"Activity added (local)\",\"Cmt\":\"Sáb\",\"7 Günlük İlerleme Analizi\":\"Análise de Progresso de 7 Dias\",\"Akıllı Modüller\":\"Akıllı Modüller\",\"Kütüphanede ara\":\"Search library\",\"Onboarding\":\"Onboarding\",\"equipment_level\":\"equipment_level\",\"Türkçe\":\"Turco\",\"Fırın sebze + yoğurt sos\":\"Fırın sebze + yoğurt sos\",\"Gerçeğe Dönüştürün\":\"Objetivos.\",\"Henüz kayıtlı ürün yok.\":\"No saved products yet.\",\"Kilitli\":\"Locked\",\"Geri al\":\"Undo\",\"Su Tüketimi\":\"Water Intake\",\"En çok sorulan soruları hızlıca yanıtladık.\":\"En çok sorulan soruları hızlıca yanıtladık.\",\"Veri Yönetimi\":\"Data Management\",\"referral_source\":\"referral_source\",\"Ara: öğün, aktivite...\":\"Search: meal, activity...\",\"Güvenli Ödeme / İptal Hakkı\":\"Güvenli Ödeme / İptal Hakkı\",\"Manuel kalori girişi\":\"Manual calorie entry\",\"Yakılan\":\"Burned\",\"Tema\":\"Theme\",\"Yemek eklendi\":\"Meal added\",\"rapor pdf export\":\"report pdf export\",\"Bizi nereden duydun?\":\"How did you hear about us?\",\"code\":\"code\",\"access_token\":\"access_token\",\"Check-in Kaydet\":\"Check-in Kaydet\",\"Ort. Kalori\":\"Avg. Calories\",\"Net Değişim\":\"Net Change\",\"Aktivite süresi\":\"Activity duration\",\"Günlük öğün ritmi\":\"Daily meal rhythm\",\"Barkod bulunamadı.\":\"Barcode not found.\",\"Hedef uyum skoru\":\"Goal alignment score\",\"anon\":\"anon\",\"PDF Olarak Kaydet\":\"Save as PDF\",\"Hedefler güncellendi\":\"Goals updated\",\"Keşfet\":\"Descobrir\",\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\":\"Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin.\",\"Veri sorumlusu: Calmet App. İletişim:\":\"Veri sorumlusu: Calmet App. İletişim:\",\"Takip günlerini artırırsan gelişim eğrisi daha net görünür.\":\"If you increase tracking days, your progress curve will be clearer.\",\"Plan\":\"Plan\",\"Miktar (g)\":\"Amount (g)\",\"Akşam\":\"Dinner\",\"Karbonhidrat hedefi\":\"Carbohydrate goal\",\"Aktivite Rozetleri\":\"Activity Badges\",\"Suya Yaklaştın\":\"Close on Hydration\",\"Calmet nedir?\":\"O que é Calmet?\",\"Sağlık platformlarını bağla\":\"Connect health platforms\",\"Not\":\"Note\",\"amber\":\"amber\",\"Bildirim izni reddedildi.\":\"Notification permission denied.\",\"Ağırlık\":\"Weight Training\",\"Gün\":\"Dia\",\"Son hafta\":\"Son hafta\",\"E-posta Gönder\":\"Enviar E-mail\",\"Ortalama Su\":\"Average Water\",\"Abonelikler\":\"Assinaturas\",\"Sıkça Sorulan Sorular\":\"Perguntas Frequentes\",\"Favori güncellenemedi.\":\"Favorite could not be updated.\",\"Sal\":\"Ter\",\"Calmet\":\"Calmet\",\"subscription_status\":\"subscription_status\",\"Kalori Çıkış\":\"Calorie Burn\",\"Normal\":\"Normal\",\"Genel Performans Özeti\":\"Overall Performance Summary\",\"Ton balıklı sandviç\":\"Ton balıklı sandviç\",\"Barkod aranamadı.\":\"Barcode lookup failed.\",\"Hatırlatıcı güncellendi\":\"Reminder updated\",\"Toplu içe aktarma (cihaz)\":\"Bulk import (device)\",\"Ekle\":\"Adicionar\",\"Toplam Kalori\":\"Total Calories\",\"Diyetisyen modu kapalı\":\"Dietitian mode off\",\"Abonelik & Ödeme\":\"Assinatura e Pagamento\",\"CSV İçe Aktar\":\"Importar CSV\",\"Detayları Gizle\":\"Detayları Gizle\",\"Hareket yoğunluğu özeti\":\"Activity intensity overview\",\"Beslenme Raporu\":\"Nutrition Report\",\"Profil\":\"Perfil\",\"500 ml su ekle\":\"Add 500 ml water\",\"Ölçüm eklendi\":\"Measurement added\",\"Filtreleyip kayıtları hızlıca bulun.\":\"Filter and find entries quickly.\",\"Hatırlatıcılar\":\"Lembretes\",\"error\":\"error\",\"Hesabım\":\"Minha Conta\",\"Küçük adımlar büyük değişimi başlatır. Devam et!\":\"Small steps start big changes. Keep going!\",\"Tahmini kalori\":\"Estimated calories\",\"Ürün\":\"Produto\",\"Rozetler\":\"Badges\",\"Set Kaydet\":\"Set Kaydet\",\"Su eklendi (yerel)\":\"Water added (local)\",\"Yoga\":\"Yoga\",\"Zayıf\":\"Underweight\",\"Akt.\":\"Act.\",\"g\":\"g\",\"Geçmiş Kayıtlar\":\"History\",\"Günlük Kalori Hedefi\":\"Meta Diária de Calorias\",\"kez tüketildi\":\"times consumed\",\"AI Görsel Tanıma\":\"AI Visual Recognition\",\"Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.\":\"Você atingiu seu limite diário. Você pode tentar novamente amanhã.\",\"Cum\":\"Sex\",\"Sınırsız Öğün & Aktivite\":\"Sınırsız Öğün & Aktivite\",\"main_goal\":\"main_goal\",\"Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.\":\"O Calmet ajuda você a atingir seus objetivos de saúde da maneira mais rápida.\",\"Günlük Öğün Hedefi (adet)\":\"Meta Diária de Refeições\",\"Net kalori\":\"Net calories\",\"Gizlilik Politikası\":\"Privacidade\",\"Paylaşmak için giriş yapın.\":\"Sign in to share.\",\"expectation\":\"expectation\",\"Öğün Rozetleri\":\"Meal Badges\",\"Cal AI Rapor\":\"Calmet Report\",\"Kişiye Özel Diyet Takvimi\":\"Calendário de Dieta Personalizado\",\"Ücretsiz\":\"Grátis\",\"Yerel Cihazda Depolama\":\"Yerel Cihazda Depolama\",\"Tarayıcı bildirimleri desteklenmiyor.\":\"Browser notifications are not supported.\",\"Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir.\":\"Few meals include macro data. Add product details to sharpen tracking.\",\"Haftalık sapma özeti\":\"Haftalık sapma özeti\",\"Öne çıkan metrik değerlendirmeleri\":\"Highlights for key metrics\",\"Günlük 10 dakikalık yürüyüş ekle\":\"Günlük 10 dakikalık yürüyüş ekle\",\"Korelasyon Özeti\":\"Korelasyon Özeti\",\"varsayılan\":\"default\",\"manual\":\"manual\",\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\":\"6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.\",\"Anonim paylaşım\":\"Anonim paylaşım\",\"Sakatlık detayı\":\"Injury detail\",\"adresinden bize ulaşabilirsiniz.\":\"adresinden bize ulaşabilirsiniz.\",\"Uyku süresini +30 dk artırmayı dene.\":\"Uyku süresini +30 dk artırmayı dene.\",\"Öğün aralarını 3-4 saat tut\":\"Öğün aralarını 3-4 saat tut\",\"Paylaşım Bağlantısı\":\"Share Link\",\"Ürün kütüphaneye kaydedildi.\":\"Product saved to the library.\",\"kg\":\"kg\",\"light\":\"light\",\"Giriş Yap\":\"Entrar\",\"Set adı\":\"Set adı\",\"Ürün araması için en az 3 harf yazın.\":\"Type at least 3 letters to search products.\",\"Kişisel Veri Güvenliği\":\"Segurança de Dados Pessoais\",\"Nefes egzersizi için 5 dakika ayır.\":\"Nefes egzersizi için 5 dakika ayır.\",\"Bugünkü Özet\":\"Resumo de Hoje\",\"Koşu\":\"Running\",\"Trend analizi için yeterli veri yok.\":\"Trend analizi için yeterli veri yok.\",\"Haklarınız\":\"Seus Direitos\",\"Güncel kilo\":\"Current weight\",\"İlk kayıtlarını eklediğinde rozetler görünür.\":\"Badges appear after you add your first entries.\",\"Kapalı\":\"Off\",\"Ücretsiz Hesabını Oluştur\":\"Criar Conta Grátis\",\"Oto hesapla\":\"Auto calculate\",\"TDEE hesaplamak için kilo/boy/yaş gir.\":\"TDEE hesaplamak için kilo/boy/yaş gir.\",\"Buluta kaydedilemedi, cihazına kaydedildi.\":\"Could not save to cloud; saved to your device.\",\"Takip Sürekliliği Zayıf\":\"Tracking Consistency Low\",\"Kamera veya barkod numarası\":\"Camera or barcode number\",\"Not (opsiyonel)\":\"Not (opsiyonel)\",\"Kilo\":\"Weight\",\"Pilates\":\"Pilates\",\"Uygulama dili\":\"Idioma do Aplicativo\",\"Yemek adı\":\"Food name\",\"Yüzme\":\"Swimming\",\"Öğün kayıtları başladığında burada görünecek.\":\"Meal logs will appear here once you start logging.\",\"İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım.\":\"Escreva para nós na página de contato; encerraremos sua conta com segurança.\",\"AI Koç kimlere açık?\":\"AI Koç kimlere açık?\",\"Planları Gör\":\"Ver Planos\",\"Enerji dengesinin hareketini takip edin.\":\"Track how your energy balance moves.\",\"70\":\"70\",\"Daha Fazla Göster\":\"Daha Fazla Göster\",\"Seçilen ölçüm için veri yok.\":\"No data for the selected measurement.\",\"Aktivite (dk)\":\"Activity (min)\",\"Antrenmanı kısa ama düzenli tut (15-20 dk).\":\"Antrenmanı kısa ama düzenli tut (15-20 dk).\",\"Günlük Aktivite Hedefi (dk)\":\"Meta Diária de Atividade (min)\",\"Görünüm Kaydet\":\"Save View\",\"Kişisel Analiz ve Motivasyon\":\"Personal Analysis & Motivation\",\"Haftalık Kalori Dengesi\":\"Weekly Calorie Balance\",\"AI Koç günlük limit kaç?\":\"AI Koç günlük limit kaç?\",\"host\":\"host\",\"Tarayıcı barkod taramayı desteklemiyor.\":\"Your browser does not support barcode scanning.\",\"Destek\":\"Suporte\",\"Yerel cihazınızda saklanır\":\"Stored on your device\",\"6) Akıllı Hatırlatmalar\":\"6) Akıllı Hatırlatmalar\",\"Sakatlık\":\"Injury\",\"Komut ara...\":\"Search commands...\",\"Makro Verisi Eksik\":\"Macro Data Missing\",\"Destek e-postamız:\":\"E-mail de suporte:\",\"Yürümek, koşu veya salon aktivitelerini manuel ekleyin.\":\"Manually add walking, running, or gym activities.\",\"Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.\":\"Pro plan unlocks advanced analytics, unlimited entries, and custom reports.\",\"Dönem\":\"Period\",\"Modülleri Aç\":\"Modülleri Aç\",\"Premiuma Geç\":\"Upgrade to Premium\",\"state\":\"state\",\"Yemek eklendi (yerel)\":\"Meal added (local)\",\"Aktivite kayıtları başladığında burada görünecek.\":\"Activity logs will appear here once you start logging.\",\"Protein Hedefi (g)\":\"Protein Goal (g)\",\"Günlük Detaylar\":\"Daily Details\",\"Rapor verisi için önce kayıt oluşturmalısın.\":\"Rapor verisi için önce kayıt oluşturmalısın.\",\"AI Beslenme Koçu\":\"AI Beslenme Koçu\",\"Otomatik Kalori Hesaplama\":\"Cálculo Automático de Calorias\",\"Sil\":\"Excluir\",\"Kalori, su ve makro değişimleri\":\"Calorie, water, and macro changes\",\"Kayıt güncellendi\":\"Entry updated\",\"Beslenme Tercihleri\":\"Nutrition Preferences\",\"Kimlik ve iletişim bilgileri\":\"Kimlik ve iletişim bilgileri\",\"Hedeflerinizi\":\"Alcance seus\",\"free\":\"free\",\"scopes\":\"scopes\",\"Hedefe yaklaşan günleri vurgular.\":\"Highlights days closer to the goal.\",\"CSV içe/dışa aktarma (cihaz veya bulut).\":\"CSV import/export (device or cloud).\",\"Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin.\":\"Carb goal looks low. Increase it for better energy balance.\",\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\":\"Rapor sayfasındaki paylaşım panelinden ayarlanır.\",\"activity_type\":\"activity_type\",\"Son kayıt\":\"Last entry\",\"Kişisel Yorumlar\":\"Personal Insights\",\"Kopyala\":\"Copiar\",\"Toplam ölçüm\":\"Total measurements\",\"İşleme Amaçları\":\"Fins de Processamento\",\"Genel İstatistikler\":\"Overall Statistics\",\"Aktiviteye Yaklaştın\":\"Close on Activity\",\"Tarih/Saat\":\"Date/Time\",\"Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.\":\"Meal rhythm looks scattered. Stabilizing main meals improves balance.\",\"Tüm Cihazlardan Senkronizasyon\":\"Tüm Cihazlardan Senkronizasyon\",\"Stres ↔ Aktivite\":\"Stres ↔ Aktivite\",\"Henüz öne çıkan gün yok.\":\"No standout days yet.\",\"reminder_time\":\"reminder_time\",\"Günlük Su Hedefi (ml)\":\"Meta Diária de Água (ml)\",\"x-forwarded-host\":\"x-forwarded-host\",\"Beslenme ve aktivite kayıtları\":\"Beslenme ve aktivite kayıtları\",\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\":\"Kalori, su ve aktivite takibi için profesyonel sağlık platformu.\",\"Kamerayı kapat\":\"Close camera\",\"Paz\":\"Dom\",\"Kişiselleştirilmiş Öneriler\":\"Kişiselleştirilmiş Öneriler\",\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\":\"Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.\",\"English\":\"Inglês\",\"Kalori Ortalaması Yüksek\":\"High Calorie Average\",\"email\":\"email\",\"Özellik bayrakları güncellendi\":\"Feature flags updated\",\"Protein Hedefi Düşük\":\"Protein Target Low\",\"Bulut (Neon) aktif\":\"Nuvem (Neon) ativa\",\"Seriyi Paylaş\":\"Seriyi Paylaş\",\"Hedeflere Yakınlık\":\"Goal Proximity\",\"Kalori girişi ve çıkışı\":\"Calories in and out\",\"Paketler\":\"Planos\",\"Verilerim güvende mi?\":\"Verilerim güvende mi?\",\"Kısa not (opsiyonel)\":\"Kısa not (opsiyonel)\",\"Kütüphane için ürün adı gerekli.\":\"Product name is required for the library.\",\"Dikkat\":\"Alert\",\"Kayıt Geçmişi\":\"Kayıt Geçmişi\",\"İsim\":\"Name\",\"Mesajın\":\"Sua mensagem\",\"Aktivite Girdisi\":\"Activity Entry\",\"Henüz check-in yok. Bir check-in ile plan üretelim.\":\"Henüz check-in yok. Bir check-in ile plan üretelim.\",\"Dim temayı aç\":\"Enable dim theme\",\"Ortalama Kalori\":\"Average Calories\",\"Performans Özeti\":\"Performance Summary\",\"Geçmişi Aç\":\"Geçmişi Aç\",\"Su Tüketimi Düşük\":\"Low Hydration\",\"Protein Hedefi\":\"Protein Goal\",\"Ürün Kütüphanesi\":\"Product Library\",\"Sabit\":\"Sabit\",\"Öğle\":\"Lunch\",\"AI Koç sadece AI Plus paketinde aktif edilir.\":\"AI Koç sadece AI Plus paketinde aktif edilir.\",\"Haftalık Planı Üret\":\"Haftalık Planı Üret\",\"Ürün silinemedi.\":\"Product could not be deleted.\",\"Günlük ort. kalori\":\"Avg. daily calories\",\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\":\"Bir bağlantı hatası oluştu. Lütfen tekrar dene.\",\"Su takibin iyi, bu tempo toparlanmayı destekler.\":\"Water tracking looks good; this pace supports recovery.\",\"panel dashboard home\":\"dashboard home overview\",\"Fazla\":\"Overweight\",\"K\":\"C\",\"Belirgin sapma uyarısı yok.\":\"Belirgin sapma uyarısı yok.\",\"Günlük su trendi\":\"Daily water trend\",\"Henüz veri yok. İlk kayıtlar grafiği dolduracak.\":\"No data yet. First entries will populate the chart.\",\"Barkod ile bul\":\"Find by barcode\",\"Destek taleplerine yanıt vermek.\":\"Destek taleplerine yanıt vermek.\",\"Su Rozetleri\":\"Water Badges\",\"detail\":\"detail\",\"origin\":\"origin\",\"Hazır Öğün Şablonları\":\"Modelos de Refeições Prontas\",\"Henüz haftalık veri yok.\":\"No weekly data yet.\",\"7/24 AI Chatbot & Beslenme Koçu\":\"7/24 AI Chatbot & Beslenme Koçu\",\"Barkod numarası\":\"Barcode number\",\"Günlük hareket dakikaları\":\"Daily activity minutes\",\"PDF raporu aç\":\"Open PDF report\",\"Haftalık değişim\":\"Haftalık değişim\",\"Mevcut seri\":\"Current streak\",\"Profil ve hedef bilgileri\":\"Profil ve hedef bilgileri\",\"Öne Çıkan Öğünler\":\"Top Meals\",\"Aktivite temposunu görselleştirir.\":\"Visualizes your activity pace.\",\"Karbonhidrat (g)\":\"Carbohydrate (g)\",\"Hafta\":\"Semana\",\"5) Giyilebilir Entegrasyonları\":\"5) Giyilebilir Entegrasyonları\",\"üzerinden bize ulaşabilirsiniz.\":\"üzerinden bize ulaşabilirsiniz.\",\"Detaylı Grafikler\":\"Gráficos Detalhados\",\"Tahmini\":\"Estimated\",\"Tarif Önerileri\":\"Tarif Önerileri\",\"Özellikler\":\"Recursos\",\"Rapor Dışa Aktarım\":\"Report Export\",\"Dil\":\"Language\",\"Ekipman durumu\":\"Equipment level\",\"Kalça\":\"Hip\",\"Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.\":\"Seus dados de calorias, água e atividade são sincronizados instantaneamente. A IA detecta suas deficiências.\",\"Barkod tara\":\"Scan barcode\",\"Güçlü\":\"Strong\",\"Esc ile kapat • Ctrl/Cmd + K\":\"Close with Esc • Ctrl/Cmd + K\",\"Sonuç bulunamadı. Manuel kalori girişi yapabilirsiniz.\":\"No results found. You can enter calories manually.\",\"Aktivite kalorisi\":\"Activity calories\",\"1) Akıllı Hedefleme\":\"1) Akıllı Hedefleme\",\"3) Gelişmiş Raporlar\":\"3) Gelişmiş Raporlar\",\"Kalori Dengesi İyi\":\"Calorie Balance Looks Good\",\"Rapor ekranından PDF veya Excel olarak dışa aktarabilirsin.\":\"You can export PDF or Excel from the report screen.\",\"full_name\":\"full_name\",\"CSV okunamadı. Formatı kontrol edin.\":\"Could not read CSV. Check the format.\",\"Açıldı\":\"Unlocked\",\"Girilen ve tahmini yakılan kalori\":\"Intake and estimated calories burned\",\"Yerel profil\":\"Local profile\",\"image_url\":\"image_url\",\"Sapma\":\"Deviation\",\"Yardım Merkezi\":\"Central de Ajuda\",\"En Çok Tercih Edilen\":\"Mais Popular\",\"Tüm kayıtların özet görünümü.\":\"Summary view of all entries.\",\"Kütüphaneye kaydet\":\"Save to library\",\"Premium modüllerini bu panelden yönetin.\":\"Manage premium modules from this panel.\",\"Ort. Protein\":\"Avg. Protein\",\"Spor seviyesi\":\"Fitness level\",\"Ücretlendirme\":\"Preços\",\"textarea\":\"textarea\",\"Su Alımı\":\"Water Intake\",\"İzin Ver\":\"Permitir\",\"Bir şeyler sor...\":\"Pergunte algo...\",\"Pro Bağlantıları\":\"Pro Connections\",\"En Yeni\":\"Newest\",\"workout_place\":\"workout_place\",\"Bildirim izni verilmedi.\":\"Notification permission not granted.\",\"Ayarları aç\":\"Open settings\",\"Rapor yükleniyor...\":\"Loading report...\",\"Alışveriş Listesi\":\"Alışveriş Listesi\",\"Uyum Skoru\":\"Alignment Score\",\"dk\":\"min\",\"HIIT\":\"HIIT\",\"Kamera erişimi desteklenmiyor.\":\"Camera access is not supported.\",\"Öğün düzenini gün gün izleyin.\":\"Track meal consistency day by day.\",\"Plan Ayarları\":\"Plan Ayarları\",\"2d\":\"2d\",\"Bulut Senkronizasyon\":\"Bulut Senkronizasyon\",\"Kayıt silindi\":\"Entry deleted\",\"Kullanıcı Sorumlulukları\":\"Responsabilidades do Usuário\",\"Rapor\":\"Report\",\"tr-TR\":\"tr-TR\",\"Öğün hedefi oranı\":\"Meal goal rate\",\"Car\":\"Qua\",\"Kapat\":\"Fechar\",\"Kayıt Ol\":\"Cadastrar-se\",\"Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan.\":\"Um plano semanal gerado automaticamente com base em seus objetivos, hábitos e programação diária.\",\"Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda.\":\"Visualize claramente o progresso diário, semanal e mensal. Tendências e desvios em uma única tela.\",\"Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin.\":\"Escolha sua refeição em modelos aprovados por nutricionistas sem inserir calorias uma a uma.\",\"Pro'ya Yükselt\":\"Fazer upgrade para Pro\",\"Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!\":\"Você atingiu seu limite diário de 25 mensagens. Esperamos você amanhã!\",\"AI Koçu sadece AI PLUS paketine özeldir.\":\"O Coach de IA é exclusivo para o plano AI PLUS.\",\"Cevap üretilemedi.\":\"Não foi possível gerar uma resposta.\",\"Bir hata oluştu. Lütfen tekrar deneyin.\":\"Ocorreu um erro. Por favor, tente novamente.\",\"AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.\":\"O serviço de IA não está configurado no momento (GROQ_API_KEY ausente). Por favor, entre em contato com o administrador.\"}"));}),
"[project]/packages/shared/src/locales/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "locales",
    ()=>locales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$tr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/tr.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$es$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/es.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$fr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/fr.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$ru$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/ru.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$pt$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/pt.json (json)");
;
;
;
;
;
;
const locales = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$en$2e$json__$28$json$29$__["default"],
    tr: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$tr$2e$json__$28$json$29$__["default"],
    es: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$es$2e$json__$28$json$29$__["default"],
    fr: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$fr$2e$json__$28$json$29$__["default"],
    ru: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$ru$2e$json__$28$json$29$__["default"],
    pt: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$pt$2e$json__$28$json$29$__["default"]
};
}),
"[project]/packages/shared/src/i18n/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "getIntlLocale",
    ()=>getIntlLocale,
    "getLocale",
    ()=>getLocale,
    "normalizeLocale",
    ()=>normalizeLocale,
    "setLocale",
    ()=>setLocale,
    "t",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/index.ts [app-ssr] (ecmascript)");
;
const defaultLocale = "tr";
const LOCALE_KEY = "__calaiLocale";
function setLocale(locale) {
    globalThis[LOCALE_KEY] = locale;
}
function getLocale() {
    return globalThis[LOCALE_KEY];
}
function normalizeLocale(value) {
    if (!value) return defaultLocale;
    const trimmed = value.trim();
    if (!trimmed) return defaultLocale;
    const lower = trimmed.toLowerCase();
    if (lower.startsWith("tr")) return "tr";
    if (lower.startsWith("en")) return "en";
    if (lower.startsWith("es")) return "es";
    if (lower.startsWith("fr")) return "fr";
    if (lower.startsWith("ru")) return "ru";
    if (lower.startsWith("pt")) return "pt";
    if (lower.includes("-")) {
        const base = lower.split("-")[0];
        if (Object.keys(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"]).includes(base)) return base;
    }
    return defaultLocale;
}
function getIntlLocale(locale) {
    const next = normalizeLocale(locale);
    switch(next){
        case "tr":
            return "tr-TR";
        case "en":
            return "en-US";
        case "es":
            return "es-ES";
        case "fr":
            return "fr-FR";
        case "ru":
            return "ru-RU";
        case "pt":
            return "pt-PT";
        default:
            return next;
    }
}
function getValue(dictionary, key) {
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
        return dictionary[key];
    }
    return key.split(".").reduce((acc, part)=>{
        if (acc && typeof acc === "object" && part in acc) {
            return acc[part];
        }
        return undefined;
    }, dictionary);
}
function t(key, params, locale) {
    const resolvedLocale = normalizeLocale(locale ?? getLocale());
    const dictionary = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"][resolvedLocale] ?? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"][defaultLocale];
    let value = getValue(dictionary, key);
    if (typeof value !== "string" && resolvedLocale !== defaultLocale && resolvedLocale !== "tr") {
        const fallback = getValue(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"][defaultLocale], key);
        if (typeof fallback === "string") {
            value = fallback;
        }
    }
    const template = typeof value === "string" ? value : key;
    if (!params) {
        return template;
    }
    return Object.entries(params).reduce((text, [name, val])=>{
        return text.replaceAll(`{${name}}`, String(val));
    }, template);
}
}),
"[project]/packages/shared/src/utils/index.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DAY_MS",
    ()=>DAY_MS,
    "buildWeeklySummary",
    ()=>buildWeeklySummary,
    "createId",
    ()=>createId,
    "formatShortDate",
    ()=>formatShortDate,
    "getDayKey",
    ()=>getDayKey,
    "getLastNDays",
    ()=>getLastNDays
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/i18n/index.ts [app-ssr] (ecmascript)");
;
const DAY_MS = 24 * 60 * 60 * 1000;
function createId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `id_${Math.random().toString(36).slice(2, 10)}`;
}
function getDayKey(date) {
    const d = typeof date === "string" ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
function getLastNDays(n, from = new Date()) {
    return Array.from({
        length: n
    }).map((_, index)=>{
        const date = new Date(from.getTime() - (n - index - 1) * DAY_MS);
        return getDayKey(date);
    });
}
function formatShortDate(dateKey, locale) {
    const date = new Date(`${dateKey}T00:00:00`);
    const resolvedLocale = locale ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIntlLocale"])();
    return new Intl.DateTimeFormat(resolvedLocale, {
        weekday: "short",
        day: "numeric",
        month: "short"
    }).format(date);
}
function buildWeeklySummary(entries, days = 7) {
    const dayKeys = getLastNDays(days);
    return dayKeys.map((date)=>{
        const dailyEntries = entries.filter((entry)=>getDayKey(entry.timestamp) === date);
        const mealSet = new Set();
        const caloriesIn = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "food") {
                mealSet.add(entry.mealType);
                return sum + entry.calories;
            }
            if (entry.type === "drink") {
                return sum + entry.calories;
            }
            return sum;
        }, 0);
        const caloriesOut = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "activity") {
                return sum + entry.estimatedCalories;
            }
            return sum;
        }, 0);
        const activityMin = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "activity") {
                return sum + entry.durationMin;
            }
            return sum;
        }, 0);
        const waterMl = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "water") {
                return sum + entry.amountMl;
            }
            return sum;
        }, 0);
        const proteinG = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "food" || entry.type === "drink") {
                return sum + (entry.proteinG ?? 0);
            }
            return sum;
        }, 0);
        const carbsG = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "food" || entry.type === "drink") {
                return sum + (entry.carbsG ?? 0);
            }
            return sum;
        }, 0);
        const fatG = dailyEntries.reduce((sum, entry)=>{
            if (entry.type === "food" || entry.type === "drink") {
                return sum + (entry.fatG ?? 0);
            }
            return sum;
        }, 0);
        // Get sleep data for the day
        const sleepEntry = dailyEntries.find((entry)=>entry.type === "sleep");
        const sleepHours = sleepEntry && sleepEntry.type === "sleep" ? sleepEntry.durationMin / 60 : 0;
        const sleepQuality = sleepEntry && sleepEntry.type === "sleep" ? sleepEntry.quality : null;
        return {
            date,
            caloriesIn,
            caloriesOut,
            waterMl,
            activityMin,
            mealCount: mealSet.size,
            proteinG,
            carbsG,
            fatG,
            sleepHours,
            sleepQuality
        };
    });
}
}),
"[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/types/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/i18n/index.ts [app-ssr] (ecmascript)");
;
;
;
;
}),
"[project]/apps/web/src/lib/core/utils.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
;
}),
"[project]/apps/web/src/lib/core/flags.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultFlags",
    ()=>defaultFlags,
    "loadFlags",
    ()=>loadFlags,
    "saveFlags",
    ()=>saveFlags
]);
const defaultFlags = {
    aiVisual: false,
    googleFit: false,
    darkMode: true
};
const FLAG_KEY = "calai.flags.v1";
function loadFlags() {
    if ("TURBOPACK compile-time truthy", 1) {
        return defaultFlags;
    }
    //TURBOPACK unreachable
    ;
}
function saveFlags(flags) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/apps/web/src/lib/database/audit.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appendAuditEvent",
    ()=>appendAuditEvent,
    "buildAuditEvent",
    ()=>buildAuditEvent,
    "loadAuditLog",
    ()=>loadAuditLog,
    "saveAuditLog",
    ()=>saveAuditLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils/index.ts [app-ssr] (ecmascript)");
;
const AUDIT_KEY = "calai.audit.v1";
const MAX_AUDIT = 150;
function loadAuditLog() {
    if ("TURBOPACK compile-time truthy", 1) {
        return [];
    }
    //TURBOPACK unreachable
    ;
}
function saveAuditLog(events) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function buildAuditEvent(input) {
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
        timestamp: new Date().toISOString(),
        ...input
    };
}
function appendAuditEvent(event, existing) {
    const next = [
        event,
        ...existing
    ].slice(0, MAX_AUDIT);
    return next;
}
}),
"[project]/apps/web/src/lib/core/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyTheme",
    ()=>applyTheme,
    "defaultTheme",
    ()=>defaultTheme,
    "loadTheme",
    ()=>loadTheme,
    "saveTheme",
    ()=>saveTheme
]);
const THEME_KEY = "calai.theme.v1";
const defaultTheme = {
    mode: "light",
    accent: "amber"
};
function loadTheme() {
    if ("TURBOPACK compile-time truthy", 1) {
        return defaultTheme;
    }
    //TURBOPACK unreachable
    ;
}
function saveTheme(theme) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function applyTheme(_theme) {
    if (typeof document === "undefined") {
        return;
    }
    void _theme;
    const root = document.documentElement;
    // Tek görünüm için temayı sabitleyelim
    root.removeAttribute("data-theme");
    root.removeAttribute("data-accent");
}
}),
"[project]/apps/web/src/lib/features/reminders.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultReminder",
    ()=>defaultReminder,
    "loadReminder",
    ()=>loadReminder,
    "saveReminder",
    ()=>saveReminder
]);
const REMINDER_KEY = "calai.reminders.v1";
const defaultReminder = {
    enabled: false,
    time: "20:00",
    lastNotifiedDay: undefined
};
function loadReminder() {
    if ("TURBOPACK compile-time truthy", 1) {
        return defaultReminder;
    }
    //TURBOPACK unreachable
    ;
}
function saveReminder(settings) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/apps/web/src/lib/core/locale.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LOCALE_COOKIE",
    ()=>LOCALE_COOKIE,
    "LOCALE_STORAGE_KEY",
    ()=>LOCALE_STORAGE_KEY,
    "localeCookieOptions",
    ()=>localeCookieOptions,
    "pickLocaleFromAcceptLanguage",
    ()=>pickLocaleFromAcceptLanguage,
    "readLocaleCookie",
    ()=>readLocaleCookie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/i18n/index.ts [app-ssr] (ecmascript)");
;
const LOCALE_COOKIE = "calai.locale";
const LOCALE_STORAGE_KEY = "calai.locale";
function pickLocaleFromAcceptLanguage(header) {
    if (!header) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLocale"];
    }
    const parts = header.split(",").map((part)=>part.split(";")[0]?.trim()).filter(Boolean);
    for (const part of parts){
        const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLocale"])(part);
        if (normalized) {
            return normalized;
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLocale"];
}
function readLocaleCookie(cookieHeader) {
    if (!cookieHeader) {
        return null;
    }
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]*)`));
    if (!match?.[1]) {
        return null;
    }
    try {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLocale"])(decodeURIComponent(match[1]));
    } catch  {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLocale"])(match[1]);
    }
}
function localeCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 365) {
    return {
        path: "/",
        maxAge: maxAgeSeconds,
        sameSite: "lax"
    };
}
}),
"[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyLocaleToDocument",
    ()=>applyLocaleToDocument,
    "getIntlLocale",
    ()=>getIntlLocale,
    "getLocale",
    ()=>getLocale,
    "loadLocale",
    ()=>loadLocale,
    "normalizeLocale",
    ()=>normalizeLocale,
    "setLocale",
    ()=>setLocale,
    "subscribeLocale",
    ()=>subscribeLocale,
    "syncActiveLocale",
    ()=>syncActiveLocale,
    "t",
    ()=>t
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/shared/src/index.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/i18n/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/locales/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/locale.ts [app-ssr] (ecmascript)");
;
;
;
const dictionaries = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].en,
    tr: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$locales$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].tr
};
const listeners = new Set();
/** Locale used during SSR of client trees (set by LocaleProvider each render). */ let activeLocale = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLocale"];
function notifyLocaleChange() {
    listeners.forEach((listener)=>listener());
}
function syncActiveLocale(locale) {
    activeLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLocale"])(locale);
}
function normalizeLocale(value) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeLocale"])(value);
}
function readClientLocale() {
    if (typeof document !== "undefined") {
        const fromCookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocaleCookie"])(document.cookie);
        if (fromCookie) {
            return fromCookie;
        }
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defaultLocale"];
}
function getLocale() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return activeLocale;
}
function writeLocaleCookie(locale) {
    if (typeof document === "undefined") {
        return;
    }
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_COOKIE"]}=${encodeURIComponent(locale)}; path=/; max-age=${maxAge}; samesite=lax`;
}
function setLocale(locale) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const next = undefined;
}
function applyLocaleToDocument(locale) {
    if (typeof document === "undefined") {
        return;
    }
    const next = locale ?? getLocale();
    document.documentElement.lang = next;
    document.documentElement.dir = "ltr";
}
function getIntlLocale(locale) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getIntlLocale"])(locale);
}
async function loadLocale(locale) {
    const next = normalizeLocale(locale);
    if (dictionaries[next]) {
        return;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function subscribeLocale(listener) {
    listeners.add(listener);
    return ()=>{
        listeners.delete(listener);
    };
}
function t(key, params, locale) {
    const currentLocale = locale ?? getLocale();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["t"])(key, params, currentLocale);
}
}),
"[project]/apps/web/src/lib/features/measurements.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadMeasurements",
    ()=>loadMeasurements,
    "measurementLabels",
    ()=>measurementLabels,
    "measurementUnits",
    ()=>measurementUnits,
    "normalizeMeasurement",
    ()=>normalizeMeasurement,
    "saveMeasurements",
    ()=>saveMeasurements
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
;
const MEASUREMENTS_KEY = "calai.measurements.v1";
const measurementLabels = {
    weight: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kilo"),
    waist: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bel"),
    hip: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kalça"),
    chest: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Göğüs"),
    bodyFat: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Vücut Yağ %")
};
const measurementUnits = {
    weight: "kg",
    waist: "cm",
    hip: "cm",
    chest: "cm",
    bodyFat: "%"
};
function isValidType(value) {
    return value === "weight" || value === "waist" || value === "hip" || value === "chest" || value === "bodyFat";
}
function normalizeMeasurement(entry) {
    if (!entry.id || !isValidType(entry.type)) {
        return null;
    }
    const value = Number(entry.value);
    if (!Number.isFinite(value) || value <= 0) {
        return null;
    }
    const timestampDate = entry.timestamp ? new Date(entry.timestamp) : new Date();
    const timestamp = Number.isNaN(timestampDate.getTime()) ? new Date().toISOString() : timestampDate.toISOString();
    const unit = entry.unit || measurementUnits[entry.type];
    return {
        id: entry.id,
        type: entry.type,
        value,
        unit,
        timestamp
    };
}
function loadMeasurements() {
    if ("TURBOPACK compile-time truthy", 1) {
        return [];
    }
    //TURBOPACK unreachable
    ;
}
function saveMeasurements(entries) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
}),
"[project]/apps/web/src/components/providers/tracker-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrackerProvider",
    ()=>TrackerProvider,
    "useTracker",
    ()=>useTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/hooks/use-user.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/storage.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/flags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$database$2f$audit$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/database/audit.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$reminders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/features/reminders.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/features/measurements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
const TrackerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const GOALS_KEY = "calai.goals.v1";
const DEFAULT_GOALS = {
    waterGoalMl: 2500,
    calorieGoal: 2200,
    activityGoalMin: 30,
    mealGoalCount: 3,
    weightGoalKg: 0,
    proteinGoalG: 0,
    carbsGoalG: 0,
    fatGoalG: 0,
    sleepGoalHours: 8
};
const MEAL_TYPES = [
    "breakfast",
    "lunch",
    "dinner",
    "snack"
];
const ACTIVITY_TYPES = [
    "walking",
    "running",
    "gym",
    "cycling",
    "swimming",
    "yoga",
    "hiit",
    "pilates",
    "stairs"
];
const AUDIT_ENABLED = false;
function toFiniteNumber(value, fallback = 0) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const match = value.match(/-?\d+(?:\.\d+)?/);
        if (match) {
            const parsed = Number(match[0]);
            if (Number.isFinite(parsed)) {
                return parsed;
            }
        }
    }
    return fallback;
}
function normalizeEntry(entry) {
    const timestampDate = new Date(entry.timestamp);
    const timestamp = Number.isNaN(timestampDate.getTime()) ? new Date().toISOString() : timestampDate.toISOString();
    const id = entry.id || (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])();
    if (entry.type === "food") {
        return {
            id,
            type: "food",
            name: entry.name?.trim() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Belirtilmedi"),
            calories: Math.round(toFiniteNumber(entry.calories, 0)),
            mealType: MEAL_TYPES.includes(entry.mealType) ? entry.mealType : "snack",
            amountG: Number.isFinite(toFiniteNumber(entry.amountG, Number.NaN)) ? Math.round(toFiniteNumber(entry.amountG, 0)) : undefined,
            proteinG: Number.isFinite(toFiniteNumber(entry.proteinG, Number.NaN)) ? toFiniteNumber(entry.proteinG, 0) : undefined,
            carbsG: Number.isFinite(toFiniteNumber(entry.carbsG, Number.NaN)) ? toFiniteNumber(entry.carbsG, 0) : undefined,
            fatG: Number.isFinite(toFiniteNumber(entry.fatG, Number.NaN)) ? toFiniteNumber(entry.fatG, 0) : undefined,
            timestamp
        };
    }
    if (entry.type === "drink") {
        return {
            id,
            type: "drink",
            name: entry.name?.trim() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Belirtilmedi"),
            amountMl: Math.round(toFiniteNumber(entry.amountMl, 0)),
            calories: Math.round(toFiniteNumber(entry.calories, 0)),
            proteinG: Number.isFinite(toFiniteNumber(entry.proteinG, Number.NaN)) ? toFiniteNumber(entry.proteinG, 0) : undefined,
            carbsG: Number.isFinite(toFiniteNumber(entry.carbsG, Number.NaN)) ? toFiniteNumber(entry.carbsG, 0) : undefined,
            fatG: Number.isFinite(toFiniteNumber(entry.fatG, Number.NaN)) ? toFiniteNumber(entry.fatG, 0) : undefined,
            timestamp
        };
    }
    if (entry.type === "water") {
        return {
            id,
            type: "water",
            amountMl: Math.round(toFiniteNumber(entry.amountMl, 0)),
            timestamp
        };
    }
    if (entry.type === "sleep") {
        return {
            id,
            type: "sleep",
            sleepStart: entry.sleepStart || timestamp,
            sleepEnd: entry.sleepEnd || timestamp,
            durationMin: Math.round(toFiniteNumber(entry.durationMin, 0)),
            quality: [
                "poor",
                "fair",
                "good",
                "excellent"
            ].includes(entry.quality) ? entry.quality : "good",
            note: entry.note?.trim() || undefined,
            timestamp
        };
    }
    if (entry.type === "activity") {
        return {
            id,
            type: "activity",
            activityType: ACTIVITY_TYPES.includes(entry.activityType) ? entry.activityType : "walking",
            durationMin: Math.round(toFiniteNumber(entry.durationMin, 0)),
            estimatedCalories: Math.round(toFiniteNumber(entry.estimatedCalories, 0)),
            note: typeof entry.note === "string" ? entry.note?.trim() || undefined : typeof entry.name === "string" ? entry.name?.trim() || undefined : undefined,
            timestamp
        };
    }
    // Fallback for unknown types - treat as activity
    return {
        id,
        type: "activity",
        activityType: "walking",
        durationMin: 0,
        estimatedCalories: 0,
        timestamp
    };
}
function sortEntries(list) {
    return [
        ...list
    ].sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
function mergeEntries(primary, secondary) {
    const merged = new Map();
    for (const entry of primary){
        merged.set(entry.id, entry);
    }
    for (const entry of secondary){
        if (!merged.has(entry.id)) {
            merged.set(entry.id, entry);
        }
    }
    return sortEntries(Array.from(merged.values()));
}
function sortMeasurements(list) {
    return [
        ...list
    ].sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
function mergeMeasurements(primary, secondary) {
    const merged = new Map();
    for (const entry of primary){
        merged.set(entry.id, entry);
    }
    for (const entry of secondary){
        if (!merged.has(entry.id)) {
            merged.set(entry.id, entry);
        }
    }
    return sortMeasurements(Array.from(merged.values()));
}
function loadGoals() {
    if ("TURBOPACK compile-time truthy", 1) {
        return DEFAULT_GOALS;
    }
    //TURBOPACK unreachable
    ;
}
function saveGoals(goals) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function TrackerProvider({ children }) {
    const { user, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])());
    const [goals, setGoals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>loadGoals());
    const [flags, setFlags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadFlags"])());
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadTheme"])());
    const [reminder, setReminder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$reminders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadReminder"])());
    const [auditLog, setAuditLog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : []);
    const [measurements, setMeasurements] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadMeasurements"])());
    const dataMode = user?.sub ? "remote" : "local";
    const autoSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        entries: false,
        measurements: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(entries);
    }, [
        entries
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode === "local") {
            saveGoals(goals);
        }
    }, [
        goals,
        dataMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode === "local") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$flags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveFlags"])(flags);
        }
    }, [
        dataMode,
        flags
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode === "local") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveTheme"])(theme);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["applyTheme"])(theme);
    }, [
        dataMode,
        theme
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode === "local") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$reminders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveReminder"])(reminder);
        }
    }, [
        dataMode,
        reminder
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        auditLog,
        dataMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode === "local") {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveMeasurements"])(measurements);
        }
    }, [
        dataMode,
        measurements
    ]);
    const loadRemoteData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const auditPromise = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : Promise.resolve(null);
            const [entriesRes, goalsRes, settingsRes, measurementsRes, auditRes] = await Promise.all([
                fetch(`${API_BASE_URL}/api/v1/entries`, {
                    credentials: "include",
                    cache: "no-store"
                }),
                fetch(`${API_BASE_URL}/api/v1/goals`, {
                    credentials: "include",
                    cache: "no-store"
                }),
                fetch(`${API_BASE_URL}/api/v1/settings`, {
                    credentials: "include",
                    cache: "no-store"
                }),
                fetch(`${API_BASE_URL}/api/v1/measurements`, {
                    credentials: "include",
                    cache: "no-store"
                }),
                auditPromise
            ]);
            if (entriesRes.ok) {
                const data = await entriesRes.json();
                const normalized = Array.isArray(data) ? data.map(normalizeEntry) : [];
                const localEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])();
                const merged = mergeEntries(normalized, localEntries);
                setEntries(merged);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(merged);
            } else {
                const localEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])();
                if (localEntries.length > 0) {
                    setEntries(localEntries);
                }
            }
            if (goalsRes.ok) {
                const data = await goalsRes.json();
                setGoals({
                    waterGoalMl: data?.waterGoalMl ?? DEFAULT_GOALS.waterGoalMl,
                    calorieGoal: data?.calorieGoal ?? DEFAULT_GOALS.calorieGoal,
                    activityGoalMin: data?.activityGoalMin ?? DEFAULT_GOALS.activityGoalMin,
                    mealGoalCount: data?.mealGoalCount ?? DEFAULT_GOALS.mealGoalCount,
                    weightGoalKg: data?.weightGoalKg ?? DEFAULT_GOALS.weightGoalKg,
                    proteinGoalG: data?.proteinGoalG ?? DEFAULT_GOALS.proteinGoalG,
                    carbsGoalG: data?.carbsGoalG ?? DEFAULT_GOALS.carbsGoalG,
                    fatGoalG: data?.fatGoalG ?? DEFAULT_GOALS.fatGoalG,
                    sleepGoalHours: data?.sleepGoalHours ?? DEFAULT_GOALS.sleepGoalHours
                });
            }
            if (settingsRes.ok) {
                const data = await settingsRes.json();
                if (data?.theme) {
                    setTheme((prev)=>({
                            ...prev,
                            ...data.theme
                        }));
                }
                if (data?.reminder) {
                    setReminder((prev)=>({
                            ...prev,
                            ...data.reminder
                        }));
                }
                if (data?.flags) {
                    setFlags((prev)=>({
                            ...prev,
                            ...data.flags
                        }));
                }
            }
            if (AUDIT_ENABLED && auditRes && "ok" in auditRes && auditRes.ok) //TURBOPACK unreachable
            ;
            if (measurementsRes.ok) {
                const data = await measurementsRes.json();
                const normalized = Array.isArray(data) ? data.map((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMeasurement"])(entry)).filter((entry)=>Boolean(entry)) : [];
                const localMeasurements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadMeasurements"])();
                const merged = mergeMeasurements(normalized, localMeasurements);
                setMeasurements(merged);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveMeasurements"])(merged);
            } else {
                const localMeasurements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadMeasurements"])();
                if (localMeasurements.length > 0) {
                    setMeasurements(localMeasurements);
                }
            }
        } catch  {
        // ignore network errors for MVP
        }
    }, []);
    const hydrateLocal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])());
        setGoals(loadGoals());
        setMeasurements((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadMeasurements"])());
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isLoading) {
            return;
        }
        if (user?.sub) {
            const localSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])();
            if (localSnapshot.length > 0) {
                setEntries(localSnapshot);
            }
            setGoals(DEFAULT_GOALS);
            setAuditLog([]);
            void loadRemoteData();
            return;
        }
        autoSyncRef.current = {
            entries: false,
            measurements: false
        };
        hydrateLocal();
    }, [
        hydrateLocal,
        isLoading,
        loadRemoteData,
        user
    ]);
    const dailySummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const todayKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDayKey"])(new Date());
        const todayEntries = entries.filter((entry)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDayKey"])(entry.timestamp) === todayKey);
        return {
            caloriesIn: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "food" || entry.type === "drink") {
                    return sum + entry.calories;
                }
                return sum;
            }, 0),
            caloriesOut: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "activity") {
                    return sum + entry.estimatedCalories;
                }
                return sum;
            }, 0),
            waterMl: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "water") {
                    return sum + entry.amountMl;
                }
                return sum;
            }, 0),
            proteinG: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "food" || entry.type === "drink") {
                    return sum + (entry.proteinG ?? 0);
                }
                return sum;
            }, 0),
            carbsG: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "food" || entry.type === "drink") {
                    return sum + (entry.carbsG ?? 0);
                }
                return sum;
            }, 0),
            fatG: todayEntries.reduce((sum, entry)=>{
                if (entry.type === "food" || entry.type === "drink") {
                    return sum + (entry.fatG ?? 0);
                }
                return sum;
            }, 0)
        };
    }, [
        entries
    ]);
    const weeklySummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildWeeklySummary"])(entries, 7), [
        entries
    ]);
    const syncSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (nextSettings)=>{
        if (dataMode !== "remote") {
            return;
        }
        try {
            await fetch(`${API_BASE_URL}/api/v1/settings`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(nextSettings)
            });
        } catch  {
        // ignore persistence errors for MVP
        }
    }, [
        dataMode
    ]);
    const recordAudit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((action, detail, meta)=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
        const event = undefined;
    }, [
        dataMode
    ]);
    async function addEntries(items, options) {
        if (!Array.isArray(items) || items.length === 0) {
            return 0;
        }
        const normalized = items.map(normalizeEntry);
        const mode = options?.mode ?? "merge";
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries/import`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    entries: normalized
                })
            });
            if (response.ok) {
                await loadRemoteData();
                recordAudit("import", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Toplu içe aktarma (bulut)"), {
                    count: normalized.length,
                    source: options?.source ?? "bulk"
                });
                return normalized.length;
            }
            return 0;
        }
        setEntries((prev)=>{
            if (mode === "replace") {
                return sortEntries(normalized);
            }
            const existingIds = new Set(prev.map((entry)=>entry.id));
            const merged = [
                ...normalized,
                ...prev.filter((entry)=>!existingIds.has(entry.id))
            ];
            return sortEntries(merged);
        });
        recordAudit("import", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Toplu içe aktarma (cihaz)"), {
            count: normalized.length,
            source: options?.source ?? "bulk"
        });
        return normalized.length;
    }
    async function addFood(input) {
        const entry = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
            type: "food",
            name: input.name.trim() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Belirtilmedi"),
            calories: Number(input.calories) || 0,
            mealType: input.mealType,
            amountG: input.amountG,
            proteinG: input.proteinG,
            carbsG: input.carbsG,
            fatG: input.fatG,
            timestamp: new Date().toISOString()
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    type: "food",
                    name: entry.name,
                    calories: entry.calories,
                    mealType: entry.mealType,
                    amountG: entry.amountG,
                    proteinG: entry.proteinG,
                    carbsG: entry.carbsG,
                    fatG: entry.fatG,
                    timestamp: entry.timestamp
                })
            });
            if (response.ok) {
                const created = await response.json();
                const normalized = normalizeEntry(created);
                setEntries((prev)=>[
                        normalized,
                        ...prev
                    ]);
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yemek eklendi"), {
                    calories: entry.calories,
                    mealType: entry.mealType
                });
                void loadRemoteData();
                return;
            } else {
                setEntries((prev)=>{
                    const next = [
                        entry,
                        ...prev
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(next);
                    return next;
                });
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yemek eklendi (yerel)"), {
                    calories: entry.calories,
                    mealType: entry.mealType
                });
            }
        }
        setEntries((prev)=>[
                entry,
                ...prev
            ]);
        recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yemek eklendi"), {
            calories: entry.calories,
            mealType: entry.mealType
        });
    }
    async function addDrink(input) {
        const entry = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
            type: "drink",
            name: input.name.trim() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Belirtilmedi"),
            amountMl: Number(input.amountMl) || 0,
            calories: Number(input.calories) || 0,
            proteinG: input.proteinG,
            carbsG: input.carbsG,
            fatG: input.fatG,
            timestamp: new Date().toISOString()
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    type: "drink",
                    name: entry.name,
                    amountMl: entry.amountMl,
                    calories: entry.calories,
                    proteinG: entry.proteinG,
                    carbsG: entry.carbsG,
                    fatG: entry.fatG,
                    timestamp: entry.timestamp
                })
            });
            if (response.ok) {
                const created = await response.json();
                const normalized = normalizeEntry(created);
                setEntries((prev)=>[
                        normalized,
                        ...prev
                    ]);
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İçecek eklendi"), {
                    calories: entry.calories,
                    amountMl: entry.amountMl
                });
                void loadRemoteData();
                return;
            } else {
                setEntries((prev)=>{
                    const next = [
                        entry,
                        ...prev
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(next);
                    return next;
                });
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İçecek eklendi (yerel)"), {
                    calories: entry.calories,
                    amountMl: entry.amountMl
                });
            }
            return;
        }
        setEntries((prev)=>[
                entry,
                ...prev
            ]);
        recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İçecek eklendi"), {
            calories: entry.calories,
            amountMl: entry.amountMl
        });
    }
    async function addWater(input) {
        const entry = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
            type: "water",
            amountMl: Number(input.amountMl) || 0,
            timestamp: new Date().toISOString()
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    type: "water",
                    amountMl: entry.amountMl,
                    timestamp: entry.timestamp
                })
            });
            if (response.ok) {
                const created = await response.json();
                const normalized = normalizeEntry(created);
                setEntries((prev)=>[
                        normalized,
                        ...prev
                    ]);
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Su eklendi"), {
                    amountMl: entry.amountMl
                });
                void loadRemoteData();
                return;
            } else {
                setEntries((prev)=>{
                    const next = [
                        entry,
                        ...prev
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(next);
                    return next;
                });
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Su eklendi (yerel)"), {
                    amountMl: entry.amountMl
                });
            }
            return;
        }
        setEntries((prev)=>[
                entry,
                ...prev
            ]);
        recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Su eklendi"), {
            amountMl: entry.amountMl
        });
    }
    async function addActivity(input) {
        const entry = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
            type: "activity",
            activityType: input.activityType,
            durationMin: Number(input.durationMin) || 0,
            estimatedCalories: Number(input.estimatedCalories) || 0,
            note: input.note?.trim() || undefined,
            timestamp: new Date().toISOString()
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    type: "activity",
                    activityType: entry.activityType,
                    durationMin: entry.durationMin,
                    estimatedCalories: entry.estimatedCalories,
                    note: entry.note,
                    timestamp: entry.timestamp
                })
            });
            if (response.ok) {
                const created = await response.json();
                const normalized = normalizeEntry(created);
                setEntries((prev)=>[
                        normalized,
                        ...prev
                    ]);
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Aktivite eklendi"), {
                    activityType: entry.activityType,
                    durationMin: entry.durationMin
                });
                void loadRemoteData();
                return;
            } else {
                setEntries((prev)=>{
                    const next = [
                        entry,
                        ...prev
                    ];
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveEntries"])(next);
                    return next;
                });
                recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Aktivite eklendi (yerel)"), {
                    activityType: entry.activityType,
                    durationMin: entry.durationMin
                });
            }
            return;
        }
        setEntries((prev)=>[
                entry,
                ...prev
            ]);
        recordAudit("add", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Aktivite eklendi"), {
            activityType: entry.activityType,
            durationMin: entry.durationMin
        });
    }
    async function removeEntry(id) {
        const target = entries.find((entry)=>entry.id === id);
        if (dataMode === "remote") {
            await fetch(`${API_BASE_URL}/api/v1/entries/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        }
        setEntries((prev)=>prev.filter((entry)=>entry.id !== id));
        if (target) {
            recordAudit("remove", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kayıt silindi"), {
                type: target.type
            });
        }
    }
    async function updateGoals(next) {
        const updated = {
            ...goals,
            ...next
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/goals`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(updated)
            });
            if (response.ok) {
                const data = await response.json();
                setGoals({
                    waterGoalMl: data?.waterGoalMl ?? updated.waterGoalMl,
                    calorieGoal: data?.calorieGoal ?? updated.calorieGoal,
                    activityGoalMin: data?.activityGoalMin ?? updated.activityGoalMin,
                    mealGoalCount: data?.mealGoalCount ?? updated.mealGoalCount,
                    weightGoalKg: data?.weightGoalKg ?? updated.weightGoalKg,
                    proteinGoalG: data?.proteinGoalG ?? updated.proteinGoalG,
                    carbsGoalG: data?.carbsGoalG ?? updated.carbsGoalG,
                    fatGoalG: data?.fatGoalG ?? updated.fatGoalG,
                    sleepGoalHours: data?.sleepGoalHours ?? updated.sleepGoalHours
                });
                recordAudit("update-goals", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hedefler güncellendi"), {
                    waterGoalMl: data?.waterGoalMl ?? updated.waterGoalMl,
                    calorieGoal: data?.calorieGoal ?? updated.calorieGoal,
                    activityGoalMin: data?.activityGoalMin ?? updated.activityGoalMin,
                    mealGoalCount: data?.mealGoalCount ?? updated.mealGoalCount,
                    weightGoalKg: data?.weightGoalKg ?? updated.weightGoalKg,
                    proteinGoalG: data?.proteinGoalG ?? updated.proteinGoalG,
                    carbsGoalG: data?.carbsGoalG ?? updated.carbsGoalG,
                    fatGoalG: data?.fatGoalG ?? updated.fatGoalG
                });
                return;
            }
        }
        setGoals(updated);
        recordAudit("update-goals", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hedefler güncellendi"), updated);
    }
    async function updateEntry(id, input) {
        const normalized = normalizeEntry(input);
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/entries/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    ...normalized,
                    type: normalized.type
                })
            });
            if (response.ok) {
                const updated = await response.json();
                const nextEntry = normalizeEntry(updated);
                setEntries((prev)=>prev.map((entry)=>entry.id === id ? nextEntry : entry));
                recordAudit("update-entry", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kayıt güncellendi"), {
                    type: nextEntry.type
                });
                void loadRemoteData();
                return;
            }
        }
        setEntries((prev)=>prev.map((entry)=>entry.id === id ? normalized : entry));
        recordAudit("update-entry", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kayıt güncellendi"), {
            type: normalized.type
        });
    }
    async function addMeasurement(input) {
        const timestamp = input.timestamp ?? new Date().toISOString();
        const entry = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])(),
            type: input.type,
            value: Number(input.value) || 0,
            unit: input.unit || __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["measurementUnits"][input.type],
            timestamp
        };
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/measurements`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(entry)
            });
            if (response.ok) {
                const created = await response.json();
                const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMeasurement"])(created);
                if (normalized) {
                    setMeasurements((prev)=>sortMeasurements([
                            normalized,
                            ...prev
                        ]));
                }
                recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ölçüm eklendi"), {
                    type: entry.type
                });
                void loadRemoteData();
                return;
            }
        }
        setMeasurements((prev)=>sortMeasurements([
                entry,
                ...prev
            ]));
        recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ölçüm eklendi"), {
            type: entry.type
        });
    }
    async function updateMeasurement(id, input) {
        if (dataMode === "remote") {
            const response = await fetch(`${API_BASE_URL}/api/v1/measurements/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(input)
            });
            if (response.ok) {
                const updated = await response.json();
                const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizeMeasurement"])(updated);
                if (normalized) {
                    setMeasurements((prev)=>prev.map((entry)=>entry.id === id ? normalized : entry));
                }
                recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ölçüm güncellendi"), {
                    id
                });
                void loadRemoteData();
                return;
            }
        }
        setMeasurements((prev)=>prev.map((entry)=>entry.id === id ? {
                    ...entry,
                    ...input,
                    id: entry.id
                } : entry));
        recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ölçüm güncellendi"), {
            id
        });
    }
    async function removeMeasurement(id) {
        if (dataMode === "remote") {
            await fetch(`${API_BASE_URL}/api/v1/measurements/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
        }
        setMeasurements((prev)=>prev.filter((entry)=>entry.id !== id));
        recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ölçüm silindi"), {
            id
        });
    }
    function updateFlags(next) {
        const merged = {
            ...flags,
            ...next
        };
        setFlags(merged);
        void syncSettings({
            theme,
            reminder,
            flags: merged
        });
        recordAudit("update-flags", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Özellik bayrakları güncellendi"), next);
    }
    function updateTheme(next) {
        const merged = {
            ...theme,
            ...next
        };
        setTheme(merged);
        void syncSettings({
            theme: merged,
            reminder,
            flags
        });
        recordAudit("theme", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Tema güncellendi"), next);
    }
    function updateReminder(next) {
        const merged = {
            ...reminder,
            ...next
        };
        setReminder(merged);
        void syncSettings({
            theme,
            reminder: merged,
            flags
        });
        const shouldLog = Object.keys(next).some((key)=>key !== "lastNotifiedDay");
        if (shouldLog) {
            recordAudit("reminder", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hatırlatıcı güncellendi"), next);
        }
    }
    function clearAuditLog() {
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
    }
    const importLocalEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (dataMode !== "remote") {
            return 0;
        }
        const localEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$storage$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadEntries"])();
        if (localEntries.length === 0) {
            return 0;
        }
        const batchSize = 200;
        let importedTotal = 0;
        for(let index = 0; index < localEntries.length; index += batchSize){
            const batch = localEntries.slice(index, index + batchSize);
            const response = await fetch(`${API_BASE_URL}/api/v1/entries/import`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    entries: batch
                })
            });
            if (!response.ok) {
                break;
            }
            const data = await response.json();
            importedTotal += data?.imported ?? batch.length;
        }
        if (importedTotal > 0) {
            await loadRemoteData();
            recordAudit("import", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yerel kayıtlar buluta taşındı"), {
                count: importedTotal
            });
        }
        return importedTotal;
    }, [
        dataMode,
        loadRemoteData,
        recordAudit
    ]);
    const importLocalMeasurements = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (dataMode !== "remote") {
            return 0;
        }
        const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$measurements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadMeasurements"])();
        if (local.length === 0) {
            return 0;
        }
        const batchSize = 150;
        let importedTotal = 0;
        for(let index = 0; index < local.length; index += batchSize){
            const batch = local.slice(index, index + batchSize);
            const response = await fetch(`${API_BASE_URL}/api/v1/measurements/import`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    entries: batch
                })
            });
            if (!response.ok) {
                break;
            }
            const data = await response.json();
            importedTotal += data?.imported ?? batch.length;
        }
        if (importedTotal > 0) {
            await loadRemoteData();
            recordAudit("measurement", (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yerel ölçümler buluta taşındı"), {
                count: importedTotal
            });
        }
        return importedTotal;
    }, [
        dataMode,
        loadRemoteData,
        recordAudit
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode !== "remote") {
            return;
        }
        if (!autoSyncRef.current.entries) {
            autoSyncRef.current.entries = true;
            void importLocalEntries();
        }
        if (!autoSyncRef.current.measurements) {
            autoSyncRef.current.measurements = true;
            void importLocalMeasurements();
        }
    }, [
        dataMode,
        importLocalEntries,
        importLocalMeasurements
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode !== "remote") {
            return;
        }
        function handleOnline() {
            void importLocalEntries();
            void importLocalMeasurements();
        }
        window.addEventListener("online", handleOnline);
        return ()=>window.removeEventListener("online", handleOnline);
    }, [
        dataMode,
        importLocalEntries,
        importLocalMeasurements
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (dataMode !== "remote" || isLoading) {
            return;
        }
        void loadRemoteData();
        const interval = window.setInterval(()=>{
            void loadRemoteData();
        }, 30000);
        return ()=>window.clearInterval(interval);
    }, [
        dataMode,
        isLoading,
        loadRemoteData
    ]);
    const value = {
        entries,
        addFood,
        addDrink,
        addWater,
        addActivity,
        addEntries,
        removeEntry,
        updateEntry,
        dailySummary,
        weeklySummary,
        goals,
        updateGoals,
        flags,
        updateFlags,
        theme,
        updateTheme,
        reminder,
        updateReminder,
        auditLog,
        clearAuditLog,
        dataMode,
        importLocalEntries,
        measurements,
        addMeasurement,
        updateMeasurement,
        removeMeasurement,
        importLocalMeasurements
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackerContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/providers/tracker-provider.tsx",
        lineNumber: 1173,
        columnNumber: 10
    }, this);
}
function useTracker() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(TrackerContext);
    if (!context) {
        throw new Error("useTracker must be used within TrackerProvider");
    }
    return context;
}
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs) <export default as minpath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minpath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
}),
"[externals]/node:process [external] (node:process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:process", () => require("node:process"));

module.exports = mod;
}),
"[externals]/node:process [external] (node:process, cjs) <export default as minproc>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "minproc",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$process__$5b$external$5d$__$28$node$3a$process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:process [external] (node:process, cjs)");
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs) <export fileURLToPath as urlToPath>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "urlToPath",
    ()=>__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"]
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
}),
"[project]/apps/web/src/lib/features/voice/voice-chat.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Voice Chat Utilities
 * Provides speech recognition and synthesis for AI chat
 * Uses Web Speech API (free, browser-native)
 */ // Type definitions for Web Speech API
__turbopack_context__.s([
    "VoiceChatRecognition",
    ()=>VoiceChatRecognition,
    "VoiceChatSynthesis",
    ()=>VoiceChatSynthesis,
    "getSpeechRecognition",
    ()=>getSpeechRecognition,
    "isSpeechRecognitionSupported",
    ()=>isSpeechRecognitionSupported,
    "isSpeechSynthesisSupported",
    ()=>isSpeechSynthesisSupported
]);
function getSpeechRecognition() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
    const w = undefined;
}
function isSpeechRecognitionSupported() {
    return getSpeechRecognition() !== null;
}
function isSpeechSynthesisSupported() {
    return ("TURBOPACK compile-time value", "undefined") !== "undefined" && "speechSynthesis" in window;
}
class VoiceChatRecognition {
    recognition = null;
    isListening = false;
    onTranscriptCallback = null;
    onErrorCallback = null;
    onEndCallback = null;
    constructor(locale = "tr-TR"){
        const Recognition = getSpeechRecognition();
        if (!Recognition) {
            return;
        }
        this.recognition = new Recognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = locale;
        this.recognition.maxAlternatives = 1;
        this.recognition.onresult = (event)=>{
            const results = event.results;
            const lastResult = results[event.resultIndex];
            if (lastResult) {
                const transcript = lastResult[0].transcript;
                const isFinal = lastResult.isFinal;
                if (this.onTranscriptCallback) {
                    this.onTranscriptCallback(transcript, isFinal);
                }
            }
        };
        this.recognition.onerror = (event)=>{
            console.error("Speech recognition error:", event.error);
            let errorMessage = "Ses tanıma hatası";
            switch(event.error){
                case "no-speech":
                    errorMessage = "Ses algılanamadı. Lütfen tekrar deneyin.";
                    break;
                case "audio-capture":
                    errorMessage = "Mikrofon erişimi sağlanamadı.";
                    break;
                case "not-allowed":
                    errorMessage = "Mikrofon izni reddedildi.";
                    break;
                case "network":
                    errorMessage = "Ağ bağlantısı hatası.";
                    break;
                case "aborted":
                    // User stopped, not an error
                    return;
            }
            if (this.onErrorCallback) {
                this.onErrorCallback(errorMessage);
            }
            this.isListening = false;
        };
        this.recognition.onend = ()=>{
            this.isListening = false;
            if (this.onEndCallback) {
                this.onEndCallback();
            }
        };
    }
    start() {
        if (!this.recognition || this.isListening) {
            return;
        }
        try {
            this.recognition.start();
            this.isListening = true;
        } catch (error) {
            console.error("Failed to start recognition:", error);
            if (this.onErrorCallback) {
                this.onErrorCallback("Ses tanıma başlatılamadı");
            }
        }
    }
    stop() {
        if (!this.recognition || !this.isListening) {
            return;
        }
        try {
            this.recognition.stop();
        } catch (error) {
            console.error("Failed to stop recognition:", error);
        }
    }
    abort() {
        if (!this.recognition) {
            return;
        }
        try {
            this.recognition.abort();
            this.isListening = false;
        } catch (error) {
            console.error("Failed to abort recognition:", error);
        }
    }
    onTranscript(callback) {
        this.onTranscriptCallback = callback;
    }
    onError(callback) {
        this.onErrorCallback = callback;
    }
    onEnd(callback) {
        this.onEndCallback = callback;
    }
    getIsListening() {
        return this.isListening;
    }
    isSupported() {
        return this.recognition !== null;
    }
}
class VoiceChatSynthesis {
    synthesis = null;
    currentUtterance = null;
    isSpeaking = false;
    constructor(){
        if (("TURBOPACK compile-time value", "undefined") !== "undefined" && "speechSynthesis" in window) //TURBOPACK unreachable
        ;
    }
    /**
   * Speak text with Turkish voice
   */ speak(text, options) {
        if (!this.synthesis) {
            return;
        }
        // Cancel any ongoing speech
        this.stop();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = options?.lang || "tr-TR";
        utterance.rate = options?.rate || 1.0;
        utterance.pitch = options?.pitch || 1.0;
        utterance.volume = options?.volume || 1.0;
        // Try to find Turkish voice
        const voices = this.synthesis.getVoices();
        const turkishVoice = voices.find((voice)=>voice.lang.startsWith("tr") || voice.lang.startsWith("TR"));
        if (turkishVoice) {
            utterance.voice = turkishVoice;
        }
        utterance.onstart = ()=>{
            this.isSpeaking = true;
        };
        utterance.onend = ()=>{
            this.isSpeaking = false;
            this.currentUtterance = null;
        };
        utterance.onerror = (event)=>{
            console.error("Speech synthesis error:", event);
            this.isSpeaking = false;
            this.currentUtterance = null;
        };
        this.currentUtterance = utterance;
        this.synthesis.speak(utterance);
    }
    /**
   * Stop current speech
   */ stop() {
        if (!this.synthesis) {
            return;
        }
        this.synthesis.cancel();
        this.isSpeaking = false;
        this.currentUtterance = null;
    }
    /**
   * Pause current speech
   */ pause() {
        if (!this.synthesis || !this.isSpeaking) {
            return;
        }
        this.synthesis.pause();
    }
    /**
   * Resume paused speech
   */ resume() {
        if (!this.synthesis) {
            return;
        }
        this.synthesis.resume();
    }
    getIsSpeaking() {
        return this.isSpeaking;
    }
    isSupported() {
        return this.synthesis !== null;
    }
    /**
   * Get available voices
   */ getVoices() {
        if (!this.synthesis) {
            return [];
        }
        return this.synthesis.getVoices();
    }
    /**
   * Get Turkish voices
   */ getTurkishVoices() {
        return this.getVoices().filter((voice)=>voice.lang.startsWith("tr") || voice.lang.startsWith("TR"));
    }
}
}),
"[project]/apps/web/src/components/features/chat/chat-assistant.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatAssistant",
    ()=>ChatAssistant
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/utensils.js [app-ssr] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bell.js [app-ssr] (ecmascript) <export default as Bell>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coffee.js [app-ssr] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic-off.js [app-ssr] (ecmascript) <export default as MicOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-2.js [app-ssr] (ecmascript) <export default as Volume2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/volume-x.js [app-ssr] (ecmascript) <export default as VolumeX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-ssr] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/providers/tracker-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/features/voice/voice-chat.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function ChatAssistant({ isOpen, onToggle, launcherClassName = "" }) {
    const tracker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTracker"])();
    const [internalOpen, setInternalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const open = isOpen ?? internalOpen;
    const setOpen = (next)=>{
        if (onToggle) {
            onToggle(next);
            return;
        }
        setInternalOpen(next);
    };
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLimitReached, setIsLimitReached] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [limitPlan, setLimitPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copiedId, setCopiedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingConfirmation, setPendingConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingAmount, setEditingAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [customAmount, setCustomAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const scrollAnchorRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Voice chat states
    const [isVoiceListening, setIsVoiceListening] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVoiceSpeaking, setIsVoiceSpeaking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceTranscript, setVoiceTranscript] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [voiceSupported, setVoiceSupported] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [autoSpeak, setAutoSpeak] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const recognitionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const synthesisRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Her açıldığında sohbeti sıfırla
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (open) {
            setMessages([
                {
                    id: "welcome",
                    role: "list",
                    content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Merhaba! Ben Calmet AI Sağlık Koçunuz. Bugün beslenme veya antrenman hedefleriniz için size nasıl yardımcı olabilirim?")
                }
            ]);
            setIsLimitReached(false);
            setLimitPlan(null);
        }
    }, [
        open
    ]);
    // Initialize voice chat
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setVoiceSupported((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpeechRecognitionSupported"])() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpeechSynthesisSupported"])());
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpeechRecognitionSupported"])()) {
            const recognition = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceChatRecognition"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])() === "tr" ? "tr-TR" : "en-US");
            recognition.onTranscript((transcript, isFinal)=>{
                setVoiceTranscript(transcript);
                if (isFinal && transcript.trim()) {
                    setInput(transcript);
                    setVoiceTranscript("");
                }
            });
            recognition.onError((error)=>{
                console.error("Voice recognition error:", error);
                setIsVoiceListening(false);
            });
            recognition.onEnd(()=>{
                setIsVoiceListening(false);
            });
            recognitionRef.current = recognition;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSpeechSynthesisSupported"])()) {
            synthesisRef.current = new __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$voice$2f$voice$2d$chat$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["VoiceChatSynthesis"]();
        }
        return ()=>{
            recognitionRef.current?.abort();
            synthesisRef.current?.stop();
        };
    }, []);
    // Auto-speak AI responses
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Track the current interval to properly clean up
        let checkSpeaking = null;
        const cleanup = ()=>{
            if (checkSpeaking) {
                clearInterval(checkSpeaking);
                checkSpeaking = null;
            }
        };
        if (!autoSpeak || !synthesisRef.current) {
            return cleanup;
        }
        // Add bounds check for messages array
        if (messages.length === 0) {
            return cleanup;
        }
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.role === "list" && lastMessage.id !== "welcome") {
            // Remove markdown formatting for speech
            const cleanText = lastMessage.content.replace(/\*\*/g, "").replace(/\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/#{1,6}\s/g, "").replace(/```[\s\S]*?```/g, "").replace(/`([^`]+)`/g, "$1");
            synthesisRef.current.speak(cleanText, {
                lang: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])() === "tr" ? "tr-TR" : "en-US"
            });
            setIsVoiceSpeaking(true);
            // Update speaking state when done
            checkSpeaking = setInterval(()=>{
                if (synthesisRef.current && !synthesisRef.current.getIsSpeaking()) {
                    setIsVoiceSpeaking(false);
                    if (checkSpeaking) {
                        clearInterval(checkSpeaking);
                        checkSpeaking = null;
                    }
                }
            }, 100);
        }
        // Return cleanup function
        return cleanup;
    }, [
        messages,
        autoSpeak
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        scrollAnchorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [
        messages,
        open,
        isLoading
    ]);
    const toggleVoiceListening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!recognitionRef.current) {
            return;
        }
        if (isVoiceListening) {
            recognitionRef.current.stop();
            setIsVoiceListening(false);
        } else {
            recognitionRef.current.start();
            setIsVoiceListening(true);
        }
    }, [
        isVoiceListening
    ]);
    const toggleAutoSpeak = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (isVoiceSpeaking && synthesisRef.current) {
            synthesisRef.current.stop();
            setIsVoiceSpeaking(false);
        }
        setAutoSpeak((prev)=>!prev);
    }, [
        isVoiceSpeaking
    ]);
    async function copyMessage(message) {
        const text = message.content.trim();
        if (!text) return;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                textarea.remove();
            }
            setCopiedId(message.id);
            window.setTimeout(()=>setCopiedId((prev)=>prev === message.id ? null : prev), 1600);
        } catch  {
        // ignore clipboard errors
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        const userMessage = {
            id: Date.now().toString(),
            role: "user",
            content: input
        };
        setMessages((prev)=>[
                ...prev,
                userMessage
            ]);
        setInput("");
        setIsLoading(true);
        try {
            const history = messages.filter((m)=>m.id !== "welcome").map((m)=>({
                    role: m.role,
                    content: m.content
                }));
            const res = await fetch("/api/v1/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    history,
                    locale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])()
                })
            });
            if (!res.ok) {
                const errorData = await res.json().catch(()=>({}));
                throw new Error(errorData.error || `Sunucu hatası: ${res.status}`);
            }
            const data = await res.json();
            if (data.limitReached) {
                setIsLimitReached(true);
                setLimitPlan(typeof data.plan === "string" ? data.plan : null);
                const limitMessage = data.plan === "ai_plus" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Günlük 25 mesaj limitine ulaştın. Yarın tekrar deneyebilirsin.") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("AI Koçu şu an sadece AI Plus paketinde aktif.");
                setMessages((prev)=>[
                        ...prev,
                        {
                            id: Date.now().toString(),
                            role: "list",
                            content: limitMessage
                        }
                    ]);
            } else if (data.reply) {
                let cleanReply = data.reply;
                if (data.command) {
                    setPendingConfirmation({
                        action: data.command.action,
                        data: data.command.data,
                        isEstimate: data.command.isEstimate
                    });
                } else {
                    // All supported actions for regex matching
                    const allActions = "log_food|log_water|log_activity|request_web_search|analyze_day|suggest_meal|set_reminder|nutrition_info|log_drink";
                    // Try multiple patterns to catch JSON (with/without code blocks)
                    const codeBlockMatch = data.reply.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
                    const rawJsonMatch = data.reply.match(new RegExp(`(\\{[\\s\\S]*?"action"\\s*:\\s*"(?:${allActions})"[\\s\\S]*?\\})`, "m"));
                    const jsonMatch = codeBlockMatch || rawJsonMatch;
                    if (jsonMatch) {
                        try {
                            const jsonStr = jsonMatch[1];
                            // Clean comments from JSON (AI sometimes adds them)
                            const cleanedJsonStr = jsonStr.replace(/\/\/.*$/gm, "").trim();
                            const command = JSON.parse(cleanedJsonStr);
                            // Remove ALL JSON content from displayed message
                            cleanReply = data.reply.replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "").replace(new RegExp(`\\{[\\s\\S]*?"action"\\s*:\\s*"(?:${allActions})"[\\s\\S]*?\\}`, "gm"), "").trim();
                            // Handle all action types
                            const validActions = [
                                "log_food",
                                "log_water",
                                "log_activity",
                                "request_web_search",
                                "analyze_day",
                                "suggest_meal",
                                "set_reminder",
                                "nutrition_info",
                                "log_drink"
                            ];
                            if (validActions.includes(command.action) && command.data) {
                                setPendingConfirmation({
                                    action: command.action,
                                    data: command.data
                                });
                            }
                        } catch (e) {
                            console.error("Failed to parse AI command", e);
                            // Still try to clean any JSON-looking content
                            cleanReply = data.reply.replace(/```(?:json)?\s*[\s\S]*?\s*```/g, "").replace(/\{[\s\S]*?"action"[\s\S]*?\}/gm, "").trim();
                        }
                    }
                }
                // Only add message if there's actual content left
                if (cleanReply) {
                    setMessages((prev)=>[
                            ...prev,
                            {
                                id: Date.now().toString(),
                                role: "list",
                                content: cleanReply
                            }
                        ]);
                }
            } else {
                throw new Error(data.error || "Unknown error");
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bir bağlantı hatası oluştu. Lütfen tekrar dene.");
            setMessages((prev)=>[
                    ...prev,
                    {
                        id: Date.now().toString(),
                        role: "list",
                        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(message)
                    }
                ]);
        } finally{
            setIsLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-24 left-1/2 z-50 flex flex-col items-center gap-4 -translate-x-1/2 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:items-end",
        children: [
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-[min(92vw,380px)] overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-2xl animate-[fade-up_0.2s_ease-out] flex flex-col max-h-[70vh] sm:max-h-[70vh] sm:w-[380px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between border-b border-emerald-50 bg-gradient-to-r from-emerald-50 to-white px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-200",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                            className: "h-6 w-6 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 423,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 422,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "leading-tight",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-black text-gray-900",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Calmet AI")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 426,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-emerald-600 font-black tracking-widest uppercase",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sağlık Koçu")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 427,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 425,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 421,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setOpen(false),
                                className: "rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                    lineNumber: 436,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 432,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 420,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto overscroll-contain bg-[#fffcf9] p-5 space-y-6",
                        children: [
                            messages.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm ${m.role === "user" ? "bg-emerald-700 text-white" : "bg-white text-emerald-600 border border-emerald-100"}`,
                                            children: m.role === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 451,
                                                columnNumber: 58
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 451,
                                                columnNumber: 89
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 447,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `max-w-[85%] rounded-[1.25rem] px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${m.role === "user" ? "bg-emerald-700 text-white rounded-tr-none" : "bg-white text-gray-700 border border-emerald-50 rounded-tl-none"}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-start justify-between gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: m.role === "list" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                            className: "prose prose-sm prose-emerald max-w-none prose-p:leading-relaxed prose-li:my-1 font-medium",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
                                                                children: m.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 463,
                                                                columnNumber: 53
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 462,
                                                            columnNumber: 49
                                                        }, this) : m.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 41
                                                    }, this),
                                                    m.role !== "user" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>copyMessage(m),
                                                        className: "rounded-lg border border-emerald-100 bg-emerald-50 p-1.5 text-emerald-700 hover:bg-emerald-100",
                                                        "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kopyala"),
                                                        children: copiedId === m.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 53
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 53
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 459,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 453,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, m.id, true, {
                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                    lineNumber: 443,
                                    columnNumber: 29
                                }, this)),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 border border-emerald-100 shadow-sm leading-none pt-0.5",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "h-4 w-4 animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 490,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 489,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1.5 rounded-[1.25rem] bg-white px-4 py-3 border border-emerald-50 shadow-sm rounded-tl-none",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 493,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 494,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-bounce"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 495,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 492,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 488,
                                columnNumber: 29
                            }, this),
                            isLimitReached && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-bold text-emerald-800 mb-4 leading-relaxed",
                                        children: limitPlan === "ai_plus" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Günlük limitin doldu. Yarın tekrar deneyebilirsin.") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("AI Koçu şu an sadece AI Plus paketinde aktif.")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 503,
                                        columnNumber: 33
                                    }, this),
                                    limitPlan !== "ai_plus" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/pricing",
                                        className: "block w-full rounded-2xl bg-emerald-600 py-3 text-sm font-black text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Planları Gör")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 509,
                                        columnNumber: 37
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold text-emerald-700",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Limit yarın sıfırlanır.")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 516,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 502,
                                columnNumber: 29
                            }, this),
                            pendingConfirmation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 animate-[fade-up_0.2s_ease-out]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border shadow-sm ${pendingConfirmation.action === "request_web_search" ? "bg-blue-100 text-blue-600 border-blue-200" : pendingConfirmation.action === "analyze_day" ? "bg-purple-100 text-purple-600 border-purple-200" : pendingConfirmation.action === "suggest_meal" ? "bg-orange-100 text-orange-600 border-orange-200" : pendingConfirmation.action === "set_reminder" ? "bg-pink-100 text-pink-600 border-pink-200" : pendingConfirmation.action === "nutrition_info" ? "bg-cyan-100 text-cyan-600 border-cyan-200" : pendingConfirmation.action === "log_drink" ? "bg-sky-100 text-sky-600 border-sky-200" : "bg-emerald-100 text-emerald-600 border-emerald-200"}`,
                                        children: pendingConfirmation.action === "request_web_search" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 534,
                                            columnNumber: 92
                                        }, this) : pendingConfirmation.action === "analyze_day" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 535,
                                            columnNumber: 85
                                        }, this) : pendingConfirmation.action === "suggest_meal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 536,
                                            columnNumber: 86
                                        }, this) : pendingConfirmation.action === "set_reminder" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 537,
                                            columnNumber: 86
                                        }, this) : pendingConfirmation.action === "nutrition_info" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 538,
                                            columnNumber: 88
                                        }, this) : pendingConfirmation.action === "log_drink" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 539,
                                            columnNumber: 83
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 540,
                                            columnNumber: 38
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 525,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex-1 rounded-[1.25rem] border p-4 shadow-md rounded-tl-none ${pendingConfirmation.action === "request_web_search" ? "bg-gradient-to-br from-blue-50 to-white border-blue-100" : pendingConfirmation.action === "analyze_day" ? "bg-gradient-to-br from-purple-50 to-white border-purple-100" : pendingConfirmation.action === "suggest_meal" ? "bg-gradient-to-br from-orange-50 to-white border-orange-100" : pendingConfirmation.action === "set_reminder" ? "bg-gradient-to-br from-pink-50 to-white border-pink-100" : pendingConfirmation.action === "nutrition_info" ? "bg-gradient-to-br from-cyan-50 to-white border-cyan-100" : pendingConfirmation.action === "log_drink" ? "bg-gradient-to-br from-sky-50 to-white border-sky-100" : "bg-gradient-to-br from-emerald-50 to-white border-emerald-100"}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: `text-sm font-bold mb-3 ${pendingConfirmation.action === "request_web_search" ? "text-blue-900" : pendingConfirmation.action === "analyze_day" ? "text-purple-900" : pendingConfirmation.action === "suggest_meal" ? "text-orange-900" : pendingConfirmation.action === "set_reminder" ? "text-pink-900" : pendingConfirmation.action === "nutrition_info" ? "text-cyan-900" : pendingConfirmation.action === "log_drink" ? "text-sky-900" : "text-emerald-900"}`,
                                                children: pendingConfirmation.action === "request_web_search" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Web araması yapayım mı?") : pendingConfirmation.action === "analyze_day" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Günlük Analiz") : pendingConfirmation.action === "suggest_meal" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yemek Önerileri") : pendingConfirmation.action === "set_reminder" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hatırlatıcı Kur") : pendingConfirmation.action === "nutrition_info" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Besin Bilgisi") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bunu günlüğüne ekleyeyim mi?")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 551,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `bg-white rounded-xl p-4 border mb-4 shadow-sm ${pendingConfirmation.action === "request_web_search" ? "border-blue-100" : pendingConfirmation.action === "analyze_day" ? "border-purple-100" : pendingConfirmation.action === "suggest_meal" ? "border-orange-100" : pendingConfirmation.action === "set_reminder" ? "border-pink-100" : pendingConfirmation.action === "nutrition_info" ? "border-cyan-100" : pendingConfirmation.action === "log_drink" ? "border-sky-100" : "border-emerald-100"}`,
                                                children: [
                                                    pendingConfirmation.action === "request_web_search" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                        className: "h-5 w-5 text-blue-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-base font-bold text-gray-900",
                                                                        children: pendingConfirmation.data.query
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 581,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600",
                                                                children: pendingConfirmation.data.reason
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "nutrition_info" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-base font-bold text-gray-900",
                                                                children: pendingConfirmation.data.food
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 592,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("100g başına değerler:")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-4 gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-emerald-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-emerald-600",
                                                                                children: "kcal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 596,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-emerald-700",
                                                                                children: pendingConfirmation.data.per100g.calories
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 597,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 595,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-blue-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-blue-600",
                                                                                children: "P"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 600,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-blue-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.per100g.protein,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 601,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 599,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-amber-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-amber-600",
                                                                                children: "K"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 604,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-amber-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.per100g.carbs,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 605,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 603,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-rose-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-rose-600",
                                                                                children: "Y"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 608,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-rose-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.per100g.fat,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 609,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 607,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 594,
                                                                columnNumber: 49
                                                            }, this),
                                                            pendingConfirmation.data.typicalServing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-500",
                                                                children: [
                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Tipik porsiyon:"),
                                                                    " ",
                                                                    pendingConfirmation.data.typicalServing
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 613,
                                                                columnNumber: 53
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "suggest_meal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-bold text-gray-700 capitalize",
                                                                        children: pendingConfirmation.data.mealType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 622,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    pendingConfirmation.data.targetCalories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-lg",
                                                                        children: [
                                                                            "~",
                                                                            pendingConfirmation.data.targetCalories,
                                                                            " kcal"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 624,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 621,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2",
                                                                children: pendingConfirmation.data.suggestions.map((suggestion, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2 p-2 bg-orange-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-orange-500",
                                                                                children: "🍽️"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 632,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-medium text-gray-700",
                                                                                children: suggestion
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 633,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, idx, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 631,
                                                                        columnNumber: 57
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 620,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "set_reminder" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                        className: "h-5 w-5 text-pink-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 644,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-base font-bold text-gray-900",
                                                                        children: pendingConfirmation.data.message
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 645,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm text-gray-600",
                                                                        children: [
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Her"),
                                                                            " ",
                                                                            pendingConfirmation.data.intervalMin,
                                                                            " ",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("dakikada bir")
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 648,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-1 rounded-lg capitalize",
                                                                        children: pendingConfirmation.data.type
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 647,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "analyze_day" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                                        className: "h-5 w-5 text-purple-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 662,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-base font-bold text-gray-900",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Günlük Beslenme Analizi")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 663,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 661,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-600",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bugünkü kalori alımın, makro dağılımın ve hedeflerine ne kadar yakın olduğun analiz edilecek.")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 660,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "log_food" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-base font-bold text-gray-900",
                                                                children: pendingConfirmation.data.name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Besin")
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 672,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between pb-2 border-b border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-baseline gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-2xl font-black text-emerald-600",
                                                                                children: pendingConfirmation.data.calories || 0
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 675,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-gray-400",
                                                                                children: "kcal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 676,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 674,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    editingAmount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: customAmount,
                                                                                onChange: (e)=>setCustomAmount(e.target.value),
                                                                                placeholder: String(pendingConfirmation.data.amountG || 100),
                                                                                className: "w-20 px-2 py-1 text-sm font-bold text-center border border-emerald-300 rounded-lg focus:ring-2 focus:ring-emerald-500/20 outline-none",
                                                                                autoFocus: true
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 680,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs font-bold text-gray-500",
                                                                                children: "g"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 688,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    const oldAmount = pendingConfirmation.data.amountG || 100;
                                                                                    const newAmount = parseInt(customAmount) || oldAmount;
                                                                                    const ratio = newAmount / oldAmount;
                                                                                    setPendingConfirmation({
                                                                                        action: "log_food",
                                                                                        data: {
                                                                                            ...pendingConfirmation.data,
                                                                                            amountG: newAmount,
                                                                                            calories: Math.round((pendingConfirmation.data.calories || 0) * ratio),
                                                                                            proteinG: Math.round((pendingConfirmation.data.proteinG || 0) * ratio * 10) / 10,
                                                                                            carbsG: Math.round((pendingConfirmation.data.carbsG || 0) * ratio * 10) / 10,
                                                                                            fatG: Math.round((pendingConfirmation.data.fatG || 0) * ratio * 10) / 10
                                                                                        }
                                                                                    });
                                                                                    setEditingAmount(false);
                                                                                    setCustomAmount("");
                                                                                },
                                                                                className: "p-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                    className: "h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                    lineNumber: 711,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 689,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 679,
                                                                        columnNumber: 57
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setEditingAmount(true);
                                                                            setCustomAmount(String(pendingConfirmation.data.amountG || 100));
                                                                        },
                                                                        className: "flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    pendingConfirmation.data.amountG || 100,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 722,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-emerald-400",
                                                                                children: "✏️"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 723,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 715,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 673,
                                                                columnNumber: 49
                                                            }, this),
                                                            !editingAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-2 flex-wrap",
                                                                children: [
                                                                    50,
                                                                    100,
                                                                    150,
                                                                    200,
                                                                    300
                                                                ].map((amount)=>{
                                                                    const oldAmount = pendingConfirmation.data.amountG || 100;
                                                                    const isSelected = oldAmount === amount;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            const ratio = amount / oldAmount;
                                                                            setPendingConfirmation({
                                                                                action: "log_food",
                                                                                data: {
                                                                                    ...pendingConfirmation.data,
                                                                                    amountG: amount,
                                                                                    calories: Math.round((pendingConfirmation.data.calories || 0) * ratio),
                                                                                    proteinG: Math.round((pendingConfirmation.data.proteinG || 0) * ratio * 10) / 10,
                                                                                    carbsG: Math.round((pendingConfirmation.data.carbsG || 0) * ratio * 10) / 10,
                                                                                    fatG: Math.round((pendingConfirmation.data.fatG || 0) * ratio * 10) / 10
                                                                                }
                                                                            });
                                                                        },
                                                                        className: `px-2 py-1 text-xs font-bold rounded-lg transition-colors ${isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                                                                        children: [
                                                                            amount,
                                                                            "g"
                                                                        ]
                                                                    }, amount, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 735,
                                                                        columnNumber: 65
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 730,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-3 gap-2 pt-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-blue-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-blue-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Protein")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 765,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-blue-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.proteinG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 766,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 764,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-amber-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-amber-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Karb")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 769,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-amber-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.carbsG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 770,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 768,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-rose-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-rose-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yağ")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 773,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-rose-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.fatG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 774,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 772,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 763,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 671,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "log_drink" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-base font-bold text-gray-900",
                                                                        children: pendingConfirmation.data.name || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İçecek")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 784,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    pendingConfirmation.isEstimate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-1 rounded-full uppercase tracking-wider",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Tahmini")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 786,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 783,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between pb-2 border-b border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-baseline gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-2xl font-black text-sky-600",
                                                                                children: pendingConfirmation.data.calories || 0
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 793,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm font-bold text-gray-400",
                                                                                children: "kcal"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 794,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 792,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    editingAmount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                type: "number",
                                                                                value: customAmount,
                                                                                onChange: (e)=>setCustomAmount(e.target.value),
                                                                                placeholder: String(pendingConfirmation.data.amountMl || 200),
                                                                                className: "w-20 px-2 py-1 text-sm font-bold text-center border border-sky-300 rounded-lg focus:ring-2 focus:ring-sky-500/20 outline-none",
                                                                                autoFocus: true
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 798,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs font-bold text-gray-500",
                                                                                children: "ml"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 806,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>{
                                                                                    const oldAmount = pendingConfirmation.data.amountMl || 200;
                                                                                    const newAmount = parseInt(customAmount) || oldAmount;
                                                                                    const ratio = newAmount / oldAmount;
                                                                                    setPendingConfirmation({
                                                                                        action: "log_drink",
                                                                                        data: {
                                                                                            ...pendingConfirmation.data,
                                                                                            amountMl: newAmount,
                                                                                            calories: Math.round((pendingConfirmation.data.calories || 0) * ratio),
                                                                                            proteinG: Math.round((pendingConfirmation.data.proteinG || 0) * ratio * 10) / 10,
                                                                                            carbsG: Math.round((pendingConfirmation.data.carbsG || 0) * ratio * 10) / 10,
                                                                                            fatG: Math.round((pendingConfirmation.data.fatG || 0) * ratio * 10) / 10
                                                                                        },
                                                                                        isEstimate: pendingConfirmation.isEstimate
                                                                                    });
                                                                                    setEditingAmount(false);
                                                                                    setCustomAmount("");
                                                                                },
                                                                                className: "p-1 bg-sky-500 text-white rounded-lg hover:bg-sky-600",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                    className: "h-4 w-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                    lineNumber: 830,
                                                                                    columnNumber: 65
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 807,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 797,
                                                                        columnNumber: 57
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            setEditingAmount(true);
                                                                            setCustomAmount(String(pendingConfirmation.data.amountMl || 200));
                                                                        },
                                                                        className: "flex items-center gap-1 text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-lg hover:bg-sky-100 transition-colors",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: [
                                                                                    pendingConfirmation.data.amountMl || 200,
                                                                                    "ml"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 841,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sky-400",
                                                                                children: "✏️"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 842,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 834,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 791,
                                                                columnNumber: 49
                                                            }, this),
                                                            !editingAmount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-2 flex-wrap",
                                                                children: [
                                                                    200,
                                                                    250,
                                                                    330,
                                                                    500,
                                                                    1000
                                                                ].map((amount)=>{
                                                                    const oldAmount = pendingConfirmation.data.amountMl || 200;
                                                                    const isSelected = oldAmount === amount;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        onClick: ()=>{
                                                                            const ratio = amount / oldAmount;
                                                                            setPendingConfirmation({
                                                                                action: "log_drink",
                                                                                data: {
                                                                                    ...pendingConfirmation.data,
                                                                                    amountMl: amount,
                                                                                    calories: Math.round((pendingConfirmation.data.calories || 0) * ratio),
                                                                                    proteinG: Math.round((pendingConfirmation.data.proteinG || 0) * ratio * 10) / 10,
                                                                                    carbsG: Math.round((pendingConfirmation.data.carbsG || 0) * ratio * 10) / 10,
                                                                                    fatG: Math.round((pendingConfirmation.data.fatG || 0) * ratio * 10) / 10
                                                                                },
                                                                                isEstimate: pendingConfirmation.isEstimate
                                                                            });
                                                                        },
                                                                        className: `px-2 py-1 text-xs font-bold rounded-lg transition-colors ${isSelected ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`,
                                                                        children: [
                                                                            amount,
                                                                            "ml"
                                                                        ]
                                                                    }, amount, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 854,
                                                                        columnNumber: 65
                                                                    }, this);
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 849,
                                                                columnNumber: 53
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-3 gap-2 pt-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-blue-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-blue-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Protein")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 885,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-blue-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.proteinG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 886,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 884,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-amber-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-amber-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Karb")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 889,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-amber-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.carbsG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 890,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 888,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-rose-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-rose-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yağ")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 893,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-rose-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.fatG || 0,
                                                                                    "g"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 894,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 892,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 883,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "log_water" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-baseline gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-black text-blue-600",
                                                                children: pendingConfirmation.data.amountMl || 0
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 903,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-bold text-gray-400",
                                                                children: "ml"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 904,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 902,
                                                        columnNumber: 45
                                                    }, this),
                                                    pendingConfirmation.action === "log_activity" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-baseline gap-2 pb-2 border-b border-gray-100",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-2xl font-black text-orange-600",
                                                                        children: [
                                                                            "-",
                                                                            pendingConfirmation.data.estimatedCalories || 0
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 912,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-sm font-bold text-gray-400",
                                                                        children: [
                                                                            "kcal ",
                                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("yakıldı")
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 913,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 911,
                                                                columnNumber: 49
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "grid grid-cols-2 gap-2 pt-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-orange-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-orange-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Süre")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 917,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-orange-700",
                                                                                children: [
                                                                                    pendingConfirmation.data.durationMin || 0,
                                                                                    " dk"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 918,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 916,
                                                                        columnNumber: 53
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-center p-2 bg-purple-50 rounded-lg",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs font-bold text-purple-600 uppercase tracking-wide",
                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Tür")
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 921,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm font-black text-purple-700 capitalize",
                                                                                children: pendingConfirmation.data.activityType || "aktivite"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                                lineNumber: 922,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                        lineNumber: 920,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 915,
                                                                columnNumber: 49
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 910,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 569,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setPendingConfirmation(null);
                                                            setEditingAmount(false);
                                                            setCustomAmount("");
                                                        },
                                                        className: "flex-1 flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                lineNumber: 939,
                                                                columnNumber: 45
                                                            }, this),
                                                            pendingConfirmation.action === "nutrition_info" || pendingConfirmation.action === "suggest_meal" || pendingConfirmation.action === "analyze_day" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kapat") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İptal")
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 931,
                                                        columnNumber: 41
                                                    }, this),
                                                    (pendingConfirmation.action === "log_food" || pendingConfirmation.action === "log_water" || pendingConfirmation.action === "log_drink" || pendingConfirmation.action === "log_activity" || pendingConfirmation.action === "request_web_search" || pendingConfirmation.action === "set_reminder") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: async ()=>{
                                                            if (pendingConfirmation.action === "request_web_search") {
                                                                const data = pendingConfirmation.data;
                                                                setPendingConfirmation(null);
                                                                setIsLoading(true);
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `🔍 **"${data.query}"** ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("için arama yapılıyor...")}`
                                                                        }
                                                                    ]);
                                                                try {
                                                                    const res = await fetch("/api/v1/chat", {
                                                                        method: "POST",
                                                                        headers: {
                                                                            "Content-Type": "application/json"
                                                                        },
                                                                        body: JSON.stringify({
                                                                            message: `Web araması sonuçlarını özetle: ${data.query}`,
                                                                            history: messages.filter((m)=>m.id !== "welcome").map((m)=>({
                                                                                    role: m.role,
                                                                                    content: m.content
                                                                                })),
                                                                            locale: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])(),
                                                                            executeSearch: true,
                                                                            searchQuery: data.query
                                                                        })
                                                                    });
                                                                    const responseData = await res.json();
                                                                    if (responseData.reply) {
                                                                        setMessages((prev)=>[
                                                                                ...prev,
                                                                                {
                                                                                    id: Date.now().toString(),
                                                                                    role: "list",
                                                                                    content: responseData.reply
                                                                                }
                                                                            ]);
                                                                    }
                                                                } catch  {
                                                                    setMessages((prev)=>[
                                                                            ...prev,
                                                                            {
                                                                                id: Date.now().toString(),
                                                                                role: "list",
                                                                                content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Arama sırasında bir hata oluştu.")
                                                                            }
                                                                        ]);
                                                                } finally{
                                                                    setIsLoading(false);
                                                                }
                                                            } else if (pendingConfirmation.action === "log_food") {
                                                                const data = pendingConfirmation.data;
                                                                await tracker.addFood({
                                                                    ...data,
                                                                    mealType: data.mealType || "snack"
                                                                });
                                                                setPendingConfirmation(null);
                                                                setEditingAmount(false);
                                                                setCustomAmount("");
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `✅ **${data.name}** (${data.amountG || 100}g) ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("günlüğe eklendi!")}`
                                                                        }
                                                                    ]);
                                                            } else if (pendingConfirmation.action === "log_drink") {
                                                                const data = pendingConfirmation.data;
                                                                await tracker.addDrink(data);
                                                                setPendingConfirmation(null);
                                                                setEditingAmount(false);
                                                                setCustomAmount("");
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `✅ **${data.name}** (${data.amountMl}ml) ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("günlüğe eklendi!")}`
                                                                        }
                                                                    ]);
                                                            } else if (pendingConfirmation.action === "log_water") {
                                                                const data = pendingConfirmation.data;
                                                                await tracker.addWater(data);
                                                                setPendingConfirmation(null);
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `✅ **${data.amountMl}ml ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Su")}** ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("günlüğe eklendi!")}`
                                                                        }
                                                                    ]);
                                                            } else if (pendingConfirmation.action === "log_activity") {
                                                                const data = pendingConfirmation.data;
                                                                await tracker.addActivity({
                                                                    ...data,
                                                                    activityType: data.activityType || "walking"
                                                                });
                                                                setPendingConfirmation(null);
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `✅ **${data.durationMin} dk ${data.activityType}** ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("günlüğe eklendi!")}`
                                                                        }
                                                                    ]);
                                                            } else if (pendingConfirmation.action === "set_reminder") {
                                                                const data = pendingConfirmation.data;
                                                                // TODO: Implement actual reminder functionality
                                                                setPendingConfirmation(null);
                                                                setMessages((prev)=>[
                                                                        ...prev,
                                                                        {
                                                                            id: Date.now().toString(),
                                                                            role: "list",
                                                                            content: `⏰ **${data.message}** - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Her")} ${data.intervalMin} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("dakikada hatırlatıcı kuruldu!")}`
                                                                        }
                                                                    ]);
                                                            }
                                                        },
                                                        className: `flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition-all active:scale-95 hover:scale-[1.02] ${pendingConfirmation.action === "request_web_search" ? "bg-blue-600 shadow-blue-200 hover:bg-blue-700" : pendingConfirmation.action === "set_reminder" ? "bg-pink-600 shadow-pink-200 hover:bg-pink-700" : "bg-emerald-600 shadow-emerald-200 hover:bg-emerald-700"}`,
                                                        children: pendingConfirmation.action === "request_web_search" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                    lineNumber: 1026,
                                                                    columnNumber: 55
                                                                }, this),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ara")
                                                            ]
                                                        }, void 0, true) : pendingConfirmation.action === "set_reminder" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                                                    className: "h-4 w-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                    lineNumber: 1028,
                                                                    columnNumber: 55
                                                                }, this),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kur")
                                                            ]
                                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "h-4 w-4 stroke-[3]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                                    lineNumber: 1030,
                                                                    columnNumber: 55
                                                                }, this),
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ekle")
                                                            ]
                                                        }, void 0, true)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                        lineNumber: 952,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 930,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 542,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 524,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollAnchorRef
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 1038,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 441,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-emerald-50 bg-white p-4",
                        children: [
                            voiceSupported && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-3 px-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: toggleVoiceListening,
                                                disabled: isLoading || isLimitReached,
                                                className: `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isVoiceListening ? "bg-red-100 text-red-600 hover:bg-red-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"} disabled:opacity-50 disabled:cursor-not-allowed`,
                                                title: isVoiceListening ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Dinlemeyi Durdur") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sesli Konuş"),
                                                children: isVoiceListening ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MicOff$3e$__["MicOff"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1060,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "animate-pulse",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Dinleniyor...")
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1061,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1065,
                                                            columnNumber: 49
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sesli")
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 1047,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: toggleAutoSpeak,
                                                disabled: isLoading || isLimitReached,
                                                className: `flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${autoSpeak ? "bg-blue-100 text-blue-600 hover:bg-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"} disabled:opacity-50 disabled:cursor-not-allowed`,
                                                title: autoSpeak ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Otomatik Konuşmayı Kapat") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Otomatik Konuşma"),
                                                children: isVoiceSpeaking ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                            className: "h-3.5 w-3.5 animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 49
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "animate-pulse",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Konuşuyor...")
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, void 0, true) : autoSpeak ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Volume2$3e$__["Volume2"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1089,
                                                            columnNumber: 49
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Açık")
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$volume$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__VolumeX$3e$__["VolumeX"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                            lineNumber: 1094,
                                                            columnNumber: 49
                                                        }, this),
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Kapalı")
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                                lineNumber: 1071,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 33
                                    }, this),
                                    voiceTranscript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-emerald-600 font-medium animate-pulse",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yazılıyor...")
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 1102,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 1045,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "relative flex items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: voiceTranscript || input,
                                        onChange: (e)=>setInput(e.target.value),
                                        placeholder: isLimitReached ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Limit doldu...") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bir şeyler sor..."),
                                        disabled: isLoading || isLimitReached,
                                        className: "w-full rounded-2xl border-0 bg-gray-50 pl-5 pr-12 py-4 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 transition-all outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isLoading || !input.trim() || isLimitReached,
                                        className: "absolute right-3 p-2 rounded-xl text-emerald-600 hover:bg-emerald-50 disabled:text-gray-300 disabled:hover:bg-transparent transition-all",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "h-5 w-5 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 1123,
                                            columnNumber: 46
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "h-5 w-5 stroke-[2.5px]"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                            lineNumber: 1123,
                                            columnNumber: 93
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 1109,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 1042,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                lineNumber: 418,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen(!open),
                className: `group flex h-14 w-14 items-center justify-center rounded-[1.5rem] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90 sm:h-16 sm:w-16 ${launcherClassName} ${open ? "bg-white text-emerald-700 border border-emerald-100" : "bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-200 hover:rotate-[360deg]"}`,
                children: [
                    open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-7 w-7"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 1137,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                        className: "h-8 w-8"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 1139,
                        columnNumber: 21
                    }, this),
                    !open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "absolute -right-1 -top-1 flex h-5 w-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 1145,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "relative inline-flex h-5 w-5 rounded-full bg-emerald-500 border-2 border-white"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                                lineNumber: 1146,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                        lineNumber: 1144,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
                lineNumber: 1131,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/features/chat/chat-assistant.tsx",
        lineNumber: 415,
        columnNumber: 9
    }, this);
}
}),
"[project]/apps/web/src/components/layout/command-palette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommandPalette",
    ()=>CommandPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/providers/tracker-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
function CommandPalette() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { addWater, theme, updateTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTracker"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const commands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                id: "nav-dashboard",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Paneli aç"),
                hint: "/dashboard",
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("panel dashboard home"),
                action: ()=>router.push("/dashboard")
            },
            {
                id: "nav-add",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Yeni kayıt ekle"),
                hint: "/add-entry",
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("ekle yeni entry"),
                action: ()=>router.push("/add-entry")
            },
            {
                id: "nav-profile",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Profil sayfası"),
                hint: "/profile",
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("profil kullanıcı"),
                action: ()=>router.push("/profile")
            },
            {
                id: "nav-settings",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Ayarları aç"),
                hint: "/settings",
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("ayarlar settings"),
                action: ()=>router.push("/settings")
            },
            {
                id: "nav-report",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("PDF raporu aç"),
                hint: "/report",
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("rapor pdf export"),
                action: ()=>router.push("/report")
            },
            {
                id: "water-250",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("250 ml su ekle"),
                hint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hızlı"),
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("su hızlı"),
                action: ()=>addWater({
                        amountMl: 250
                    })
            },
            {
                id: "water-500",
                label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("500 ml su ekle"),
                hint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hızlı"),
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("su hızlı"),
                action: ()=>addWater({
                        amountMl: 500
                    })
            },
            {
                id: "theme-toggle",
                label: theme.mode === "light" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Dim temayı aç") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Aydınlık temaya dön"),
                hint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Tema"),
                keywords: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("tema görünüm"),
                action: ()=>updateTheme({
                        mode: theme.mode === "light" ? "dim" : "light"
                    })
            }
        ], [
        addWater,
        router,
        theme.mode,
        updateTheme
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!query.trim()) {
            return commands;
        }
        const normalized = query.toLowerCase();
        return commands.filter((command)=>{
            const haystack = `${command.label} ${command.keywords ?? ""}`.toLowerCase();
            return haystack.includes(normalized);
        });
    }, [
        commands,
        query
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onKeyDown(event) {
            const isK = event.key.toLowerCase() === "k";
            if ((event.metaKey || event.ctrlKey) && isK) {
                event.preventDefault();
                setOpen((prev)=>{
                    const next = !prev;
                    if (next) {
                        setQuery("");
                        setSelectedIndex(0);
                    }
                    return next;
                });
                return;
            }
            if (!open) {
                return;
            }
            if (event.key === "Escape") {
                event.preventDefault();
                setOpen(false);
                return;
            }
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setSelectedIndex((prev)=>Math.min(prev + 1, filtered.length - 1));
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setSelectedIndex((prev)=>Math.max(prev - 1, 0));
            }
            if (event.key === "Enter") {
                event.preventDefault();
                const selected = filtered[selectedIndex];
                if (selected) {
                    selected.action();
                    setOpen(false);
                }
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        filtered,
        open,
        selectedIndex
    ]);
    if (!open) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-24",
        onClick: (event)=>{
            if (event.target === event.currentTarget) {
                setOpen(false);
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-xl rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-strong backdrop-blur",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-3 flex items-center justify-between text-xs text-muted",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Komut Paleti")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Esc ile kapat • Ctrl/Cmd + K")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                    lineNumber: 155,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: query,
                    onChange: (event)=>{
                        setQuery(event.target.value);
                        setSelectedIndex(0);
                    },
                    placeholder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Komut ara..."),
                    className: "w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200",
                    autoFocus: true
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-3 max-h-72 space-y-1 overflow-y-auto",
                    children: [
                        filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-dashed border-emerald-100 bg-emerald-50/60 px-3 py-4 text-center text-xs text-muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sonuç bulunamadı. Farklı bir kelime deneyin.")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                            lineNumber: 171,
                            columnNumber: 13
                        }, this),
                        filtered.map((command, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    command.action();
                                    setOpen(false);
                                },
                                className: `flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${index === selectedIndex ? "bg-emerald-100/70 text-emerald-900" : "hover:bg-emerald-50"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: command.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this),
                                    command.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-muted",
                                        children: command.hint
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                                        lineNumber: 189,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, command.id, true, {
                                fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
            lineNumber: 154,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/layout/command-palette.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Card({ children, className = "", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ...props,
        className: `app-card rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-soft transition-all ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/lib/features/profile.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultProfile",
    ()=>defaultProfile,
    "isProfileComplete",
    ()=>isProfileComplete,
    "loadProfile",
    ()=>loadProfile,
    "saveProfile",
    ()=>saveProfile
]);
const PROFILE_KEY = "calai.profile.v1";
const defaultProfile = {
    fullName: "",
    age: "",
    heightCm: "",
    weightKg: "",
    mainGoal: "",
    sportLevel: "",
    workoutDays: "",
    workoutPlace: "",
    equipmentLevel: "",
    injury: "",
    injuryDetail: "",
    doctorRestriction: "",
    referralSource: "",
    expectation: ""
};
function normalizeProfile(profile) {
    const goals = [
        "fat_burn",
        "muscle_gain",
        "fit_form",
        "conditioning",
        "healthy"
    ];
    const levels = [
        "beginner",
        "sometimes",
        "regular",
        "advanced"
    ];
    const workoutDays = [
        "1-2",
        "3-4",
        "5+"
    ];
    const places = [
        "home",
        "gym",
        "outdoor"
    ];
    const equipment = [
        "none",
        "basic",
        "full"
    ];
    const injuries = [
        "none",
        "knee",
        "back",
        "shoulder",
        "other"
    ];
    const doctorRestriction = [
        "no",
        "yes"
    ];
    const referrals = [
        "instagram",
        "tiktok",
        "youtube",
        "friend",
        "search",
        "other"
    ];
    return {
        fullName: typeof profile.fullName === "string" ? profile.fullName : "",
        age: typeof profile.age === "string" ? profile.age : "",
        heightCm: typeof profile.heightCm === "string" ? profile.heightCm : "",
        weightKg: typeof profile.weightKg === "string" ? profile.weightKg : "",
        mainGoal: goals.includes(profile.mainGoal) ? profile.mainGoal : "",
        sportLevel: levels.includes(profile.sportLevel) ? profile.sportLevel : "",
        workoutDays: workoutDays.includes(profile.workoutDays) ? profile.workoutDays : "",
        workoutPlace: places.includes(profile.workoutPlace) ? profile.workoutPlace : "",
        equipmentLevel: equipment.includes(profile.equipmentLevel) ? profile.equipmentLevel : "",
        injury: injuries.includes(profile.injury) ? profile.injury : "",
        injuryDetail: typeof profile.injuryDetail === "string" ? profile.injuryDetail : "",
        doctorRestriction: doctorRestriction.includes(profile.doctorRestriction) ? profile.doctorRestriction : "",
        referralSource: referrals.includes(profile.referralSource) ? profile.referralSource : "",
        expectation: typeof profile.expectation === "string" ? profile.expectation : ""
    };
}
function loadProfile() {
    if ("TURBOPACK compile-time truthy", 1) {
        return defaultProfile;
    }
    //TURBOPACK unreachable
    ;
}
function saveProfile(profile) {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function isProfileComplete(profile) {
    if (!profile.age.trim() || !profile.heightCm.trim() || !profile.weightKg.trim() || !profile.mainGoal || !profile.sportLevel || !profile.workoutDays || !profile.workoutPlace || !profile.equipmentLevel || !profile.injury || !profile.doctorRestriction || !profile.referralSource || !profile.expectation.trim()) {
        return false;
    }
    if (profile.injury === "other" && !profile.injuryDetail.trim()) {
        return false;
    }
    return true;
}
}),
"[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OnboardingModal",
    ()=>OnboardingModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/hooks/use-user.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/features/profile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
;
;
const steps = [
    {
        id: 1,
        label: "Merhaba!"
    },
    {
        id: 2,
        label: "Seni tanıyalım"
    },
    {
        id: 3,
        label: "Hedefini seç"
    },
    {
        id: 4,
        label: "Spor geçmişin"
    },
    {
        id: 5,
        label: "Koşulların"
    },
    {
        id: 6,
        label: "Sağlık & güvenlik"
    },
    {
        id: 7,
        label: "Bizi nereden duydun"
    },
    {
        id: 8,
        label: "Beklentin"
    }
];
const questions = [
    {
        id: "fullName",
        step: 1,
        title: "Merhaba! 👋",
        subtitle: "Seni tanımaktan mutluluk duyarız",
        prompt: "Adın ve soyadın nedir?",
        type: "text",
        placeholder: "Örn: Ahmet Yılmaz",
        required: true,
        hint: "Sana isminle hitap etmek isteriz."
    },
    {
        id: "age",
        step: 2,
        title: "Seni tanıyalım",
        subtitle: "Temel ölçüleri öğrenelim",
        prompt: "Yaşın kaç?",
        type: "number",
        placeholder: "Örn: 26",
        required: true
    },
    {
        id: "heightCm",
        step: 2,
        title: "Seni tanıyalım",
        subtitle: "Temel ölçüleri öğrenelim",
        prompt: "Boyun kaç cm?",
        type: "number",
        placeholder: "Örn: 175",
        required: true
    },
    {
        id: "weightKg",
        step: 2,
        title: "Seni tanıyalım",
        subtitle: "Temel ölçüleri öğrenelim",
        prompt: "Kilon kaç kg?",
        type: "number",
        placeholder: "Örn: 70",
        required: true
    },
    {
        id: "mainGoal",
        step: 3,
        title: "Hedefini seç",
        subtitle: "Ana odağını belirle",
        prompt: "Ana hedefin ne?",
        type: "single",
        required: true,
        options: [
            {
                value: "fat_burn",
                label: "Yağ yakmak"
            },
            {
                value: "muscle_gain",
                label: "Kas kazanmak"
            },
            {
                value: "fit_form",
                label: "Fit & form kalmak"
            },
            {
                value: "conditioning",
                label: "Kondisyon artırmak"
            },
            {
                value: "healthy",
                label: "Sağlıklı yaşamak"
            }
        ]
    },
    {
        id: "sportLevel",
        step: 4,
        title: "Spor geçmişin",
        subtitle: "Deneyimini öğrenelim",
        prompt: "Spor seviyeni nasıl tanımlarsın?",
        type: "single",
        required: true,
        options: [
            {
                value: "beginner",
                label: "Yeni başlıyorum"
            },
            {
                value: "sometimes",
                label: "Ara sıra yapıyorum"
            },
            {
                value: "regular",
                label: "Düzenli yapıyorum"
            },
            {
                value: "advanced",
                label: "İleri seviye"
            }
        ]
    },
    {
        id: "workoutDays",
        step: 4,
        title: "Spor geçmişin",
        subtitle: "Rutini netleştirelim",
        prompt: "Haftada kaç gün spor yapabilirsin?",
        type: "single",
        required: true,
        options: [
            {
                value: "1-2",
                label: "1–2 gün"
            },
            {
                value: "3-4",
                label: "3–4 gün"
            },
            {
                value: "5+",
                label: "5+ gün"
            }
        ]
    },
    {
        id: "workoutPlace",
        step: 5,
        title: "Koşulların",
        subtitle: "Antrenman ortamı",
        prompt: "Nerede spor yapacaksın?",
        type: "single",
        required: true,
        options: [
            {
                value: "home",
                label: "Ev"
            },
            {
                value: "gym",
                label: "Spor salonu"
            },
            {
                value: "outdoor",
                label: "Açık alan"
            }
        ]
    },
    {
        id: "equipmentLevel",
        step: 5,
        title: "Koşulların",
        subtitle: "Ekipman durumu",
        prompt: "Ekipman durumun nedir?",
        type: "single",
        required: true,
        options: [
            {
                value: "none",
                label: "Ekipman yok"
            },
            {
                value: "basic",
                label: "Temel ekipman (dumbbell vb.)"
            },
            {
                value: "full",
                label: "Tam ekipman"
            }
        ]
    },
    {
        id: "injury",
        step: 6,
        title: "Sağlık & güvenlik",
        subtitle: "Sakatlık bilgisi",
        prompt: "Bilinen bir sakatlığın var mı?",
        type: "single",
        required: true,
        options: [
            {
                value: "none",
                label: "Yok"
            },
            {
                value: "knee",
                label: "Diz"
            },
            {
                value: "back",
                label: "Bel"
            },
            {
                value: "shoulder",
                label: "Omuz"
            },
            {
                value: "other",
                label: "Diğer (yaz)"
            }
        ]
    },
    {
        id: "doctorRestriction",
        step: 6,
        title: "Sağlık & güvenlik",
        subtitle: "Güvenlik bilgisi",
        prompt: "Doktorun sporla ilgili bir kısıt koydu mu?",
        type: "single",
        required: true,
        options: [
            {
                value: "no",
                label: "Hayır"
            },
            {
                value: "yes",
                label: "Evet"
            }
        ]
    },
    {
        id: "referralSource",
        step: 7,
        title: "Bizi nereden duydun?",
        subtitle: "Tek soru, altın değerinde",
        prompt: "Uygulamamızı nereden duydun?",
        type: "single",
        required: true,
        options: [
            {
                value: "instagram",
                label: "Instagram"
            },
            {
                value: "tiktok",
                label: "TikTok"
            },
            {
                value: "youtube",
                label: "YouTube"
            },
            {
                value: "friend",
                label: "Arkadaş tavsiyesi"
            },
            {
                value: "search",
                label: "Google / App Store"
            },
            {
                value: "other",
                label: "Diğer"
            }
        ]
    },
    {
        id: "expectation",
        step: 8,
        title: "Beklentin",
        subtitle: "Seni tanımamıza yardımcı olur",
        prompt: "Bu uygulamadan en büyük beklentin ne?",
        type: "text",
        placeholder: "Kısa not...",
        required: true
    }
];
function getInitialIndex(profile) {
    const index = questions.findIndex((question)=>{
        const value = profile[question.id];
        if (typeof value !== "string" || value.trim().length === 0) {
            return true;
        }
        if (question.id === "injury" && profile.injury === "other") {
            return profile.injuryDetail.trim().length === 0;
        }
        return false;
    });
    return index === -1 ? 0 : index;
}
function getProgressValue(currentIndex) {
    return Math.round((currentIndex + 1) / questions.length * 100);
}
function OnboardingModal({ isOpen, onComplete }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadProfile"])());
    const [questionIndex, setQuestionIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>getInitialIndex(profile));
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [saveNotice, setSaveNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const isRemote = Boolean(user?.sub);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            return;
        }
        let active = true;
        const load = async ()=>{
            if (isRemote) {
                try {
                    const res = await fetch("/api/v1/profile", {
                        credentials: "include"
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (active) {
                            setProfile(data);
                            setQuestionIndex(getInitialIndex(data));
                            setError(null);
                        }
                        return;
                    }
                } catch  {
                // fall back to local
                }
            }
            const freshProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadProfile"])();
            if (active) {
                setProfile(freshProfile);
                setQuestionIndex(getInitialIndex(freshProfile));
                setError(null);
            }
        };
        void load();
        return ()=>{
            active = false;
        };
    }, [
        isOpen,
        isRemote
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) {
            return;
        }
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return ()=>{
            document.body.style.overflow = previousOverflow;
        };
    }, [
        isOpen
    ]);
    if (!isOpen) {
        return null;
    }
    const question = questions[questionIndex];
    const progress = getProgressValue(questionIndex);
    const step = steps.find((item)=>item.id === question.step);
    const answer = profile[question.id] ?? "";
    const isAnswerMissing = question.required && (typeof answer !== "string" || answer.trim().length === 0);
    const needsOtherDetail = question.id === "injury" && profile.injury === "other";
    const hasOtherDetail = profile.injuryDetail.trim().length > 0;
    function updateProfile(key, value) {
        setProfile((prev)=>({
                ...prev,
                [key]: value
            }));
        setError(null);
        setSaveNotice(null);
    }
    async function persistProfile(nextProfile) {
        if (!isRemote) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveProfile"])(nextProfile);
            return true;
        }
        try {
            const res = await fetch("/api/v1/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(nextProfile)
            });
            if (res.ok) {
                setSaveNotice(null);
                return true;
            }
        } catch  {
        // fall through to local save
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["saveProfile"])(nextProfile);
        setSaveNotice((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Buluta kaydedilemedi, cihazına kaydedildi."));
        return true;
    }
    async function goNext() {
        if (isAnswerMissing) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Lütfen bu soruyu yanıtla."));
            return;
        }
        if (needsOtherDetail && !hasOtherDetail) {
            setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Lütfen sakatlık detayını yaz."));
            return;
        }
        const nextProfile = {
            ...profile
        };
        const saved = await persistProfile(nextProfile);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        const nextIndex = questionIndex + 1;
        if (nextIndex >= questions.length) {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProfileComplete"])(nextProfile)) {
                setError((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Lütfen tüm soruları yanıtla."));
                return;
            }
            router.replace("/dashboard");
            onComplete?.();
            return;
        }
        setQuestionIndex(nextIndex);
    }
    function goBack() {
        if (questionIndex === 0) {
            return;
        }
        setQuestionIndex((prev)=>Math.max(prev - 1, 0));
        setError(null);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8",
        role: "dialog",
        "aria-modal": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
            className: "w-full max-w-2xl max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto rounded-3xl border border-emerald-100 bg-white/95 p-4 shadow-strong sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.2em] text-muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Onboarding")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between text-[11px] text-muted",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(step?.label ?? "Seni tanıyalım")
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: [
                                        questionIndex + 1,
                                        "/",
                                        questions.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-2 rounded-full bg-emerald-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 rounded-full bg-accent",
                                style: {
                                    width: `${progress}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 394,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 386,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs uppercase tracking-[0.2em] text-muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.title)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-ink",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.prompt)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 401,
                            columnNumber: 11
                        }, this),
                        question.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.subtitle)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 402,
                            columnNumber: 33
                        }, this),
                        question.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.hint)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 403,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, this),
                question.type === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: String(answer),
                    onChange: (event)=>updateProfile(question.id, event.target.value),
                    className: "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200",
                    placeholder: question.placeholder ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.placeholder) : undefined,
                    inputMode: "numeric"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 407,
                    columnNumber: 11
                }, this),
                question.type === "text" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    value: String(answer),
                    onChange: (event)=>updateProfile(question.id, event.target.value),
                    className: "min-h-[120px] w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200",
                    placeholder: question.placeholder ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(question.placeholder) : undefined
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 417,
                    columnNumber: 11
                }, this),
                question.type === "single" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-2 sm:grid-cols-2",
                    children: question.options?.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>updateProfile(question.id, option.value),
                            className: `rounded-2xl border px-4 py-3 text-left text-sm transition ${answer === option.value ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-emerald-100 bg-white text-muted hover:text-ink"}`,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(option.label)
                        }, option.value, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 428,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 426,
                    columnNumber: 11
                }, this),
                question.id === "injury" && profile.injury === "other" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    value: profile.injuryDetail,
                    onChange: (event)=>updateProfile("injuryDetail", event.target.value),
                    className: "w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200",
                    placeholder: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sakatlık detayını yaz")
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 443,
                    columnNumber: 11
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-red-600",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 451,
                    columnNumber: 19
                }, this),
                !error && saveNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted",
                    children: saveNotice
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 452,
                    columnNumber: 34
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goBack,
                            className: "rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm text-muted hover:text-ink",
                            disabled: questionIndex === 0,
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Geri")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 455,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: goNext,
                            className: "rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong",
                            children: questionIndex === questions.length - 1 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bitir") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("İleri")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 462,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 454,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap gap-2 text-[11px] text-muted",
                    children: steps.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `rounded-full px-3 py-1 ${item.id === question.step ? "bg-emerald-100 text-emerald-700" : "bg-white/80 text-muted"}`,
                            children: [
                                item.id,
                                ". ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(item.label)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                            lineNumber: 472,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
                    lineNumber: 470,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
            lineNumber: 385,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx",
        lineNumber: 380,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/features/reminders/reminder-scheduler.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReminderScheduler",
    ()=>ReminderScheduler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/providers/tracker-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/utils.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/shared/src/utils/index.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
function ReminderScheduler() {
    const { reminder, updateReminder, dailySummary, goals } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTracker"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!reminder.enabled) {
            return;
        }
        if (typeof Notification === "undefined") {
            return;
        }
        if (Notification.permission !== "granted") {
            return;
        }
        const checkReminder = ()=>{
            const now = new Date();
            const [hour, minute] = reminder.time.split(":").map((value)=>Number(value));
            if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
                return;
            }
            if (now.getHours() !== hour || now.getMinutes() !== minute) {
                return;
            }
            const todayKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$shared$2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDayKey"])(now);
            if (reminder.lastNotifiedDay === todayKey) {
                return;
            }
            const waterLeft = Math.max(goals.waterGoalMl - dailySummary.waterMl, 0);
            const netCalories = dailySummary.caloriesIn - dailySummary.caloriesOut;
            const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Net: {net} kcal • Su: {water} ml kaldı", {
                net: netCalories,
                water: Math.round(waterLeft)
            });
            new Notification((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Cal AI Hatırlatma"), {
                body
            });
            updateReminder({
                lastNotifiedDay: todayKey
            });
        };
        checkReminder();
        const interval = window.setInterval(checkReminder, 60000);
        return ()=>window.clearInterval(interval);
    }, [
        dailySummary.caloriesIn,
        dailySummary.caloriesOut,
        dailySummary.waterMl,
        goals.waterGoalMl,
        reminder.enabled,
        reminder.lastNotifiedDay,
        reminder.time,
        updateReminder
    ]);
    return null;
}
}),
"[project]/apps/web/src/components/layout/app-shell.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppShell",
    ()=>AppShell
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/hooks/use-user.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$chat$2f$chat$2d$assistant$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/features/chat/chat-assistant.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$command$2d$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/layout/command-palette.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$onboarding$2f$onboarding$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/features/onboarding/onboarding-modal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$reminders$2f$reminder$2d$scheduler$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/features/reminders/reminder-scheduler.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/features/profile.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
function AppShell({ children }) {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { user, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$hooks$2f$use$2d$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const [showOnboarding, setShowOnboarding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAppMode, setIsAppMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSplash, setShowSplash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatOpen, setChatOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPremium, setIsPremium] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [logoutHref, setLogoutHref] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("/auth/logout");
    const hideShell = pathname === "/" || pathname.startsWith("/auth") || pathname.startsWith("/share") || pathname.startsWith("/login") || pathname.startsWith("/pricing") || pathname.startsWith("/help") || pathname.startsWith("/faq") || pathname.startsWith("/contact") || pathname.startsWith("/legal");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hideShell) {
            return;
        }
        if (isLoading || !user) {
            setShowOnboarding(false);
            return;
        }
        if (pathname.startsWith("/auth") || pathname.startsWith("/onboarding")) {
            setShowOnboarding(false);
            return;
        }
        let active = true;
        const check = async ()=>{
            try {
                const res = await fetch("/api/v1/profile", {
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    if (active) {
                        setShowOnboarding(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProfileComplete"])(data));
                    }
                    return;
                }
            } catch  {
            // fall back to local
            }
            const profile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadProfile"])();
            if (active) {
                setShowOnboarding(!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$features$2f$profile$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProfileComplete"])(profile));
            }
        };
        void check();
        return ()=>{
            active = false;
        };
    }, [
        hideShell,
        isLoading,
        pathname,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setChatOpen(false);
    }, [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
        const origin = undefined;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!user?.sub || hideShell) {
            setIsPremium(false);
            return;
        }
        let active = true;
        const loadPlan = async ()=>{
            try {
                const res = await fetch("/api/v1/user", {
                    credentials: "include"
                });
                if (!res.ok) {
                    return;
                }
                const data = await res.json();
                if (active) {
                    setIsPremium(Boolean(data?.isPremium));
                }
            } catch  {
                if (active) {
                    setIsPremium(false);
                }
            }
        };
        void loadPlan();
        return ()=>{
            active = false;
        };
    }, [
        hideShell,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hideShell) {
            return;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        //TURBOPACK unreachable
        ;
        const media = undefined;
        const applyMode = undefined;
        const triggerSplash = undefined;
        const detectStandalone = undefined;
        const initial = undefined;
        const handleChange = undefined;
    }, [
        hideShell
    ]);
    // Landing Page ve paylaşım ekranlarında AppShell UI'ını gösterme
    if (hideShell) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-root min-h-screen bg-[#f7fffb] text-ink",
        children: [
            isAppMode && showSplash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "app-splash",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "app-splash-card",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "app-splash-orb"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 172,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "app-splash-title",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Calmet")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "app-splash-sub",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Sağlıklı Yaşam")
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                    lineNumber: 171,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$reminders$2f$reminder$2d$scheduler$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReminderScheduler"], {}, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-40 border-b border-emerald-100/70 bg-white/80 backdrop-blur-md px-4 py-3 sm:px-8 print-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto flex max-w-6xl items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "flex items-center gap-2 transition-transform hover:scale-[1.02]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-2xl font-black tracking-tighter text-gray-900",
                                children: [
                                    "Cal",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-500",
                                        children: "met"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 186,
                                        columnNumber: 18
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-6",
                            children: [
                                !isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/pricing",
                                    className: "rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition-all flex items-center gap-2 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden xs:inline",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Paketler")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                    lineNumber: 193,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-6 w-[1px] bg-gray-200 hidden sm:block"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                    lineNumber: 202,
                                    columnNumber: 13
                                }, this),
                                user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden flex-col items-end sm:flex leading-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-gray-900 mb-1",
                                                    children: user.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-medium text-emerald-600 uppercase tracking-tighter",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Hesabım")
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/profile",
                                            className: "group relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-lg ring-1 ring-emerald-50 transition-all group-hover:scale-110",
                                                    children: user.picture ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: user.picture,
                                                        alt: user.name || "User",
                                                        width: 56,
                                                        height: 56,
                                                        className: "h-full w-full object-cover",
                                                        unoptimized: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold",
                                                        children: user.name?.charAt(0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                    lineNumber: 230,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: logoutHref,
                                            className: "hidden sm:flex ml-2 h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm",
                                            title: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Çıkış"),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                            lineNumber: 233,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 191,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 181,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "app-shell mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-900/70 shadow-soft print-hidden flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-700",
                                children: "!"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("Bu platform yalnızca takip ve farkındalık amaçlıdır. Tıbbi, diyetetik veya sağlık tavsiyesi sunmaz.")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "app-main flex-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "app-page",
                            children: children
                        }, pathname, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "app-nav fixed bottom-6 left-1/2 z-20 w-[min(90vw,380px)] -translate-x-1/2 rounded-[1.75rem] border border-emerald-100/60 bg-white/85 px-3 pb-2.5 pt-6 shadow-[0_18px_40px_rgba(16,185,129,0.18)] backdrop-blur-lg print-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex items-center justify-between",
                    children: [
                        [
                            {
                                href: "/dashboard",
                                label: "Panel",
                                icon: "⌂"
                            },
                            {
                                href: "/add-entry",
                                label: "Ekle",
                                icon: "+"
                            }
                        ].map((item)=>{
                            const active = pathname === item.href && !chatOpen;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: `flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition-all ${active ? "bg-emerald-600 text-white shadow-md scale-105" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl leading-none",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(item.label)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                lineNumber: 269,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setChatOpen((prev)=>!prev),
                            "aria-label": (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])("AI"),
                            className: `absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-all ${chatOpen ? "bg-emerald-600 shadow-emerald-300" : "bg-emerald-700 shadow-emerald-200 hover:bg-emerald-800"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 24 24",
                                "aria-hidden": "true",
                                className: "h-6 w-6 fill-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M9.5 3a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2h-5Z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 8.5A3.5 3.5 0 0 1 9.5 5h5A3.5 3.5 0 0 1 18 8.5v6A3.5 3.5 0 0 1 14.5 18h-5A3.5 3.5 0 0 1 6 14.5v-6Zm3.5 1.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Zm5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5ZM10 14a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2h-4Z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M4 11a1 1 0 0 0 0 2h1v-2H4Zm15 0v2h1a1 1 0 1 0 0-2h-1Z"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 283,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-14",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this),
                        [
                            {
                                href: "/profile",
                                label: "Profil",
                                icon: "◍"
                            },
                            {
                                href: "/settings",
                                label: "Ayar",
                                icon: "⚙"
                            }
                        ].map((item)=>{
                            const active = pathname === item.href && !chatOpen;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: item.href,
                                className: `flex w-14 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition-all ${active ? "bg-emerald-600 text-white shadow-md scale-105" : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xl leading-none",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                        lineNumber: 315,
                                        columnNumber: 17
                                    }, this),
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["t"])(item.label)
                                ]
                            }, item.href, true, {
                                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                                lineNumber: 307,
                                columnNumber: 15
                            }, this);
                        })
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                    lineNumber: 262,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 261,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$command$2d$palette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CommandPalette"], {}, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$onboarding$2f$onboarding$2d$modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OnboardingModal"], {
                isOpen: showOnboarding,
                onComplete: ()=>setShowOnboarding(false)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this),
            user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$features$2f$chat$2f$chat$2d$assistant$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ChatAssistant"], {
                isOpen: chatOpen,
                onToggle: setChatOpen,
                launcherClassName: "hidden sm:flex"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
                lineNumber: 325,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/layout/app-shell.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
}),
"[project]/apps/web/src/components/providers/locale-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LocaleProvider",
    ()=>LocaleProvider,
    "useLocaleValue",
    ()=>useLocaleValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/i18n.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/core/locale.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function useLocaleValue() {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeLocale"])(()=>{
            setLocaleState((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])());
        });
    }, []);
    return locale;
}
function LocaleProvider({ children, initialLocale }) {
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialLocale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["syncActiveLocale"])(locale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fromCookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readLocaleCookie"])(document.cookie);
        const stored = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_STORAGE_KEY"]);
        if (!stored && fromCookie) {
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$locale$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCALE_STORAGE_KEY"], fromCookie);
        } else if (stored && stored !== fromCookie) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setLocale"])(stored);
            setLocaleState((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])());
            return;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["applyLocaleToDocument"])(initialLocale);
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadLocale"])(initialLocale);
    }, [
        initialLocale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["syncActiveLocale"])(locale);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["applyLocaleToDocument"])(locale);
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["loadLocale"])(locale);
    }, [
        locale
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["subscribeLocale"])(()=>{
            const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getLocale"])();
            setLocaleState(next);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$core$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["syncActiveLocale"])(next);
        });
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/apps/web/src/components/providers/app-providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$providers$2f$auth0$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/client/providers/auth0-provider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/providers/tracker-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$app$2d$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/layout/app-shell.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$locale$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/providers/locale-provider.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AppProviders({ children, initialLocale }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$client$2f$providers$2f$auth0$2d$provider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Auth0Provider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$locale$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocaleProvider"], {
            initialLocale: initialLocale,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$providers$2f$tracker$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TrackerProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$layout$2f$app$2d$shell$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppShell"], {
                    children: children
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/providers/app-providers.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/providers/app-providers.tsx",
                lineNumber: 19,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/providers/app-providers.tsx",
            lineNumber: 18,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/providers/app-providers.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9eac3bbf._.js.map