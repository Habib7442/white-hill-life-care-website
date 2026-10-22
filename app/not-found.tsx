import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Container } from "@/components/layout/container"
import { SiteFooter } from "@/components/site-footer/site-footer"
import { SiteHeader } from "@/components/site-header/site-header"
import { Eyebrow } from "@/components/typography/eyebrow"
import { buttonVariants } from "@/components/ui/button"
import { sectionIds } from "@/lib/site-nav"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader solid />
      <main
        id={sectionIds.main}
        tabIndex={-1}
        className="flex flex-1 items-center bg-linear-to-b from-white to-blue-25 pt-(--header-height) outline-none"
      >
        <Container className="flex flex-col items-center py-20 text-center lg:py-28">
          <NotFoundMolecule />
          <Eyebrow className="mt-8">Error 404</Eyebrow>
          <h1 className="mt-3 font-heading text-[30px] leading-[1.15] font-bold text-navy-900 lg:text-[40px]">
            Page not found
          </h1>
          <p className="mt-4 max-w-md text-base leading-[1.65] text-ink-muted">
            The page you&rsquo;re looking for may have moved or no longer exists.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonVariants()}>
              <ArrowLeft aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
              Back to home
            </Link>
            <Link
              href={`/#${sectionIds.medicines}`}
              className={buttonVariants({ variant: "outline" })}
            >
              View our medicines
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  )
}

// Small decorative molecule with one "missing" atom (dashed ring).
function NotFoundMolecule() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 120"
      className="h-28 w-auto text-blue-600 lg:h-32"
      fill="none"
    >
      <g className="stroke-blue-200" strokeWidth="3" strokeLinecap="round">
        <line x1="40" y1="70" x2="85" y2="40" />
        <line x1="85" y1="40" x2="125" y2="70" />
        <line x1="85" y1="40" x2="85" y2="12" />
        <line x1="40" y1="70" x2="22" y2="100" />
      </g>
      <line
        x1="125"
        y1="70"
        x2="168"
        y2="44"
        className="stroke-blue-200"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 7"
      />
      <circle cx="85" cy="40" r="16" className="fill-blue-600" />
      <circle cx="40" cy="70" r="12" className="fill-blue-300" />
      <circle cx="125" cy="70" r="12" className="fill-blue-300" />
      <circle cx="85" cy="12" r="7" className="fill-blue-200" />
      <circle cx="22" cy="100" r="7" className="fill-blue-200" />
      <circle
        cx="168"
        cy="44"
        r="14"
        className="stroke-blue-300"
        strokeWidth="3"
        strokeDasharray="5 6"
      />
    </svg>
  )
}
