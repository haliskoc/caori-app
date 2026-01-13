import type { Metadata } from "next";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("İletişim"),
  description: t("Calmet destek ekibiyle iletişime geçin. Soru, öneri ve geri bildirimleriniz için bize yazın."),
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fffcf9] py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-emerald-600">
            {t("Destek")}
          </p>
          <h1 className="text-4xl font-black text-gray-900 sm:text-5xl">
            {t("İletişim")}
          </h1>
          <p className="mt-3 text-sm font-bold text-gray-500">
            {t("Soruların, geri bildirimlerin ya da önerilerin için bize yaz.")}
          </p>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-soft">
          <p className="text-sm text-gray-600">
            {t("Destek e-postamız:")}{" "}
            <a
              href="mailto:haliskoc200@gmail.com"
              className="font-bold text-emerald-600 underline"
            >
              haliskoc200@gmail.com
            </a>
          </p>
          <form
            action="mailto:haliskoc200@gmail.com"
            method="post"
            className="mt-6 grid gap-4"
          >
            <input
              type="text"
              name="subject"
              placeholder={t("Konu")}
              className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm"
            />
            <textarea
              name="body"
              placeholder={t("Mesajın")}
              rows={6}
              className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm"
            />
            <button
              type="submit"
              className="rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200"
            >
              {t("E-posta ile Gönder")}
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            {t("Form gönderimi e-posta uygulaman üzerinden yapılır.")}
          </p>
        </div>
      </div>
    </div>
  );
}
