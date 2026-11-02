import { BadgeCheck, ClipboardList, FlaskConical, Truck } from "lucide-react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"

interface Milestone {
  number: string
  title: string
  text: string
  icon: typeof BadgeCheck
}

const milestones: Milestone[] = [
  {
    number: "1",
    title: "Certified manufacturing",
    text: "Our medicines are made by WHO-GMP certified manufacturing partners and noted on each pack.",
    icon: BadgeCheck,
  },
  {
    number: "2",
    title: "Considered formulations",
    text: "Every formulation is chosen with a clear purpose and listed with its full composition.",
    icon: FlaskConical,
  },
  {
    number: "3",
    title: "Clear labelling",
    text: "Composition, pack size, storage and Rx status are printed on the pack and shown on our website.",
    icon: ClipboardList,
  },
  {
    number: "4",
    title: "Reliable supply",
    text: "We plan stock with our distributors and stockists so orders can be met on time.",
    icon: Truck,
  },
]

const numberGradientStyle = {
  backgroundImage: "linear-gradient(180deg, #2563EB 0%, rgba(255, 255, 255, 0) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}

export function AboutQuality() {
  return (
    <section aria-labelledby="quality-approach-heading" className="bg-white py-16 lg:py-24">
      <Container>
        {/* Left-Aligned Header */}
        <Reveal className="mb-12 flex max-w-2xl flex-col items-start text-left sm:mb-16">
          <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
            Quality
          </span>
          <h2
            id="quality-approach-heading"
            className="mt-3.5 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px]"
          >
            Our approach to quality
          </h2>
        </Reveal>

        {/* Desktop Winding Wave Layout (>= 1024px) */}
        <div className="relative hidden lg:block h-[580px] w-full max-w-[1140px] mx-auto select-none">
          {/* Continuous Organic Winding Ribbon Wave SVG */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
            viewBox="0 0 1000 500"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="quality-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="35%" stopColor="#2563EB" />
                <stop offset="70%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
            <path
              d="M 0,335 C 20,335 35,335 50,335 C 150,335 240,355 380,335 C 470,320 540,210 620,190 C 720,165 830,140 920,155 C 955,160 980,145 1000,135"
              stroke="url(#quality-wave-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>

          {/* Milestone 1: Node at (5%, 67%), Content above */}
          <div
            className="absolute z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg transition-transform duration-200 hover:scale-110"
            style={{ left: "5%", top: "67%" }}
          >
            <BadgeCheck aria-hidden="true" strokeWidth={1.8} className="size-7 text-blue-600" />
          </div>
          <div
            className="absolute z-10 flex w-[280px] items-start justify-between gap-3"
            style={{ left: "1%", top: "18%" }}
          >
            <div className="max-w-[190px]">
              <h3 className="font-heading text-xl font-bold leading-snug text-black">
                {milestones[0].title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {milestones[0].text}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-heading text-[130px] font-bold leading-none select-none"
              style={numberGradientStyle}
            >
              {milestones[0].number}
            </span>
          </div>

          {/* Milestone 2: Node at (38%, 67%), Content below */}
          <div
            className="absolute z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg transition-transform duration-200 hover:scale-110"
            style={{ left: "38%", top: "67%" }}
          >
            <FlaskConical aria-hidden="true" strokeWidth={1.8} className="size-7 text-blue-600" />
          </div>
          <div
            className="absolute z-10 flex w-[320px] items-start gap-4"
            style={{ left: "24%", top: "74%" }}
          >
            <span
              aria-hidden="true"
              className="font-heading text-[130px] font-bold leading-none select-none"
              style={numberGradientStyle}
            >
              {milestones[1].number}
            </span>
            <div className="max-w-[200px] pt-3">
              <h3 className="font-heading text-xl font-bold leading-snug text-black">
                {milestones[1].title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {milestones[1].text}
              </p>
            </div>
          </div>

          {/* Milestone 3: Node at (62%, 38%), Content above */}
          <div
            className="absolute z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg transition-transform duration-200 hover:scale-110"
            style={{ left: "62%", top: "38%" }}
          >
            <ClipboardList aria-hidden="true" strokeWidth={1.8} className="size-7 text-blue-600" />
          </div>
          <div
            className="absolute z-10 flex w-[310px] items-start justify-between gap-3"
            style={{ left: "41%", top: "6%" }}
          >
            <div className="max-w-[200px]">
              <h3 className="font-heading text-xl font-bold leading-snug text-black">
                {milestones[2].title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {milestones[2].text}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-heading text-[130px] font-bold leading-none select-none"
              style={numberGradientStyle}
            >
              {milestones[2].number}
            </span>
          </div>

          {/* Milestone 4: Node at (92%, 31%), Content below */}
          <div
            className="absolute z-20 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg transition-transform duration-200 hover:scale-110"
            style={{ left: "92%", top: "31%" }}
          >
            <Truck aria-hidden="true" strokeWidth={1.8} className="size-7 text-blue-600" />
          </div>
          <div
            className="absolute z-10 flex w-[300px] items-start justify-between gap-3"
            style={{ left: "69%", top: "39%" }}
          >
            <div className="max-w-[190px] pt-3">
              <h3 className="font-heading text-xl font-bold leading-snug text-black">
                {milestones[3].title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">
                {milestones[3].text}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="font-heading text-[130px] font-bold leading-none select-none"
              style={numberGradientStyle}
            >
              {milestones[3].number}
            </span>
          </div>
        </div>

        {/* Tablet & Mobile Layout (< 1024px) */}
        <div className="lg:hidden">
          {/* Tablet 2x2 Grid (640px to 1023px) */}
          <div className="hidden sm:grid sm:grid-cols-2 gap-6">
            {milestones.map(({ number, title, text, icon: Icon }) => (
              <Reveal
                key={number}
                className="relative flex flex-col justify-between rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/60 via-white to-white p-7 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-full border border-slate-100 bg-white shadow-md">
                    <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-blue-600" />
                  </div>
                  <span
                    aria-hidden="true"
                    className="font-heading text-6xl font-bold leading-none select-none"
                    style={numberGradientStyle}
                  >
                    {number}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-heading text-xl font-bold text-black leading-snug">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile Vertical Connected Timeline (< 640px) */}
          <div className="relative sm:hidden">
            <div className="absolute top-6 bottom-6 left-6 w-1 rounded-full bg-gradient-to-b from-blue-700 via-blue-500 to-blue-300" />

            <div className="space-y-8">
              {milestones.map(({ number, title, text, icon: Icon }) => (
                <Reveal key={number} className="relative flex items-start gap-4 pl-1">
                  <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white shadow-md">
                    <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-blue-600" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 to-white p-5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-bold text-black leading-snug">
                        {title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="font-heading text-4xl font-bold leading-none select-none"
                        style={numberGradientStyle}
                      >
                        {number}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
