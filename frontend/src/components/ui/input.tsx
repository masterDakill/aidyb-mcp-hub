import * as React from "react"
import { aidynInputVariants, type AidynInputVariants } from "../../lib/theme/shadcn-theme"
import { cn } from "../../lib/utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    AidynInputVariants {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    const isInvalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'

    return (
      <input
        type={type}
        className={cn(
          aidynInputVariants({ variant: isInvalid ? 'aidyn-danger' : variant, size }),
          className
        )}
        ref={ref}
        aria-invalid={props['aria-invalid']}
        aria-describedby={props['aria-describedby']}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }