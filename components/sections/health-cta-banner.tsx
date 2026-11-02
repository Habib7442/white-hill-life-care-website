import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Reveal } from "@/components/reveal"

export function HealthCtaBanner() {
  const gradientStyle = {
    background: "linear-gradient(90deg, #B7D4FF 0%, rgba(44, 72, 158, 0.74) 100%)",
  }

  return (
    <Section tone="white" className="pt-0 pb-16 sm:pb-20 lg:pb-24">
      <Container>
        <Reveal
          className="relative overflow-hidden rounded-hero border border-blue-200/60 shadow-sm"
          style={gradientStyle}
        >
          <div className="w-full" style={gradientStyle}>
            <div className="grid items-center gap-6 lg:grid-cols-12">
              {/* Left Content */}
              <div className="relative z-10 p-6 sm:p-10 lg:col-span-7 lg:py-16 lg:pl-14 lg:pr-4">
                <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
                  Care for Your Health, Effortlessly
                </h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-800/90 sm:text-lg">
                  Explore trusted medicines and wellness essentials with assured quality and reliable
                  supply.
                </p>
                <div className="mt-8">
                  <Link
                    href="/medicines"
                    className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-7 py-3 text-[15px] font-semibold text-slate-900 shadow-sm transition-[color,background-color,box-shadow,transform] duration-150 hover:bg-white/95 hover:shadow-md motion-safe:hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Explore Medicines</span>
                    <ArrowRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="size-4.5 transition-transform duration-150 motion-safe:group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>

              {/* Right Image: guaranteed height, flush against the right edge */}
              <div className="relative flex h-[300px] w-full items-center justify-end sm:h-[380px] lg:col-span-5 lg:h-[420px]">
                <Image
                  src="/brand/capsules-hand.png"
                  alt="Hands pouring health and wellness capsules from a medicine bottle"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-contain object-right select-none drop-shadow-md"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
