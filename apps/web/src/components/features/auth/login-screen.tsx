"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  ArrowRight,
  Cloud,
  Loader2,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { t } from "@/lib/core/i18n";

function buildAuthHref(
  base: "/auth/login",
  params: { returnTo?: string | null; screenHint?: "signup"; connection?: string }
) {
  const url = new URL(base, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  if (params.returnTo && params.returnTo.startsWith("/") && !params.returnTo.startsWith("//")) {
    url.searchParams.set("returnTo", params.returnTo);
  }
  if (params.screenHint === "signup") {
    url.searchParams.set("screen_hint", "signup");
  }
  if (params.connection) {
    url.searchParams.set("connection", params.connection);
  }
  return `${url.pathname}${url.search}`;
}

export function LoginScreen() {
  const searchParams = useSearchParams();
  const { user, isLoading } = useUser();

  const returnTo = useMemo(() => {
    const raw = searchParams.get("returnTo");
    if (raw && raw.startsWith("/") && !raw.startsWith("//")) {
      return raw;
    }
    return "/dashboard";
  }, [searchParams]);

  const isSignup = searchParams.get("mode") === "signup";

  useEffect(() => {
    if (!isLoading && user) {
      window.location.replace(returnTo);
    }
  }, [isLoading, returnTo, user]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffcf9]">
        <div className="flex flex-col items-center gap-3 text-emerald-700">
          <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
          <p className="text-sm font-bold">{t("Oturum kontrol ediliyor…")}</p>
        </div>
      </div>
    );
  }

  const loginHref = buildAuthHref("/auth/login", { returnTo });
  const signupHref = buildAuthHref("/auth/login", { returnTo, screenHint: "signup" });
  const googleHref = buildAuthHref("/auth/login", { returnTo, connection: "google-oauth2" });
  const appleHref = buildAuthHref("/auth/login", { returnTo, connection: "apple" });

  return (
    <div className="min-h-screen bg-[#fffcf9] text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-20 top-0 h-[420px] w-[420px] rounded-full bg-emerald-100/40 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-emerald-50/60 blur-[90px]" />
      </div>

      <header className="border-b border-emerald-100/60 bg-white/75 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="transition-transform hover:scale-[1.02]">
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              Cal<span className="text-emerald-500">met</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-gray-500 transition-colors hover:text-emerald-600"
          >
            {t("Ana Sayfa")}
          </Link>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <section className="space-y-8 animate-[fade-up_0.6s_ease-out]">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-600 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            {t("Bulut Senkronizasyon")}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black leading-[0.95] tracking-tighter text-gray-900 sm:text-5xl lg:text-6xl">
              {isSignup ? t("Ücretsiz Hesabını Oluştur") : t("Hesabınla devam et")}
            </h1>
            <p className="max-w-lg text-lg font-medium leading-relaxed text-gray-500">
              {t(
                "Kalori, su ve aktivite kayıtlarını güvenle bulutta sakla; telefon, tablet ve bilgisayardan kaldığın yerden devam et."
              )}
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              {
                icon: Cloud,
                title: t("Bulut Yedekleme (Güvenli)"),
                desc: t("Verilerin şifreli olarak Neon üzerinde yedeklenir."),
              },
              {
                icon: Smartphone,
                title: t("Tüm cihazlardan eriş"),
                desc: t("Giriş yaptığında kayıtların otomatik senkronize olur."),
              },
              {
                icon: ShieldCheck,
                title: t("Güvenli oturum"),
                desc: t("Auth0 ile Google ve Apple ile güvenli oturum."),
              },
            ].map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-emerald-100/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
              >
                <item.icon className="mb-2 h-5 w-5 text-emerald-600" aria-hidden />
                <p className="text-sm font-black text-gray-900">{item.title}</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-gray-500">{item.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="animate-[fade-up_0.7s_ease-out_0.08s_both] rounded-[2rem] border border-emerald-100/80 bg-white p-6 shadow-[0_24px_60px_rgba(16,185,129,0.12)] sm:p-8"
          aria-labelledby="login-card-title"
        >
          <div className="mb-8 space-y-2 text-center">
            <h2 id="login-card-title" className="text-2xl font-black tracking-tight text-gray-900">
              {isSignup ? t("Kayıt Ol") : t("Giriş Yap")}
            </h2>
            <p className="text-sm font-medium text-gray-500">
              {t("Google veya Apple ile saniyeler içinde başla.")}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={googleHref}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-bold text-gray-800 shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50/40 hover:shadow-md active:scale-[0.99]"
            >
              <GoogleMark />
              {t("Google ile devam et")}
            </a>
            <a
              href={appleHref}
              className="flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-900 bg-gray-900 px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:scale-[0.99]"
            >
              <AppleMark />
              {t("Apple ile devam et")}
            </a>
          </div>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-emerald-100" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{t("veya")}</span>
            <span className="h-px flex-1 bg-emerald-100" />
          </div>

          <a
            href={isSignup ? loginHref : signupHref}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-700 active:scale-[0.99]"
          >
            {isSignup ? t("Giriş Yap") : t("E-posta ile devam et")}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>

          <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
            {t("Giriş yaparak")}{" "}
            <Link href="/legal/terms" className="font-bold text-emerald-700 hover:underline">
              {t("Kullanım Koşulları")}
            </Link>{" "}
            {t("ve")}{" "}
            <Link href="/legal/privacy" className="font-bold text-emerald-700 hover:underline">
              {t("Gizlilik Politikası")}
            </Link>
            {t("'nı kabul etmiş olursun.")}
          </p>

          <div className="mt-6 border-t border-emerald-50 pt-6 text-center">
            <Link
              href="/dashboard"
              className="text-sm font-bold text-gray-500 transition-colors hover:text-emerald-600"
            >
              {t("Giriş yapmadan devam et")}
            </Link>
            <p className="mt-2 text-xs text-gray-400">
              {t("Yerel cihazınızda saklanır — bulut senkronu için giriş gerekir.")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.51 1.9-1.46.02-1.93-.86-3.6-.86-1.67 0-2.19.84-3.57.88-1.38.04-2.43-.92-3.41-1.87C2.79 18.25 1.27 13.55 3.11 9.53c.92-1.98 2.56-3.23 4.35-3.26 1.71-.03 3.33 1.15 3.6 1.15.27 0 2.8-1.42 4.72-1.21.8.03 3.05.32 4.49 2.42-3.8 2.07-3.19 7.46.98 9.65zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
