"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { TrackerProvider } from "@/components/providers/tracker-provider";
import { AppShell } from "@/components/layout/app-shell";
import { LocaleProvider } from "@/components/providers/locale-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider>
      <LocaleProvider>
        <TrackerProvider>
          <AppShell>{children}</AppShell>
        </TrackerProvider>
      </LocaleProvider>
    </Auth0Provider>
  );
}
