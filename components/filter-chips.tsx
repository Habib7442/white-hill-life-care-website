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

/** Single-select row of pill toggle buttons. */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: FilterChipsProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const selected = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
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
