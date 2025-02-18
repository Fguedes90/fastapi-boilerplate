import { Eye, EyeOff } from "lucide-react"
import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"
import { Input } from "./input"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  showPasswordLabel?: string
  hidePasswordLabel?: string
  description?: string
  label?: string
  errorMessage?: string
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      icon,
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      description,
      label,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </div>
            )}
            <Input
              type={showPassword ? "text" : "password"}
              className={cn(
                icon && "pl-10",
                "pr-10",
                errorMessage && "border-destructive",
                className,
              )}
              ref={ref}
              {...props}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
      </FormItem>
    )
  },
)

PasswordInput.displayName = "PasswordInput"
