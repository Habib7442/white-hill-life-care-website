"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const reducedMotion = "(prefers-reduced-motion: reduce)"

function scrollToSection(target: HTMLElement) {
  target.scrollIntoView({
    behavior: window.matchMedia(reducedMotion).matches ? "auto" : "smooth",
    block: "start",
  })
  // Keep keyboard and screen-reader users in step with the scroll, as a
  // native #hash jump would.
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1")
    target.classList.add("outline-none")
  }
  target.focus({ preventScroll: true })
}

function clearHash() {
  const { pathname, search } = window.location
  window.history.replaceState(window.history.state, "", pathname + search)
}

/**
 * Section links ("/#about", "#main") scroll smoothly without putting the
 * #hash in the address bar. Links from other pages land on the section and
 * the hash is removed afterwards.
 */
export function SectionScroll() {
  const pathname = usePathname()

  // Clicks on links to a section of the current page.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = (event.target as Element | null)?.closest("a")
      if (!link || link.target) return

      const url = new URL(link.href, window.location.href)
      if (!url.hash || url.origin !== window.location.origin) return
      if (url.pathname !== window.location.pathname) return

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return

      event.preventDefault()
      scrollToSection(target)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Arriving with a hash (from another page or a shared link): let the
  // browser/Next scroll to it, then tidy the URL.
  useEffect(() => {
    if (!window.location.hash) return
    const frame = window.requestAnimationFrame(clearHash)
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
