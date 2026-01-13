"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Zap, Bot, ArrowRight, Star, Sparkles, ShieldCheck, Rocket } from "lucide-react";
import { t } from "@/lib/i18n";

export default function PricingPage() {
    const router = useRouter();
    const [checkedPlan, setCheckedPlan] = useState(false);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        let active = true;
        const checkPlan = async () => {
            try {
                const res = await fetch("/api/v1/user", { credentials: "include" });
                if (!res.ok) {
                    if (active) {
                        setCheckedPlan(true);
                    }
                    return;
                }
                const data = (await res.json()) as { isPremium?: boolean };
                if (active && data?.isPremium) {
                    setIsBlocked(true);
                    setCheckedPlan(true);
                    router.replace("/dashboard");
                    return;
                }
                if (active) {
                    setCheckedPlan(true);
                }
            } catch {
                if (active) {
                    setCheckedPlan(true);
                }
            }
        };
        void checkPlan();
        return () => {
            active = false;
        };
    }, [router]);
    const plans = [
        {
            id: "free",
            name: t("Başlangıç"),
            price: t("Ücretsiz"),
            period: t("/ sonsuza kadar"),
            description: t("Sağlıklı yaşama ilk adımı atanlar için."),
            features: [
                t("Günlük Kalori & Su Takibi"),
                t("Temel Raporlar (Son 7 Gün)"),
                t("Günlük 3 Öğün Kaydı"),
                t("Yerel Cihazda Depolama"),
            ],
            missing: [t("Bulut Senkronizasyon"), t("AI Koçu"), t("Detaylı Analizler")],
            icon: <Star className="h-6 w-6 text-emerald-300" />,
            color: "emerald",
            buttonText: t("Hemen Başla"),
            buttonHref: "/auth/login?screen_hint=signup",
            popular: false,
        },
        {
            id: "pro",
            name: t("Pro"),
            price: "₺49.99",
            period: t("/ ay"),
            description: t("Verilerini ciddiye alan sporcular için."),
            features: [
                t("Sınırsız Öğün & Aktivite"),
                t("Detaylı Grafikler & Analizler"),
                t("Bulut Yedekleme (Güvenli)"),
                t("Tüm Cihazlardan Senkronizasyon"),
                t("Reklamsız Deneyim"),
                t("Premium Destek"),
            ],
            missing: [t("AI Beslenme Koçu"), t("Yapay Zeka Promptları")],
            icon: <Zap className="h-6 w-6 text-emerald-500" />,
            color: "emerald",
            buttonText: t("Pro'ya Yükselt"),
            buttonHref: "/premium/activate?plan=pro",
            popular: true,
        },
        {
            id: "ai_plus",
            name: t("AI Plus"),
            price: "₺149.99",
            period: t("/ ay"),
            description: t("Yapay zeka gücüyle kişisel koçunuz."),
            features: [
                t("Her Şey Dahil (Pro Özellikler)"),
                t("7/24 AI Chatbot & Beslenme Koçu"),
                t("Akıllı Beslenme Planlama"),
                t("Kişiselleştirilmiş Öneriler"),
                t("Öncelikli Yeni Özellikler"),
            ],
            missing: [],
            icon: <Bot className="h-6 w-6 text-emerald-600" />,
            color: "emerald",
            buttonText: t("AI Gücünü Keşfet"),
            buttonHref: "/premium/activate?plan=ai_plus",
            popular: false,
        },
    ];

    if (!checkedPlan || isBlocked) {
        return (
            <div className="min-h-screen bg-[#fffcf9] pb-32 pt-20 flex items-center justify-center text-sm text-emerald-700">
                {t("Yönlendiriliyor...")}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fffcf9] pb-32 pt-20 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-0 h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-[120px]" />
                <div className="absolute right-1/4 bottom-0 h-[360px] w-[360px] rounded-full bg-emerald-200/30 blur-[120px]" />
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6 shadow-sm border border-emerald-100">
                        <Sparkles className="h-3 w-3" />
                        {t("Plan Seçimi")}
                    </div>
                    <h2 className="text-4xl font-black tracking-tight text-emerald-950 sm:text-6xl mb-6">
                        {t("Hedeflerinizi")}{" "}
                        <span className="text-emerald-500">{t("Gerçeğe Dönüştürün")}</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-emerald-900/60 leading-relaxed font-medium">
                        {t("Calmet ile beslenme ve spor takibi artık çok daha akıllı. İhtiyacınıza en uygun paketi seçin ve bugün başlayın.")}
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col rounded-[2.5rem] p-4 transition-all duration-500 group ${plan.popular
                                ? "bg-emerald-600 text-white shadow-[0_20px_50px_rgba(16,185,129,0.3)] scale-105 z-10 ring-1 ring-emerald-300/40"
                                : "bg-white/90 border border-emerald-100/80 shadow-xl shadow-emerald-100/60 hover:shadow-2xl hover:shadow-emerald-200/70 hover:-translate-y-2"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-900 px-6 py-1.5 text-xs font-black text-white uppercase tracking-widest shadow-lg">
                                    {t("En Çok Tercih Edilen")}
                                </div>
                            )}

                            <div className={`flex-1 rounded-[2rem] p-8 ${plan.popular ? "bg-emerald-500/10" : "bg-emerald-50/70"}`}>
                                <div className="mb-8 flex items-center justify-between">
                                    <div className={`p-3 rounded-2xl ${plan.popular ? "bg-emerald-400" : "bg-white shadow-sm border border-emerald-100/80"}`}>
                                        {plan.icon}
                                    </div>
                                    {plan.id === "ai_plus" && (
                                        <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black text-emerald-700">
                                            <Rocket className="h-3 w-3" />
                                            {t("YENİ")}
                                        </div>
                                    )}
                                </div>

                                <h3 className={`text-2xl font-black mb-2 ${plan.popular ? "text-white" : "text-emerald-950"}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm mb-6 font-medium ${plan.popular ? "text-emerald-50" : "text-emerald-900/60"}`}>
                                    {plan.description}
                                </p>

                                <div className="mb-8">
                                    <span className={`text-5xl font-black leading-none ${plan.popular ? "text-white" : "text-emerald-950"}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`ml-2 text-sm font-bold ${plan.popular ? "text-emerald-100" : "text-emerald-900/50"}`}>
                                        {plan.period}
                                    </span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${plan.popular ? "bg-emerald-400 text-emerald-900" : "bg-emerald-100 text-emerald-600"}`}>
                                                <Check className="h-3 w-3 stroke-[3px]" />
                                            </div>
                                            <span className={`text-sm font-bold ${plan.popular ? "text-white" : "text-emerald-900"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                    {plan.missing.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 opacity-40">
                                            <div className={`flex h-5 w-5 items-center justify-center rounded-full ${plan.popular ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-400"}`}>
                                                <X className="h-3 w-3 stroke-[3px]" />
                                            </div>
                                            <span className={`text-sm font-bold ${plan.popular ? "text-emerald-100" : "text-emerald-900/40"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={plan.buttonHref}
                                    className={`group relative flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-black transition-all ${plan.popular
                                        ? "bg-white text-emerald-700 hover:bg-emerald-50"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200/60"
                                        }`}
                                >
                                    {plan.buttonText}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="mt-24 text-center">
                    <p className="text-sm font-bold text-emerald-700/60 flex items-center justify-center gap-2">
                        <ShieldCheck className="h-4 w-4" />
                        {t("Güvenli Ödeme / İptal Hakkı")}
                    </p>
                </div>
            </div>
        </div>
    );
}
