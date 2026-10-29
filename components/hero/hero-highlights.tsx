import type { CSSProperties } from "react"

import { Container } from "@/components/layout/container"
import { Reveal } from "@/components/reveal"
import { heroHighlights } from "@/lib/site"

// Trust points on the navy band under the hero; they fade up in turn on scroll.
export function HeroHighlights() {
  return (
    <Container>
      <Reveal stagger>
        <ul className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 xl:grid-cols-4 xl:gap-0">
          {heroHighlights.map(({ label, text, icon: Icon }, index) => (
            <li
              key={label}
              style={{ "--i": index } as CSSProperties}
              className="reveal-item flex items-center gap-4 xl:justify-center xl:border-l xl:border-white/45 xl:px-6 xl:first:justify-start xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0"
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.8}
                className="size-8 shrink-0 text-white lg:size-9"
              />
              <span className="min-w-0">
                <span className="block text-[15px] leading-snug font-medium text-white">
                  {label}
                </span>
                <span className="mt-1 block text-sm leading-snug text-ink-on-navy">
                  {text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  )
}
