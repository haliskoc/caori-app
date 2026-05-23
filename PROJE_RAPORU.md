# 🚀 PROJE RAPORU: Calmet (PULSAR_V2) - Yeni Nesil Sağlık & Beslenme Ekosistemi

## İçindekiler
1. Proje Bilgileri
2. Proje Özeti
3. Problem ve Çözüm
4. Problemin Farkı (Özgünlük)
5. Uygulanabilirlik
6. Proje Süreci
7. Teknolojik Altyapı ve Mevcut Durum

---

### 1. Proje Bilgileri 
**1.1 Takım Adı:** PULSAR_V2  
**1.2. Proje Adı:** Calmet  
**1.3. Kategori:** Sağlık, Yapay Zeka (AI), Giyilebilir Teknoloji & Dijital Sağlık  
**1.4. Takım Üyeleri:**  
* **Halis KOÇ:** Fikir & Proje Yönetimi  
* **Musap Miraç Türkay:** UI/UX Tasarım  
* **Ömer Faruk Çeken:** Geliştirme & Tasarım  
* **Muhammed Efe Kılıç:** Yazılım & Kodlama Mimarı  

---

### 2. Proje Özeti: Yapay Zeka Destekli Akıllı Beslenme ve Kalori Yönetim Platformu
Bu proje; yalnızca bir "kalori sayacı" olmanın çok ötesine geçerek, insanların beslenmeden ortaya çıkan kronik hastalıkları önlemelerini ve bütüncül bir sağlık ekosistemine dahil olmalarını ivmelendiren **aktif bir dijital sağlık asistanıdır.**

**2.1. Projenin amacı nedir?**
İnsanların bedensel ihtiyaçlarına en uygun makro (protein, karbonhidrat, yağ) ve mikro dengesiyle yemek yiyip fiziksel ve zihinsel sağlıklarını maksimize etmelerini sağlamaktır. Sıkıcı beslenme takibini oyunlaştırma ve yapay zeka kolaylığıyla birleştirerek, sürdürülebilir bir diyet alışkanlığı kazandırmak temel hedeftir.

**2.2. Hangi problemi çözüyor?**
Dünya genelinde hızla artan obezite, Tip-2 diyabet ve kalp-damar hastalıklarının kök nedeni olan **"bilinçsiz ve ölçülemeyen"** yemek tüketimini ortadan kaldırıyor. Daha da önemlisi, hastalar ile doktorlar (veya diyetisyenler) arasındaki iletişim kopukluğunu çözerek, doktor randevuları arasında oluşan **"veri kaybı ve takipsizlik"** problemini şeffaf raporlamalarla ortadan kaldırıyor.

**2.3. Kimler için tasarlandı?**
* İnsülin direnci, diyabet veya çölyak gibi yakından takip gerektiren kronik rahatsızlıkları olanlar.
* Kilo verme, hacim kazanma veya form koruma (kilo kontrolü) hedefi olan bireyler.
* Kas gelişimi ve makro besin analizini hassas düzeyde yapmak zorunda olan sporcular ve fitness tutkunları.
* Hızlı hayat temposu içinde "Bugün hedeflerime uygun ne yemeliyim?" diye düşünmek istemeyen beyaz yakalı profesyoneller.
* **Danışanlarının/hastalarının gerçek uyum skorunu, gün gün uyku, su, kalori ve efor kayıtlarıyla uzaktan gözlemlemek isteyen doktor, antrenör ve diyetisyenler.**

**2.4. Beklenen fayda nedir?**
Kullanıcı, "diyet yapma" baskısını hissetmez; çünkü cebinde taşıdığı AI asistanı onu doğru hedefe yormadan yönlendirir. Yapay zeka veri girişi sürecini saniyelere düşürür. Günün sonunda birey yaşam kalitesini artırırken; sağlık profesyonelleri (doktorlar) hastanın süreç boyunca ne kadar diyete uyduğunu (% Adherence Score) anında görerek tamamen kişiye özel ve veri odaklı, isabetli tıbbi tedaviler uygulayabilir.

---

### 3. Problem ve Çözüm

**3.1. Problem tam olarak nedir?**
İnsan doğası gereği, monoton işleri çabuk bırakma eğilimindedir. Kalori ve öğün takibi, mevcut uygulamalarda her bir gıdayı tek tek aratıp gramaj girmeyi gerektirdiği için kullanıcılar **1-2 hafta içinde takibi bırakmaktadır (Churn oranı çok yüksektir).** 
Ayrıca sistemlerin kullanıcıya proaktif bir rehberliği yoktur. Kullanıcı uygulamaya "1000 kalori fazlam var" dediğinde, uygulama "o zaman daha az ye" demekten öteye gidemez. Sıkıntının medikal tarafında ise; doktor randevusunda hastaya "Son 1 ayda uyku, su ve beslenmeniz nasıldı?" diye sorulduğunda hasta net bir veri veremez ve tedavi "tahminlere" dayanır.

**3.2. Bu problem dünyamız için neden önemli?**
Sağlıksız beslenme, tedavisi milyarlarca dolara mal olan kronik sağlık krizlerinin bir numaralı tetikleyicisidir. Bireyler süreci bırakıp kötü alışkanlıklarına döndükleri an hastalıklar ağırlaşır. Hastanın diyete sadık kalmaması, doğrudan sağlık sistemlerini kilitler ve ortalama insan ömründen çalar.

**3.3. Çözümünüz nedir?**
Basit bir sensörün deprem gelmeden önce insanları uyarması misali; vücudun kalori, su, aktivite dengesizliğini anlık olarak tespit edip kullanıcıyı doğru yemeğe (*reçeteye*) yönlendiren, hastanın süreç uyum analizini otomatik olarak paketleyip doğrudan doktorun sistemine PDF şablonuyla (Medikal Rapor) sunan otonom bir mekanizma kurmak.

**3.4. Sistem Mimarisi & Çalışma Mekanizması:**
* **💬 Akıllı Yazılı Veri Girişi:** Sistem, doğal dildeki yazılı mesajlarla ("Sabah 3 yumurta, 100 gram yulaf yedim, üstüne 1 bardak su içtim") çalışır. NLP (Doğal Dil İşleme) algoritmaları mesajın anatomisini analiz ederek gıdanın tüm makro değerlerini saniyeler içinde veritabanına kalori olarak işler. Kullanıcı karmaşık listelerle uğraşmak yerine asistanla yazışarak kaydını tamamlar.
* **🧠 Akıllı İçgörüler (Insights)& Tavsiye:** Uygulama, uyku kalitenize, o gün içtiğiniz suya ve harcadığınız kaloriye bakar. Size anlık olarak: *"Karbonhidrat kotanı çok hızlı doldurdun, uyku oranın ise düşük. Akşam yemeğinde eksik kalan protein ihtiyacını gidermek için sadece Izgara Somon Tabağı yemelisin"* gibi hedefe kilitlenmiş tam çözüm noktaları (tavsiyeler) atar.
* **📊 Doktor Entegrasyon Modülü & Raporlama:** Periyodik aralıklarla (7, 30, 90 günlük) tüm verileriniz konsolide edilir. Uygulama size **"Doktor PDF / CSV Raporu"** çıktısı verir. Raporun içinde: *Net Kalori Skoru, Makro Kırılımları, Egzersiz Verimliliği ve Uygulanabilirlik (Adherence) Skoru* bulunur. Tek butonla bu profesyonel analiz WhatsApp veya Mail yoluyla doktora gönderilir.

---

### 4. Problemin Farkı (Özgünlük) 
Piyasadaki uygulamaların (MyFitnessPal, FatSecret vd.) %95'i "Pasif Veritabanı Günlükleri" olarak hizmet eder. Calmet ise **"Proaktif Bir Beslenme ve Sağlık Koçu"**dur. 

**4.1. Calmet'i eşsiz kılan özellikler:**
* **Chatbot (Akıllı Metin Asistanı):** Uygulama içinde kullanıcıya rehberlik eden, moral veren ve gıdaları yazılı mesaj yoluyla anında sisteme kaydeden gelişmiş bir yapay zeka asistanı.
* **Gamification (Oyunlaştırma) ve Rozetler:** Diyete uyum sağlayan kullanıcının motivasyonunu kırmamak için sistemde 12 farklı başarı rozeti (Streak, Su içme hedefi vb.) bulunur ve BMI (Vücut Kitle İndeksi) hedefine ulaşılmasını eğlenceli hale getirir.
* **Tıbbi Kanıt ve Gerçek Medikal Raporlama:** Yalnızca end-user (son kullanıcı) için değil, **klinik hekimler için** veri analizi üretir. Bu sayede diyetisyenlerin ve hastanelerin kendi hastalarını takip edebileceği entegre bir yapının kapısını açar.

---

### 5. Uygulanabilirlik ve Büyüme (Ölçeklenebilirlik)

**5.1. Gerçek hayatta yapılabilir mi?**
Kesinlikle. Ekibimiz halihazırda projenin hem **Next.js özellikli Web panelini** hem de Android/iOS cihazlarda native çalışacak **React Native/Expo destekli Mobil uygulamasını** entegre olarak (monorepo formatında) geliştirmiştir. Bulut tabanlı veri tabanları (Supabase/PostgreSQL) ve modern AI modelleri sayesinde hızlı ve bulut destekli bir mimari kurulmuştur.

**5.2. Pazar ve Hedef Kitle**
Sağlık uygulamaları pazarı milyarlarca dolarlık bir büyüklüğe sahiptir. Yalnızca kilo vermek isteyenler değil; profesyonel spor salonları, kişisel diyetisyen klinikleri, poliklinikler platformumuzu aktif hasta takibi modülü için abonelik bazında (SaaS) kullanabilirler.

**5.3. Geliştirilebilir mi? Dış Entegrasyonlar Nelerdir?**
Projemiz modüler kodlandığı için sınırsız entegrasyona açıktır:
1. Akıllı saatlerden (Apple Health, Google Fit) veri çekilerek kalori sarfiyatının kişinin beyanına değil, kalp ritmine göre hesaplanması,
2. Online Yemek Siparişi (Yemek Sepeti, Getir vs.) uygulamalarıyla API ortaklıkları kurarak, uygulamanın "Akşam izgara tavuk ye" önerisini tek tuşla sipariş ekranına düşürmesi,
3. Stripe ve Auth0 ile güvence altına alınmış "Premium Yaşam Koçluğu" (Lab) hizmetlerinin uygulamaya eklenmesi.

---

### 6. Proje Süreci

**6.1. Projeyi nasıl geliştirdiniz?**
Projeyi geliştirirken UI/UX (Kullanıcı Deneyimi) stratejilerini ön planda tutan bir akış belirledik. Web (Next.js) ve Mobil (Expo) arasında kod israfını engellemek için Turborepo içeren bir "Monorepo (Çoklu Platform)" mimarisi kurduk. Auth0 ile güvenliği, Tailwind CSS ile hızlı prototiplemeyi sağladık.

**6.2. Hangi adımları izlediniz?**
1. Problem tespiti ve kullanıcı analizi.
2. Kavramsal veri tabanı mimarisi çizimi.
3. Web panelinde Dashboard (Kontrol Paneli) ve Raporlama grafiklerinin inşası,
4. Uygulama içine akıllı Chatbot (NLP/Doğal Dil İşleme) algoritmalarının beslenmesi,
5. Test süreçleri ile PDF dışa aktarma (Export) modüllerinin bağlanması.

---

### 7. Teknolojik Altyapı ve Mevcut Durum 

**7.1. Hangi Geliştirme Araçları (Tech Stack) Kullanıldı?**
* **Mobil:** React Native, Expo, Expo-Printing (Pdf), Expo-Speech (Ses)
* **Web:** React, Next.js, Web Speech API
* **Backend / Veritabanı:** Drizzle ORM, tRPC/REST, PostgreSQL
* **Veri Yönetimi / Kimlik:** Stripe (Ödemeler), Auth0 (Kullanıcı Yönetimi)

**7.2. Proje hangi aşamada?**
Şu anda test edilebilir bir **MVP (Minimum Viable Product)** seviyesindedir:
* Kullanıcının Günlük Hedefleri (Su, Uyku, Egzersiz, Makrolar) tam fonksiyonlu çalışmaktadır.
* Akıllı Chatbot arayüzü kurulmuş, yazılı mesajlardaki kelimeleri ayrıştırıp "Su eklensin mi?" gibi interaktif asistan teyitleri yapması sağlanmıştır.
* BMI (Vücut Kitle İndeksi) hesaplama sistemi, rozetler ve istatistik sayfası hazırdır.
* **En kritik aşama olan "Doktora PDF/CSV Olarak Export Etme (Çıkarma)" özelliği aktif hale getirilmiştir.** Uygulama istatistikleri ve hedeflerin ne kadar tuttuğu saniyeler içinde dokümantasyona dönüştürülebilmektedir.
* Bir sonraki vizyon adımı; platformun Play Store ve App Store mağazalarına nihai sürümle giriş yapması ve doktorlara/kliniklere özel abonelik ekranlarının yayına alınmasıdır.



