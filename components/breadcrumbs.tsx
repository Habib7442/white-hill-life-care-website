import Link from "next/link"
import { ChevronRight } from "lucide-react"

export type Crumb = {
  label: string
  /** Omit for the current page. */
  href?: string
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-ink-muted">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight aria-hidden="true" strokeWidth={1.8} className="size-4 text-ink-faint" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="rounded-tag transition-colors duration-150 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
