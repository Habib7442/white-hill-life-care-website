import Image from "next/image"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { CompanyName } from "@/components/typography/company-name"

export function AboutWhoWeAre() {
  return (
    <section aria-labelledby="who-heading" className="bg-white py-12 lg:py-16">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Image of Indian Pharmaceutical Specialist */}
          <Reveal className="relative overflow-hidden rounded-2xl border border-blue-100/80 bg-blue-50/30 shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-md">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/brand/about-pharma-specialist.webp"
                alt="Indian pharmaceutical quality assurance specialist inspecting medicine packaging in a modern facility"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          {/* Right Column: Pill, Dual-tone Heading, Narrative */}
          <Reveal>
            <div className="flex flex-col items-start">
              <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
                Who We Are
              </span>

              <h2
                id="who-heading"
                className="mt-4 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px] lg:leading-[1.18]"
              >
                Working towards a <span className="text-blue-600">healthier India</span>
              </h2>

              <div className="mt-6 space-y-4 text-base leading-[1.7] text-slate-700 sm:text-[17px]">
                <p>
                  Good health is the foundation of a better tomorrow. That belief guides our work at{" "}
                  <CompanyName />, as we help make quality medicines and wellness products easier to
                  access for people across India.
                </p>
                <p>
                  Our role is marketing and distribution. Our medicines are made by{" "}
                  <strong className="font-semibold text-black">WHO-GMP</strong> certified
                  manufacturing partners, and we make sure each one reaches the market with clear,
                  accurate information. Consistent quality and responsible practices guide every
                  step.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
