"use client";

import Link from "next/link";
import { Chrome, Mail, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import { t } from "@/lib/i18n";

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#fffcf9] px-4 py-12 sm:px-6 lg:px-8">
            {/* Premium Background Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
                <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-emerald-100/40 blur-[120px]" />
                <div className="absolute -right-[5%] bottom-[5%] h-[35%] w-[35%] rounded-full bg-emerald-100/20 blur-[100px]" />
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="absolute left-6 top-6 flex items-center gap-2 text-sm font-black text-gray-400 transition-all hover:text-emerald-600 sm:left-12 sm:top-12"
            >
                <ArrowLeft className="h-4 w-4 stroke-[3px]" />
                {t("Ana Sayfa")}
            </Link>

            <div className="relative z-10 w-full max-w-md space-y-10">
                {/* Branding */}
                <div className="text-center space-y-6">
                    <Link href="/" className="inline-flex items-center gap-4 transition-transform hover:scale-105">
                        <div className="h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-xl border border-emerald-100 p-1.5 ring-4 ring-emerald-50">
                            <img src="/logo.png" alt="Calmet" className="h-full w-full object-contain" />
                        </div>
                        <div className="text-left">
                            <span className="text-2xl font-black tracking-tight text-gray-900 block">
                                Calmet
                            </span>
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] block">
                                Sağlık Takibi
                            </span>
                        </div>
                    </Link>
                    <div className="space-y-2 pt-4">
                        <h2 className="text-3xl font-black tracking-tight text-gray-900">
                            {t("Yolculuğa Başla")}
                        </h2>
                        <p className="text-sm font-bold text-gray-400">
                            {t("Daha sağlıklı bir gelecek için hesabına giriş yap.")}
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="group rounded-[2.5rem] border border-white bg-white/80 p-8 shadow-2xl backdrop-blur-xl transition-all hover:bg-white/90 ring-1 ring-emerald-100/50">
                    <div className="space-y-4">
                        {/* Google Login */}
                        <a
                            href="/auth/login"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-4 py-4 text-sm font-black text-gray-900 shadow-xl shadow-gray-200/50 border border-gray-100 transition-all hover:-translate-y-1 hover:border-emerald-200 active:scale-95"
                        >
                            <Chrome className="h-5 w-5 text-[#4285F4]" />
                            {t("Google ile Devam Et")}
                        </a>

                        <div className="relative flex items-center py-4">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="mx-4 flex-shrink text-[10px] font-black uppercase tracking-widest text-gray-400">
                                {t("veya")}
                            </span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        {/* Email / Standard Login */}
                        <a
                            href="/auth/login"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-900 px-4 py-4 text-sm font-black text-white shadow-xl shadow-gray-300 transition-all hover:-translate-y-1 hover:bg-emerald-600 active:scale-95"
                        >
                            <Mail className="h-5 w-5 opacity-80" />
                            {t("E-posta ile Güvenli Giriş")}
                        </a>
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-xs font-bold text-gray-400">
                            {t("Hesabın yok mu?")}{" "}
                            <a
                                href="/auth/login?screen_hint=signup"
                                className="text-emerald-600 hover:text-emerald-700 transition-colors"
                            >
                                {t("Hemen Kayıt Ol")}
                            </a>
                        </p>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-4 text-gray-400">
                    <div className="flex items-center gap-1.5 opacity-50">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                    </div>
                    <div className="h-3 w-px bg-gray-200" />
                    <div className="flex items-center gap-1.5 opacity-50">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Ready Experience</span>
                    </div>
                </div>
            </div>

            {/* Footer Terms */}
            <div className="absolute bottom-8 left-0 w-full px-6 text-center">
                <p className="text-[10px] font-bold text-gray-400 tracking-tight max-w-xs mx-auto">
                    {t("Giriş yaparak Calmet Kullanım Şartları ve Gizlilik Politikasını kabul etmiş sayılırsınız.")}
                </p>
            </div>
        </div>
    );
}
