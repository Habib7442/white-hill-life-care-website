import Image from "next/image"

import { urlFor } from "@/lib/sanity/image"

import type { ProductDetail } from "./types"

type ProductGalleryProps = {
  packImage: ProductDetail["packImage"]
  gallery: ProductDetail["gallery"]
}

// Main pack image plus static extra panels. No carousel or lightbox.
export function ProductGallery({ packImage, gallery }: ProductGalleryProps) {
  // Always set (the query filters on it); the check narrows the type.
  if (!packImage.asset) return null
  const main = packImage.asset.metadata

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-card bg-blue-25">
        <Image
          src={urlFor(packImage).width(1200).fit("max").auto("format").url()}
          alt={packImage.alt}
          width={main?.dimensions?.width ?? 1200}
          height={main?.dimensions?.height ?? 1200}
          sizes="(min-width: 1240px) 580px, (min-width: 1024px) 47vw, 100vw"
          priority
          placeholder={main?.lqip ? "blur" : "empty"}
          blurDataURL={main?.lqip ?? undefined}
          className="h-full w-full object-contain"
        />
      </div>

      {gallery && gallery.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((image) => (
            <li key={image._key}>
              <figure className="flex flex-col gap-2">
                <div className="aspect-square overflow-hidden rounded-card-sm bg-blue-25">
                  <Image
                    src={urlFor(image).width(600).fit("max").auto("format").url()}
                    alt={image.alt ?? ""}
                    width={image.asset?.metadata?.dimensions?.width ?? 600}
                    height={image.asset?.metadata?.dimensions?.height ?? 600}
                    sizes="(min-width: 1024px) 180px, 45vw"
                    className="h-full w-full object-contain"
                  />
                </div>
                {image.caption && (
                  <figcaption className="text-[13px] text-ink-muted">{image.caption}</figcaption>
                )}
              </figure>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
