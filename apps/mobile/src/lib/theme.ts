import type { ThemeSettings } from "@/lib/settings";

const ACCENTS = {
  emerald: {
    base: "#10b981",
    dark: "#059669",
    soft: "#ecfdf5",
    text: "#064e3b",
  },
  amber: {
    base: "#f59e0b",
    dark: "#d97706",
    soft: "#fffbeb",
    text: "#78350f",
  },
  rose: {
    base: "#f43f5e",
    dark: "#e11d48",
    soft: "#fff1f2",
    text: "#881337",
  },
  sky: {
    base: "#38bdf8",
    dark: "#0ea5e9",
    soft: "#f0f9ff",
    text: "#0c4a6e",
  },
};

export type AppTheme = {
  mode: "light" | "dim";
  background: string;
  surface: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  accent: string;
  accentDark: string;
  accentSoft: string;
  accentText: string;
  danger: string;
  warning: string;
  success: string;
  shadow: string;
  gradient: [string, string];
  fonts: {
    display: string;
    body: string;
  };
};

export function buildTheme(settings: ThemeSettings): AppTheme {
  const accent = ACCENTS[settings.accent] ?? ACCENTS.emerald;
  const isDim = settings.mode === "dim";
  return {
    mode: settings.mode,
    background: isDim ? "#0b1220" : "#f7fffb",
    surface: isDim ? "#111827" : "#ffffff",
    card: isDim ? "#111b2e" : "#ffffff",
    text: isDim ? "#f8fafc" : "#0f172a",
    muted: isDim ? "#94a3b8" : "#6b7280",
    border: isDim ? "#1f2a44" : "#e2e8f0",
    accent: accent.base,
    accentDark: accent.dark,
    accentSoft: accent.soft,
    accentText: accent.text,
    danger: "#ef4444",
    warning: "#f97316",
    success: "#22c55e",
    shadow: isDim ? "rgba(15, 23, 42, 0.3)" : "rgba(15, 23, 42, 0.08)",
    gradient: isDim ? ["#0f172a", "#0b1220"] : ["#ecfdf5", "#f7fffb"],
    fonts: {
      display: "SpaceGrotesk_700Bold",
      body: "Archivo_400Regular",
    },
  };
}

export const DEFAULT_THEME = buildTheme({ mode: "light", accent: "emerald" });
