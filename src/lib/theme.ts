export type ThemeMode = "light" | "dim";
export type ThemeAccent = "amber" | "teal" | "rose";

export type ThemeSettings = {
  mode: ThemeMode;
  accent: ThemeAccent;
};

const THEME_KEY = "calai.theme.v1";

export const defaultTheme: ThemeSettings = {
  mode: "light",
  accent: "amber",
};

export function loadTheme(): ThemeSettings {
  if (typeof window === "undefined") {
    return defaultTheme;
  }
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    if (!raw) {
      return defaultTheme;
    }
    const parsed = JSON.parse(raw) as Partial<ThemeSettings>;
    return {
      mode: parsed.mode === "dim" ? "dim" : "light",
      accent: parsed.accent === "teal" || parsed.accent === "rose" ? parsed.accent : "amber",
    };
  } catch {
    return defaultTheme;
  }
}

export function saveTheme(theme: ThemeSettings) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
}

export function applyTheme(theme: ThemeSettings) {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  root.dataset.theme = theme.mode;
  root.dataset.accent = theme.accent;
}
