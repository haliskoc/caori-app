import {
  normalizeLocale as sharedNormalizeLocale,
  getIntlLocale as sharedGetIntlLocale,
  t as sharedT,
  defaultLocale,
  locales as sharedLocales,
} from "@calai/shared";
import {
  LOCALE_COOKIE,
  LOCALE_STORAGE_KEY,
  readLocaleCookie,
  type Locale,
} from "@/lib/core/locale";

export type { Locale };
export { defaultLocale };

const dictionaries: Record<string, Record<string, unknown>> = {
  en: sharedLocales.en,
  tr: sharedLocales.tr,
};

const listeners = new Set<() => void>();

/** Locale used during SSR of client trees (set by LocaleProvider each render). */
let activeLocale: Locale = defaultLocale;

function notifyLocaleChange() {
  listeners.forEach((listener) => listener());
}

export function syncActiveLocale(locale: Locale) {
  activeLocale = sharedNormalizeLocale(locale) as Locale;
}

export function normalizeLocale(value?: string | null): Locale {
  return sharedNormalizeLocale(value) as Locale;
}

function readClientLocale(): Locale {
  if (typeof document !== "undefined") {
    const fromCookie = readLocaleCookie(document.cookie);
    if (fromCookie) {
      return fromCookie;
    }
  }
  if (typeof window !== "undefined") {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const browserLocale = typeof navigator === "undefined" ? "" : navigator.language;
    return normalizeLocale(stored || browserLocale || defaultLocale);
  }
  return defaultLocale;
}

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    return readClientLocale();
  }
  return activeLocale;
}

function writeLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function setLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }
  const next = normalizeLocale(locale);
  window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  writeLocaleCookie(next);
  syncActiveLocale(next);
  applyLocaleToDocument(next);
  void loadLocale(next);
  notifyLocaleChange();
}

export function applyLocaleToDocument(locale?: Locale) {
  if (typeof document === "undefined") {
    return;
  }
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
    // ignore fetch errors
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
  const currentLocale = locale ?? getLocale();
  return sharedT(key, params, currentLocale);
}
