import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { buttonVariants, type ButtonVariants } from "../../lib/theme/shadcn-theme"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        aria-pressed={props['aria-pressed']}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }