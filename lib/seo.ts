import type { Metadata } from "next"

import { company } from "@/lib/site"

export const productionUrl = "https://whitehilllifecares.com"

// Canonical URL for metadata, Open Graph, JSON-LD, sitemap and robots.
// Defaults to production so a missing env var never leaks localhost into SEO;
// set NEXT_PUBLIC_SITE_URL=http://localhost:3000 in .env.local for dev.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || productionUrl)

const defaultTitle = `${company.legalName} — Pharmaceutical Company, India`

export const rootMetadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: defaultTitle,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: company.legalName,
    title: defaultTitle,
    description: company.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: company.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    legalName: company.legalName,
    url: siteUrl.href,
    logo: new URL(company.logo.src, siteUrl).href,
    description: company.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: "IN",
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: company.legalName,
    url: siteUrl.href,
    inLanguage: "en-IN",
  }
}

const medicinesTitle = "Our Medicines"
const medicinesDescription = `Browse ${company.name} medicines: composition, pack sizes and dosage forms.`

/** Metadata for the /medicines listing. The site's Open Graph image is inherited. */
export const medicinesMetadata: Metadata = {
  title: medicinesTitle,
  description: medicinesDescription,
  alternates: { canonical: "/medicines" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/medicines",
    siteName: company.legalName,
    title: `${medicinesTitle} | ${company.name}`,
    description: medicinesDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${medicinesTitle} | ${company.name}`,
    description: medicinesDescription,
  },
}

type ProductSeoInput = {
  name: string
  slug: string
  composition: string
  dosageForm: string
  pack: string | null
  seo: { title?: string | null; description?: string | null } | null
  image: { url: string; alt: string }
}

/** Metadata for /medicines/[slug]. Values come from Sanity product fields. */
export function productMetadata(product: ProductSeoInput): Metadata {
  const title = product.seo?.title || `${product.name} ${product.dosageForm}`
  const description =
    product.seo?.description ||
    [product.composition, product.pack].filter(Boolean).join(". ")
  const url = `/medicines/${product.slug}`
  // An SEO title from Sanity already includes the brand, so skip the template.
  const fullTitle = product.seo?.title ? title : `${title} | ${company.name}`

  return {
    title: product.seo?.title ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: company.legalName,
      title: fullTitle,
      description,
      images: [{ url: product.image.url, width: 1200, height: 630, alt: product.image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [product.image.url],
    },
  }
}
