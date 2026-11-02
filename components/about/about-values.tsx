import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { companyValues } from "@/lib/site"

export function AboutValues() {
  return (
    <section aria-labelledby="values-heading" className="bg-white py-16 lg:py-24">
      <Container>
        {/* Left-Aligned Header (Pill and Title) */}
        <Reveal className="mb-12 flex max-w-2xl flex-col items-start text-left sm:mb-16">
          <span className="inline-flex rounded-full bg-slate-100 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
            Our Values
          </span>
          <h2
            id="values-heading"
            className="mt-3.5 font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px]"
          >
            What guides our work
          </h2>
        </Reveal>

        {/* 3-Column Card Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {companyValues.map(({ title, text, icon: Icon }, index) => (
            <Reveal
              key={title}
              className="group relative flex flex-col rounded-2xl border border-blue-200/90 bg-gradient-to-b from-blue-50/70 via-blue-50/20 to-white p-7 shadow-xs transition-[translate,box-shadow,border-color] duration-200 ease-out hover:border-blue-400/90 hover:shadow-lg hover:shadow-blue-900/5 motion-safe:hover:-translate-y-1 sm:p-8"
            >
              {/* Top Row: Navy Icon Badge & Subtle Step Number */}
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-navy-900 text-white shadow-xs transition-transform duration-200 group-hover:scale-105">
                  <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-white" />
                </div>
                <span
                  aria-hidden="true"
                  className="font-heading text-2xl font-bold tracking-tight text-blue-200 transition-colors duration-200 group-hover:text-blue-300 sm:text-3xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title & Description with natural spacing */}
              <div className="mt-6 sm:mt-7">
                <h3 className="font-heading text-xl font-bold tracking-tight text-black sm:text-2xl leading-snug">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                  {text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
