import {
  BadgeCheck,
  HeartPulse,
  Leaf,
  MapPin,
  Microscope,
  Pill,
  ShieldCheck,
  Stethoscope,
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
