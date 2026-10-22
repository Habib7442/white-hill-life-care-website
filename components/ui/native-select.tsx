import * as React from "react"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"

import { fieldClasses } from "@/components/ui/input"

type NativeSelectProps = React.ComponentProps<"select">

function NativeSelect({ className, ...props }: NativeSelectProps) {
  return (
    <div
      className={cn("group/native-select relative w-full has-[select:disabled]:opacity-50", className)}
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(fieldClasses, "appearance-none py-3 pr-11")}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-blue-600"
        strokeWidth={1.8}
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" {...props} />
}

export { NativeSelect, NativeSelectOption }
