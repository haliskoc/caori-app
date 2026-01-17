import { locales, Dictionary, LocaleCode } from "../locales";

export type { LocaleCode, Dictionary };

export const defaultLocale: LocaleCode = "en";

export function normalizeLocale(value?: string | null): LocaleCode {
  if (!value) return defaultLocale;
  const trimmed = value.trim();
  if (!trimmed) return defaultLocale;
  const lower = trimmed.toLowerCase();

  if (lower.startsWith("tr")) return "tr";
  if (lower.startsWith("en")) return "en";
  if (lower.startsWith("es")) return "es";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("ru")) return "ru";
  if (lower.startsWith("pt")) return "pt";

  if (lower.includes("-")) {
    const base = lower.split("-")[0] as LocaleCode;
    if (Object.keys(locales).includes(base)) return base;
  }

  return defaultLocale;
}

export function getIntlLocale(locale?: string) {
  const next = normalizeLocale(locale);
  switch (next) {
    case "tr": return "tr-TR";
    case "en": return "en-US";
    case "es": return "es-ES";
    case "fr": return "fr-FR";
    case "ru": return "ru-RU";
    case "pt": return "pt-PT";
    default: return next;
  }
}

function getValue(dictionary: any, key: string) {
  if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
    return dictionary[key];
  }
  return key.split(".").reduce<any>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      return acc[part];
    }
    return undefined;
  }, dictionary);
}

export function t(
  key: string,
  params?: Record<string, string | number>,
  locale?: string
) {
  const resolvedLocale = normalizeLocale(locale);
  const dictionary = (locales as any)[resolvedLocale] ?? (locales as any)[defaultLocale];
  const value = getValue(dictionary, key);
  const template = typeof value === "string" ? value : key;
  
  if (!params) {
    return template;
  }
  
  return Object.entries(params).reduce((text, [name, val]) => {
    return text.replaceAll(`{${name}}`, String(val));
  }, template);
}
