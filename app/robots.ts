import type { MetadataRoute } from "next"

import { siteUrl } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    // /studio is a 404 in production, so there's nothing to disallow (and
    // listing it would only advertise the path).
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", siteUrl).href,
  }
}
