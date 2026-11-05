import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { CompanyName } from "@/components/typography/company-name"

export function AboutOverview() {
  return (
    <section aria-labelledby="about-overview-heading" className="bg-white py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Pill, Dual-tone Heading, Narrative */}
          <Reveal>
            <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
              About Us
            </span>

            <h2
              id="about-overview-heading"
              className="mt-4 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px] lg:leading-[1.18]"
            >
              <span className="text-blue-600">Medicines</span> for better support of health
            </h2>

            <p className="mt-6 text-base leading-[1.7] text-slate-700 sm:text-[17px]">
              <CompanyName legal /> is an Indian pharmaceutical company. Our medicines and wellness
              products are chosen with care, and every pack lists its full composition, so doctors
              and pharmacists know exactly what they are recommending.
            </p>
          </Reveal>

          {/* Right Column: Indian Doctor & Family Photography */}
          <Reveal className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-blue-50/30 shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/brand/about-doctor-family.webp"
                alt="Compassionate Indian doctor consulting with an Indian family in a modern clinic"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
