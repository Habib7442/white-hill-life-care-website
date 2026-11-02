import Image from "next/image"

import { Reveal } from "@/components/reveal"

export function MedicinesHero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative flex min-h-[440px] w-full items-center justify-center overflow-hidden sm:min-h-[500px] lg:min-h-[616px]">
        {/* Full-bleed Crystal-Clear 3D Glassy Capsules & Molecular Networks Artwork */}
        <Image
          src="/brand/glassy-capsules-hero.webp"
          alt="Glassy pharmaceutical capsules and molecular networks"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center select-none"
        />

        {/* Soft Figma Linear Gradient Overlay (#E6EFF4 to #2563EB) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#e6eff4]/35 via-transparent to-[#2563eb]/15"
        />

        {/* Subtle center scrim ensuring 100% text legibility without blurring the artwork */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-white/20 backdrop-blur-[0.5px]"
        />

        {/* Centered Headline & Description */}
        <Reveal className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 lg:py-24">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-[50px] lg:leading-[1.15]">
            Advancing Healthcare. Enhancing Lives.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-relaxed text-slate-800 sm:text-base lg:text-[17px]">
            Discover quality pharmaceutical products developed with a commitment to care,
            innovation, and better health outcomes.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
