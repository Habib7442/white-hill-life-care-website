import { ChevronRight } from "lucide-react"

import { Container } from "@/components/layout/container"
import { heroCategories } from "@/lib/site"

// White card row that overlaps the bottom edge of the hero photo.
export function HeroCategories() {
  return (
    <Container className="relative z-20 -mt-[60px]">
      <ul className="grid gap-px overflow-hidden rounded-card border border-blue-100 bg-line shadow-sm sm:grid-cols-2 xl:grid-cols-4">
        {heroCategories.map(({ title, text, href, icon: Icon }) => (
          <li key={title} className="bg-white">
            <a
              href={href}
              className="group flex h-full min-h-11 items-center gap-4 p-5 transition-colors duration-150 hover:bg-blue-25 focus-visible:-outline-offset-2 lg:p-6"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icon aria-hidden="true" strokeWidth={1.8} className="size-7" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-heading text-lg leading-snug font-semibold text-navy-900 transition-colors duration-150 group-hover:text-blue-600">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-muted">
                  {text}
                </span>
              </span>
              <ChevronRight
                aria-hidden="true"
                strokeWidth={1.8}
                className="size-5 shrink-0 text-blue-600 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </a>
          </li>
        ))}
      </ul>
    </Container>
  )
}
