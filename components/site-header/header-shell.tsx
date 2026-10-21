"use client"

import { useEffect, useState, type ReactNode } from "react"
import { cn } from "cn"

type HeaderShellProps = {
  children: ReactNode
  /** Always solid, for pages without the hero behind the header. */
  solid?: boolean
}

// Transparent at the top of the page, solid as soon as the page scrolls.
export function HeaderShell({ children, solid = false }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 8)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <header
      data-site-header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-150",
        solid || scrolled
          ? "border-line bg-white/96 shadow-xs backdrop-blur-sm"
          : "border-transparent bg-transparent"
      )}
    >
      {children}
    </header>
  )
}
