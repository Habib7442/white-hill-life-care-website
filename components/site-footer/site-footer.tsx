import Image from "next/image"
import Link from "next/link"
import { cacheLife } from "next/cache"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"

import { Container } from "@/components/layout/container"
import { CompanyName } from "@/components/typography/company-name"
import { contactWhatsappMessage, formatPhone, telHref } from "@/lib/contact"
import { medicinesDisclaimer, medicinesHref, productHref } from "@/lib/products"
import { getProducts, getSiteSettings } from "@/lib/sanity/fetch"
import { company } from "@/lib/site"
import { sectionIds } from "@/lib/site-nav"
import { whatsappHref } from "@/lib/whatsapp"

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
  "inline-flex min-h-8 items-center rounded-tag text-sm text-ink-on-navy transition-colors duration-150 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-blue-300"

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
  const address =
    settings?.address?.trim() ||
    "Sumi Nath, Silpukuri, Near GMC,\nPub Sarania, Chandmari,\nGuwahati, Kamrup Metropolitan,\nAssam - 781003"
  const phone = settings?.phone?.trim() || company.whatsapp
  const email = settings?.email?.trim() || "whitehilllifecarespvtltd@gmail.com"
  const whatsappNumber = settings?.whatsapp?.trim() || company.whatsapp

  const registrations = [
    ["CIN", settings?.cin],
    ["GSTIN", settings?.gstin],
    ["Drug licence", settings?.drugLicence],
    ["FSSAI", settings?.fssaiLicence],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]?.trim()))

  return (
    <footer className="bg-navy-900 py-12 text-ink-on-navy lg:py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Column 1: Brand & Overview (4 cols) */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex rounded-tag focus-visible:outline-2 focus-visible:outline-blue-300"
            >
              <Image
                src={company.logoWhite.src}
                alt={company.legalName}
                width={company.logoWhite.width}
                height={company.logoWhite.height}
                sizes="80px"
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-on-navy">
              {company.description}
            </p>
            {whatsappNumber && (
              <div className="mt-5">
                <a
                  href={whatsappHref(whatsappNumber, contactWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-700/80 bg-blue-800/40 px-3.5 py-1.5 text-xs font-medium text-white transition-colors duration-150 hover:bg-blue-800/70 focus-visible:outline-2 focus-visible:outline-blue-300"
                >
                  <MessageCircle aria-hidden="true" strokeWidth={1.8} className="size-3.5 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          {/* Column 2: Company Navigation (2 cols) */}
          <div className="lg:col-span-2">
            <FooterLinks heading="Company" links={companyLinks} />
          </div>

          {/* Column 3: Medicines Catalog (3 cols) */}
          <div className="lg:col-span-3">
            <FooterLinks
              heading="Medicines"
              links={[
                ...products.slice(0, FOOTER_MEDICINE_COUNT).map((product) => ({
                  label: product.name,
                  mark: product.mark,
                  href: productHref(product.slug),
                })),
                { label: "View all medicines →", href: medicinesHref },
              ]}
            />
          </div>

          {/* Column 4: Contact & Office Details (3 cols) */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact & Office
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm text-ink-on-navy">
              {address && (
                <li className="flex items-start gap-2.5">
                  <MapPin
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="mt-0.5 size-4 shrink-0 text-blue-300"
                  />
                  <address className="text-xs leading-relaxed text-ink-on-navy whitespace-pre-line not-italic sm:text-[13px]">
                    {address}
                  </address>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2.5">
                  <Phone
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-4 shrink-0 text-blue-300"
                  />
                  <a href={telHref(phone)} className={linkClasses}>
                    {formatPhone(phone)}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-4 shrink-0 text-blue-300"
                  />
                  <a href={`mailto:${email}`} className={`${linkClasses} break-all`}>
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Compliance Strip */}
        <div className="mt-12 border-t border-blue-700/60 pt-6 text-sm leading-[1.6]">
          <p className="text-xs leading-relaxed text-ink-on-navy/90 sm:text-sm">
            {medicinesDisclaimer}
          </p>
          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-ink-on-navy/80 sm:text-[13px]">
              © {year} <CompanyName legal onNavy />. All rights reserved.
            </p>
            {registrations.length > 0 && (
              <p className="text-xs text-ink-on-navy/70">
                {registrations.map(([label, value]) => `${label}: ${value.trim()}`).join(" · ")}
              </p>
            )}
          </div>
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
      <h2 className="text-sm font-semibold uppercase tracking-wider text-white">{heading}</h2>
      <ul className="mt-3 flex flex-col items-start space-y-1">
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
