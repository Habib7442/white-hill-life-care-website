import { Suspense } from "react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { MedicinesHero } from "@/components/medicines/medicines-hero"
import { ProductGrid } from "@/components/product-grid"
import { MedicinesCatalog } from "@/components/sections/medicines-catalog"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { medicinesDisclaimer } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { medicinesMetadata } from "@/lib/seo"
import { exploreRange } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export const metadata = medicinesMetadata

const PAGE_SIZE = 12

// The home range cards link here as ?range=<slug>; the catalog needs their rules.
const ranges = exploreRange.tiles.map(({ slug, title, match }) => ({ slug, title, match }))

export default async function MedicinesPage() {
  const products = await getProducts()

  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <div className="bg-white pt-(--header-height)">
          <MedicinesHero />

          <Container className="pt-8 pb-16 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Medicines" }]} />

            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-ink-muted sm:text-sm">
              {medicinesDisclaimer}
            </p>

            {products.length > 0 ? (
              // The catalog reads the URL (search, filters, page), so it renders
              // in the browser. Until then the first page is in the HTML, which
              // keeps product links crawlable.
              <Suspense
                fallback={
                  <>
                    <div aria-hidden="true" className="min-h-12 rounded-tag border border-field bg-white" />
                    <ProductGrid products={products.slice(0, PAGE_SIZE)} className="mt-10" />
                  </>
                }
              >
                <MedicinesCatalog products={products} pageSize={PAGE_SIZE} ranges={ranges} />
              </Suspense>
            ) : (
              <p className="text-[15px] text-ink-muted">Product information will be available here soon.</p>
            )}
          </Container>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
