import type { ComponentProps } from "react"
import { cn } from "cn"

type SectionHeadingProps = ComponentProps<"h2"> & {
  onNavy?: boolean
}

export function SectionHeading({
  onNavy = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "font-heading text-[30px] leading-[1.15] font-bold lg:text-[40px]",
        onNavy ? "text-white" : "text-navy-900",
        className
      )}
      {...props}
    />
  )
}
