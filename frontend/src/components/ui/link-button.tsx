"use client"

import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { VariantProps } from "class-variance-authority"
import * as React from "react"
import { buttonVariants } from "./button"

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)

LinkButton.displayName = "LinkButton"

export { LinkButton }
