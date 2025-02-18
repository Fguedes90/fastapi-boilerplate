import { Button as ShadcnButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonLoadingProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      loading,
      disabled,
      loadingText,
      children,
      className,
      variant = "default",
      size = "default",
      ...rest
    },
    ref,
  ) {
    const isDisabled = loading || disabled

    return (
      <ShadcnButton
        ref={ref}
        disabled={isDisabled}
        className={cn(className, loading && "cursor-wait")}
        {...rest}
      >
        {loading && (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {loadingText || children}
          </>
        )}

        {!loading && children}
      </ShadcnButton>
    )
  },
)

Button.displayName = "Button"
