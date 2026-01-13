import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("Yardım Merkezi"),
  description: t("Calmet kullanım rehberi, hesap yönetimi ve sıkça sorulan sorular."),
};

export default function HelpPage() {
  const topics = [
    {
      title: t("Hesap & Profil"),
      description: t(
        "Profil bilgilerini güncelle, hedeflerini düzenle ve kişisel ayarlarını yönet."
      ),
    },
    {
      title: t("Takip & Kayıt"),
      description: t(
        "Öğün, su ve aktivite girişlerini hızlıca ekle; geçmiş kayıtlarını profilden incele."
      ),
    },
    {
      title: t("AI Sağlık Koçu"),
      description: t(
        "AI Plus kullanıcıları günlük 25 mesajla beslenme ve antrenman desteği alır."
      ),
    },
    {
      title: t("Abonelik & Ödeme"),
      description: t(
        "Paket bilgilerini görüntüle, yükseltme ve destek taleplerin için iletişime geç."
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Destek")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("Yardım Merkezi")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("Calmet’i daha verimli kullanman için hızlı rehber ve destek kaynakları.")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft"
            >
              <h2 className="text-lg font-bold text-emerald-800">{topic.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{topic.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-emerald-100 bg-emerald-50/60 p-6">
          <h3 className="text-lg font-bold text-emerald-900">{t("Hızlı Bağlantılar")}</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/faq"
              className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700"
            >
              {t("Sıkça Sorulan Sorular")}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700"
            >
              {t("İletişim")}
            </Link>
            <a
              href="mailto:haliskoc200@gmail.com"
              className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-200"
            >
              {t("E-posta Gönder")}
            </a>
          </div>
          <p className="mt-3 text-xs text-emerald-800">
            {t("Destek için: haliskoc200@gmail.com")}
          </p>
        </div>
      </div>
    </div>
  );
}
