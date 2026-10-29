import {
  Atom,
  BadgeCheck,
  FileText,
  FlaskConical,
  HandHeart,
  MapPin,
  Package,
  ShieldCheck,
  Sprout,
  Stethoscope,
  Store,
  Tags,
  Truck,
  Warehouse,
  type LucideIcon,
} from "lucide-react"

import { sectionIds } from "@/lib/site-nav"

export const company = {
  name: "WhiteHill Lifecares",
  legalName: "WhiteHill Lifecares Pvt Ltd",
  shortName: "WhiteHill",
  /** As printed under the logo on the packs. */
  tagline: "Healthcare & Wellness",
  description:
    "WhiteHill Lifecares is an India-based pharmaceutical marketing company offering quality-led medicines for better support of health.",
  /** Enquiry WhatsApp number (client-supplied). Sanity siteSettings.whatsapp overrides it when set. */
  whatsapp: "+91 70029 16175",
  logo: {
    src: "/brand/whitehill-logo.webp",
    width: 640,
    height: 523,
  },
  /** White version for the navy footer. */
  logoWhite: {
    src: "/brand/whitehill-logo-white.webp",
    width: 640,
    height: 517,
  },
  /** WH leaf mark only (no wordmark), used on the splash screen. */
  mark: {
    src: "/brand/whitehill-mark.webp",
    width: 600,
    height: 372,
  },
} as const

/** Opened capsule on the hero (decorative, transparent background). */
export const heroCapsule = {
  src: "/brand/hero-capsule.webp",
  width: 1200,
  height: 900,
} as const

export type RangeTile = {
  title: string
  text: string
  href: string
  image: { src: string; width: number; height: number }
  tone: "blue" | "mint" | "sand" | "slate"
}

/** Section after the hero (prompts/product-range-section.md). */
export const productRange = {
  heading: "Committed to Better Health and Wellness",
  text: "Medicines chosen with a clear purpose, for distributors, pharmacies and healthcare professionals.",
  /** Original image generated in Canva for WhiteHill (no third-party licence). */
  image: { src: "/brand/range/dna-helix.webp", width: 900, height: 1204 },
  tiles: [
    {
      title: "Pharmaceuticals",
      text: "Quality medicines for better health",
      href: "/medicines",
      image: { src: "/brand/range/pharmaceuticals.webp", width: 603, height: 640 },
      tone: "blue",
    },
    {
      title: "Nutraceuticals",
      text: "Everyday nutrition for active living",
      href: "/medicines",
      image: { src: "/brand/range/nutraceuticals.webp", width: 640, height: 528 },
      tone: "mint",
    },
    {
      title: "Wellness Products",
      text: "Care for every stage of life",
      href: "/medicines",
      image: { src: "/brand/range/wellness.webp", width: 640, height: 535 },
      tone: "sand",
    },
    {
      title: "Quality Assured",
      text: "Carefully sourced, clearly labelled",
      href: `/#${sectionIds.quality}`,
      image: { src: "/brand/range/quality.webp", width: 640, height: 486 },
      tone: "slate",
    },
  ] satisfies RangeTile[],
}

export type HeroTrustItem = {
  label: string
  icon: LucideIcon
}

// Modest, factual points for a newly launched marketing company: no counts or years.
export const heroTrust: HeroTrustItem[] = [
  { label: "A growing range of medicines", icon: Package },
  // Approved wording (AGENTS.md §10.6): never shorten it.
  { label: "WHO-GMP Certified Manufacturing Partners", icon: ShieldCheck },
  { label: "Distribution across India", icon: MapPin },
]

export type HeroHighlight = {
  label: string
  /** Supporting line under the label. */
  text: string
  icon: LucideIcon
}

export const heroHighlights: HeroHighlight[] = [
  {
    label: "Scientific Formulations",
    text: "Each formula chosen with a clear purpose",
    icon: Atom,
  },
  {
    label: "Quality Manufacturing Partners",
    text: "Manufacturer named on every pack",
    icon: BadgeCheck,
  },
  {
    label: "Made for Healthcare Professionals",
    text: "Full composition and Rx status for every product",
    icon: Stethoscope,
  },
  {
    label: "Focus on India's Health & Wellness",
    text: "Marketing and supplying medicines across India",
    icon: HandHeart,
  },
]

export type IconCard = {
  title: string
  text: string
  icon: LucideIcon
}

export const companyValues: IconCard[] = [
  {
    title: "Quality-led formulations",
    text: "Each medicine is chosen with a clear purpose and made by WHO-GMP certified manufacturing partners.",
    icon: FlaskConical,
  },
  {
    title: "Transparent information",
    text: "Composition, pack, storage and manufacturer details are shared openly on the pack and on our website.",
    icon: FileText,
  },
  {
    title: "Responsible growth",
    text: "We add medicines to our range one at a time, only when we can supply them properly.",
    icon: Sprout,
  },
]

export const audiences: IconCard[] = [
  {
    title: "Distributors & stockists",
    text: "Product details and a direct line to us for stocking enquiries.",
    icon: Warehouse,
  },
  {
    title: "Pharmacies",
    text: "Clear compositions and pack sizes for every medicine we offer.",
    icon: Store,
  },
  {
    title: "Healthcare professionals",
    text: "Accurate composition, strengths and Rx status for each product.",
    icon: Stethoscope,
  },
]

export const qualityPoints: IconCard[] = [
  {
    title: "Certified manufacturing",
    text: "Our medicines are made by WHO-GMP certified manufacturing partners, named on each pack.",
    icon: ShieldCheck,
  },
  {
    title: "Considered formulations",
    text: "Every formulation is chosen with a clear purpose and listed with its full composition.",
    icon: FlaskConical,
  },
  {
    title: "Clear labelling",
    text: "Composition, pack size, storage and Rx status are printed on the pack and shown on our website.",
    icon: Tags,
  },
  {
    title: "Reliable supply",
    text: "We plan stock with our distributors and stockists so orders can be met on time.",
    icon: Truck,
  },
]
