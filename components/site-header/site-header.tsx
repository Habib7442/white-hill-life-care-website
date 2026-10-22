import Image from "next/image"

import { Container } from "@/components/layout/container"
import { HeaderShell } from "@/components/site-header/header-shell"
import { MobileMenu } from "@/components/site-header/mobile-menu"
import { buttonVariants } from "@/components/ui/button"
import { company } from "@/lib/site"
import { headerCta, mainNav, sectionIds } from "@/lib/site-nav"

type SiteHeaderProps = {
  /** Pass on pages without the hero so the header is solid from the top. */
  solid?: boolean
}

export function SiteHeader({ solid = false }: SiteHeaderProps) {
  return (
    <HeaderShell solid={solid}>
      <a
        href={`#${sectionIds.main}`}
        className="sr-only rounded-tag bg-blue-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        Skip to content
      </a>

      <Container className="relative flex h-(--header-height) items-center justify-between gap-6">
        <a
          href={`/#${sectionIds.top}`}
          className="flex shrink-0 items-center rounded-tag"
        >
          <Image
            src={company.logo.src}
            alt={company.legalName}
            width={company.logo.width}
            height={company.logo.height}
            loading="eager"
            // Shown 52–60 px tall (~74 px wide); without sizes the 2x candidate is 1920 px.
            sizes="74px"
            className="h-13 w-auto nav:h-15"
          />
        </a>

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-1 lg:gap-3">
            {mainNav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-tag px-3 text-[15px] font-medium text-ink-muted transition-colors duration-150 hover:text-blue-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={headerCta.href}
          className={buttonVariants({
            size: "sm",
            className: "hidden nav:inline-flex",
          })}
        >
          {headerCta.label}
        </a>

        <MobileMenu links={mainNav} cta={headerCta} />
      </Container>
    </HeaderShell>
  )
}
