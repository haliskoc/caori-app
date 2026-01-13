"use client";

import Link from "next/link";
import { Check, X, Zap, Crown, Bot, ArrowRight, Star } from "lucide-react";
import { t } from "@/lib/i18n";
import { Card } from "@/components/card";

export default function PricingPage() {
    const plans = [
        {
            id: "free",
            name: "Başlangıç",
            price: "Ücretsiz",
            period: "/ sonsuza kadar",
            description: "Sağlıklı yaşama ilk adımı atanlar için.",
            features: [
                "Günlük Kalori & Su Takibi",
                "Temel Raporlar (Son 7 Gün)",
                "Günlük 3 Öğün Kaydı",
                "Yerel Cihazda Depolama",
                "Reklamlı Deneyim",
            ],
            missing: ["Bulut Senkronizasyon", "AI Asistan", "Detaylı Analizler"],
            icon: <Star className="h-6 w-6 text-slate-500" />,
            color: "slate",
            buttonText: "Hemen Başla",
            buttonHref: "/login",
            popular: false,
        },
        {
            id: "pro",
            name: "Pro",
            price: "₺49.99",
            period: "/ ay",
            description: "Verilerini ciddiye alan sporcular için.",
            features: [
                "Sınırsız Öğün & Aktivite",
                "Detaylı Grafikler & Analizler",
                "Bulut Yedekleme (Neon DB)",
                "Reklamsız Deneyim",
                "Öncelikli Destek",
                "Tüm Cihazlardan Erişim",
            ],
            missing: ["AI Chatbot", "Fotoğrafla Kalori Sayma"],
            icon: <Zap className="h-6 w-6 text-amber-500" />,
            color: "amber",
            buttonText: "Pro'ya Yükselt",
            buttonHref: "/premium/activate?plan=pro",
            popular: true,
        },
        {
            id: "ai_plus",
            name: "AI Plus",
            price: "₺149.99",
            period: "/ ay",
            description: "Yapay zeka gücüyle kişisel koçunuz.",
            features: [
                "Her Şey Dahil (Pro Özellikleri)",
                "AI Chatbot & Beslenme Koçu",
                "Fotoğraftan Besin Tanıma",
                "Akıllı Diyet Önerileri",
                "Sınırsız AI Prompt Hakkı",
                "Erken Erişim Özellikleri",
            ],
            missing: [],
            icon: <Bot className="h-6 w-6 text-rose-500" />,
            color: "rose",
            buttonText: "AI Gücünü Keşfet",
            buttonHref: "/premium/activate?plan=ai_plus",
            popular: false,
        },
    ];

    return (
        <div className="min-h-screen bg-[#fff7f0] pb-20 pt-10 sm:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold uppercase tracking-wider text-amber-600">
                        Fiyatlandırma
                    </h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-mono">
                        Sağlığınız için en iyi planı seçin
                    </p>
                    <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
                        İster manuel takip yapın, ister yapay zeka desteği alın. Her bütçeye uygun bir çözümümüz var.
                    </p>
                </div>

                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col rounded-3xl border p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${plan.popular
                                ? "border-amber-400 bg-white ring-4 ring-amber-400/20 scale-105 z-10"
                                : "border-gray-200 bg-white/60 backdrop-blur-lg hover:bg-white"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-amber-500 px-3 py-1 text-center text-sm font-semibold text-white shadow-md">
                                    En Popüler
                                </div>
                            )}

                            <div className="mb-6 flex items-center justify-between">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${plan.color}-100`}
                                >
                                    {plan.icon}
                                </div>
                                {plan.id === "ai_plus" && (
                                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-600">
                                        YENİ
                                    </span>
                                )}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
                            </div>

                            <div className="mb-6 flex items-baseline">
                                <span className="text-4xl font-extrabold text-gray-900">
                                    {plan.price}
                                </span>
                                <span className="ml-2 text-gray-500">{plan.period}</span>
                            </div>

                            <ul className="mb-8 space-y-4 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <Check className={`h-5 w-5 text-${plan.color}-500`} />
                                        </div>
                                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                                    </li>
                                ))}
                                {plan.missing.map((feature) => (
                                    <li key={feature} className="flex items-start opacity-50">
                                        <div className="flex-shrink-0">
                                            <X className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <p className="ml-3 text-sm text-gray-500">{feature}</p>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={plan.buttonHref}
                                className={`block w-full rounded-2xl py-4 text-center text-sm font-bold transition-all ${plan.popular
                                    ? "bg-amber-600 text-white shadow-lg hover:bg-amber-700 hover:shadow-amber-500/30"
                                    : plan.id === "ai_plus"
                                        ? "bg-gray-900 text-white shadow-lg hover:bg-gray-800"
                                        : "bg-amber-50 text-amber-900 hover:bg-amber-100"
                                    }`}
                            >
                                {plan.buttonText}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 rounded-3xl bg-gray-900 px-8 py-12 text-center shadow-2xl sm:px-16">
                    <div className="mx-auto max-w-3xl">
                        <h3 className="text-3xl font-bold text-white">
                            Kurumsal veya Takım Planı mı Arıyorsunuz?
                        </h3>
                        <p className="mt-4 text-lg text-gray-300">
                            Spor salonları, diyetisyenler ve koçlar için özel çözümlerimiz var.
                            Öğrencilerinizi tek panelden yönetin.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <a
                                href="mailto:contact@calmet.app"
                                className="rounded-xl bg-white px-6 py-3 text-base font-bold text-gray-900 transition-colors hover:bg-gray-100"
                            >
                                İletişime Geçin
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
