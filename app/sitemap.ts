import type { MetadataRoute } from "next"

import { productHref } from "@/lib/products"
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
    ...products.map(({ slug }) => ({
      url: new URL(productHref(slug), siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
