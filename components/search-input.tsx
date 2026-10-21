"use client"

import { useEffect, useId, useRef, type Ref } from "react"
import { Search, X } from "lucide-react"
import { cn } from "cn"

import { useDebouncedValue } from "@/lib/hooks/use-debounced-value"

type SearchInputProps = {
  /** Current text, updated on every keystroke. */
  value: string
  onValueChange: (value: string) => void
  /** Called once typing pauses for `delay` ms, and immediately on clear. */
  onDebouncedChange?: (value: string) => void
  delay?: number
  /** Accessible label (visually hidden). */
  label: string
  placeholder?: string
  ref?: Ref<HTMLInputElement>
  className?: string
}

export function SearchInput({
  value,
  onValueChange,
  onDebouncedChange,
  delay = 250,
  label,
  placeholder,
  ref,
  className,
}: SearchInputProps) {
  const id = useId()
  const debounced = useDebouncedValue(value, delay)
  const lastEmitted = useRef(value)
  const onDebouncedChangeRef = useRef(onDebouncedChange)

  useEffect(() => {
    onDebouncedChangeRef.current = onDebouncedChange
  })

  useEffect(() => {
    if (debounced === lastEmitted.current) return
    lastEmitted.current = debounced
    onDebouncedChangeRef.current?.(debounced)
  }, [debounced])

  function clear() {
    onValueChange("")
    lastEmitted.current = ""
    onDebouncedChangeRef.current?.("")
  }

  return (
    <div className={cn("relative", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        aria-hidden="true"
        strokeWidth={1.8}
        className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-blue-600"
      />
      <input
        ref={ref}
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => onValueChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            event.preventDefault()
            clear()
          }
        }}
        className="min-h-12 w-full rounded-tag border border-field bg-white py-3 pr-12 pl-11 text-[15px] text-ink outline-none placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={clear}
          className="absolute top-1/2 right-0.5 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-tag text-ink-muted transition-colors duration-150 hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <X aria-hidden="true" strokeWidth={1.8} className="size-5" />
        </button>
      )}
    </div>
  )
}
