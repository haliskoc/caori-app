"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTracker } from "@/components/providers/tracker-provider";
import { t } from "@/lib/core/i18n";

type Command = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string;
  action: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const { addWater, theme, updateTheme } = useTracker();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo<Command[]>(
    () => [
      {
        id: "nav-dashboard",
        label: t("Paneli aç"),
        hint: "/dashboard",
        keywords: t("panel dashboard home"),
        action: () => router.push("/dashboard"),
      },
      {
        id: "nav-add",
        label: t("Yeni kayıt ekle"),
        hint: "/add-entry",
        keywords: t("ekle yeni entry"),
        action: () => router.push("/add-entry"),
      },
      {
        id: "nav-profile",
        label: t("Profil sayfası"),
        hint: "/profile",
        keywords: t("profil kullanıcı"),
        action: () => router.push("/profile"),
      },
      {
        id: "nav-settings",
        label: t("Ayarları aç"),
        hint: "/settings",
        keywords: t("ayarlar settings"),
        action: () => router.push("/settings"),
      },
      {
        id: "nav-report",
        label: t("PDF raporu aç"),
        hint: "/report",
        keywords: t("rapor pdf export"),
        action: () => router.push("/report"),
      },
      {
        id: "water-250",
        label: t("250 ml su ekle"),
        hint: t("Hızlı"),
        keywords: t("su hızlı"),
        action: () => addWater({ amountMl: 250 }),
      },
      {
        id: "water-500",
        label: t("500 ml su ekle"),
        hint: t("Hızlı"),
        keywords: t("su hızlı"),
        action: () => addWater({ amountMl: 500 }),
      },
      {
        id: "theme-toggle",
        label: theme.mode === "light" ? t("Dim temayı aç") : t("Aydınlık temaya dön"),
        hint: t("Tema"),
        keywords: t("tema görünüm"),
        action: () => updateTheme({ mode: theme.mode === "light" ? "dim" : "light" }),
      },
    ],
    [addWater, router, theme.mode, updateTheme]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return commands;
    }
    const normalized = query.toLowerCase();
    return commands.filter((command) => {
      const haystack = `${command.label} ${command.keywords ?? ""}`.toLowerCase();
      return haystack.includes(normalized);
    });
  }, [commands, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isK = event.key.toLowerCase() === "k";
      if ((event.metaKey || event.ctrlKey) && isK) {
        event.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            setQuery("");
            setSelectedIndex(0);
          }
          return next;
        });
        return;
      }
      if (!open) {
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Enter") {
        event.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          selected.action();
          setOpen(false);
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered, open, selectedIndex]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-24"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false);
        }
      }}
    >
      <div className="w-full max-w-xl rounded-2xl border border-emerald-100 bg-white/95 p-4 shadow-strong backdrop-blur">
        <div className="mb-3 flex items-center justify-between text-xs text-muted">
          <span>{t("Komut Paleti")}</span>
          <span>{t("Esc ile kapat • Ctrl/Cmd + K")}</span>
        </div>
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedIndex(0);
          }}
          placeholder={t("Komut ara...")}
          className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
          autoFocus
        />
        <div className="mt-3 max-h-72 space-y-1 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-emerald-100 bg-emerald-50/60 px-3 py-4 text-center text-xs text-muted">
              {t("Sonuç bulunamadı. Farklı bir kelime deneyin.")}
            </div>
          )}
          {filtered.map((command, index) => (
            <button
              key={command.id}
              onClick={() => {
                command.action();
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                index === selectedIndex
                  ? "bg-emerald-100/70 text-emerald-900"
                  : "hover:bg-emerald-50"
              }`}
            >
              <span>{command.label}</span>
              {command.hint && <span className="text-[11px] text-muted">{command.hint}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
