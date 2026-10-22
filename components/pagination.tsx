"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"

/** 1 … 4 5 6 … 12: first, last, and the current page's neighbours. */
function pageList(page: number, count: number): (number | "gap")[] {
  const pages = [...new Set([1, count, page - 1, page, page + 1])]
    .filter((p) => p >= 1 && p <= count)
    .sort((a, b) => a - b)
  const out: (number | "gap")[] = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) out.push("gap")
    out.push(p)
  })
  return out
}

type PaginationProps = {
  page: number
  pageCount: number
  onChange: (page: number) => void
  className?: string
}

export function Pagination({ page, pageCount, onChange, className }: PaginationProps) {
  if (pageCount <= 1) return null

  return (
    <nav aria-label="Pagination" className={cn("flex justify-center", className)}>
      <ul className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <li>
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onChange(page - 1)}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "min-h-11 px-3 sm:px-5",
            })}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.8} data-icon="inline-start" />
            <span className="sr-only sm:not-sr-only">Previous</span>
          </button>
        </li>
        {pageList(page, pageCount).map((p, i) =>
          p === "gap" ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-ink-faint">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
                onClick={() => onChange(p)}
                className={buttonVariants({
                  variant: p === page ? "default" : "ghost",
                  size: "icon",
                  className: "text-sm tabular-nums",
                })}
              >
                {p}
              </button>
            </li>
          )
        )}
        <li>
          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() => onChange(page + 1)}
            className={buttonVariants({
              variant: "outline",
              size: "sm",
              className: "min-h-11 px-3 sm:px-5",
            })}
          >
            <span className="sr-only sm:not-sr-only">Next</span>
            <ChevronRight aria-hidden="true" strokeWidth={1.8} data-icon="inline-end" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
