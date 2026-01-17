import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/core/i18n";

export const metadata: Metadata = {
  title: t("Kullanım Şartları"),
  description: t("Calmet kullanım şartları ve hizmet koşulları."),
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-4xl px-4 space-y-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Yasal")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("Kullanım Şartları")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("Calmet’i kullanmadan önce aşağıdaki şartları okuyun.")}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft space-y-6">
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Hizmet Tanımı")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Calmet; kalori, su, aktivite ve hedef takibi için bilgi sağlayan bir platformdur. Tıbbi teşhis veya tedavi sunmaz."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Kullanıcı Sorumlulukları")}</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>{t("Doğru ve güncel bilgi sağlamak.")}</li>
              <li>{t("Hizmeti yasal ve dürüst şekilde kullanmak.")}</li>
              <li>{t("Hesap güvenliğini korumak.")}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Abonelikler")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Ücretli paketler ek özellikler sunar. Abonelik detayları ve iptal koşulları destek kanallarından paylaşılır."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Fikri Mülkiyet")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Uygulama arayüzü, içerikler ve yazılım Calmet’e aittir. İzinsiz kopyalama ve dağıtım yapılamaz."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Sorumluluk Reddi")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Calmet, tıbbi tavsiye yerine geçmez. Sağlıkla ilgili kararlar için profesyonel destek alınmalıdır."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Değişiklikler")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Şartlar gerektiğinde güncellenebilir. Güncellenmiş şartlar yayımlandığı anda yürürlüğe girer."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("İletişim")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("Kullanım şartlarıyla ilgili sorular için")}{" "}
              <a href="mailto:haliskoc200@gmail.com" className="font-bold text-emerald-600 underline">
                haliskoc200@gmail.com
              </a>{" "}
              {t("adresinden bize ulaşabilirsiniz.")}
            </p>
          </section>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <Link
            href="/legal/privacy"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("Gizlilik Politikası")}
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
