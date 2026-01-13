import type { Metadata } from "next";
import Link from "next/link";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("KVKK Aydınlatma Metni"),
  description: t("Calmet KVKK ve kişisel verilerin korunması hakkında aydınlatma metni."),
};

export default function KvkkPage() {
  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-4xl px-4 space-y-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Yasal")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("KVKK Aydınlatma Metni")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("6698 sayılı KVKK kapsamında veri işleme süreçlerimiz.")}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft space-y-6">
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Veri Sorumlusu")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t("Veri sorumlusu: Calmet App. İletişim:")}{" "}
              <a href="mailto:haliskoc200@gmail.com" className="font-bold text-emerald-600 underline">
                haliskoc200@gmail.com
              </a>
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("İşlenen Veri Kategorileri")}</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>{t("Kimlik ve iletişim bilgileri")}</li>
              <li>{t("Profil ve hedef bilgileri")}</li>
              <li>{t("Beslenme ve aktivite kayıtları")}</li>
              <li>{t("Uygulama kullanım verileri")}</li>
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("İşleme Amaçları")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Hizmetin sunulması, kişiselleştirilmiş öneriler verilmesi, güvenlik ve destek süreçlerinin yürütülmesi amaçlarıyla işlenir."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Aktarım")}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {t(
                "Veriler yalnızca hizmetin sağlanması için gerekli olduğu ölçüde ve açık rıza gerektiren durumlarda üçüncü taraflarla paylaşılır."
              )}
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-emerald-900">{t("Haklarınız")}</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600">
              <li>{t("Kişisel verilerin işlenip işlenmediğini öğrenme")}</li>
              <li>{t("Eksik veya yanlış verilerin düzeltilmesini isteme")}</li>
              <li>{t("Silme veya yok etme talebinde bulunma")}</li>
              <li>{t("İşlemeye itiraz etme")}</li>
            </ul>
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
            href="/legal/terms"
            className="rounded-full border border-emerald-200 bg-white px-4 py-2 font-bold text-emerald-700"
          >
            {t("Kullanım Şartları")}
          </Link>
        </div>
      </div>
    </div>
  );
}
