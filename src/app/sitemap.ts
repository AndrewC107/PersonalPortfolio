import type { MetadataRoute } from "next";

// Single-page portfolio.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date(),
    },
  ];
}


