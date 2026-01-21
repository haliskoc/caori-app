import * as Localization from "expo-localization";
import {
  normalizeLocale,
  setLocale as setSharedLocale,
  t as sharedT,
  defaultLocale,
} from "@calai/shared/i18n";

export function resolveLocale(preferred?: string | null) {
  const fallback = preferred || Localization.locale || defaultLocale;
  return normalizeLocale(fallback);
}

export function applyLocale(locale: string) {
  setSharedLocale(normalizeLocale(locale));
}

export function t(key: string, params?: Record<string, string | number>, locale?: string) {
  return sharedT(key, params, locale);
}
