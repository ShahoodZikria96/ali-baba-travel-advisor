import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin, API and any parameterised/filter URLs are never useful in search.
      disallow: ["/admin/", "/api/", "/*?*utm_", "/*?*fbclid=", "/*?*gclid="],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
