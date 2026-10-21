import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId } from "@/sanity/env"

// Public dataset: read-only, no token, published content only.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
})
