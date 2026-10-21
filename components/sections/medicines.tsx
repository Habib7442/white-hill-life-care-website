import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { MedicinesCatalog } from "@/components/sections/medicines-catalog"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { medicinesDisclaimer } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { sectionIds } from "@/lib/site-nav"

export async function Medicines() {
  const products = await getProducts()

  return (
    <Section id={sectionIds.medicines} aria-labelledby="medicines-heading">
      <Container>
        <div className="mb-8 max-w-2xl">
          <Eyebrow index="03">Our Medicines</Eyebrow>
          <SectionHeading id="medicines-heading" className="mt-3">
            Our Medicines
          </SectionHeading>
          <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
            {medicinesDisclaimer}
          </p>
        </div>

        {products.length > 0 ? (
          <MedicinesCatalog products={products} />
        ) : (
          <p className="text-[15px] text-ink-muted">
            Product information will be available here soon.
          </p>
        )}
      </Container>
    </Section>
  )
}
