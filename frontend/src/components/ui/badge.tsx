import * as React from "react"
import { badgeVariants, type BadgeVariants } from "../../lib/theme/shadcn-theme"
import { cn } from "../../lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      role="status"
      aria-label={props['aria-label']}
      {...props}
    />
  )
}

export { Badge, badgeVariants }