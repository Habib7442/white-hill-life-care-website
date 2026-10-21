import { Container } from "@/components/layout/container"
import { heroHighlights } from "@/lib/site"

// Trust points on the navy band below the category cards.
export function HeroHighlights() {
  return (
    <Container className="pt-10 lg:pt-12">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-0">
        {heroHighlights.map(({ label, icon: Icon }) => (
          <li
            key={label}
            className="flex items-center gap-3 lg:border-l lg:border-white/20 lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.8}
              className="size-8 shrink-0 text-white lg:size-9"
            />
            <span className="max-w-[12rem] text-sm leading-snug text-white lg:text-[15px]">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </Container>
  )
}
