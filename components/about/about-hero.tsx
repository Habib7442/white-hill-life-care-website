import Image from "next/image"
import Link from "next/link"

import { Reveal } from "@/components/reveal"
import { medicinesHref } from "@/lib/products"
import { contactHref } from "@/lib/site-nav"

export function AboutHero() {
  return (
    <section aria-label="About WhiteHill Lifecares" className="relative w-full overflow-hidden">
      <div className="relative flex min-h-[380px] w-full items-center justify-center overflow-hidden sm:min-h-[440px] lg:min-h-[500px]">
        {/* Full-bleed Crystal-Clear Icy Blue Glass Honeycomb Wave Artwork */}
        <Image
          src="/brand/about-hero.webp"
          alt="Icy blue glass honeycomb wave with molecular networks"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center select-none"
        />

        {/* Soft atmospheric overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"
        />

        {/* Centered Headline & Action Buttons (Figma matching) */}
        <Reveal className="relative z-10 mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[#13234a] sm:text-5xl lg:text-[56px] lg:leading-[1.1]">
            About Us
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5 sm:mt-8">
            <Link
              href={medicinesHref}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-blue-700 sm:text-base"
            >
              Explore our medicines
            </Link>
            <Link
              href={contactHref}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-blue-600/70 bg-white/40 px-6 py-2.5 text-sm font-medium text-blue-600 shadow-xs transition-colors hover:bg-white sm:text-base"
            >
              Contact us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
