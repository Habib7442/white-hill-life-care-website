import { CircleCheck, Download, MessageCircle } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Chip } from "@/components/ui/chip"
import {
  isPrescriptionOnly,
  prescriptionAudience,
  prescriptionCaution,
  productHref,
  productTypeLabels,
  scheduleLabels,
} from "@/lib/products"
import { siteUrl } from "@/lib/seo"
import { productEnquiryMessage, whatsappHref } from "@/lib/whatsapp"

import type { ProductDetail } from "./types"

export function ProductSummary({
  product,
  whatsappNumber,
}: {
  product: ProductDetail
  whatsappNumber: string
}) {
  const enquiryHref = whatsappHref(
    whatsappNumber,
    productEnquiryMessage({
      name: product.name,
      mark: product.mark,
      pack: product.pack,
      url: new URL(productHref(product.slug), siteUrl).href,
    })
  )
  const isRx = isPrescriptionOnly(product.schedule)
  const supports = product.supports?.filter(Boolean) ?? []

  const facts = [
    { label: "Dosage form", value: product.dosageForm },
    { label: "Pack", value: product.pack },
    { label: "Pack type", value: product.packType },
    { label: "Product type", value: product.productType && productTypeLabels[product.productType] },
    { label: "Schedule", value: scheduleLabels[product.schedule] },
    { label: "Shelf life", value: product.shelfLife },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value))

  return (
    <div className="flex flex-col gap-5">
      {isRx && (
        <div className="flex flex-wrap gap-2">
          <Chip variant="rx">
            <span aria-hidden="true">Rx</span>
            <span className="sr-only">Prescription only</span>
          </Chip>
        </div>
      )}

      <h1
        id="product-heading"
        className="font-heading text-[30px] leading-[1.15] font-bold text-navy-900 lg:text-[40px]"
      >
        {product.name}
        {product.mark && <sup className="ml-1 text-[0.5em]">{product.mark}</sup>}
      </h1>

      <p className="text-[17px] leading-normal font-medium text-blue-600">
        {product.composition}
      </p>

      {/* Rx products show factual information only (AGENTS.md §10.2). */}
      {!isRx && product.description && (
        <p className="text-base leading-[1.65] text-ink-muted">{product.description}</p>
      )}

      {!isRx && supports.length > 0 && (
        <ul className="flex flex-col gap-2">
          {supports.map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[15px] text-ink">
              <CircleCheck
                aria-hidden="true"
                strokeWidth={1.8}
                className="mt-0.5 size-5 shrink-0 text-blue-600"
              />
              {line}
            </li>
          ))}
        </ul>
      )}

      {facts.length > 0 && (
        <dl className="grid gap-x-6 gap-y-3 border-y border-line py-5 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col">
              <dt className="text-[13px] font-semibold tracking-[0.06em] text-ink-faint uppercase">
                {fact.label}
              </dt>
              <dd className="text-[15px] text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {isRx && (
        <div className="border-l-4 border-navy-900 bg-blue-25 p-4 text-sm leading-normal text-ink">
          <p className="font-semibold">{prescriptionCaution}</p>
          <p className="mt-1 text-ink-muted">{prescriptionAudience}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <a href={enquiryHref} target="_blank" rel="noopener noreferrer" className={buttonVariants()}>
          <MessageCircle aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
          Send an Enquiry
          <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
        </a>
        {product.leafletUrl && (
          <a
            href={`${product.leafletUrl}?dl=`}
            className={buttonVariants({ variant: "outline" })}
          >
            <Download aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
            Download leaflet (PDF)
          </a>
        )}
      </div>
    </div>
  )
}
