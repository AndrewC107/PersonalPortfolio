import type { MetadataRoute } from "next";

// TODO: Set to your real production domain (must match metadataBase in layout).
const SITE_URL = "https://example.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}


