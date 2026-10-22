import type { MetadataRoute } from "next"

import { medicinesHref, productHref } from "@/lib/products"
import { getProductSlugs } from "@/lib/sanity/fetch"
import { siteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProductSlugs()

  return [
    {
      url: siteUrl.href,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: new URL(medicinesHref, siteUrl).href,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: new URL("/privacy", siteUrl).href,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...products.map(({ slug }) => ({
      url: new URL(productHref(slug), siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
