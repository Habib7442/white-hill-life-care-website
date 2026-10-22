export const sectionIds = {
  top: "top",
  main: "main",
  focusAreas: "focus-areas",
  medicines: "medicines",
  quality: "quality",
  contact: "contact",
} as const

// Section links point at "/#section" so they also work from other pages
// (e.g. /medicines/[slug]); on the home page the browser just scrolls.
// "About Us" and "Products" are their own pages.
export type NavLink = {
  label: string
  href: `/#${string}` | "/medicines" | "/about"
}

export const mainNav: NavLink[] = [
  { label: "Home", href: `/#${sectionIds.top}` },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/medicines" },
  { label: "Contact", href: `/#${sectionIds.contact}` },
]

export const headerCta: NavLink = {
  label: "Connect With Us",
  href: `/#${sectionIds.contact}`,
}
