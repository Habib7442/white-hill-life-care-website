import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { rangeHref } from "@/lib/products"
import { getProducts } from "@/lib/sanity/fetch"
import { exploreRange } from "@/lib/site"

// Eight range cards. Each opens the filtered /medicines list once a product
// matches it, otherwise its "Coming soon" page (app/range/[slug]).
export async function ExploreRange() {
  const products = await getProducts()

  return (
    <section aria-labelledby="explore-heading" className="bg-white py-16 lg:py-20">
      <Container>
        <Reveal className="max-w-[40rem]">
          <h2
            id="explore-heading"
            className="font-display text-[30px] leading-[1.15] font-semibold tracking-[-0.01em] text-black lg:text-[44px]"
          >
            {exploreRange.heading}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-slate-800 lg:text-[17px]">
            {exploreRange.intro}
          </p>
        </Reveal>

        <Reveal stagger className="mt-10 lg:mt-12">
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {exploreRange.tiles.map(({ slug, title, text, icon, match }, index) => (
              <li
                key={slug}
                style={{ "--i": index * 0.5 } as CSSProperties}
                className="reveal-item"
              >
                <Link
                  href={rangeHref({ slug, match }, products) ?? `/range/${slug}`}
                  className="group relative flex h-full flex-col rounded-card-sm bg-blue-50 p-4 transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-navy-900/8 motion-safe:hover:-translate-y-1 sm:p-5"
                >
                  <div className="relative mx-auto size-16 sm:size-[88px]">
                    <Image
                      src={icon}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 88px, 64px"
                      className="object-contain transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex flex-1 items-end justify-between gap-2 sm:mt-5">
                    <div className="min-w-0">
                      <h3 className="font-display text-base leading-snug font-semibold text-black sm:text-xl">
                        {title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-snug text-ink-muted sm:text-sm">
                        {text}
                      </p>
                    </div>
                    {/* Top-right corner on phones so the text gets the card's full width. */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 right-3 flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors duration-150 group-hover:bg-blue-600 group-hover:text-white sm:static sm:size-10"
                    >
                      <ArrowUpRight strokeWidth={1.8} className="size-4 sm:size-5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
