import type { ProductsQueryResult } from "@/sanity.types"

export type Product = ProductsQueryResult[number]
type Schedule = Product["schedule"]

export function isPrescriptionOnly(schedule: Schedule | null | undefined) {
  return schedule === "h" || schedule === "h1"
}

export const scheduleLabels: Record<Schedule, string> = {
  otc: "OTC",
  h: "Schedule H",
  h1: "Schedule H1",
}

export const productTypeLabels: Record<string, string> = {
  pharmaceutical: "Pharmaceutical",
  nutraceutical: "Nutraceutical",
  wellness: "Wellness",
}

type WithPackImage<P extends { packImage: { asset: unknown } }> = P & {
  packImage: P["packImage"] & { asset: NonNullable<P["packImage"]["asset"]> }
}

/**
 * The GROQ queries already exclude products without a pack image, but TypeGen
 * can't infer that for nested results. This narrows the type to match.
 */
export function withPackImage<P extends { packImage: { asset: unknown } }>(products: P[]) {
  return products.filter((p): p is WithPackImage<P> => p.packImage.asset != null)
}

/** The full medicines listing (search, filters, pagination). */
export const medicinesHref = "/medicines"

export function productHref(slug: string) {
  return `${medicinesHref}/${slug}`
}

// Standard caution printed on Schedule H / H1 packs.
export const prescriptionCaution =
  "Not to be sold by retail without the prescription of a Registered Medical Practitioner."

export const prescriptionAudience = "Information for registered medical practitioners."

export const medicinesDisclaimer =
  "Product information is provided for general awareness. Please use any medicine only on the advice of a registered medical practitioner."

// Catalogue filtering

export const ALL = "all"

export type ProductFilters = {
  query: string
  category: string
  dosageForm: string
}

export type FilterOption = { value: string; label: string }

function normalise(text: string) {
  return text
    .toLocaleLowerCase("en-IN")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

function searchText(product: Product) {
  return normalise(
    [
      product.name,
      product.composition,
      product.category.title,
      ...(product.ingredientNames ?? []),
    ].join(" ")
  )
}

/** Every search term must match; category and dosage form match exactly. */
export function filterProducts(products: Product[], filters: ProductFilters) {
  const terms = normalise(filters.query).split(/\s+/).filter(Boolean)

  return products.filter((product) => {
    if (filters.category !== ALL && product.category.slug !== filters.category) {
      return false
    }
    if (filters.dosageForm !== ALL && product.dosageForm !== filters.dosageForm) {
      return false
    }
    if (terms.length === 0) return true
    const text = searchText(product)
    return terms.every((term) => text.includes(term))
  })
}

/** Categories that have at least one product, in category display order. */
export function categoryOptions(products: Product[]): FilterOption[] {
  const bySlug = new Map<string, Product["category"]>()
  for (const { category } of products) bySlug.set(category.slug, category)

  return [...bySlug.values()]
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
    .map(({ slug, title }) => ({ value: slug, label: title }))
}

/** Dosage forms present in the products, in first-seen order. */
export function dosageFormOptions(products: Product[]): FilterOption[] {
  return [...new Set(products.map((product) => product.dosageForm))].map((form) => ({
    value: form,
    label: form,
  }))
}
