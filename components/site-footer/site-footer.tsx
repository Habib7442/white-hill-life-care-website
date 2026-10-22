import Image from "next/image"
import Link from "next/link"
import { cacheLife } from "next/cache"

import { Container } from "@/components/layout/container"
import { CompanyName } from "@/components/typography/company-name"
import { formatPhone, telHref } from "@/lib/contact"
import { medicinesDisclaimer, medicinesHref, productHref } from "@/lib/products"
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"

/** How many medicines the footer lists before "View all medicines". */
const FOOTER_MEDICINE_COUNT = 6

const companyLinks = [
  { label: "Home", href: `/#${sectionIds.top}` },
  { label: "About Us", href: "/about" },
  { label: "Products", href: medicinesHref },
  { label: "Quality", href: `/#${sectionIds.quality}` },
  { label: "Contact", href: `/#${sectionIds.contact}` },
  { label: "Privacy Policy", href: "/privacy" },
]

const linkClasses =
  "inline-flex min-h-11 items-center rounded-tag text-[15px] text-ink-on-navy transition-colors duration-150 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-blue-300 lg:min-h-9"

// Cached so the year doesn't make the page dynamic (Cache Components); it
// refreshes with the rest of the cached content.
async function currentYear() {
  "use cache"
  cacheLife("max")
  return new Date().getFullYear()
}

export async function SiteFooter() {
  const [settings, products, year] = await Promise.all([
    getSiteSettings(),
    getProducts(),
    currentYear(),
  ])
  const address = settings?.address?.trim()
  const phone = settings?.phone?.trim()
  const email = settings?.email?.trim()
  const registrations = [
    ["CIN", settings?.cin],
    ["GSTIN", settings?.gstin],
    ["Drug licence", settings?.drugLicence],
    ["FSSAI", settings?.fssaiLicence],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))

  return (
    <footer className="bg-navy-900 py-12 text-ink-on-navy lg:py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Link href="/" className="inline-flex rounded-tag focus-visible:outline-2 focus-visible:outline-blue-300">
              <Image
                src={company.logoWhite.src}
                alt={company.legalName}
                width={company.logoWhite.width}
                height={company.logoWhite.height}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-md text-[15px] leading-[1.6]">
              {company.description}
            </p>
            {(address || phone || email) && (
              <div className="mt-5 text-[15px] leading-[1.6]">
                {address && (
                  <address className="whitespace-pre-line not-italic">{address}</address>
                )}
                <div className="mt-2 flex flex-col items-start">
                  {phone && (
                    <a href={telHref(phone)} className={linkClasses}>
                      {formatPhone(phone)}
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className={`${linkClasses} break-all`}>
                      {email}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          <FooterLinks heading="Company" links={companyLinks} />
          <FooterLinks
            heading="Medicines"
            links={[
              ...products.slice(0, FOOTER_MEDICINE_COUNT).map((product) => ({
                label: product.name,
                mark: product.mark,
                href: productHref(product.slug),
              })),
              { label: "View all medicines", href: medicinesHref },
            ]}
          />
        </div>

        <div className="mt-10 border-t border-blue-700 pt-6 text-sm leading-[1.6]">
          <p>{medicinesDisclaimer}</p>
          <p className="mt-3">
            © {year} <CompanyName legal onNavy />. All rights reserved.
          </p>
          {registrations.length > 0 && (
            <p className="mt-1">
              {registrations.map(([label, value]) => `${label}: ${value.trim()}`).join(" · ")}
            </p>
          )}
        </div>
      </Container>
    </footer>
  )
}

type FooterLinksProps = {
  heading: string
  links: { label: string; mark?: string | null; href: string }[]
}

function FooterLinks({ heading, links }: FooterLinksProps) {
  return (
    <nav aria-label={heading}>
      <h2 className="text-sm font-semibold text-white">{heading}</h2>
      <ul className="mt-3 flex flex-col items-start">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClasses}>
              {link.label}
              {link.mark && <sup className="ml-0.5 text-[0.6em]">{link.mark}</sup>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
