import { siteUrl } from "@/shared/lib/site-origin";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl.toString()}/sitemap.xml`,
  };
}
