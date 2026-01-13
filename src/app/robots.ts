import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/dashboard/", "/profile/", "/settings/"],
        },
        sitemap: "https://calmet.ai/sitemap.xml",
    };
}
