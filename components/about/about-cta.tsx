import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { contactWhatsappMessage } from "@/lib/contact"
import { contactHref } from "@/lib/site-nav"
import { whatsappHref } from "@/lib/whatsapp"

export function AboutCta({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <section aria-labelledby="about-cta-heading" className="bg-white pb-16 lg:pb-24">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[#0A1A3A] px-6 py-16 text-center sm:px-12 sm:py-20 lg:py-24 shadow-xl">
          {/* Background Molecular Image */}
          <Image
            src="/brand/about-cta-bg.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="pointer-events-none object-cover object-center select-none"
          />

          {/* Vignette Overlay for High-Contrast Text Legibility */}
          <div
            className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,_rgba(10,26,58,0.55)_0%,_rgba(10,26,58,0.85)_100%]"
            aria-hidden="true"
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2
              id="about-cta-heading"
              className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[44px] lg:leading-[1.18]"
            >
              Interested in working with us?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
              Distributors, stockists and pharmacies can send an enquiry and we will get back to
              you.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-4">
              <Link
                href={contactHref}
                className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-blue-600 px-7 py-3 text-[15px] font-medium text-white shadow-md transition-[background-color,transform] duration-150 hover:bg-blue-700 motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Send an enquiry
              </Link>
              <a
                href={whatsappHref(whatsappNumber, contactWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl border border-white/80 bg-transparent px-7 py-3 text-[15px] font-medium text-white transition-[background-color,border-color,transform] duration-150 hover:bg-white/10 hover:border-white motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Chat on Whatsapp
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
