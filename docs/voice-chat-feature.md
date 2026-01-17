# 🎤 Sesli Konuşma Özelliği

## Genel Bakış

Calmet AI chatbot'una **sesli konuşma** özelliği eklendi. Kullanıcılar artık AI koçuyla hem yazarak hem de sesli olarak iletişim kurabilir.

## Kullanılan Teknolojiler

### ✅ Ücretsiz & Ticari Kullanım İçin Güvenli

**Web Speech API** kullanılmaktadır - tamamen ücretsiz, tarayıcı native, ticari kullanım için lisans gerektirmez.

#### 1. Speech Recognition (Konuşmayı Metne Çevirme)
- **API**: Web Speech API - SpeechRecognition
- **Maliyet**: Ücretsiz
- **Lisans**: Tarayıcı native, ticari kullanım serbest
- **Desteklenen Tarayıcılar**: Chrome, Edge, Safari (iOS 14.5+)
- **Diller**: Türkçe (tr-TR), İngilizce (en-US) ve 100+ dil

#### 2. Speech Synthesis (Metni Sese Çevirme)
- **API**: Web Speech API - SpeechSynthesis
- **Maliyet**: Ücretsiz
- **Lisans**: Tarayıcı native, ticari kullanım serbest
- **Desteklenen Tarayıcılar**: Tüm modern tarayıcılar
- **Sesler**: Sistem sesleri (Türkçe kadın/erkek sesler mevcut)

## Özellikler

### 🎙️ Sesli Giriş (Speech-to-Text)
- Mikrofon butonu ile sesli komut verme
- Gerçek zamanlı transkripsiyon
- Türkçe ve İngilizce dil desteği
- Otomatik dil algılama (kullanıcı locale'ine göre)
- Sürekli dinleme modu (continuous recognition)
- Ara sonuçlar gösterimi (interim results)

### 🔊 Sesli Yanıt (Text-to-Speech)
- AI yanıtlarının otomatik sesli okunması
- Açma/kapama toggle butonu
- Türkçe ses desteği
- Hız, ton ve ses seviyesi ayarlanabilir
- Markdown formatını temizleyerek okuma

### 🎨 Kullanıcı Arayüzü
- **Sesli Konuş Butonu**: Mikrofon ikonu ile sesli giriş
- **Otomatik Konuşma Butonu**: AI yanıtlarını sesli dinleme
- **Durum Göstergeleri**: 
  - "Dinleniyor..." animasyonu
  - "Konuşuyor..." animasyonu
  - "Yazılıyor..." gerçek zamanlı transkripsiyon
- **Renkli Göstergeler**:
  - Yeşil: Sesli giriş aktif
  - Kırmızı: Dinleme durduruluyor
  - Mavi: Otomatik konuşma aktif

## Teknik Detaylar

### Dosya Yapısı

```
src/lib/features/voice/
└── voice-chat.ts          # Sesli konuşma yönetim sınıfları

src/components/features/chat/
└── chat-assistant.tsx     # Chatbot bileşeni (sesli özellikler eklendi)

src/locales/
└── tr.json               # Türkçe çeviriler
```

### Sınıflar

#### `VoiceChatRecognition`
Konuşma tanıma yönetimi:
```typescript
const recognition = new VoiceChatRecognition("tr-TR");

recognition.onTranscript((transcript, isFinal) => {
  console.log("Transkript:", transcript);
  if (isFinal) {
    // Kullanıcı konuşmayı bitirdi
  }
});

recognition.start(); // Dinlemeye başla
recognition.stop();  // Dinlemeyi durdur
```

#### `VoiceChatSynthesis`
Metin okuma yönetimi:
```typescript
const synthesis = new VoiceChatSynthesis();

synthesis.speak("Merhaba, nasıl yardımcı olabilirim?", {
  lang: "tr-TR",
  rate: 1.0,    // Hız (0.1 - 10)
  pitch: 1.0,   // Ton (0 - 2)
  volume: 1.0   // Ses seviyesi (0 - 1)
});

synthesis.stop(); // Konuşmayı durdur
```

### Tarayıcı Desteği

| Tarayıcı | Speech Recognition | Speech Synthesis |
|----------|-------------------|------------------|
| Chrome   | ✅ Tam destek     | ✅ Tam destek    |
| Edge     | ✅ Tam destek     | ✅ Tam destek    |
| Safari   | ✅ iOS 14.5+      | ✅ Tam destek    |
| Firefox  | ❌ Desteklenmez   | ✅ Tam destek    |
| Opera    | ✅ Tam destek     | ✅ Tam destek    |

**Not**: Firefox'ta Speech Recognition desteklenmediği için özellik otomatik olarak gizlenir.

### Güvenlik & Gizlilik

- **Mikrofon İzni**: Kullanıcıdan açık izin istenir
- **Veri Gizliliği**: Ses verileri tarayıcıda işlenir, sunucuya gönderilmez
- **HTTPS Gereksinimi**: Mikrofon erişimi için HTTPS zorunludur
- **Kullanıcı Kontrolü**: Kullanıcı istediği zaman dinlemeyi durdurabilir

## Kullanım Senaryoları

### 1. Eller Serbest Kullanım
Kullanıcı spor yaparken veya yemek hazırlarken sesli komutlarla kayıt ekleyebilir:
```
Kullanıcı: "Bugün 500 kalori tavuk göğsü yedim"
AI: "500 kalori tavuk göğsü günlüğe eklendi!"
```

### 2. Hızlı Sorgular
Yazı yazmadan hızlı sorular sorabilir:
```
Kullanıcı: "Bugün kaç kalori aldım?"
AI: "Bugün toplam 1850 kalori aldınız. Hedefinize 350 kalori kaldı."
```

### 3. Erişilebilirlik
Görme engelli kullanıcılar için tam sesli deneyim:
- Sesli komutlarla tüm işlemler
- AI yanıtlarını sesli dinleme
- Ekran okuyucu desteği

## Premium Özellik Olarak Kullanım

Sesli konuşma özelliği premium paketlere eklenebilir:

### Ücretsiz Plan
- ❌ Sesli konuşma yok

### Pro Plan (₺49.99/ay)
- ✅ Sesli giriş (Speech-to-Text)
- ✅ Günlük 50 sesli komut limiti

### AI Plus Plan (₺149.99/ay)
- ✅ Sınırsız sesli giriş
- ✅ Otomatik sesli yanıt (Text-to-Speech)
- ✅ Gelişmiş ses tanıma (daha yüksek doğruluk)
- ✅ Özel ses profilleri

### Premium Kontrolü Ekleme

```typescript
// src/components/features/chat/chat-assistant.tsx içinde

const { user } = useUser();
const [userPlan, setUserPlan] = useState<string>("free");

// Plan kontrolü
useEffect(() => {
  async function fetchPlan() {
    const res = await fetch("/api/v1/user");
    const data = await res.json();
    setUserPlan(data.plan || "free");
  }
  if (user) fetchPlan();
}, [user]);

// Sesli özellik kontrolü
const canUseVoice = userPlan !== "free";
const canUseAutoSpeak = userPlan === "ai_plus";

// UI'da göster/gizle
{canUseVoice && voiceSupported && (
  <button onClick={toggleVoiceListening}>
    {/* Sesli konuş butonu */}
  </button>
)}
```

## Alternatif Çözümler (Gelecek İçin)

### 1. OpenAI Whisper API
- **Maliyet**: $0.006 / dakika
- **Avantaj**: Daha yüksek doğruluk, 99 dil desteği
- **Dezavantaj**: Ücretli, API key gerekli

### 2. Groq Whisper API
- **Maliyet**: Ücretsiz tier mevcut
- **Avantaj**: Çok hızlı, zaten Groq kullanıyorsunuz
- **Dezavantaj**: Rate limit var

### 3. Google Cloud Speech-to-Text
- **Maliyet**: İlk 60 dakika ücretsiz, sonra $0.006/15 saniye
- **Avantaj**: Yüksek doğruluk, 125+ dil
- **Dezavantaj**: Ücretli, karmaşık setup

### 4. Azure Speech Services
- **Maliyet**: İlk 5 saat ücretsiz, sonra $1/saat
- **Avantaj**: Türkçe için optimize edilmiş
- **Dezavantaj**: Ücretli, Microsoft hesabı gerekli

## Performans Optimizasyonu

### 1. Lazy Loading
```typescript
// Sadece gerektiğinde yükle
const recognition = useMemo(() => {
  if (!open || !voiceSupported) return null;
  return new VoiceChatRecognition(locale);
}, [open, voiceSupported, locale]);
```

### 2. Debouncing
```typescript
// Çok sık transkript güncellemelerini engelle
const debouncedTranscript = useMemo(
  () => debounce((text) => setInput(text), 300),
  []
);
```

### 3. Memory Management
```typescript
// Component unmount olduğunda temizle
useEffect(() => {
  return () => {
    recognitionRef.current?.abort();
    synthesisRef.current?.stop();
  };
}, []);
```

## Test Senaryoları

### Manuel Test
1. Chatbot'u aç
2. Mikrofon butonuna tıkla
3. "Bugün 200 gram tavuk göğsü yedim" de
4. Transkriptin input'a yazıldığını kontrol et
5. Enter'a bas ve AI yanıtını bekle
6. Otomatik konuşma butonunu aç
7. AI yanıtının sesli okunduğunu kontrol et

### Tarayıcı Uyumluluk Testi
- Chrome: ✅ Tam çalışmalı
- Safari: ✅ iOS 14.5+ çalışmalı
- Firefox: ⚠️ Sesli giriş butonu gizlenmeli
- Edge: ✅ Tam çalışmalı

### Hata Senaryoları
- Mikrofon izni reddedilirse: Hata mesajı göster
- Ağ bağlantısı kesilirse: Graceful fallback
- Ses algılanamadıysa: "Ses algılanamadı" mesajı

## Sonuç

✅ **Tamamen ücretsiz** ve ticari kullanım için güvenli
✅ **Kolay entegrasyon** - sadece Web Speech API
✅ **Tarayıcı native** - ekstra dependency yok
✅ **Gizlilik dostu** - veriler tarayıcıda kalır
✅ **Premium özellik** olarak sunulabilir

Sesli konuşma özelliği, Calmet AI'ı daha erişilebilir ve kullanıcı dostu hale getiriyor! 🎉
