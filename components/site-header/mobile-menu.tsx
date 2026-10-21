"use client"

import { useEffect, useId, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import type { NavLink } from "@/lib/site-nav"

type MobileMenuProps = {
  links: NavLink[]
  cta: NavLink
}

const desktopQuery = "(min-width: 820px)"

export function MobileMenu({ links, cta }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    const desktop = window.matchMedia(desktopQuery)
    function onBreakpoint(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    desktop.addEventListener("change", onBreakpoint)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      desktop.removeEventListener("change", onBreakpoint)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <div className="nav:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-white"
      >
        <nav aria-label="Mobile" className="px-6 pt-2 pb-6">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-line">
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-12 items-center text-base font-medium text-ink transition-colors duration-150 hover:text-blue-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={cta.href}
            onClick={close}
            className={buttonVariants({ className: "mt-5 w-full" })}
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </div>
  )
}
