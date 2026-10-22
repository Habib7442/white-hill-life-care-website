import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// Shared by Input, Textarea and NativeSelect (DESIGN.md §5 Form fields).
export const fieldClasses =
  "min-h-12 w-full min-w-0 rounded-tag border border-field bg-white px-4 text-[15px] text-ink transition-colors duration-150 outline-none placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(fieldClasses, "py-3", className)}
      {...props}
    />
  )
}

export { Input }
