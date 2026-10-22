import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ProductCard } from "@/components/product-card"
import { CompositionTable } from "@/components/product-detail/composition-table"
import { ProductGallery } from "@/components/product-detail/product-gallery"
import { ProductPageSkeleton } from "@/components/product-detail/product-page-skeleton"
import { ProductSummary } from "@/components/product-detail/product-summary"
import { StorageCard } from "@/components/product-detail/storage-card"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { SectionHeading } from "@/components/typography/section-heading"
import { medicinesDisclaimer, medicinesHref, withPackImage } from "@/lib/products"
import { getProductBySlug, getProductSlugs, getSiteSettings } from "@/lib/sanity/fetch"
import { urlFor } from "@/lib/sanity/image"
import { productMetadata } from "@/lib/seo"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  // Cache Components rejects an empty list; this placeholder renders a 404.
  return slugs.length > 0 ? slugs : [{ slug: "coming-soon" }]
}

export async function generateMetadata({
  params,
}: PageProps<"/medicines/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  // Matches app/not-found.tsx, which renders when the product is missing.
  if (!product) return { title: "Page not found", robots: { index: false, follow: true } }

  return productMetadata({
    ...product,
    image: {
      // Pack on white, never cropped. JPEG so WhatsApp / social link previews render it.
      url: urlFor(product.packImage)
        .width(1200)
        .height(630)
        .fit("fill")
        .bg("ffffff")
        .format("jpg")
        .quality(80)
        .url(),
      alt: product.packImage.alt,
    },
  })
}

// The header and page frame render instantly; everything that depends on the
// slug streams in behind a skeleton (Next.js instant navigation).
export default function MedicinePage({ params }: PageProps<"/medicines/[slug]">) {
  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <Suspense fallback={<ProductPageSkeleton />}>
          <ProductPageContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

async function ProductPageContent({
  params,
}: {
  params: PageProps<"/medicines/[slug]">["params"]
}) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])
  if (!product) notFound()

  const related = withPackImage(
    product.related.length > 0 ? product.related : product.sameCategory
  )

  return (
    <>
      <article aria-labelledby="product-heading">
        <div className="bg-white pt-(--header-height)">
          <Container className="pt-8 pb-16 lg:pb-24">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Our Medicines", href: medicinesHref },
                { label: product.name },
              ]}
            />
            <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <ProductGallery packImage={product.packImage} gallery={product.gallery} />
              <ProductSummary
                product={product}
                whatsappNumber={settings?.whatsapp || company.whatsapp}
              />
            </div>
          </Container>
        </div>

        <Section tone="tint">
          <Container>
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
              <CompositionTable {...product} />
              <StorageCard {...product} />
            </div>
            <p className="mt-8 max-w-3xl text-sm leading-[1.6] text-ink-muted">
              {medicinesDisclaimer}
            </p>
          </Container>
        </Section>
      </article>

      {related.length > 0 && (
        <Section aria-labelledby="related-heading">
          <Container>
            <SectionHeading id="related-heading">Related Medicines</SectionHeading>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item) => (
                <li key={item._id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  )
}
