import type { ComponentProps } from "react"
import { cn } from "cn"

export type SectionTone = "white" | "tint" | "navy"

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white text-ink",
  tint: "bg-blue-25 text-ink",
  navy: "bg-navy-900 text-ink-on-navy",
}

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone
}

export function Section({ tone = "white", className, ...props }: SectionProps) {
  return (
    <section
      className={cn("py-16 lg:py-24", toneClasses[tone], className)}
      {...props}
    />
  )
}
