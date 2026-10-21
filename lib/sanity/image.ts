import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url"

import { dataset, projectId } from "@/sanity/env"

const builder = createImageUrlBuilder({ projectId, dataset })

// Pack images are never cropped (DESIGN.md): ignore any crop/hotspot set in
// Studio, so a fixed width × height letterboxes instead of trimming the pack.
export function urlFor(source: SanityImageSource) {
  return builder.image(source).ignoreImageParams()
}
