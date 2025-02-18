import { cn } from "@/lib/utils"
import * as React from "react"
import { Label } from "./label"

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  helperText?: React.ReactNode
  errorText?: React.ReactNode
  optionalText?: React.ReactNode
  required?: boolean
  invalid?: boolean
  disabled?: boolean
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      children,
      helperText,
      errorText,
      optionalText,
      required,
      invalid,
      disabled,
      className,
      ...rest
    } = props

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-1.5",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
        data-invalid={invalid}
        data-disabled={disabled}
        {...rest}
      >
        {label && (
          <div className="flex items-center gap-1">
            <Label
              className={cn(
                invalid && "text-destructive",
                disabled && "cursor-not-allowed",
              )}
            >
              {label}
              {required && <span className="text-destructive ml-0.5">*</span>}
              {!required && optionalText && (
                <span className="text-muted-foreground text-sm ml-1">
                  {optionalText}
                </span>
              )}
            </Label>
          </div>
        )}
        {children}
        {helperText && !errorText && (
          <p className="text-sm text-muted-foreground">{helperText}</p>
        )}
        {(errorText || invalid) && (
          <p className="text-sm font-medium text-destructive">{errorText}</p>
        )}
      </div>
    )
  },
)

Field.displayName = "Field"
