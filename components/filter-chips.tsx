"use client"

import { cn } from "cn"

export type FilterChipOption<T extends string> = {
  value: T
  label: string
}

type FilterChipsProps<T extends string> = {
  /** Accessible name for the group, e.g. "Filter by category". */
  label: string
  options: FilterChipOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/**
 * Single-select row of pill toggle buttons. Stays on one line and scrolls
 * sideways (scrollbar hidden) when the chips don't fit.
 */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: FilterChipsProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      // Padding keeps focus outlines from being clipped by the scroll box.
      className={cn("no-scrollbar -m-1 flex gap-2 overflow-x-auto overscroll-x-contain p-1", className)}
    >
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={(event) => {
              onChange(option.value)
              // Bring a partly hidden chip fully into view.
              event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" })
            }}
            className={cn(
              "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
              selected
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-blue-100 bg-white text-ink-muted hover:bg-blue-25 hover:text-blue-700"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
