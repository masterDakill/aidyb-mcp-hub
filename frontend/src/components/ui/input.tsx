import * as React from "react"
import { inputVariants, type InputVariants } from "../../lib/theme/shadcn-theme"
import { cn } from "../../lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    InputVariants {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    const isInvalid = props['aria-invalid'] === true || props['aria-invalid'] === 'true'

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant: isInvalid ? 'aidyn-error' : variant, size }),
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