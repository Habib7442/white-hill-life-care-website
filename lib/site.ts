import {
  BadgeCheck,
  FileText,
  FlaskConical,
  HeartPulse,
  Leaf,
  MapPin,
  Microscope,
  Pill,
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

export const heroImages = {
  desktop: { src: "/brand/hero-bg.webp", width: 1672, height: 941 },
  mobile: { src: "/brand/hero-bg-mobile.webp", width: 1122, height: 1402 },
} as const

export type HeroCategory = {
  title: string
  text: string
  href: `#${string}`
  icon: LucideIcon
}

export const heroCategories: HeroCategory[] = [
  {
    title: "Pharmaceuticals",
    text: "Quality medicines for better health",
    href: `#${sectionIds.medicines}`,
    icon: Pill,
  },
  {
    title: "Nutraceuticals",
    text: "Everyday nutrition for active living",
    href: `#${sectionIds.medicines}`,
    icon: Leaf,
  },
  {
    title: "Wellness Products",
    text: "Care for every stage of life",
    href: `#${sectionIds.medicines}`,
    icon: HeartPulse,
  },
  {
    title: "Commitment to Quality",
    text: "Carefully sourced, clearly labelled",
    href: `#${sectionIds.quality}`,
    icon: ShieldCheck,
  },
]

export type HeroHighlight = {
  label: string
  icon: LucideIcon
}

export const heroHighlights: HeroHighlight[] = [
  { label: "Scientific Formulations", icon: Microscope },
  { label: "Quality Manufacturing Partners", icon: BadgeCheck },
  { label: "Made for Healthcare Professionals", icon: Stethoscope },
  { label: "Focus on India's Health & Wellness", icon: MapPin },
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
