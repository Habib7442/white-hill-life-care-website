import { Suspense } from "react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { ProductGrid } from "@/components/product-grid"
import { MedicinesCatalog } from "@/components/sections/medicines-catalog"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { Eyebrow } from "@/components/typography/eyebrow"
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
          <Container className="pt-8 pb-16 lg:pb-24">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our Medicines" }]} />

            <div className="mt-6 mb-8 max-w-2xl">
              <Eyebrow>Our Medicines</Eyebrow>
              <h1 className="mt-3 font-heading text-[30px] leading-[1.15] font-bold text-navy-900 lg:text-[40px]">
                Our Medicines
              </h1>
              <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">{medicinesDisclaimer}</p>
            </div>

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
