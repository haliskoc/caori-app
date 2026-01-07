"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { TrackerProvider } from "@/components/tracker-provider";
import { AppShell } from "@/components/app-shell";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Auth0Provider loginUrl="/auth/login" profileUrl="/auth/me">
      <TrackerProvider>
        <AppShell>{children}</AppShell>
      </TrackerProvider>
    </Auth0Provider>
  );
}
