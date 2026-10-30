"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useMemo, useRef, useState, type ReactNode } from "react"

import { FilterChips } from "@/components/filter-chips"
import { Pagination } from "@/components/pagination"
import { ProductGrid } from "@/components/product-grid"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import {
  ALL,
  categoryOptions,
  dosageFormOptions,
  filterProducts,
  productTypeOptions,
  type Product,
} from "@/lib/products"

type MedicinesCatalogProps = {
  products: Product[]
  pageSize: number
}

type UrlState = { q: string; category: string; form: string; type: string; page: number }

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p aria-hidden="true" className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
        {title}
      </p>
      {children}
    </div>
  )
}

/**
 * Search, category / dosage-form / type chips and pagination for /medicines.
 * The state lives in the URL (?q=&category=&form=&type=&page=) so views can be shared,
 * reloaded and reached with Back. Typing and filters replace the history
 * entry; changing page pushes one, so Back returns to the previous page.
 */
export function MedicinesCatalog({ products, pageSize }: MedicinesCatalogProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const resultsRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => categoryOptions(products), [products])
  const forms = useMemo(() => dosageFormOptions(products), [products])
  const types = useMemo(() => productTypeOptions(products), [products])
  const showCategories = categories.length > 1
  const showForms = forms.length > 1
  const showTypes = types.length > 1

  // Unknown values in the URL fall back to "All".
  const q = searchParams.get("q") ?? ""
  const categoryParam = searchParams.get("category")
  const category = categories.some((c) => c.value === categoryParam) ? categoryParam! : ALL
  const formParam = searchParams.get("form")
  const dosageForm = forms.some((f) => f.value === formParam) ? formParam! : ALL
  const typeParam = searchParams.get("type")
  const productType = types.some((t) => t.value === typeParam) ? typeParam! : ALL

  // The input updates on every keystroke; the URL (and results) once typing pauses.
  const [query, setQuery] = useState(q)
  const [syncedQ, setSyncedQ] = useState(q)
  if (syncedQ !== q) {
    // Back / Forward changed the URL: show its search text.
    setSyncedQ(q)
    setQuery(q)
  }

  const results = useMemo(
    () => filterProducts(products, { query: q, category, dosageForm, productType }),
    [products, q, category, dosageForm, productType]
  )

  const pageCount = Math.max(1, Math.ceil(results.length / pageSize))
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1
  const start = (page - 1) * pageSize
  const pageResults = results.slice(start, start + pageSize)

  const filtering =
    q.trim() !== "" || category !== ALL || dosageForm !== ALL || productType !== ALL

  function writeUrl(next: Partial<UrlState>, mode: "push" | "replace") {
    const state: UrlState = { q, category, form: dosageForm, type: productType, page, ...next }
    const params = new URLSearchParams()
    if (state.q.trim()) params.set("q", state.q.trim())
    if (state.category !== ALL) params.set("category", state.category)
    if (state.form !== ALL) params.set("form", state.form)
    if (state.type !== ALL) params.set("type", state.type)
    if (state.page > 1) params.set("page", String(state.page))
    const qs = params.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    if (mode === "push") window.history.pushState(null, "", url)
    else window.history.replaceState(null, "", url)
  }

  function goToPage(next: number) {
    writeUrl({ page: next }, "push")
    // Bring the results into view and move focus there for keyboard and
    // screen-reader users.
    resultsRef.current?.scrollIntoView({ block: "start" })
    resultsRef.current?.focus({ preventScroll: true })
  }

  function clearFilters() {
    setQuery("")
    writeUrl({ q: "", category: ALL, form: ALL, type: ALL, page: 1 }, "replace")
    searchRef.current?.focus()
  }

  const countText =
    results.length === 0
      ? ""
      : results.length <= pageSize
        ? `${results.length} ${results.length === 1 ? "medicine" : "medicines"}${
            filtering ? ` of ${products.length}` : ""
          }`
        : `Showing ${pageResults.length === 1 ? start + 1 : `${start + 1}–${start + pageResults.length}`} of ${results.length} medicines`

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchInput
          ref={searchRef}
          value={query}
          onValueChange={setQuery}
          onDebouncedChange={(value) => writeUrl({ q: value, page: 1 }, "replace")}
          label="Search medicines"
          placeholder="Search by name or ingredient"
          className="w-full"
        />
        {/* A filter row appears only once it has 2+ real choices; with one
            option it does nothing and makes the catalogue look unfinished.
            Options come from the products, so rows appear as products are
            published. */}
        {(showCategories || showForms || showTypes) && (
          <div className="flex flex-col gap-5">
            {showCategories && (
              <FilterGroup title="Category">
                <FilterChips
                  label="Filter by category"
                  options={[{ value: ALL, label: "All" }, ...categories]}
                  value={category}
                  onChange={(value) => writeUrl({ category: value, page: 1 }, "replace")}
                />
              </FilterGroup>
            )}
            {showForms && (
              <FilterGroup title="Dosage form">
                <FilterChips
                  label="Filter by dosage form"
                  options={[{ value: ALL, label: "All forms" }, ...forms]}
                  value={dosageForm}
                  onChange={(value) => writeUrl({ form: value, page: 1 }, "replace")}
                />
              </FilterGroup>
            )}
            {showTypes && (
              <FilterGroup title="Type">
                <FilterChips
                  label="Filter by type"
                  options={[{ value: ALL, label: "All types" }, ...types]}
                  value={productType}
                  onChange={(value) => writeUrl({ type: value, page: 1 }, "replace")}
                />
              </FilterGroup>
            )}
          </div>
        )}
      </div>

      <p
        ref={resultsRef}
        id="medicine-results"
        tabIndex={-1}
        aria-live="polite"
        className="mt-6 min-h-[1lh] scroll-mt-[calc(var(--header-height)+1rem)] text-sm text-ink-muted outline-none"
      >
        {countText}
      </p>

      {pageResults.length > 0 ? (
        <>
          <ProductGrid products={pageResults} className="mt-4" />
          <Pagination page={page} pageCount={pageCount} onChange={goToPage} className="mt-10" />
        </>
      ) : (
        <div className="mt-4 flex flex-col items-start gap-4">
          <p role="status" className="text-[15px] text-ink-muted">
            No medicines match your search.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}
    </>
  )
}
