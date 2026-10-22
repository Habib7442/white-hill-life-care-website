import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import {
  isPrescriptionOnly,
  prescriptionCaution,
  productHref,
  type Product,
} from "@/lib/products"
import { urlFor } from "@/lib/sanity/image"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, mark, slug, composition, description, dosageForm, pack, packImage } =
    product
  const isRx = isPrescriptionOnly(product.schedule)
  const dimensions = packImage.asset.metadata?.dimensions
  const lqip = packImage.asset.metadata?.lqip

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-blue-100 bg-white transition-colors duration-150 hover:border-blue-300 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blue-600">
      {/* Square, edge to edge: pack photos are square with their own
          background. Other ratios letterbox on blue-25, never cropped. */}
      <div className="aspect-square bg-blue-25">
        <Image
          src={urlFor(packImage).width(800).fit("max").auto("format").url()}
          alt={packImage.alt}
          width={dimensions?.width ?? 800}
          height={dimensions?.height ?? 800}
          sizes="(min-width: 1240px) 380px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip ?? undefined}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
        {/* No category tag: therapy areas aren't shown as labels (AGENTS §10.9). */}
        {isRx && (
          <div className="flex flex-wrap gap-2">
            <Chip variant="rx">
              <span aria-hidden="true">Rx</span>
              <span className="sr-only">Prescription only</span>
            </Chip>
          </div>
        )}

        <h3 className="font-heading text-[22px] leading-tight font-bold text-navy-900 lg:text-2xl">
          {/* The link's ::after covers the whole card, so the card is one tab stop. */}
          <Link
            href={productHref(slug)}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {name}
            {mark && <sup className="ml-0.5 text-[0.5em]">{mark}</sup>}
          </Link>
        </h3>

        {/* Clamped to keep cards short; the detail page shows the full text. */}
        <p className="line-clamp-2 text-[15px] leading-normal font-medium text-blue-600">
          {composition}
        </p>

        {description && !isRx && (
          <p className="line-clamp-2 text-[15px] leading-[1.6] text-ink-muted">{description}</p>
        )}

        {(dosageForm || pack) && (
          <dl className="mt-auto flex flex-wrap gap-x-6 gap-y-1 border-t border-line pt-4 text-sm text-ink-muted">
            {dosageForm && (
              <div className="flex gap-1">
                <dt className="font-semibold text-ink">Dosage form:</dt>
                <dd>{dosageForm}</dd>
              </div>
            )}
            {pack && (
              <div className="flex gap-1">
                <dt className="font-semibold text-ink">Pack:</dt>
                <dd>{pack}</dd>
              </div>
            )}
          </dl>
        )}

        {isRx && (
          <p className="text-[13px] leading-normal text-ink-faint">{prescriptionCaution}</p>
        )}

        {/* Looks like a button; the card-wide title link handles the click,
            so this is hidden from assistive tech to avoid a duplicate link. */}
        <span
          aria-hidden="true"
          className={buttonVariants({
            size: "sm",
            className: "mt-1 w-full group-hover:bg-blue-700",
          })}
        >
          View details
          <ArrowRight strokeWidth={1.8} data-icon="inline-end" />
        </span>
      </div>
    </article>
  )
}
