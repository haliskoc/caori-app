"use client";

import Link from "next/link";
import { ArrowRight, Chrome, Mail, ArrowLeft } from "lucide-react";
import { t } from "@/lib/i18n";

export default function LoginPage() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 sm:px-6 lg:px-8">
            {/* Premium Background Elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse" />
                <div className="absolute -right-[5%] bottom-[5%] h-[35%] w-[35%] rounded-full bg-orange-400/10 blur-[100px]" />
                <div className="absolute left-[20%] top-[60%] h-[20%] w-[20%] rounded-full bg-rose-400/10 blur-[80px]" />
            </div>

            {/* Back Button */}
            <Link
                href="/"
                className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent sm:left-12 sm:top-12"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("Geri Dön")}
            </Link>

            <div className="relative z-10 w-full max-w-md space-y-8">
                {/* Branding */}
                <div className="text-center">
                    <Link href="/" className="inline-block">
                        <span className="text-4xl font-bold tracking-tight text-accent font-mono">
                            {t("Cal AI")}
                        </span>
                    </Link>
                    <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
                        {t("Tekrar Hoş Geldiniz")}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                        {t("Sağlık hedeflerinize bir adım daha yaklaşın.")}
                    </p>
                </div>

                {/* Login Card */}
                <div className="group rounded-3xl border border-white/40 bg-white/60 p-8 shadow-strong backdrop-blur-xl transition-all hover:bg-white/70">
                    <div className="space-y-4">
                        {/* Google Login */}
                        <a
                            href="/auth/login"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
                        >
                            <Chrome className="h-5 w-5 text-accent" />
                            {t("Google ile Devam Et")}
                        </a>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-amber-100/50"></div>
                            <span className="mx-4 flex-shrink text-xs font-medium uppercase tracking-widest text-muted/60">
                                {t("veya")}
                            </span>
                            <div className="flex-grow border-t border-amber-100/50"></div>
                        </div>

                        {/* Email / Standard Login */}
                        <a
                            href="/auth/login"
                            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-ink px-4 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink/90 active:translate-y-0"
                        >
                            <Mail className="h-5 w-5 opacity-80" />
                            {t("E-posta ile Giriş Yap")}
                        </a>
                    </div>

                    <div className="mt-8 text-center text-xs text-muted">
                        {t("Hesabınız yok mu?")}{" "}
                        <a
                            href="/auth/login?screen_hint=signup"
                            className="font-semibold text-accent hover:underline decoration-2 underline-offset-4"
                        >
                            {t("Hemen Kayıt Ol")}
                        </a>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-center">
                    <p className="text-[11px] leading-relaxed text-muted/60">
                        {t("Devam ederek Kullanım Şartlarımızı ve Gizlilik Politikamızı kabul etmiş olursunuz.")}
                    </p>
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="absolute bottom-10 left-10 hidden lg:block">
                <div className="rounded-2xl border border-white/20 bg-white/30 p-4 shadow-soft backdrop-blur-md animate-[float_8s_ease-in-out_infinite]">
                    <div className="space-y-2">
                        <div className="h-2 w-24 rounded-full bg-accent/20" />
                        <div className="h-2 w-16 rounded-full bg-accent/40" />
                    </div>
                </div>
            </div>
            <div className="absolute right-12 top-1/4 hidden lg:block">
                <div className="rounded-full border border-white/20 bg-white/30 p-6 shadow-soft backdrop-blur-md animate-[float_10s_ease-in-out_infinite_1s]">
                    <div className="h-4 w-4 rounded-full bg-accent/60" />
                </div>
            </div>
        </div>
    );
}
