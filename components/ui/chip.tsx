import type { ComponentProps } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const chipVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.06em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-blue-50 text-blue-700",
        rx: "bg-navy-900 text-white",
        nutraceutical: "bg-nutra text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ChipProps = ComponentProps<"span"> & VariantProps<typeof chipVariants>

export function Chip({ variant, className, ...props }: ChipProps) {
  return (
    <span className={cn(chipVariants({ variant, className }))} {...props} />
  )
}
