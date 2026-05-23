"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { TrackerProvider } from "@/components/providers/tracker-provider";
import { AppShell } from "@/components/layout/app-shell";
import { LocaleProvider } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/core/i18n";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <Auth0Provider>
      <LocaleProvider initialLocale={initialLocale}>
        <TrackerProvider>
          <AppShell>{children}</AppShell>
        </TrackerProvider>
      </LocaleProvider>
    </Auth0Provider>
  );
}
