export const sectionIds = {
  top: "top",
  main: "main",
  medicines: "medicines",
  quality: "quality",
} as const

// Section links point at "/#section" so they also work from other pages
// (e.g. /medicines/[slug]); on the home page the browser just scrolls.
// "About Us", "Products" and "Contact" are their own pages.
export const contactHref = "/contact"

export type NavLink = {
  label: string
  href: `/#${string}` | "/medicines" | "/about" | typeof contactHref
}

export const mainNav: NavLink[] = [
  { label: "Home", href: `/#${sectionIds.top}` },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/medicines" },
  { label: "Contact", href: contactHref },
]

export const headerCta: NavLink = {
  label: "Connect With Us",
  href: contactHref,
}
