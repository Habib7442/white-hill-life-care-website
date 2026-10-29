import Image from "next/image"

import { CapsuleTilt } from "@/components/hero/capsule-tilt"
import { HeroHighlights } from "@/components/hero/hero-highlights"
import { Container } from "@/components/layout/container"
import { buttonVariants } from "@/components/ui/button"
import { heroCapsule, heroTrust } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export function Hero() {
  return (
    <section
      id={sectionIds.top}
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-linear-to-br from-white to-sky-100"
    >
      <Container className="grid items-center gap-4 pt-(--header-height) md:gap-8 lg:min-h-[600px] lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-12">
        <div className="pb-10 md:pt-14 lg:pt-6 lg:pb-12">
          <h1
            id="hero-heading"
            className="hero-slide font-display text-[34px] leading-[1.2] font-semibold tracking-[-0.02em] text-black min-[400px]:text-[40px] sm:text-[52px] lg:text-[56px] xl:text-[64px]"
          >
            Quality Medicines.
            <br />{" "}
            Healthier Lives.
          </h1>

          <p className="hero-rise mt-6 max-w-[34rem] [--i:1] text-base leading-[1.65] text-slate-800 lg:text-[17px]">
            Making quality-focused pharmaceutical products accessible to
            healthcare professionals, pharmacies and distributors.
          </p>

          <div className="hero-rise mt-8 flex flex-col gap-2.5 [--i:2] sm:flex-row sm:gap-4">
            <a
              href={`#${sectionIds.medicines}`}
              className={buttonVariants({ shape: "rounded" })}
            >
              Explore our medicines
            </a>
            <a
              href={`#${sectionIds.contact}`}
              className={buttonVariants({
                variant: "outline",
                shape: "rounded",
                className: "bg-white/45 hover:bg-white",
              })}
            >
              Become a distributor
            </a>
          </div>

          <ul className="hero-rise mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-muted [--i:3] lg:gap-x-4 lg:text-[13px] xl:flex-nowrap">
            {heroTrust.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2 xl:whitespace-nowrap">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-4 shrink-0 text-blue-600"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Above the headline on phones, below it on tablets, right column on
            desktop. Layers: tilt > float > pop, so the transforms don't clash. */}
        <div className="order-first mt-4 h-[170px] md:order-none md:mt-0 md:h-auto md:pb-10 lg:pb-0">
          <CapsuleTilt className="h-full md:h-auto">
            <div className="hero-float h-full md:h-auto">
              <Image
                src={heroCapsule.src}
                width={heroCapsule.width}
                height={heroCapsule.height}
                alt=""
                aria-hidden="true"
                priority
                sizes="(min-width: 1024px) 520px, (min-width: 768px) 400px, 300px"
                className="hero-pop mx-auto h-full w-auto max-w-full object-contain md:h-auto md:max-h-[300px] lg:max-h-[min(62vh,520px)]"
              />
            </div>
          </CapsuleTilt>
        </div>
      </Container>

      <div className="bg-navy-900 py-8 lg:py-10">
        <HeroHighlights />
      </div>
    </section>
  )
}
