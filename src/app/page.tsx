"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, Calendar, Check, ChefHat, Lock } from "lucide-react";
import { t } from "@/lib/i18n";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featureCards = [
    {
      title: t("Kisiye Ozel Diyet Takvimi"),
      description: t(
        "Hedeflerinize, aliskanliklariniza ve gunluk programiniza gore otomatik olusan haftalik plan."
      ),
      icon: Calendar,
      style: "bg-amber-50/70 border-amber-100 text-amber-600",
    },
    {
      title: t("Detayli Grafikler"),
      description: t(
        "Gunluk, haftalik ve aylik ilerlemeyi net goruntuleyin. Trendler ve sapmalar tek ekranda."
      ),
      icon: BarChart3,
      style: "bg-sky-50/70 border-sky-100 text-sky-600",
    },
    {
      title: t("Hazir Ogun Sablonlari"),
      description: t(
        "Tek tek kalori girmeden, diyetisyen onayli sablonlardan ogununuzu secin."
      ),
      icon: ChefHat,
      style: "bg-emerald-50/70 border-emerald-100 text-emerald-600",
    },
  ];

  const steps = [
    {
      title: t("Hedefleri Belirle"),
      description: t(
        "Kilo, enerji ve aktivite hedeflerini girin. Sistem size uygun araligi hesaplar."
      ),
    },
    {
      title: t("Planini Uret"),
      description: t("AI, 7 gunluk takvimi ve ogun dagilimini otomatik olusturur."),
    },
    {
      title: t("Takip ve Revize"),
      description: t("Ilerleme grafikleri ile rotayi guncelleyin, plan kendini yeniler."),
    },
  ];

  const templateMeals = [
    {
      name: t("Akdeniz Sabah"),
      calories: t("420 kcal"),
      macros: [t("Protein 28g"), t("Karb 45g"), t("Yag 14g")],
    },
    {
      name: t("Dengeli Ofis"),
      calories: t("560 kcal"),
      macros: [t("Protein 35g"), t("Karb 60g"), t("Yag 18g")],
    },
    {
      name: t("Fit Aksam"),
      calories: t("480 kcal"),
      macros: [t("Protein 40g"), t("Karb 30g"), t("Yag 16g")],
    },
  ];
  return (
    <div className="min-h-screen text-ink font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-amber-100/70 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-amber-600 font-mono">
              {t("Cal AI")}
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium hover:text-amber-600 transition-colors">
              {t("Ozellikler")}
            </Link>
            <Link href="#steps" className="text-sm font-medium hover:text-amber-600 transition-colors">
              {t("Nasil Calisir")}
            </Link>
            <Link href="#schedule" className="text-sm font-medium hover:text-amber-600 transition-colors">
              {t("Takvim")}
            </Link>
            <Link href="#templates" className="text-sm font-medium hover:text-amber-600 transition-colors">
              {t("Ogun Sablonlari")}
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-amber-600 transition-colors">
              {t("Ucretlendirme")}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/auth/login" className="hidden text-sm font-medium hover:text-amber-600 transition-colors sm:inline">
              {t("Giris Yap")}
            </a>
            <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1">
              <span className="rounded-xl bg-amber-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700">
                {t("Kayit Ol")}
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs font-semibold text-amber-700 shadow-sm md:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {t("Menü")}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-amber-100/70 bg-white/90 md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 text-sm">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)}>
                {t("Ozellikler")}
              </Link>
              <Link href="#steps" onClick={() => setMobileMenuOpen(false)}>
                {t("Nasil Calisir")}
              </Link>
              <Link href="#schedule" onClick={() => setMobileMenuOpen(false)}>
                {t("Takvim")}
              </Link>
              <Link href="#templates" onClick={() => setMobileMenuOpen(false)}>
                {t("Ogun Sablonlari")}
              </Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                {t("Ucretlendirme")}
              </Link>
              <a href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                {t("Giris Yap")}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl motion-safe:animate-[float_10s_ease-in-out_infinite]" />
            <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl motion-safe:animate-[float_12s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-rose-200/30 blur-3xl motion-safe:animate-[float_11s_ease-in-out_infinite]" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
            <div className="relative z-10 space-y-8 motion-safe:animate-[fade-up_0.9s_ease-out]">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                {t("Yeni Nesil Takip Deneyimi")}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                {t("Kalori Takibinde")}
                <span className="block text-amber-600">{t("Kisiye Ozel Akis")}</span>
              </h1>
              <p className="max-w-xl text-lg text-gray-600">
                {t(
                  "Cal AI; diyet takvimi, ogun sablonlari ve net grafiklerle saglik hedeflerinizi tek merkezden yonetmenizi saglar. Giris veya kayit sonrasi uygulama tam erisime acilir."
                )}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1" className="w-full sm:w-auto">
                  <span className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-800">
                    {t("Hemen Basla")}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <a href="/auth/login" className="w-full sm:w-auto">
                  <span className="flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-900 transition-all hover:-translate-y-0.5 hover:bg-gray-50">
                    {t("Giris Yap")}
                  </span>
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                  {t("7 gunluk plan onizlemesi")}
                </div>
                <div className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                  {t("Hazir ogun sablonlari")}
                </div>
                <div className="rounded-full bg-white/70 px-4 py-2 shadow-sm">
                  {t("Grafiklerle ilerleme")}
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(39,24,12,0.12)] motion-safe:animate-[fade-up_1s_ease-out]">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span>{t("Bugunun Ozeti")}</span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700">
                    {t("Hedefe 82%")}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">{t("Kalori")}</p>
                    <p className="text-lg font-bold text-gray-900">1.540</p>
                    <p className="text-xs text-amber-600">{t("+120 buffer")}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">{t("Protein")}</p>
                    <p className="text-lg font-bold text-gray-900">{t("98g")}</p>
                    <p className="text-xs text-emerald-600">{t("tamamlandi")}</p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <p className="text-xs text-gray-500">{t("Su")}</p>
                    <p className="text-lg font-bold text-gray-900">{t("1.8L")}</p>
                    <p className="text-xs text-sky-600">{t("hedefe yakin")}</p>
                  </div>
                </div>
                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-4">
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                    <span>{t("Ogun Akisi")}</span>
                    <span className="text-xs text-amber-700">{t("Bugun")}</span>
                  </div>
                  <div className="mt-4 grid gap-3 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>{t("Sabah")}</span>
                      <span className="font-semibold text-gray-900">{t("420 kcal")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t("Ogle")}</span>
                      <span className="font-semibold text-gray-900">{t("560 kcal")}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t("Aksam")}</span>
                      <span className="font-semibold text-gray-900">{t("480 kcal")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white/80 p-5 text-sm text-gray-600 shadow-sm motion-safe:animate-[fade-up_1.1s_ease-out]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  {t("Program Odakli")}
                </div>
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {t(
                    "Kullanici girisinden sonra tum moduller aktif olur: takvim, ogun sablonlari ve grafikler tek panelde."
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="relative py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("Tanitici Giris Deneyimi")}
              </h2>
              <p className="mt-4 text-gray-600">
                {t(
                  "Istatistik ekranina gitmeden once, uygulamanin nasil calistigini ve size nasil yardim edecegini net bir sekilde gosteriyoruz."
                )}
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="group rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${feature.style}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="steps" className="py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  {t("Adim Adim")}
                </div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t("Plani Baslat, Adim Adim Ilerle")}
                </h2>
                <p className="mt-4 text-gray-600">
                  {t(
                    "Kullanicilar giris yaptiginda ilk haftalik plan otomatik kurulur. Plan, her gunun verisine gore kendini gunceller."
                  )}
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm text-gray-600">
                  <Lock className="h-4 w-4 text-amber-600" />
                  {t("Veriler sifreli sekilde saklanir ve sadece sizin panelinizde gorunur.")}
                </div>
              </div>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">{step.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="schedule" className="py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("Kisiye Ozel Diyet Takvimi")}
              </h2>
              <p className="mt-4 text-gray-600">
                {t(
                  "Haftalik takvim, hedeflerinize gore otomatik dolar. Ogun dagilimlari ve kalori dengesini gorebilirsiniz. Isterseniz tek dokunusla alternatif ogunlerle degistirin."
                )}
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{t("Pazartesi")}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{t("Akdeniz Sabah")}</p>
                  <p className="text-xs text-gray-500">{t("420 kcal")}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{t("Sali")}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{t("Dengeli Ofis")}</p>
                  <p className="text-xs text-gray-500">{t("560 kcal")}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{t("Carsamba")}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{t("Fit Aksam")}</p>
                  <p className="text-xs text-gray-500">{t("480 kcal")}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{t("Persembe")}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{t("Protein Dengesi")}</p>
                  <p className="text-xs text-gray-500">{t("510 kcal")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-amber-100 bg-white/90 p-6 shadow-[0_18px_50px_rgba(39,24,12,0.12)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t("Haftalik Akis")}</h3>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  {t("7 Gun")}
                </span>
              </div>
              <div className="mt-6 space-y-3 text-sm">
                {["Pzt", "Sal", "Car", "Per", "Cum", "Cmt", "Paz"].map((day, index) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-10 text-xs font-semibold text-gray-400">{t(day)}</span>
                    <div className="h-2 flex-1 rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"
                        style={{ width: `${70 + index * 3}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600">{1500 + index * 60} kcal</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-4 text-xs text-gray-600">
                {t("Takvim, aktivite yogunluguna gore otomatik kalori araligini ayarlar.")}
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t("Hazir Ogun Sablonlari")}
                </h2>
                <p className="mt-3 max-w-xl text-gray-600">
                  {t(
                    "Ogun secimi tek bir tik ile. Tum makrolar otomatik hesaplanir, tek tek giris yok."
                  )}
                </p>
              </div>
              <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition-colors hover:text-amber-800">
                  {t("Sablonlara Eris")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {templateMeals.map((meal) => (
                <div
                  key={meal.name}
                  className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                      {meal.calories}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    {meal.macros.map((macro) => (
                      <li key={macro} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-amber-600" />
                        {macro}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full rounded-xl border border-gray-200 bg-white py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                    {t("Ogunu Ekle")}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="rounded-3xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
                  <span>{t("Grafik Onizleme")}</span>
                  <span className="text-xs text-gray-400">{t("Son 4 Hafta")}</span>
                </div>
                <div className="mt-6 grid grid-cols-4 items-end gap-2 sm:grid-cols-7 sm:gap-3">
                  {[40, 55, 62, 50, 75, 80, 68].map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="w-3 rounded-full bg-gradient-to-t from-amber-400 via-orange-400 to-rose-400 sm:w-4"
                        style={{ height: `${value}px` }}
                      />
                      <span className="text-[10px] text-gray-400">
                        <span className="sm:hidden">{t("H{value}", { value: index + 1 })}</span>
                        <span className="hidden sm:inline">{t("Hafta {value}", { value: index + 1 })}</span>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-700">
                  {t("Ilerlemeniz stabil. Son hafta hedefinize %94 uyum sagladiniz.")}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {t("Grafiklerle Net Gorunum")}
                </h2>
                <p className="mt-4 text-gray-600">
                  {t(
                    "Tum veriler tek panelde. Kalori dengesini, makro dagilimini ve hedef ilerlemesini aninda takip edin."
                  )}
                </p>
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-4 w-4 text-amber-600" />
                    {t("Hafta bazli trend analizi ve sapma uyarilari.")}
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    {t("Takvim uzerinde gunluk ogun dengesi.")}
                  </div>
                  <div className="flex items-center gap-3">
                    <ChefHat className="h-4 w-4 text-amber-600" />
                    {t("Ogun sablonlarinin performans karsilastirmasi.")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("Ucretlendirme")}
              </h2>
              <p className="mt-4 text-gray-600">
                {t("Baslangic icin ucretsiz plan, daha derin analiz icin premium.")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white/80 p-7 shadow-sm">
                <div className="text-sm font-semibold text-gray-500">{t("Baslangic")}</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{t("Ucretsiz")}</div>
                <p className="mt-2 text-sm text-gray-500">{t("Temel takvim ve ogun takip akisi.")}</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Haftalik plan onizleme")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Ogun sablonlari")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Temel grafikler")}
                  </li>
                </ul>
                <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1">
                  <span className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                    {t("Ucretsiz Basla")}
                  </span>
                </a>
              </div>
              <div className="relative rounded-3xl border border-amber-200 bg-amber-50 p-7 shadow-sm">
                <div className="absolute -top-4 right-6 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {t("Onerilen")}
                </div>
                <div className="text-sm font-semibold text-amber-700">{t("Premium")}</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">{t("₺49 / ay")}</div>
                <p className="mt-2 text-sm text-gray-600">{t("Kisiye ozel akislarda tam kontrol.")}</p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Kisiye ozel diyet takvimi")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Gelismis grafikler ve analiz")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Sinirsiz kayit gecmisi")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-600" />
                    {t("Oncelikli destek")}
                  </li>
                </ul>
                <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1">
                  <span className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-amber-600 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-700">
                    {t("Premiuma Gec")}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="rounded-3xl border border-gray-100 bg-white/80 p-10 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {t("Hemen Giris Yap, Akisi Baslat")}
                  </h2>
                  <p className="mt-4 text-gray-600">
                    {t(
                      "Giris yaptiginizda size ozel plan otomatik baslar. Isteginize gore ogun sablonlarini ve takvimi duzenleyebilirsiniz."
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <a href="/auth/login">
                    <span className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                      {t("Giris Yap")}
                    </span>
                  </a>
                  <a href="/auth/login?screen_hint=signup&returnTo=%2Fdashboard%3Fonboarding%3D1">
                    <span className="inline-flex h-12 items-center justify-center rounded-xl bg-gray-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
                      {t("Kayit Ol")}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white/70 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <p className="text-sm text-gray-500">{t("© 2026 Cal AI. Tum haklari saklidir.")}</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900">
              {t("Gizlilik")}
            </Link>
            <Link href="#" className="hover:text-gray-900">
              {t("Kullanim Sartlari")}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
