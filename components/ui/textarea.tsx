import * as React from "react"
import { cn } from "cn"

import { fieldClasses } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldClasses, "block min-h-32 py-3 leading-[1.6]", className)}
      {...props}
    />
  )
}

export { Textarea }
