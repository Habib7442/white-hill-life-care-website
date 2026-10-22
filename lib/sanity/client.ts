import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "@/sanity/env"

// Public dataset: read-only, no token, published content only.
// useCdn: false so a page rebuilt right after a save never caches data from
// Sanity's CDN that is a moment behind. Results are cached by Next
// ("use cache" in fetch.ts), so Sanity is queried only when content changes.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
})
