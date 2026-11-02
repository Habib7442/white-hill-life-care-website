"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { useMemo, useRef, useState } from "react"

import { Pagination } from "@/components/pagination"
import { ProductGrid } from "@/components/product-grid"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import {
  ALL,
  categoryOptions,
  dosageFormOptions,
  filterProducts,
  matchesRange,
  productTypeOptions,
  type Product,
  type RangeFilter,
} from "@/lib/products"

type MedicinesCatalogProps = {
  products: Product[]
  pageSize: number
  /** Home "Explore our product range" cards, reachable as ?range=<slug>. */
  ranges: RangeFilter[]
}

type UrlState = {
  q: string
  category: string
  form: string
  type: string
  range: string
  page: number
}

/**
 * Figma-styled catalog header, search, category / dosage-form / type dropdowns, and pagination for /medicines.
 * The state lives in the URL (?q=&category=&form=&type=&range=&page=).
 */
export function MedicinesCatalog({ products, pageSize, ranges }: MedicinesCatalogProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const resultsRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => categoryOptions(products), [products])
  const forms = useMemo(() => dosageFormOptions(products), [products])
  const types = useMemo(() => productTypeOptions(products), [products])

  // Unknown values in the URL fall back to "All".
  const q = searchParams.get("q") ?? ""
  const categoryParam = searchParams.get("category")
  const category = categories.some((c) => c.value === categoryParam) ? categoryParam! : ALL
  const formParam = searchParams.get("form")
  const dosageForm = forms.some((f) => f.value === formParam) ? formParam! : ALL
  const typeParam = searchParams.get("type")
  const productType = types.some((t) => t.value === typeParam) ? typeParam! : ALL
  const rangeParam = searchParams.get("range")
  const activeRange =
    ranges.find(
      (r) => r.slug === rangeParam && products.some((p) => matchesRange(p, r.match))
    ) ?? null

  const [query, setQuery] = useState(q)
  const [syncedQ, setSyncedQ] = useState(q)
  if (syncedQ !== q) {
    setSyncedQ(q)
    setQuery(q)
  }

  const results = useMemo(
    () =>
      filterProducts(products, {
        query: q,
        category,
        dosageForm,
        productType,
        range: activeRange?.match ?? null,
      }),
    [products, q, category, dosageForm, productType, activeRange]
  )

  const pageCount = Math.max(1, Math.ceil(results.length / pageSize))
  const requestedPage = Number.parseInt(searchParams.get("page") ?? "1", 10)
  const page = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), pageCount) : 1
  const start = (page - 1) * pageSize
  const pageResults = results.slice(start, start + pageSize)

  const filtering =
    q.trim() !== "" ||
    category !== ALL ||
    dosageForm !== ALL ||
    productType !== ALL ||
    activeRange !== null

  function writeUrl(next: Partial<UrlState>, mode: "push" | "replace") {
    const state: UrlState = {
      q,
      category,
      form: dosageForm,
      type: productType,
      range: activeRange?.slug ?? ALL,
      page,
      ...next,
    }
    const params = new URLSearchParams()
    if (state.q.trim()) params.set("q", state.q.trim())
    if (state.category !== ALL) params.set("category", state.category)
    if (state.form !== ALL) params.set("form", state.form)
    if (state.type !== ALL) params.set("type", state.type)
    if (state.range !== ALL) params.set("range", state.range)
    if (state.page > 1) params.set("page", String(state.page))
    const qs = params.toString()
    const url = qs ? `${pathname}?${qs}` : pathname
    if (mode === "push") window.history.pushState(null, "", url)
    else window.history.replaceState(null, "", url)
  }

  function goToPage(next: number) {
    writeUrl({ page: next }, "push")
    resultsRef.current?.scrollIntoView({ block: "start" })
    resultsRef.current?.focus({ preventScroll: true })
  }

  function clearFilters() {
    setQuery("")
    writeUrl({ q: "", category: ALL, form: ALL, type: ALL, range: ALL, page: 1 }, "replace")
    searchRef.current?.focus()
  }

  const countDisplay =
    results.length === 0
      ? "0 Medicines"
      : `${results.length} ${results.length === 1 ? "Medicine" : "Medicines"}`

  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* Header and Controls Row (Figma matching) */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-black sm:text-4xl">
            Explore our medicines
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {countDisplay}
            {filtering && results.length > 0 && (
              <span className="ml-2 text-xs text-blue-600">
                (filtered from {products.length})
              </span>
            )}
          </p>
        </div>

        {/* Search & Dropdown Filters (Figma matching) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {/* Search Input */}
          <div className="w-full sm:w-56 md:w-64">
            <SearchInput
              ref={searchRef}
              value={query}
              onValueChange={setQuery}
              onDebouncedChange={(value) => writeUrl({ q: value, page: 1 }, "replace")}
              label="Search medicines"
              placeholder="Search medicines..."
              className="w-full"
            />
          </div>

          {/* Category Dropdown */}
          <FilterDropdown
            value={category}
            options={[{ value: ALL, label: "All" }, ...categories]}
            onChange={(val) => writeUrl({ category: val, page: 1 }, "replace")}
            align="left"
            aria-label="Filter by category"
          />

          {/* Dosage Form Dropdown */}
          <FilterDropdown
            value={dosageForm}
            options={[{ value: ALL, label: "All Forms" }, ...forms]}
            onChange={(val) => writeUrl({ form: val, page: 1 }, "replace")}
            align="right"
            aria-label="Filter by dosage form"
          />

          {/* Type Dropdown */}
          <FilterDropdown
            value={productType}
            options={[{ value: ALL, label: "All Types" }, ...types]}
            onChange={(val) => writeUrl({ type: val, page: 1 }, "replace")}
            align="right"
            aria-label="Filter by type"
          />

          {filtering && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {activeRange && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-blue-25 px-4 py-2.5 text-sm text-ink-muted">
          <span>
            Showing the <strong className="font-semibold text-ink">{activeRange.title}</strong> range
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => writeUrl({ range: ALL, page: 1 }, "replace")}
          >
            Show all medicines
          </Button>
        </div>
      )}

      <p
        ref={resultsRef}
        id="medicine-results"
        tabIndex={-1}
        aria-live="polite"
        className="sr-only outline-none"
      >
        {countDisplay}
      </p>

      {/* Grid and Pagination */}
      {pageResults.length > 0 ? (
        <>
          <ProductGrid products={pageResults} className="mt-2" />
          <Pagination page={page} pageCount={pageCount} onChange={goToPage} className="mt-10" />
        </>
      ) : (
        <div className="my-12 flex flex-col items-center justify-center gap-4 text-center">
          <p role="status" className="text-base text-ink-muted">
            No medicines match your search or selected filters.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
