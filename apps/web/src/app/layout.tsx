import type { Metadata, Viewport } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { resolveRequestLocale } from "@/lib/core/resolve-request-locale";
import { syncActiveLocale, t } from "@/lib/core/i18n";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();
  syncActiveLocale(locale);

  return {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://calmet.ai"),
  title: {
    default: t("Calmet - Akıllı Sağlık ve Kalori Takibi", undefined, locale),
    template: `%s | Calmet`,
  },
  description: t(
    "AI destekli kalori, su ve aktivite takibi asistanı. Sağlıklı yaşam hedeflerinize ulaşmak için en akıllı yol.",
    undefined,
    locale
  ),
  keywords: [
    "kalori takibi",
    "diyet asistanı",
    "su takip",
    "aktivite takip",
    "sağlıklı yaşam",
    "fitness",
    "AI health coach",
    "calorie tracker",
  ],
  authors: [{ name: "Calmet Team" }],
  creator: "Calmet App",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://calmet.ai",
    siteName: "Calmet",
    title: t("Calmet - Akıllı Sağlık ve Kalori Takibi", undefined, locale),
    description: t(
      "AI destekli kalori, su ve aktivite takibi asistanı. Sağlıklı yaşam hedeflerinize ulaşmak için en akıllı yol.",
      undefined,
      locale
    ),
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calmet Dashboad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t("Calmet - Akıllı Sağlık ve Kalori Takibi", undefined, locale),
    description: t(
      "AI destekli kalori, su ve aktivite takibi asistanı. Sağlıklı yaşam hedeflerinize ulaşmak için en akıllı yol.",
      undefined,
      locale
    ),
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "sxiDQZxIaJ-BwvuKmxqYZKTcISYbMLZSf3pu0R9jdhU",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://calmet.ai",
    languages: {
      tr: "/?hl=tr",
      en: "/?hl=en",
      es: "/?hl=es",
      fr: "/?hl=fr",
      ru: "/?hl=ru",
      pt: "/?hl=pt",
    },
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialLocale = await resolveRequestLocale();
  syncActiveLocale(initialLocale);

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Calmet",
        "item": "https://calmet.ai"
      }
    ]
  };

  return (
    <html lang={initialLocale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.variable} ${spaceMono.variable} antialiased font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
        />
        <AppProviders initialLocale={initialLocale}>{children}</AppProviders>
      </body>
    </html>
  );
}
