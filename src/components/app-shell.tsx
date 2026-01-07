"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CommandPalette } from "@/components/command-palette";
import { Onboarding } from "@/components/onboarding";
import { ReminderScheduler } from "@/components/reminder-scheduler";

const navItems = [
  { href: "/dashboard", label: "Panel", icon: "⌂" },
  { href: "/add-entry", label: "Ekle", icon: "+" },
  { href: "/history", label: "Geçmiş", icon: "◎" },
  { href: "/settings", label: "Ayarlar", icon: "⚙" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  // Landing Page için AppShell UI'ını gösterme
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-app text-ink">
      <ReminderScheduler />
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pb-24 pt-6 sm:px-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Cal AI</p>
            <h1 className="text-2xl font-semibold sm:text-3xl">Günlük Takip</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-xs text-muted shadow-soft sm:flex">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Kullanıcı kontrolü her zaman açık
            </div>
            {!isLoading && !user && (
              <a
                href="/auth/login"
                className="rounded-full border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-soft"
              >
                Giriş Yap
              </a>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted sm:inline">
                  {user.name ?? user.email ?? "Kullanıcı"}
                </span>
                <a
                  href="/auth/logout"
                  className="rounded-full border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700 shadow-soft"
                >
                  Çıkış
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="mb-6 rounded-2xl border border-amber-100 bg-white/90 p-4 text-xs text-muted shadow-soft">
          Bu platform yalnızca takip ve farkındalık amaçlıdır. Tıbbi, diyetetik veya sağlık
          tavsiyesi sunmaz.
        </div>

        <main className="flex-1">{children}</main>
      </div>

      <nav className="fixed bottom-4 left-1/2 z-20 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-amber-100 bg-white/95 px-2 py-2 shadow-strong backdrop-blur">
        <div className="grid grid-cols-4">
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
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <CommandPalette />
      <Onboarding />
    </div>
  );
}
