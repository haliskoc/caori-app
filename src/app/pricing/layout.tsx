import type { Metadata } from "next";
import { t } from "@/lib/core/i18n";

export const metadata: Metadata = {
    title: t("Ücretlendirme"),
    description: t("Calmet paketlerini keşfedin. Ücretsiz, Pro ve AI Plus seçenekleriyle size en uygun planı seçin."),
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
