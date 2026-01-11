import en from "@/locales/en.json";
import tr from "@/locales/tr.json";

export type Locale = string;

export const defaultLocale = "en";

const dictionaries: Record<string, Record<string, unknown>> = {
  en,
  tr,
};

const LOCALE_KEY = "calai.locale";
const listeners = new Set<() => void>();

function notifyLocaleChange() {
  listeners.forEach((listener) => listener());
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return defaultLocale;
  const trimmed = value.trim();
  if (!trimmed) return defaultLocale;
  const lower = trimmed.toLowerCase();
  if (lower.startsWith("tr")) return "tr";
  if (lower.startsWith("en")) return "en";
  if (lower.includes("-")) {
    const base = lower.split("-")[0];
    return base || defaultLocale;
  }
  return lower;
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
  document.documentElement.dir = next === "tr" ? "ltr" : "ltr";
}

export function getIntlLocale(locale?: Locale) {
  const next = normalizeLocale(locale ?? defaultLocale);
  if (next === "tr") return "tr-TR";
  if (next === "en") return "en-US";
  return next;
}

function getValue(dictionary: Record<string, unknown>, key: string) {
  if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
    return dictionary[key];
  }
  return key.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);
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
    // ignore load errors
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
  const resolvedLocale = normalizeLocale(
    locale ?? (typeof window === "undefined" ? defaultLocale : getLocale())
  );
  const dictionary = dictionaries[resolvedLocale] ?? dictionaries[defaultLocale];
  const value = getValue(dictionary, key);
  const template = typeof value === "string" ? value : key;
  if (!params) {
    return template;
  }
  return Object.entries(params).reduce((text, [name, val]) => {
    return text.replaceAll(`{${name}}`, String(val));
  }, template);
}
