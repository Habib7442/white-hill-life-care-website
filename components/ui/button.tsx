import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonStyles = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-[15px] font-semibold whitespace-nowrap transition-colors duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline:
          "border-[1.5px] border-blue-600 bg-white text-blue-600 hover:bg-blue-25 aria-expanded:bg-blue-25",
        secondary:
          "bg-blue-50 text-blue-700 hover:bg-blue-100 aria-expanded:bg-blue-100",
        ghost:
          "text-navy-900 hover:bg-blue-50 aria-expanded:bg-blue-50",
        destructive:
          "border-error bg-white text-error hover:bg-blue-25",
        link: "h-auto px-0 text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline",
      },
      size: {
        default:
          "min-h-12 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        sm: "min-h-10 gap-1.5 px-5 text-sm has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Runs through cn so callers styling <a> elements get conflicting classes
// (e.g. `hidden` vs `inline-flex`) merged, not just concatenated.
function buttonVariants(props?: Parameters<typeof buttonStyles>[0]) {
  return cn(buttonStyles(props))
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonStyles>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonStyles({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
