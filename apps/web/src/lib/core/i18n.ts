import { normalizeLocale as sharedNormalizeLocale, getIntlLocale as sharedGetIntlLocale, t as sharedT, defaultLocale, locales as sharedLocales } from "@calai/shared";

export type Locale = string;
export { defaultLocale };

const dictionaries: Record<string, Record<string, unknown>> = {
  en: sharedLocales.en,
  tr: sharedLocales.tr,
};

const LOCALE_KEY = "calai.locale";
const listeners = new Set<() => void>();

function notifyLocaleChange() {
  listeners.forEach((listener) => listener());
}

export function normalizeLocale(value?: string | null): Locale {
  return sharedNormalizeLocale(value);
}

export function getLocale(): Locale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  const stored = window.localStorage.getItem(LOCALE_KEY);
  const browserLocale = typeof navigator === "undefined" ? "" : navigator.language;
  return normalizeLocale(stored || browserLocale || defaultLocale);
}

export function setLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  const next = normalizeLocale(locale);
  window.localStorage.setItem(LOCALE_KEY, next);
  applyLocaleToDocument(next);
  void loadLocale(next);
  notifyLocaleChange();
}

export function applyLocaleToDocument(locale?: Locale) {
  if (typeof document === "undefined") return;
  const next = locale ?? getLocale();
  document.documentElement.lang = next;
  document.documentElement.dir = "ltr";
}

export function getIntlLocale(locale?: Locale) {
  return sharedGetIntlLocale(locale);
}

export async function loadLocale(locale: Locale) {
  const next = normalizeLocale(locale);
  if (dictionaries[next]) {
    return;
  }
  if (typeof window === "undefined") {
    return;
  }
  try {
    const response = await fetch(`/locales/${next}.json`, { cache: "no-store" });
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as Record<string, unknown>;
    dictionaries[next] = data;
    notifyLocaleChange();
  } catch {
  }
}

export function subscribeLocale(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function t(
  key: string,
  params?: Record<string, string | number>,
  locale?: Locale
) {
  const currentLocale = locale ?? (typeof window === "undefined" ? defaultLocale : getLocale());
  return sharedT(key, params, currentLocale);
}
