import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { productRange, type RangeTile } from "@/lib/site"

const toneClasses: Record<RangeTile["tone"], string> = {
  blue: "bg-tile-blue",
  mint: "bg-tile-mint",
  sand: "bg-tile-sand",
  slate: "bg-tile-slate",
}

// Feature panel plus four product-range tiles, right after the hero.
// Panel and tiles share radius (rounded-card), padding (p-6) and gap (gap-4).
export function ProductRange() {
  return (
    <section aria-labelledby="range-heading" className="bg-white py-16 lg:py-20">
      <Container>
        <Reveal
          stagger
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr] lg:grid-rows-2"
        >
          <div className="reveal-item relative flex min-h-[320px] items-end overflow-hidden rounded-card bg-blue-50 p-6 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0">
            <Image
              src={productRange.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 430px, 100vw"
              className="object-cover object-[100%_30%] sm:object-[75%_30%] lg:object-center"
            />
            {/* Brand light blue from the bottom-left so the photo isn't washed out,
                plus a scrim under the text so it never sits on bare glass. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-tr from-blue-100/60 to-transparent to-70%"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-blue-50/95 via-blue-50/75 via-55% to-transparent"
            />
            <div className="relative max-w-[22rem]">
              <h2
                id="range-heading"
                className="font-display text-[24px] leading-[1.25] font-semibold text-navy-900 sm:text-[28px] lg:text-[32px]"
              >
                {productRange.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-[1.55] text-ink-muted">
                {productRange.text}
              </p>
              <Link
                href="/about"
                className="group/link mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-blue-600 transition-colors duration-150 hover:text-blue-700"
              >
                About us
                <ArrowRight
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-4 transition-transform duration-150 motion-safe:group-hover/link:translate-x-0.5"
                />
              </Link>
            </div>
          </div>

          {productRange.tiles.map(({ title, text, href, image, tone }, index) => (
            <a
              key={title}
              href={href}
              style={{ "--i": index + 1 } as CSSProperties}
              className={`reveal-item group flex items-start justify-between gap-4 rounded-card p-6 transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-navy-900/8 motion-safe:hover:-translate-y-1 sm:flex-col-reverse sm:items-stretch ${toneClasses[tone]}`}
            >
              <div className="min-w-0 self-center sm:self-auto">
                <h3 className="font-display text-[17px] leading-snug font-semibold text-navy-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-snug text-ink-muted">{text}</p>
              </div>
              {/* Identical box on every tile so the four images read the same size. */}
              <div className="relative size-[120px] shrink-0 sm:size-[140px] sm:self-end lg:size-[150px]">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 150px, (min-width: 640px) 140px, 120px"
                  className="object-contain transition-transform duration-200 ease-out motion-safe:group-hover:scale-[1.04]"
                />
              </div>
            </a>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
