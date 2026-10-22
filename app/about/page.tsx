import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AboutCta } from "@/components/about/about-cta"
import { AboutHero } from "@/components/about/about-hero"
import { CompanyFacts } from "@/components/about/company-facts"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CornerMolecule } from "@/components/molecules/corner-molecule"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { Eyebrow } from "@/components/typography/eyebrow"
import { SectionHeading } from "@/components/typography/section-heading"
import { buttonVariants } from "@/components/ui/button"
import { categoryOptions, medicinesHref } from "@/lib/products"
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch"
import { aboutMetadata } from "@/lib/seo"
import { audiences, company, companyValues, qualityPoints } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export const metadata = aboutMetadata

export default async function AboutPage() {
  const [settings, products] = await Promise.all([getSiteSettings(), getProducts()])
  const categories = categoryOptions(products)

  return (
    <>
      <SiteHeader solid />
      <main id={sectionIds.main} tabIndex={-1} className="outline-none">
        <AboutHero />

        {/* Who we are */}
        <Section aria-labelledby="who-heading">
          <Container className="grid gap-6 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Who we are</Eyebrow>
              <SectionHeading id="who-heading" className="mt-3">
                A young company with a careful approach
              </SectionHeading>
            </div>
            <div className="text-base leading-[1.65] text-ink-muted lg:col-span-7 lg:pt-8 lg:text-[17px]">
              <p>
                We started WhiteHill Lifecares to offer medicines that people in the supply chain
                can stock and recommend with confidence. Our role is marketing and distribution:
                our medicines are made by WHO-GMP certified manufacturing partners, and we make
                sure each one reaches the market with clear, accurate information.
              </p>
              <p className="mt-4">
                We are starting small on purpose. Rather than a long list of products, we are
                building a focused range and adding new medicines step by step, as each one is
                ready.
              </p>
            </div>
          </Container>
        </Section>

        {/* Values */}
        <Section tone="tint" aria-labelledby="values-heading">
          <Container>
            <div className="mb-8 max-w-2xl">
              <Eyebrow>Our values</Eyebrow>
              <SectionHeading id="values-heading" className="mt-3">
                What guides our work
              </SectionHeading>
            </div>
            <ul className="grid gap-4 lg:grid-cols-3 lg:gap-6">
              {companyValues.map(({ title, text, icon: Icon }) => (
                <li key={title} className="rounded-card-sm border border-blue-100 bg-white p-6 lg:p-8">
                  <span className="flex size-13 items-center justify-center rounded-tile bg-blue-50">
                    <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-blue-600" />
                  </span>
                  <h3 className="mt-5 font-heading text-[22px] leading-[1.25] font-bold text-navy-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Audiences */}
        <Section aria-labelledby="audiences-heading">
          <Container>
            <div className="mb-8 max-w-2xl">
              <Eyebrow>Who we work with</Eyebrow>
              <SectionHeading id="audiences-heading" className="mt-3">
                Built for the people who supply and prescribe
              </SectionHeading>
            </div>
            <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
              {audiences.map(({ title, text, icon: Icon }) => (
                <li key={title} className="rounded-card-sm border border-blue-100 p-6">
                  <Icon aria-hidden="true" strokeWidth={1.8} className="size-7 text-blue-600" />
                  <h3 className="mt-4 text-[17px] font-semibold text-navy-900">{title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-muted">{text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Quality */}
        <Section tone="navy" aria-labelledby="approach-heading" className="relative overflow-hidden">
          <CornerMolecule className="absolute -top-8 -right-12 hidden w-64 opacity-15 lg:block" />
          <Container className="relative">
            <div className="mb-10 max-w-2xl">
              <Eyebrow onNavy>Quality</Eyebrow>
              <SectionHeading id="approach-heading" onNavy className="mt-3">
                Our approach to quality
              </SectionHeading>
            </div>
            <ol className="grid gap-x-16 md:grid-cols-2">
              {qualityPoints.map(({ title, text }, index) => (
                <li key={title} className="flex gap-5 border-t border-blue-700 py-6">
                  <span className="font-heading text-[28px] leading-none font-bold text-blue-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-ink-on-navy">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Range: category names come only from Sanity (AGENTS §10.9). */}
        {categories.length > 0 && (
          <Section tone="tint" aria-labelledby="range-heading">
            <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <Eyebrow>Our range</Eyebrow>
                <SectionHeading id="range-heading" className="mt-3">
                  Our current range
                </SectionHeading>
                <p className="mt-4 text-[15px] leading-[1.6] text-ink-muted">
                  Our medicines are grouped into these areas, and new medicines are being added.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {categories.map(({ value, label }) => (
                    <li key={value}>
                      <Link
                        href={`${medicinesHref}?category=${encodeURIComponent(value)}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-blue-100 bg-white px-5 text-sm font-semibold text-blue-700 transition-colors duration-150 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={medicinesHref} className={buttonVariants({ className: "self-start lg:self-auto" })}>
                View all medicines
                <ArrowRight aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" />
              </Link>
            </Container>
          </Section>
        )}

        {/* Company details */}
        <Section aria-labelledby="facts-heading">
          <Container>
            <div className="mb-8 max-w-2xl">
              <Eyebrow>Company information</Eyebrow>
              <SectionHeading id="facts-heading" className="mt-3">
                Company details
              </SectionHeading>
            </div>
            <CompanyFacts settings={settings} />
          </Container>
        </Section>

        <AboutCta whatsappNumber={settings?.whatsapp?.trim() || company.whatsapp} />
      </main>
      <SiteFooter />
    </>
  )
}
