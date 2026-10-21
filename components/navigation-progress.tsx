"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "cn"

type Phase = "idle" | "loading" | "done"

const SAFETY_TIMEOUT = 10_000
const FADE_OUT = 300

/**
 * Thin bar at the top of the screen while a client-side navigation to
 * another page is in progress. Starts on internal link clicks, finishes when
 * the pathname changes.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>("idle")
  const [lastPathname, setLastPathname] = useState(pathname)

  // The new page has rendered: finish (adjusting state during render, as
  // React recommends instead of an effect).
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    if (phase === "loading") setPhase("done")
  }

  // Start on clicks that lead to another page of this site.
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = (event.target as Element | null)?.closest("a")
      if (!link || link.target || link.hasAttribute("download")) return

      const url = new URL(link.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname) return

      setPhase("loading")
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  // Finish anyway if the navigation never completes (e.g. it was cancelled),
  // and fade out after finishing.
  useEffect(() => {
    if (phase === "idle") return
    const timer = window.setTimeout(
      () => setPhase(phase === "loading" ? "done" : "idle"),
      phase === "loading" ? SAFETY_TIMEOUT : FADE_OUT
    )
    return () => window.clearTimeout(timer)
  }, [phase])

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] transition-opacity duration-300",
        phase === "idle" ? "opacity-0" : "opacity-100"
      )}
    >
      <div
        className={cn(
          "h-full bg-blue-600 motion-reduce:transition-none",
          phase === "idle" && "w-0 transition-none",
          phase === "loading" && "w-[85%] transition-[width] duration-[8000ms] ease-out",
          phase === "done" && "w-full transition-[width] duration-200 ease-out"
        )}
      />
    </div>
  )
}
