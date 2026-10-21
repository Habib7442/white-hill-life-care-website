export const sectionIds = {
  top: "top",
  main: "main",
  about: "about",
  focusAreas: "focus-areas",
  medicines: "medicines",
  quality: "quality",
  contact: "contact",
} as const

// Links point at "/#section" so they also work from other pages
// (e.g. /medicines/[slug]); on the home page the browser just scrolls.
export type NavLink = {
  label: string
  href: `/#${string}`
}

export const mainNav: NavLink[] = [
  { label: "Home", href: `/#${sectionIds.top}` },
  { label: "About Us", href: `/#${sectionIds.about}` },
  { label: "Products", href: `/#${sectionIds.medicines}` },
  { label: "Contact", href: `/#${sectionIds.contact}` },
]

export const headerCta: NavLink = {
  label: "Connect With Us",
  href: `/#${sectionIds.contact}`,
}
