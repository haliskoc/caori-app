import Link from "next/link";
import { t } from "@/lib/i18n";

export default function FaqPage() {
  const faqs = [
    {
      q: t("Calmet nedir?"),
      a: t(
        "Calmet; kalori, su, aktivite ve makro takibini kolaylaştıran, AI destekli bir sağlık takip platformudur."
      ),
    },
    {
      q: t("Kalori hesaplamaları neye göre yapılıyor?"),
      a: t(
        "Girdiğin besin değerleri ve aktivite süresi/yoğunluğu üzerinden tahmini kalori hesaplanır."
      ),
    },
    {
      q: t("AI Koç kimlere açık?"),
      a: t("AI Koç sadece AI Plus paketinde aktif edilir."),
    },
    {
      q: t("AI Koç günlük limit kaç?"),
      a: t("AI Plus kullanıcıları için günlük limit 25 mesajdır."),
    },
    {
      q: t("Verilerim güvende mi?"),
      a: t(
        "Veriler güvenli şekilde saklanır, paylaşım yalnızca senin izin verdiğin rapor linkleri ile yapılır."
      ),
    },
    {
      q: t("Paketimi nasıl yükseltirim?"),
      a: t("Ücretlendirme sayfasından planlarını inceleyebilir veya destek ekibine yazabilirsin."),
    },
    {
      q: t("Hesabımı nasıl kapatırım?"),
      a: t("İletişim sayfasından bize yaz; hesabını güvenli şekilde kapatalım."),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Destek")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("Sıkça Sorulan Sorular")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("En çok sorulan soruları hızlıca yanıtladık.")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft"
            >
              <h2 className="text-base font-bold text-emerald-900">{item.q}</h2>
              <p className="mt-2 text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/help"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("Yardım Merkezi")}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("İletişim")}
          </Link>
        </div>
      </div>
    </div>
  );
}
