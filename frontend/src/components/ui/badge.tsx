import * as React from "react"
import { aidynBadgeVariants, type AidynBadgeVariants } from "../../lib/theme/shadcn-theme"
import { cn } from "../../lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    AidynBadgeVariants {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(aidynBadgeVariants({ variant }), className)}
      role="status"
      aria-label={props['aria-label']}
      {...props}
    />
  )
}

export { Badge, aidynBadgeVariants as badgeVariants }