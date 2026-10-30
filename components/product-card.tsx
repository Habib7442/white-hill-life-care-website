import Image from "next/image"
import Link from "next/link"
import { Package, Pill, PillBottle, Tablets } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import {
  isPrescriptionOnly,
  productBadge,
  productHref,
  type Product,
} from "@/lib/products"
import { urlFor } from "@/lib/sanity/image"

type ProductCardProps = {
  product: Product
}

const metaIcon = { "aria-hidden": true, strokeWidth: 1.8, className: "size-4 text-ink-muted" }

/** Liquids get a bottle, tablets the tablets icon, anything else a pill. */
function DosageFormIcon({ form }: { form: string }) {
  const value = form.toLowerCase()
  if (value.includes("tablet")) return <Tablets {...metaIcon} />
  if (/suspension|syrup|drop|solution|liquid/.test(value)) return <PillBottle {...metaIcon} />
  return <Pill {...metaIcon} />
}

export function ProductCard({ product }: ProductCardProps) {
  const { name, mark, slug, composition, description, dosageForm, pack, packImage } =
    product
  const isRx = isPrescriptionOnly(product.schedule)
  const badge = productBadge(product)
  const lqip = packImage.asset.metadata?.lqip
  // Rx products show facts only (AGENTS §10.2): composition, never the description.
  const line = isRx ? composition : description || composition

  return (
    <article className="group relative flex h-full flex-col rounded-card-sm bg-blue-25 p-5 transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-navy-900/8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-blue-600 motion-safe:hover:-translate-y-1">
      {/* Same box on every card: pack photos are transparent PNGs that sit on
          the card colour, centred, with equal top and bottom padding, never
          cropped. */}
      <div className="relative h-[180px] md:h-[240px]">
        <Image
          src={urlFor(packImage).width(800).fit("max").auto("format").url()}
          alt={packImage.alt}
          fill
          sizes="(min-width: 1240px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip ?? undefined}
          className="object-contain py-4 transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.03]"
        />
        {badge === "rx" && (
          <Chip variant="rx" className="absolute top-0 left-0">
            <span aria-hidden="true">Rx</span>
            <span className="sr-only">Prescription only</span>
          </Chip>
        )}
        {badge === "nutraceutical" && (
          <Chip variant="nutraceutical" className="absolute top-0 left-0">
            Nutraceutical
          </Chip>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl leading-snug font-semibold text-black">
        {/* The link's ::after covers the whole card, so the card is one tab stop. */}
        <Link
          href={productHref(slug)}
          className="outline-none after:absolute after:inset-0 after:content-['']"
        >
          {name}
          {mark && <sup className="ml-0.5 text-[0.5em]">{mark}</sup>}
        </Link>
      </h3>

      {/* Clamped to keep cards even; the detail page shows the full text. */}
      {line && (
        <p className="mt-2 line-clamp-2 text-sm leading-[1.55] text-ink-muted">{line}</p>
      )}

      {(dosageForm || pack) && (
        <dl className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-5 text-[13px] text-ink">
          {/* Form label muted, pack size bolder so it stands out. */}
          {dosageForm && (
            <div className="flex items-center gap-1.5 text-ink-faint">
              <dt>
                <DosageFormIcon form={dosageForm} />
                <span className="sr-only">Dosage form</span>
              </dt>
              <dd>{dosageForm}</dd>
            </div>
          )}
          {pack && (
            <div className="flex items-center gap-1.5 font-semibold">
              <dt>
                <Package {...metaIcon} />
                <span className="sr-only">Pack</span>
              </dt>
              <dd>{pack}</dd>
            </div>
          )}
        </dl>
      )}

      {/* Looks like a button; the card-wide title link handles the click,
          so this is hidden from assistive tech to avoid a duplicate link. */}
      <span
        aria-hidden="true"
        className={buttonVariants({
          variant: "outline",
          shape: "rounded",
          size: "sm",
          className: "mt-4 w-full hover:bg-white",
        })}
      >
        View Details
      </span>
    </article>
  )
}
