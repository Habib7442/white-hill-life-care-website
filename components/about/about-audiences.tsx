import { Hospital, Network, Stethoscope } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"

function PharmacyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 9l1-5h16l1 5" />
      <path d="M4 9a2 2 0 0 1 2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8a2 2 0 0 1 2-2" />
      <path d="M12 13v4" />
      <path d="M10 15h4" />
    </svg>
  )
}

export function AboutAudiences() {
  return (
    <section aria-labelledby="audiences-heading" className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Heading & Narrative */}
          <Reveal className="flex flex-col items-start lg:col-span-5">
            <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
              Who We Work With
            </span>

            <h2
              id="audiences-heading"
              className="mt-4 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px] lg:leading-[1.18]"
            >
              <span className="text-blue-600">Built for</span> the people who{" "}
              <span className="text-blue-600">supply</span> and{" "}
              <span className="text-blue-600">prescribe</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600 sm:text-[17px]">
              Empowering healthcare professionals with smarter solutions for seamless supply and
              better patient care.
            </p>
          </Reveal>

          {/* Right Column: Balanced 2x2 Bento Cards */}
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:col-span-7">
            {/* Card 1: Distributors & stockists */}
            <Reveal className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-blue-600/25 motion-safe:hover:-translate-y-1 sm:p-7">
              <div>
                <Network aria-hidden="true" strokeWidth={1.8} className="size-7 text-white" />
                <h3 className="mt-5 font-heading text-lg font-bold text-white sm:text-xl">
                  Distributors & stockists
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                Product details and a direct line to us for stocking enquiries.
              </p>
            </Reveal>

            {/* Card 2: Pharmacies */}
            <Reveal className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-blue-600/25 motion-safe:hover:-translate-y-1 sm:p-7">
              <div>
                <PharmacyIcon className="size-7 text-white" />
                <h3 className="mt-5 font-heading text-lg font-bold text-white sm:text-xl">
                  Pharmacies
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                Clear compositions and pack sizes for every medicine we offer.
              </p>
            </Reveal>

            {/* Card 3: Healthcare professionals */}
            <Reveal className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-blue-600/25 motion-safe:hover:-translate-y-1 sm:p-7">
              <div>
                <Stethoscope aria-hidden="true" strokeWidth={1.8} className="size-7 text-white" />
                <h3 className="mt-5 font-heading text-lg font-bold text-white sm:text-xl">
                  Healthcare professionals
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                Accurate composition, strengths and Rx status for each product.
              </p>
            </Reveal>

            {/* Card 4: Hospitals & clinics */}
            <Reveal className="flex flex-col justify-between rounded-2xl bg-blue-600 p-6 text-white shadow-sm transition-[translate,box-shadow] duration-200 ease-out hover:shadow-lg hover:shadow-blue-600/25 motion-safe:hover:-translate-y-1 sm:p-7">
              <div>
                <Hospital aria-hidden="true" strokeWidth={1.8} className="size-7 text-white" />
                <h3 className="mt-5 font-heading text-lg font-bold text-white sm:text-xl">
                  Hospitals & clinics
                </h3>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-white/90">
                Reliable supply channels and documentation for institutional dispensing.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
