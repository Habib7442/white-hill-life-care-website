"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "cn"

export type FilterDropdownOption = {
  value: string
  label: string
}

type FilterDropdownProps = {
  value: string
  options: FilterDropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
  align?: "left" | "right"
  className?: string
  "aria-label"?: string
}

export function FilterDropdown({
  value,
  options,
  onChange,
  placeholder,
  align = "left",
  className,
  "aria-label": ariaLabel,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Find active option label
  const activeOption = options.find((o) => o.value === value)
  const displayLabel = activeOption ? activeOption.label : (placeholder ?? "Select")

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block w-full sm:w-auto text-left", className)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={cn(
          "flex h-10 w-full sm:w-auto items-center justify-between gap-2.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30",
          isOpen && "border-blue-600 ring-2 ring-blue-600/20"
        )}
      >
        <span className="truncate">{displayLabel}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-slate-500 transition-transform duration-150",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute top-full z-50 mt-1.5 w-full sm:w-max min-w-[150px] max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg",
            // Keep strictly within screen/container bounds on mobile & desktop:
            align === "right" ? "right-0 sm:right-0 sm:left-auto" : "left-0 sm:left-0",
            // If on a narrow screen, align right to prevent overflowing right border
            "max-sm:right-0 max-sm:left-auto"
          )}
        >
          <div className="max-h-60 overflow-y-auto py-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="size-4 shrink-0 text-blue-600" aria-hidden="true" />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
