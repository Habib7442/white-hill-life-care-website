import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { buttonVariants } from "@/components/ui/button"
import { medicinesHref, rangeHref } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { exploreRange } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

function findTile(slug: string) {
  return exploreRange.tiles.find((tile) => tile.slug === slug)
}

export function generateStaticParams() {
  return exploreRange.tiles.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/range/[slug]">): Promise<Metadata> {
  const tile = findTile((await params).slug)
  if (!tile) return { title: "Page not found", robots: { index: false, follow: true } }

  return {
    title: `${tile.title}: coming soon`,
    description: `The ${tile.title.toLowerCase()} range from WhiteHill Lifecares is in preparation.`,
    // Thin placeholder page: kept out of search results and the sitemap.
    robots: { index: false, follow: true },
  }
}

// "Coming soon" page for a range card on the home page that has no products yet.
export default function RangePage({ params }: PageProps<"/range/[slug]">) {
  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="min-h-[70svh] bg-white" />}>
          <RangeContent params={params} />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}

async function RangeContent({ params }: { params: PageProps<"/range/[slug]">["params"] }) {
  const tile = findTile((await params).slug)
  if (!tile) notFound()

  // An old link can land here after products were added: point to them instead.
  const productsHref = rangeHref(tile.match, await getProducts())

  return (
    <section aria-labelledby="range-heading" className="bg-white pt-(--header-height)">
      <Container className="pt-8 pb-20 lg:pb-28">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Our Medicines", href: medicinesHref },
            { label: tile.title },
          ]}
        />

        <div className="mx-auto mt-12 flex max-w-[36rem] flex-col items-center text-center lg:mt-16">
          <div className="flex size-32 items-center justify-center rounded-card bg-mist lg:size-40">
            <div className="relative size-20 lg:size-24">
              <Image src={tile.icon} alt="" fill sizes="96px" className="object-contain" />
            </div>
          </div>

          <p className="mt-8 text-xs font-semibold tracking-[0.14em] text-blue-600 uppercase lg:text-[13px]">
            {productsHref ? "Now available" : "Coming soon"}
          </p>
          <h1
            id="range-heading"
            className="mt-3 font-display text-[34px] leading-[1.15] font-semibold text-black lg:text-[44px]"
          >
            {tile.title}
          </h1>
          <p className="mt-4 text-base leading-[1.65] text-slate-800 lg:text-[17px]">
            {productsHref
              ? `Our ${tile.title.toLowerCase()} range is now listed with our medicines.`
              : `We are preparing our ${tile.title.toLowerCase()} range. In the meantime, see the medicines available today or send us an enquiry.`}
          </p>

          <div className="mt-8 flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-4">
            <Link
              href={productsHref ?? medicinesHref}
              className={buttonVariants({ shape: "rounded" })}
            >
              {productsHref ? `View ${tile.title.toLowerCase()}` : "View available medicines"}
            </Link>
            <Link
              href={`/#${sectionIds.contact}`}
              className={buttonVariants({ variant: "outline", shape: "rounded" })}
            >
              Send an enquiry
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
