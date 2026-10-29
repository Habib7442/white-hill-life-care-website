import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ProductGrid } from "@/components/product-grid"
import { Reveal } from "@/components/reveal"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { medicinesDisclaimer, medicinesHref } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { sectionIds } from "@/lib/site-nav"

/** How many medicines the home page previews; the rest are on /medicines. */
const HOME_PREVIEW_COUNT = 10

export async function Medicines() {
  const products = await getProducts()

  return (
    <Section id={sectionIds.medicines} aria-labelledby="medicines-heading">
      <Container>
        <Reveal className="mb-8 max-w-2xl">
          <Eyebrow index="01">Our Medicines</Eyebrow>
          <SectionHeading id="medicines-heading" className="mt-3">
            Our Medicines
          </SectionHeading>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            {medicinesDisclaimer}
          </p>
        </Reveal>

        {products.length > 0 ? (
          <Reveal>
            {/* First 10 in the order set in Sanity / the admin. */}
            <ProductGrid products={products.slice(0, HOME_PREVIEW_COUNT)} />
            <div className="mt-10 flex justify-center">
              <Link href={medicinesHref} className={buttonVariants()}>
                View all medicines ({products.length})
                <ArrowRight aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" />
              </Link>
            </div>
          </Reveal>
        ) : (
          <p className="text-[15px] text-ink-muted">
            Product information will be available here soon.
          </p>
        )}
      </Container>
    </Section>
  )
}
