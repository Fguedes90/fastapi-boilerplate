import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "filled"
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (
    { className, size = "md", variant = "default", children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center border rounded-md",
          {
            "sm:text-sm": size === "sm",
            "text-base": size === "md",
            "text-lg": size === "lg",
            "border-input bg-transparent": variant === "default",
            "border-primary bg-transparent": variant === "outline",
            "border-transparent bg-muted": variant === "filled",
          },
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
InputGroup.displayName = "InputGroup"

export interface InputGroupAddonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  position?: "left" | "right"
}

export const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  InputGroupAddonProps
>(({ className, position = "left", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center px-3 py-2 text-muted-foreground",
        {
          "border-r": position === "left",
          "border-l": position === "right",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})
InputGroupAddon.displayName = "InputGroupAddon"

export interface InputGroupInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasLeftAddon?: boolean
  hasRightAddon?: boolean
}

export const InputGroupInput = React.forwardRef<
  HTMLInputElement,
  InputGroupInputProps
>(({ className, hasLeftAddon, hasRightAddon, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex-1 w-full bg-transparent px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "rounded-l-none": hasLeftAddon,
          "rounded-r-none": hasRightAddon,
        },
        className,
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

export const inputGroupComponents = {
  Group: InputGroup,
  Addon: InputGroupAddon,
  Input: InputGroupInput,
}
