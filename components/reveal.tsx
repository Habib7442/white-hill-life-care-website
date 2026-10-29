"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "cn"

type RevealProps = {
  children: ReactNode
  className?: string
  /** Children carry `reveal-item` (and `[--i:n]`) themselves; otherwise the wrapper animates. */
  stagger?: boolean
}

// Fades its content up once when it scrolls into view (CSS in app/globals.css).
// Content is visible in the server HTML; it is only hidden after mount, and only
// while still below the fold, so nothing disappears without JavaScript.
export function Reveal({ children, className, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.8) return

    el.dataset.reveal = "hidden"
    // Fires when the top passes 80% of the viewport, which also works for
    // blocks taller than the screen (a 30% threshold never would).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = "shown"
        observer.disconnect()
      },
      { rootMargin: "0px 0px -20% 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={cn(!stagger && "reveal-item", className)}>
      {children}
    </div>
  )
}
