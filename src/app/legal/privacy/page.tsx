import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/core/i18n";

export const metadata: Metadata = {
  title: t("Gizlilik Politikası"),
  description: t("Calmet gizlilik politikası ve veri güvenliği hakkında detaylı bilgi."),
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-4xl px-4 space-y-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Yasal")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("Gizlilik Politikası")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("Calmet uygulamasında verilerin nasıl işlendiğini şeffaf şekilde açıklarız.")}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft space-y-6">
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Toplanan Veriler")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Profil bilgileri (isim, yaş, kilo, boy), öğün ve aktivite kayıtları, hedefler ve uygulama kullanım metrikleri toplanabilir."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Verilerin Kullanımı")}</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>{t("Takip, analiz ve kişiselleştirilmiş öneriler sunmak.")}</li>
              <li>{t("Uygulama performansını geliştirmek ve hataları gidermek.")}</li>
              <li>{t("Destek taleplerine yanıt vermek.")}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Paylaşım ve Aktarım")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Veriler sadece kullanıcının açık rızasıyla paylaşılır. Rapor paylaşımı anonimleştirilebilir ve süre sınırı uygulanabilir."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Güvenlik")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Veriler güvenli bağlantılar üzerinden iletilir ve erişim kontrolleriyle korunur. Yetkisiz erişimi engellemek için teknik ve idari önlemler alınır."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Saklama Süresi")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Veriler, hizmetin sunulması için gerekli süre boyunca saklanır. Hesap kapatma talebinde kayıtlar makul süre içinde silinir."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("İletişim")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("Gizlilik ile ilgili talepler için")}{" "}
              <a href="mailto:haliskoc200@gmail.com" className="font-bold text-emerald-600 underline">
                haliskoc200@gmail.com
              </a>{" "}
              {t("üzerinden bize ulaşabilirsiniz.")}
            </p>
          </section>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/legal/terms"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("Kullanım Şartları")}
          </Link>
          <Link
            href="/legal/kvkk"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("KVKK")}
          </Link>
        </div>
      </div>
    </div>
  );
}
