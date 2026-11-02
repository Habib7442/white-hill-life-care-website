import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "cn"

import { Container } from "@/components/layout/container"
import { MoleculeField } from "@/components/molecules/molecule-field"
import { Reveal } from "@/components/reveal"
import { qualityPoints, qualitySection, type QualityPoint } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

// "Our Commitment to Quality" (prompts/quality-section-redesign.md): four
// numbered cards on navy; the featured third card is blue with a photo.
export function Quality() {
  return (
    <section
      id={sectionIds.quality}
      aria-labelledby="quality-heading"
      className="relative overflow-hidden bg-navy-900 py-16 lg:pt-20 lg:pb-24"
    >
      <MoleculeField />
      <Container className="relative">
        <Reveal className="max-w-[40rem] text-left">
          <p className="inline-flex rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold tracking-[0.12em] text-white uppercase">
            {qualitySection.eyebrow}
          </p>
          <h2
            id="quality-heading"
            className="mt-4 font-display text-[30px] leading-[1.15] font-semibold tracking-[-0.01em] text-white lg:text-[44px]"
          >
            {qualitySection.heading}
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-white/85 lg:text-base">
            {qualitySection.intro}
          </p>
        </Reveal>

        <Reveal stagger className="mt-10 lg:mt-14">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-center lg:gap-6">
            {qualityPoints.map((point, index) => (
              <li
                key={point.label}
                style={{ "--i": index } as CSSProperties}
                className="reveal-item h-full lg:h-auto"
              >
                {point.featured ? (
                  <FeaturedCard point={point} number={index + 1} />
                ) : (
                  <QualityCard point={point} number={index + 1} />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  )
}

const formatNumber = (n: number) => `${String(n).padStart(2, "0")}.`

function Pill({ children, inverted }: { children: React.ReactNode; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit rounded-full px-3 py-1.5 text-xs leading-none font-semibold",
        inverted ? "bg-white text-blue-600" : "bg-blue-600 text-white"
      )}
    >
      {children}
    </span>
  )
}

type CardProps = { point: QualityPoint; number: number }

function QualityCard({ point, number }: CardProps) {
  return (
    <article className="flex h-full flex-col rounded-card-sm bg-white p-5 transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-navy-900/30 motion-safe:hover:-translate-y-1 lg:min-h-[17rem]">
      <h3>
        <Pill>{point.label}</Pill>
      </h3>
      <p className="mt-4 text-sm leading-[1.6] text-slate-800">{point.short}</p>
      <p
        aria-hidden="true"
        className="mt-auto pt-8 font-display text-[56px] leading-none font-semibold tracking-[-0.02em] text-blue-600 xl:text-[64px]"
      >
        {formatNumber(number)}
      </p>
    </article>
  )
}

function FeaturedCard({ point, number }: CardProps) {
  const featured = point.featured!

  return (
    <article className="flex h-full flex-col rounded-card-sm bg-blue-600 p-5 shadow-xl shadow-navy-900/40 lg:-my-6 lg:min-h-[23rem]">
      <div className="flex items-start justify-between gap-3">
        <p>
          <Pill inverted>{point.label}</Pill>
        </p>
        <span
          aria-hidden="true"
          className="font-display text-[28px] leading-none font-semibold text-white/70"
        >
          {formatNumber(number)}
        </span>
      </div>
      <div className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl bg-blue-700">
        <Image
          src={featured.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-lg leading-snug font-semibold text-white">{featured.title}</h3>
      <p className="mt-2 text-[13px] leading-[1.6] text-white/90 lg:text-sm">{point.short}</p>
    </article>
  )
}
