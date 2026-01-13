import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import { defaultLocale, t } from "@/lib/i18n";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: t("Calmet - Sağlıklı Yaşam Takibi"),
  description: t("Kalori, su ve aktivite takibi için profesyonel sağlık platformu."),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={`${outfit.variable} ${spaceMono.variable} antialiased font-sans`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
