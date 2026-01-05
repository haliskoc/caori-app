"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { TrackerProvider } from "@/components/tracker-provider";
import { AppShell } from "@/components/app-shell";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <TrackerProvider>
        <AppShell>{children}</AppShell>
      </TrackerProvider>
    </UserProvider>
  );
}
