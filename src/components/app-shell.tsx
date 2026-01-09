"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommandPalette } from "@/components/command-palette";
import { OnboardingModal } from "@/components/onboarding-modal";
import { ReminderScheduler } from "@/components/reminder-scheduler";
import { isProfileComplete, loadProfile } from "@/lib/profile";
import { t } from "@/lib/i18n";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: "⌂" },
  { href: "/add-entry", label: "Ekle", icon: "+" },
  { href: "/history", label: "Geçmiş", icon: "◎" },
  { href: "/profile", label: "Profil", icon: "◍" },
  { href: "/settings", label: "Ayarlar", icon: "⚙" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isAppMode, setIsAppMode] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const hideShell = pathname === "/" || pathname.startsWith("/share");

  useEffect(() => {
    if (hideShell) {
      return;
    }
    if (isLoading || !user) {
      setShowOnboarding(false);
      return;
    }
    if (pathname.startsWith("/auth") || pathname.startsWith("/onboarding")) {
      setShowOnboarding(false);
      return;
    }
    let active = true;
    const check = async () => {
      try {
        const res = await fetch("/api/v1/profile", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          if (active) {
            setShowOnboarding(!isProfileComplete(data));
          }
          return;
        }
      } catch {
        // fall back to local
      }
      const profile = loadProfile();
      if (active) {
        setShowOnboarding(!isProfileComplete(profile));
      }
    };
    void check();
    return () => {
      active = false;
    };
  }, [hideShell, isLoading, pathname, user]);

  useEffect(() => {
    if (hideShell) {
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const media = window.matchMedia?.("(display-mode: standalone)");
    const applyMode = (active: boolean) => {
      if (active) {
        document.documentElement.dataset.app = "true";
      } else {
        delete document.documentElement.dataset.app;
      }
      setIsAppMode(active);
    };
    const triggerSplash = () => {
      if (sessionStorage.getItem("calai.appSplash") === "1") {
        return;
      }
      sessionStorage.setItem("calai.appSplash", "1");
      setShowSplash(true);
      window.setTimeout(() => setShowSplash(false), 1100);
    };
    const detectStandalone = () =>
      Boolean(
        media?.matches ||
          window.matchMedia?.("(display-mode: minimal-ui)")?.matches ||
          (window.navigator as { standalone?: boolean }).standalone ||
          document.referrer.startsWith("android-app://")
      );
    const initial = detectStandalone();
    applyMode(initial);
    if (initial) {
      triggerSplash();
    }
    const handleChange = (event: MediaQueryListEvent) => {
      const active = event.matches || document.referrer.startsWith("android-app://");
      applyMode(active);
      if (active) {
        triggerSplash();
      } else {
        setShowSplash(false);
      }
    };
    media?.addEventListener?.("change", handleChange);
    return () => media?.removeEventListener?.("change", handleChange);
  }, [hideShell]);

  // Landing Page ve paylaşım ekranlarında AppShell UI'ını gösterme
  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <div className="app-root min-h-screen bg-app text-ink">
      {isAppMode && showSplash && (
        <div className="app-splash">
          <div className="app-splash-card">
            <span className="app-splash-orb" />
            <div className="app-splash-title">{t("Cal AI")}</div>
            <div className="app-splash-sub">{t("Günlük Takip")}</div>
          </div>
        </div>
      )}
      <ReminderScheduler />
      <div className="app-shell mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-8">
        <header className="app-header mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print-hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">{t("Cal AI")}</p>
            <h1 className="text-2xl font-semibold sm:text-3xl">{t("Günlük Takip")}</h1>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:justify-end">
            <div className="hidden items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-xs text-muted shadow-soft sm:flex">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {t("Kullanıcı kontrolü her zaman açık")}
            </div>
            {!isLoading && !user && (
              <a
                href="/auth/login"
                className="rounded-full border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-soft"
              >
                {t("Giriş Yap")}
              </a>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted sm:inline">
                  {user.name ?? user.email ?? t("Kullanıcı")}
                </span>
                <a
                  href="/auth/logout"
                  className="rounded-full border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-soft"
                >
                  {t("Çıkış")}
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="mb-6 rounded-2xl border border-amber-100 bg-white/90 p-4 text-xs text-muted shadow-soft print-hidden">
          {t(
            "Bu platform yalnızca takip ve farkındalık amaçlıdır. Tıbbi, diyetetik veya sağlık tavsiyesi sunmaz."
          )}
        </div>

        <main className="app-main flex-1">
          <div key={pathname} className="app-page">
            {children}
          </div>
        </main>
      </div>

      <nav className="app-nav fixed bottom-4 left-1/2 z-20 w-[min(94vw,640px)] -translate-x-1/2 rounded-2xl border border-amber-100 bg-white/95 px-2 py-2 shadow-strong backdrop-blur print-hidden">
        <div className="grid grid-cols-5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition ${active
                    ? "bg-accent text-white shadow-soft"
                    : "text-muted hover:text-ink"
                  }`}
              >
                <span className="text-base">{item.icon}</span>
                {t(item.label)}
              </Link>
            );
          })}
        </div>
      </nav>
      <CommandPalette />
      <OnboardingModal isOpen={showOnboarding} onComplete={() => setShowOnboarding(false)} />
    </div>
  );
}
