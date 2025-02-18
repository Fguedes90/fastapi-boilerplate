import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"
import { LuX } from "react-icons/lu"

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default" | "outline" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(
  { children, className, variant = "ghost", size = "icon", ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      className={cn(className, "p-0")}
      aria-label="Close"
      {...props}
    >
      {children ?? <LuX />}
    </Button>
  )
})

CloseButton.displayName = "CloseButton"
