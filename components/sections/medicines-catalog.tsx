"use client"

import { useMemo, useRef, useState, type ReactNode } from "react"

import { FilterChips } from "@/components/filter-chips"
import { ProductCard } from "@/components/product-card"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import {
  ALL,
  categoryOptions,
  dosageFormOptions,
  filterProducts,
  type Product,
} from "@/lib/products"

type MedicinesCatalogProps = {
  products: Product[]
}

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

export function MedicinesCatalog({ products }: MedicinesCatalogProps) {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [category, setCategory] = useState(ALL)
  const [dosageForm, setDosageForm] = useState(ALL)
  const searchRef = useRef<HTMLInputElement>(null)

  const categories = useMemo(() => categoryOptions(products), [products])
  const forms = useMemo(() => dosageFormOptions(products), [products])
  const showCategories = categories.length > 1
  const showForms = forms.length > 1

  const results = useMemo(
    () => filterProducts(products, { query: debouncedQuery, category, dosageForm }),
    [products, debouncedQuery, category, dosageForm]
  )

  const filtering = debouncedQuery.trim() !== "" || category !== ALL || dosageForm !== ALL

  function clearFilters() {
    setQuery("")
    setDebouncedQuery("")
    setCategory(ALL)
    setDosageForm(ALL)
    searchRef.current?.focus()
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <SearchInput
          ref={searchRef}
          value={query}
          onValueChange={setQuery}
          onDebouncedChange={setDebouncedQuery}
          label="Search medicines"
          placeholder="Search by name or ingredient"
          className="w-full"
        />
        {/* A filter row appears only once it has 2+ real choices; with one
            option it does nothing and makes the catalogue look unfinished.
            Options come from the products, so rows appear as products are
            published. */}
        {(showCategories || showForms) && (
          <div className="flex flex-col gap-5">
            {showCategories && (
              <FilterGroup title="Category">
                <FilterChips
                  label="Filter by category"
                  options={[{ value: ALL, label: "All" }, ...categories]}
                  value={category}
                  onChange={setCategory}
                />
              </FilterGroup>
            )}
            {showForms && (
              <FilterGroup title="Dosage form">
                <FilterChips
                  label="Filter by dosage form"
                  options={[{ value: ALL, label: "All forms" }, ...forms]}
                  value={dosageForm}
                  onChange={setDosageForm}
                />
              </FilterGroup>
            )}
          </div>
        )}
      </div>

      <p aria-live="polite" className="mt-6 min-h-[1lh] text-sm text-ink-muted">
        {filtering && results.length > 0
          ? `Showing ${results.length} of ${products.length} ${
              products.length === 1 ? "medicine" : "medicines"
            }`
          : ""}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {results.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
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
