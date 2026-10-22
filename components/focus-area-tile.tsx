import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"

const linkClasses =
  "rounded-tag transition-colors duration-150 hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-blue-600"

type FocusAreaTileProps = {
  title: string
  icon: LucideIcon
  brands: { name: string; mark?: string | null; href: string }[]
  /** /medicines with this category selected. */
  href: string
}

export function FocusAreaTile({ title, icon: Icon, brands, href }: FocusAreaTileProps) {
  return (
    <article className="flex h-full flex-col rounded-card-sm border border-blue-100 bg-white p-6">
      <span className="flex size-13 items-center justify-center rounded-tile bg-blue-50">
        <Icon aria-hidden="true" strokeWidth={1.8} className="size-6 text-blue-600" />
      </span>
      <h3 className="mt-4 font-heading text-[22px] leading-[1.25] font-bold text-navy-900">
        {title}
      </h3>
      <ul className="mt-2 mb-5 flex flex-col items-start">
        {brands.map((brand) => (
          <li key={brand.href}>
            <Link
              href={brand.href}
              className={`${linkClasses} inline-flex min-h-11 items-center text-[15px] font-medium text-blue-600 lg:min-h-9`}
            >
              {brand.name}
              {brand.mark && <sup className="ml-0.5 text-[0.6em]">{brand.mark}</sup>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto border-t border-line pt-3">
        <Link
          href={href}
          className={`${linkClasses} inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-900`}
        >
          View medicines
          <span className="sr-only"> in {title}</span>
          <ArrowRight aria-hidden="true" strokeWidth={1.8} className="size-4" />
        </Link>
      </div>
    </article>
  )
}
