import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroCategories } from "@/components/hero/hero-categories"
import { HeroHighlights } from "@/components/hero/hero-highlights"
import { HeroImage } from "@/components/hero/hero-image"
import { Container } from "@/components/layout/container"
import { CompanyName } from "@/components/typography/company-name"
import { Eyebrow } from "@/components/typography/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export function Hero() {
  return (
    <section
      id={sectionIds.top}
      aria-labelledby="hero-heading"
      className="relative bg-blue-25"
    >
      <div className="relative flex items-center overflow-hidden pt-(--header-height) lg:min-h-[620px]">
        <Container className="relative z-10 pt-12 pb-24 lg:pt-16 lg:pb-28">
          <div className="max-w-[36rem] lg:max-w-[30rem] xl:max-w-[36rem]">
            <Eyebrow>{company.tagline}</Eyebrow>

            <h1
              id="hero-heading"
              className="mt-4 font-display text-[38px] leading-[1.05] font-extrabold tracking-[-0.02em] text-navy-900 lg:text-[60px]"
            >
              Quality Medicines,{" "}
              <span className="text-blue-600">Healthier Lives.</span>
            </h1>

            <p className="mt-6 text-base leading-[1.65] text-ink-muted lg:text-[17px]">
              <CompanyName /> is an India-based pharmaceutical marketing
              company, bringing quality, reliable and affordable medicines to
              distributors, pharmacies and healthcare professionals for better
              support of health.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`#${sectionIds.medicines}`}
                className={buttonVariants()}
              >
                Explore Our Medicines
                <ArrowRight data-icon="inline-end" />
              </a>
              <Link
                href="/about"
                className={buttonVariants({ variant: "outline" })}
              >
                Know More
              </Link>
            </div>
          </div>
        </Container>

        {/* Photo fills the hero at every size. Below lg it's the portrait shot,
            off-centre and washed out so it never competes with the text. */}
        <div className="absolute inset-0">
          <HeroImage />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-blue-25/95 via-blue-25/85 to-blue-25/70 lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-linear-to-r from-blue-25 from-25% via-blue-25/70 via-45% to-blue-25/0 to-65% lg:block"
          />
        </div>
      </div>

      {/* Navy starts exactly at the photo's bottom edge; the cards straddle it. */}
      <div className="bg-navy-900 pb-10 lg:pb-12">
        <HeroCategories />
        <HeroHighlights />
      </div>
    </section>
  )
}
