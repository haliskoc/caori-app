"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/core/i18n";
import {
  applyLocaleToDocument,
  getLocale,
  loadLocale,
  setLocale,
  subscribeLocale,
  syncActiveLocale,
} from "@/lib/core/i18n";
import { LOCALE_STORAGE_KEY, readLocaleCookie } from "@/lib/core/locale";

export function useLocaleValue() {
  const [locale, setLocaleState] = useState(() => getLocale());

  useEffect(() => {
    return subscribeLocale(() => {
      setLocaleState(getLocale());
    });
  }, []);

  return locale;
}

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
};

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState(initialLocale);

  syncActiveLocale(locale);

  useEffect(() => {
    const fromCookie = readLocaleCookie(document.cookie);
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);

    if (!stored && fromCookie) {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, fromCookie);
    } else if (stored && stored !== fromCookie) {
      setLocale(stored);
      setLocaleState(getLocale());
      return;
    }

    applyLocaleToDocument(initialLocale);
    void loadLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    syncActiveLocale(locale);
    applyLocaleToDocument(locale);
    void loadLocale(locale);
  }, [locale]);

  useEffect(() => {
    return subscribeLocale(() => {
      const next = getLocale();
      setLocaleState(next);
      syncActiveLocale(next);
    });
  }, []);

  return <>{children}</>;
}
