import { FocusAreaTile } from "@/components/focus-area-tile"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { categoryOptions, medicinesHref, productHref } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { focusAreaIcon } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

// One tile per Sanity category that has a visible product, in category order.
// Therapy areas come only from this data (AGENTS §10.9), never from copy.
export async function FocusAreas() {
  const products = await getProducts()
  const categories = categoryOptions(products)
  if (categories.length === 0) return null

  return (
    <Section id={sectionIds.focusAreas} tone="tint" aria-labelledby="focus-areas-heading">
      <Container>
        <div className="mb-8 max-w-2xl">
          <Eyebrow index="01">Focus areas</Eyebrow>
          <SectionHeading id="focus-areas-heading" className="mt-3">
            Therapeutic focus areas
          </SectionHeading>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            Our current medicines are grouped into these areas. New medicines are being added to
            the range.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map(({ value: slug, label: title }) => (
            <li key={slug}>
              <FocusAreaTile
                title={title}
                icon={focusAreaIcon(slug)}
                href={`${medicinesHref}?category=${encodeURIComponent(slug)}`}
                brands={products
                  .filter((product) => product.category.slug === slug)
                  .map((product) => ({
                    name: product.name,
                    mark: product.mark,
                    href: productHref(product.slug),
                  }))}
              />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
