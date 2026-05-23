import { defaultLocale, normalizeLocale, type LocaleCode } from "@calai/shared";

export const LOCALE_COOKIE = "calai.locale";
export const LOCALE_STORAGE_KEY = "calai.locale";

export type Locale = LocaleCode;

/** Parse Accept-Language (first supported locale wins). */
export function pickLocaleFromAcceptLanguage(header: string | null | undefined): Locale {
  if (!header) {
    return defaultLocale;
  }
  const parts = header.split(",").map((part) => part.split(";")[0]?.trim()).filter(Boolean);
  for (const part of parts) {
    const normalized = normalizeLocale(part);
    if (normalized) {
      return normalized;
    }
  }
  return defaultLocale;
}

export function readLocaleCookie(cookieHeader: string | null | undefined): Locale | null {
  if (!cookieHeader) {
    return null;
  }
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]*)`));
  if (!match?.[1]) {
    return null;
  }
  try {
    return normalizeLocale(decodeURIComponent(match[1]));
  } catch {
    return normalizeLocale(match[1]);
  }
}

export function localeCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 365) {
  return {
    path: "/",
    maxAge: maxAgeSeconds,
    sameSite: "lax" as const,
  };
}
