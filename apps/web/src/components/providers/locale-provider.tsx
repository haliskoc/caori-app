"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  applyLocaleToDocument,
  getLocale,
  loadLocale,
  subscribeLocale,
} from "@/lib/core/i18n";

export function useLocaleValue() {
  const [locale, setLocaleState] = useState(() => getLocale());

  useEffect(() => {
    return subscribeLocale(() => {
      setLocaleState(getLocale());
    });
  }, []);

  return locale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useLocaleValue();

  useEffect(() => {
    applyLocaleToDocument(locale);
    void loadLocale(locale);
  }, [locale]);

  return <>{children}</>;
}
