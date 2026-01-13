"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, Calendar, Check, ChefHat, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { t } from "@/lib/i18n";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Calmet",
    "operatingSystem": "Web, Android, iOS",
    "applicationCategory": "HealthApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1024"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "TRY"
    }
  };

  const featureCards = [
    {
      title: t("Kişiye Özel Diyet Takvimi"),
      description: t(
        "Hedeflerinize, alışkanlıklarınıza ve günlük programınıza göre otomatik oluşan haftalık plan."
      ),
      icon: Calendar,
      style: "bg-emerald-50/70 border-emerald-100 text-emerald-600",
    },
    {
      title: t("Detaylı Grafikler"),
      description: t(
        "Günlük, haftalık ve aylık ilerlemeyi net görüntüleyin. Trendler ve sapmalar tek ekranda."
      ),
      icon: BarChart3,
      style: "bg-emerald-50/70 border-emerald-100 text-emerald-600",
    },
    {
      title: t("Hazır Öğün Şablonları"),
      description: t(
        "Tek tek kalori girmeden, diyetisyen onaylı şablonlardan öğününüzü seçin."
      ),
      icon: ChefHat,
      style: "bg-emerald-50/70 border-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen text-ink font-sans bg-[#fffcf9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="sticky top-0 z-50 w-full border-b border-emerald-100/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center transition-transform hover:scale-[1.02]">
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              Cal<span className="text-emerald-500">met</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">
              {t("Özellikler")}
            </Link>
            <Link href="/pricing" className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors">
              {t("Ücretlendirme")}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden text-sm font-bold text-gray-900 hover:text-emerald-600 transition-colors sm:inline"
            >
              {t("Giriş Yap")}
            </Link>
            <Link href="/auth/login?screen_hint=signup">
              <span className="rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-all hover:bg-gray-900 hover:shadow-gray-200 active:scale-95">
                {t("Ücretsiz Başla")}
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-gray-600 md:hidden"
            >
              <Activity className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-4">
            <Link
              href="#features"
              className="rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Özellikler")}
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Ücretlendirme")}
            </Link>
            <Link
              href="/auth/login?screen_hint=signup"
              className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("Giriş Yap")}
            </Link>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-emerald-100/30 blur-[120px]" />
            <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-100/20 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest border border-emerald-100 shadow-sm animate-pulse">
                <Sparkles className="h-3 w-3" />
                {t("AI Destekli Sağlık Takibi")}
              </div>

              <h1 className="text-5xl font-black tracking-tighter text-gray-900 sm:text-7xl lg:text-8xl leading-[0.9]">
                {t("Vücudun için")} <br />
                <span className="text-emerald-500">{t("En Akıllı Yol.")}</span>
              </h1>

              <p className="mx-auto max-w-2xl text-xl text-gray-500 font-medium leading-relaxed">
                {t("Calmet; yapay zeka destekli diyet takvimi, öğün şablonları ve derinlemesine analizlerle sağlık hedeflerinize en kısa yoldan ulaşmanızı sağlar.")}
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-center pt-4">
                <Link href="/auth/login?screen_hint=signup" className="group">
                  <span className="flex h-14 items-center justify-center gap-3 rounded-[2rem] bg-gray-900 px-10 text-base font-black text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-emerald-600 active:scale-95">
                    {t("Hemen Başla")}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link href="#features">
                  <span className="flex h-14 items-center justify-center rounded-[2rem] border-2 border-gray-100 bg-white px-10 text-base font-black text-gray-900 transition-all hover:bg-gray-50 active:scale-95">
                    {t("Keşfet")}
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 pt-12 grayscale opacity-50">
                <span className="text-sm font-black uppercase tracking-widest text-gray-400">NutriCheck Approved</span>
                <span className="text-sm font-black uppercase tracking-widest text-gray-400">HealthDash Verified</span>
                <span className="text-sm font-black uppercase tracking-widest text-gray-400">PureFit 2026</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-24 bg-white relative">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="rounded-[3rem] border border-gray-100 bg-[#fffcf9] p-4 lg:p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8">
                  <h2 className="text-4xl font-black text-gray-900 leading-tight">
                    {t("Her Şey Tek Bir")} <br />
                    <span className="text-emerald-500">{t("Akıllı Panelde.")}</span>
                  </h2>
                  <p className="text-lg text-gray-500 font-medium">
                    {t("Kalori alımı, su tüketimi ve aktivite verileriniz anlık olarak senkronize edilir. Yapay zeka, eksiklerinizi tespit eder ve gün içinde sizi uyarır.")}
                  </p>

                  <div className="space-y-4">
                    {[
                      { icon: Check, text: t("Otomatik Kalori Hesaplama"), color: "emerald" },
                      { icon: Activity, text: t("7 Günlük İlerleme Analizi"), color: "emerald" },
                      { icon: ShieldCheck, text: t("Kişisel Veri Güvenliği"), color: "emerald" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <item.icon className="h-3.5 w-3.5 stroke-[3px]" />
                        </div>
                        <span className="font-bold text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="rounded-[2.5rem] border border-emerald-100 bg-white p-8 shadow-2xl shadow-emerald-100/50">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm font-black uppercase tracking-widest text-gray-400">{t("Bugünkü Özet")}</span>
                      <div className="h-2 w-32 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-600 mb-1">{t("Kalori")}</p>
                        <p className="text-3xl font-black text-gray-900">1,842</p>
                      </div>
                      <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100">
                        <p className="text-xs font-bold text-emerald-600 mb-1">{t("Su")}</p>
                        <p className="text-3xl font-black text-gray-900">2.4L</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-100" />
                      <div className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-100 opacity-60" />
                      <div className="h-12 w-full rounded-2xl bg-gray-50 border border-gray-100 opacity-30" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32">
          <div className="mx-auto max-w-6xl px-4 md:px-6 text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black text-gray-900 sm:text-5xl">
              {t("Neden Calmet?")}
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              {t("Basit bir takip uygulamasından çok daha fazlası. Bilimsel veriler ve modern teknolojiyi harmanlıyoruz.")}
            </p>
          </div>
          <div className="mx-auto max-w-6xl px-4 md:px-6 grid gap-8 md:grid-cols-3">
            {featureCards.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group rounded-[2.5rem] bg-white border border-gray-100 p-10 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 flex flex-col items-center text-center"
                >
                  <div className="mb-8 p-6 rounded-3xl bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-110 duration-500">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-500 font-bold leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-24 bg-gray-900 overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />

          <div className="mx-auto max-w-6xl px-4 md:px-6 relative z-10 text-center">
            <h2 className="text-4xl font-black text-white sm:text-6xl mb-8 leading-tight">
              {t("Daha İyi Bir Sen İçin")} <br />
              <span className="text-emerald-400">{t("Bugün İlk Adımı At.")}</span>
            </h2>
            <Link href="/auth/login?screen_hint=signup">
              <span className="inline-flex h-16 items-center justify-center gap-3 rounded-[2rem] bg-white px-12 text-lg font-black text-gray-900 shadow-2xl transition-all hover:bg-emerald-400 hover:scale-105 active:scale-95">
                {t("Ücretsiz Hesabını Oluştur")}
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>
            <p className="mt-8 text-gray-400 font-bold">
              {t("Kredi kartı gerekmez. Saniyeler içinde başla.")}
            </p>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 items-start">
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-gray-900">
                Cal<span className="text-emerald-500">met</span>
              </span>
            </div>
            <p className="text-sm font-bold text-gray-400 leading-relaxed">
              {t("Modern ve akıllı sağlık takip asistanınız. 2026 Calmet App Inc.")}
            </p>
          </div>

          {[
            {
              title: t("Ürün"),
              links: [
                { label: t("Özellikler"), href: "/#features" },
                { label: t("Ücretlendirme"), href: "/pricing" },
              ],
            },
            {
              title: t("Destek"),
              links: [
                { label: t("Yardım Merkezi"), href: "/help" },
                { label: t("Sıkça Sorulanlar"), href: "/faq" },
                { label: t("İletişim"), href: "/contact" },
              ],
            },
            {
              title: t("Yasal"),
              links: [
                { label: t("Gizlilik Politikası"), href: "/legal/privacy" },
                { label: t("Kullanım Şartları"), href: "/legal/terms" },
                { label: t("KVKK"), href: "/legal/kvkk" },
              ],
            },
          ].map((col, idx) => (
            <div key={idx} className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-gray-900">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
