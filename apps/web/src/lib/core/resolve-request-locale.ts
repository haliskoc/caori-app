import { cookies } from "next/headers";
import { cache } from "react";
import { defaultLocale, normalizeLocale } from "@calai/shared";
import { LOCALE_COOKIE } from "@/lib/core/locale";

/** Per-request locale from cookie (set in middleware on first visit). */
export const resolveRequestLocale = cache(async (): Promise<string> => {
  const cookieStore = await cookies();
  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value;
  return normalizeLocale(fromCookie ?? defaultLocale);
});
