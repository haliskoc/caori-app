"use client";

import { auth0 } from "@/lib/auth0";
import { TrackerProvider } from "@/components/tracker-provider";
import { AppShell } from "@/components/app-shell";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <auth0.UserProvider>
      <TrackerProvider>
        <AppShell>{children}</AppShell>
      </TrackerProvider>
    </auth0.UserProvider>
  );
}
