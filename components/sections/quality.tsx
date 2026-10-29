import type { CSSProperties } from "react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CornerMolecule } from "@/components/molecules/corner-molecule"
import { Reveal } from "@/components/reveal"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { qualityPoints } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export function Quality() {
  return (
    <Section
      id={sectionIds.quality}
      tone="navy"
      aria-labelledby="quality-heading"
      className="relative overflow-hidden"
    >
      <CornerMolecule className="absolute -bottom-10 -left-12 hidden w-60 opacity-15 lg:block" />
      <Container className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow index="02" onNavy>
            Quality
          </Eyebrow>
          <SectionHeading id="quality-heading" onNavy className="mt-3">
            Our commitment to quality
          </SectionHeading>
          <p className="mt-4 text-base leading-[1.65] lg:text-[17px]">
            Simple standards we hold every medicine to, so you know exactly what you are getting.
          </p>
        </Reveal>

        <Reveal stagger className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {qualityPoints.map(({ title, text, icon: Icon }, index) => (
              <li
                key={title}
                style={{ "--i": index } as CSSProperties}
                className="reveal-item rounded-card-sm border border-blue-700 p-6"
              >
                <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-blue-300" />
                <h3 className="mt-4 text-[17px] font-semibold text-white">{title}</h3>
                <p className="mt-2 text-[15px] leading-[1.6]">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
