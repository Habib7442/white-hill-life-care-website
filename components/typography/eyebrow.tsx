import type { ComponentProps } from "react"
import { cn } from "cn"

type EyebrowProps = ComponentProps<"p"> & {
  /** Section number, e.g. "01". Omit for un-numbered labels like the hero. */
  index?: string
  onNavy?: boolean
}

export function Eyebrow({
  index,
  onNavy = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-[0.14em] uppercase lg:text-[13px]",
        onNavy ? "text-blue-300" : "text-blue-600",
        className
      )}
      {...props}
    >
      {index && <span>{index} · </span>}
      {children}
    </p>
  )
}
