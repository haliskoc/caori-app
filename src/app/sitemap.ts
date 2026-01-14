import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://calmet.ai";
    const pages = ["", "pricing", "help", "faq", "contact", "legal/privacy", "legal/terms", "legal/kvkk"];

    const routes: MetadataRoute.Sitemap = [];

    pages.forEach((page) => {
        // Add default page
        routes.push({
            url: `${baseUrl}/${page}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: page === "" ? 1 : 0.8,
        });

        // Add language specific alternates if using subpaths (optional, but good for SEO)
        // For now, we just list the main pages.
    });

    return routes;
}
