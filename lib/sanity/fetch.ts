import { cacheLife, cacheTag } from "next/cache"

import { client } from "./client"
import {
  productBySlugQuery,
  productSlugsQuery,
  productsQuery,
  siteSettingsQuery,
} from "./queries"

// Content is cached until Sanity's publish webhook calls /api/revalidate,
// which revalidates by document type (the tags below). Product data shows the
// category title, so a renamed category refreshes products too.

export async function getProducts() {
  "use cache"
  cacheLife("max")
  cacheTag("product", "category")
  return client.fetch(productsQuery)
}

export async function getProductSlugs() {
  "use cache"
  cacheLife("max")
  cacheTag("product", "category")
  return client.fetch(productSlugsQuery)
}

export async function getProductBySlug(slug: string) {
  "use cache"
  cacheLife("max")
  cacheTag("product", "category")
  return client.fetch(productBySlugQuery, { slug })
}

export async function getSiteSettings() {
  "use cache"
  cacheLife("max")
  cacheTag("siteSettings")
  return client.fetch(siteSettingsQuery)
}
