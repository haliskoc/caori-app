# 📦 DOCKER REHBERİ (En Temel Seviye)

Bu rehber, Docker'ı hiç bilmeyen birinin uygulamayı güvenle çalıştırması için hazırlandı. Docker sayesinde projen bir "koruma kalkanı" içinde çalışır.

---

## 🚀 En Temel 3 Komut (Ezberle/Kopyala)

Uygulamayı çalıştırmak için terminale şu komutları yazman yeterli:

### 1. Her şeyi Başlat
Uygulamayı ilk kez açarken veya bir şeyler değiştiğinde kullan:
```bash
docker compose up --build
```
*(Bu komut: Kodları kutular, hazırlar ve yayına alır. http://localhost:3000 adresine girince siteyi görürsün.)*

### 2. Sadece Çalıştır
Zaten her şey hazırsa, hızlıca başlatmak için:
```bash
docker compose up
```

### 3. Kapat ve Durdur
İşin bittiğinde her şeyi temizce kapatmak için:
```bash
docker compose down
```

---

## 🛡️ "Sorun Çıktı, Ne Yapmalıyım?"

Eğer site açılmıyorsa veya garip hatalar alıyorsan şu adımları takip et:

1. **Terminalde `Ctrl + C` yap:** Bu uygulamayı durdurmaya çalışır.
2. **`docker compose down` yaz:** Her şeyi tamamen sıfırlar ve kapatır.
3. **`docker compose up --build` yaz:** Uygulamayı tertemiz, en baştan kurar.

---

## 💡 Bilmen Gereken "Aptal" Kuralları

*   **Liman (Port):** Bu uygulama her zaman **3000** numaralı limanda çalışır. Chrome'a `localhost:3000` yazınca açılır.
*   **Gizli Ayarlar:** Şifrelerin ve veritabanı bağlantıların `.env.local` dosyasındadır. Docker bu dosyayı otomatik okur.
*   **Güvenlik:** Docker bir kutudur. AI (Yapay Zeka) projenin içinde saçmalarsa veya yanlışlıkla bir şeyi silmeye kalkarsa, sadece o kutunun içindekiler etkilenir. Bilgisayarının ana sistemine zarar veremez.
*   **Hız:** Kapatıp açmak, bilgisayarı yeniden başlatmak gibi her şeyi pırıl pırıl yapar.

---

## 🛠️ Docker İçine Girmek ve Komut Yazmak

Bazen "kutunun içinde neler oluyor?" diye bakmak istersin. İşte o zaman konteynırın içine (terminaline) girebilirsin.

### 1. Çalışan Konteynırın İçine Girmek
Uygulama çalışırken yeni bir terminal aç ve şunu yaz:
```bash
docker exec -it cal-ai-web-1 sh
```
*(Not: `cal-ai-web-1` senin çalışan konteynırının adıdır. Eğer farklıysa `docker ps` yazarak öğrenebilirsin.)*

### 2. Kutunun İçinde Kullanabileceğin Komutlar
İçeri girdiğinde sanki başka bir bilgisayara bağlanmış gibi olursun. Şu komutları deneyebilirsin:
*   `ls`: İçerideki dosyaları listeler.
*   `pwd`: Şu an tam olarak hangi klasörde olduğunu gösterir.
*   `top`: İşlemcinin ne kadar yorulduğunu gösterir.
*   `exit`: Kutudan çıkmanı sağlar (Uygulamayı durdurmaz, sadece senin bağlantını keser).

---

## 🏗️ Docker İmajı SIFIRDAN Nasıl Oluşturulur?

Eğer `docker-compose` kullanmadan, her şeyi adım adım kendin yapmak istersen:

1.  **İmajı (Dondurulmuş Kalıbı) Yap:**
    ```bash
    docker build -t cal-ai .
    ```
    *(`-t cal-ai`: İmajın adı cal-ai olsun demek. `.` ise "bu klasördeki kuralları kullan" demek.)*

2.  **Kutuyu (Konteynırı) Çalıştır:**
    ```bash
    docker run -p 3000:3000 --env-file .env.local cal-ai
    ```

3.  **Hepsini Listele:**
    *   `docker images`: Bilgisayarındaki tüm "buz kalıplarını" (imajları) listeler.
    *   `docker ps`: Şu an "canlı" olan tüm kutuları gösterir.
