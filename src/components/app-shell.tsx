"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Bot, LogOut, Sparkles, User, Settings } from "lucide-react";
import { ChatAssistant } from "@/components/chat-assistant";
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
  const hideShell = pathname === "/" || pathname.startsWith("/share") || pathname.startsWith("/login");

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
    <div className="app-root min-h-screen bg-[#fffbf7] text-ink">
      {isAppMode && showSplash && (
        <div className="app-splash">
          <div className="app-splash-card">
            <span className="app-splash-orb" />
            <div className="app-splash-title">{t("Calmet")}</div>
            <div className="app-splash-sub">{t("Sağlıklı Yaşam")}</div>
          </div>
        </div>
      )}
      <ReminderScheduler />

      {/* Modern Top Header */}
      <header className="sticky top-0 z-40 border-b border-amber-50 bg-white/80 backdrop-blur-md px-4 py-3 sm:px-8 print-hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/dashboard" className="flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-md sm:h-12 sm:w-12 bg-white">
              <img
                src="/logo.png"
                alt="Calmet Logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase">Calmet</span>
              <h1 className="text-lg font-black text-gray-900 leading-tight">Takip</h1>
            </div>
          </Link>

          {/* Actions Section */}
          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              href="/pricing"
              className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-700 hover:bg-amber-100 transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">{t("Paketler")}</span>
            </Link>

            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block" />

            {/* Profile Dropdown / Info */}
            {user && (
              <div className="flex items-center gap-3">
                <div className="hidden flex-col items-end sm:flex leading-none">
                  <span className="text-sm font-bold text-gray-900 mb-1">{user.name}</span>
                  <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-tighter">
                    {t("Hesabım")}
                  </span>
                </div>
                <Link href="/profile" className="group relative">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-lg ring-1 ring-emerald-50 transition-all group-hover:scale-110">
                    {user.picture ? (
                      <img src={user.picture} alt={user.name || "User"} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-600 font-bold">
                        {user.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
                </Link>

                <a
                  href="/auth/logout"
                  className="hidden sm:flex ml-2 h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
                  title={t("Çıkış")}
                >
                  <LogOut className="h-5 w-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="app-shell mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-8">
        <div className="mb-8 rounded-2xl border border-amber-100 bg-white/90 p-4 text-xs text-muted shadow-soft print-hidden flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-amber-600">!</div>
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

      <nav className="app-nav fixed bottom-6 left-1/2 z-20 w-[min(94vw,400px)] -translate-x-1/2 rounded-[2rem] border border-amber-100/50 bg-white/80 px-2 py-2 shadow-2xl backdrop-blur-lg print-hidden">
        <div className="grid grid-cols-4">
          {[
            { href: "/dashboard", label: "Panel", icon: "⌂" },
            { href: "/add-entry", label: "Ekle", icon: "+" },
            { href: "/history", label: "Geçmiş", icon: "◎" },
            { href: "/settings", label: "Ayar", icon: "⚙" },
          ].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-[1.5rem] px-2 py-3 text-[10px] font-bold transition-all ${active
                  ? "bg-emerald-600 text-white shadow-lg scale-105"
                  : "text-gray-400 hover:text-emerald-600 hover:bg-emerald-50/50"
                  }`}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                {t(item.label)}
              </Link>
            );
          })}
        </div>
      </nav>
      <CommandPalette />
      <OnboardingModal isOpen={showOnboarding} onComplete={() => setShowOnboarding(false)} />
      {user && <ChatAssistant />}
    </div>
  );
}
