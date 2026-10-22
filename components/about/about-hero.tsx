import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { AboutMolecule } from "@/components/about/about-molecule"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Container } from "@/components/layout/container"
import { CompanyName } from "@/components/typography/company-name"
import { Eyebrow } from "@/components/typography/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { medicinesHref } from "@/lib/products"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

export function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="bg-blue-25 pt-(--header-height)">
      <Container className="pt-8 pb-16 lg:pb-24">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About us" }]} />

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>About us</Eyebrow>
            <h1
              id="about-heading"
              className="mt-3 font-heading text-[30px] leading-[1.15] font-bold text-navy-900 lg:text-[44px]"
            >
              Medicines for better support of health, with the facts in plain view
            </h1>
            <p className="mt-5 text-base leading-[1.65] text-ink-muted lg:text-[17px]">
              <CompanyName legal /> is a newly established, India-based pharmaceutical marketing
              company. We work with distributors, stockists, pharmacies and healthcare
              professionals to make a focused range of medicines available.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={medicinesHref} className={buttonVariants()}>
                Explore our medicines
                <ArrowRight aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" />
              </Link>
              <Link
                href={`/#${sectionIds.contact}`}
                className={buttonVariants({ variant: "outline" })}
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-hero border border-blue-100 bg-white dot-grid">
            <AboutMolecule className="mx-auto h-65 w-auto p-6 sm:h-80 lg:h-105" />
            <div className="absolute bottom-4 left-4 flex items-center rounded-card-sm border border-blue-100 bg-white px-4 py-3 lg:bottom-6 lg:left-6">
              <Image
                src={company.mark.src}
                alt=""
                width={company.mark.width}
                height={company.mark.height}
                className="h-7 w-auto lg:h-9"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
