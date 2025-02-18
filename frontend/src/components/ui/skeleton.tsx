import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circle"
  width?: string
  height?: string
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = "default", width, height, ...props }, ref) => {
    const baseClasses = "animate-pulse bg-muted"
    const variantClasses = {
      default: "rounded-md",
      circle: "rounded-full",
    }

    return (
      <div
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        style={{
          width: width || "100%",
          height: height || "20px",
        }}
        {...props}
      />
    )
  },
)
Skeleton.displayName = "Skeleton"

export interface SkeletonTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  gap?: string
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, gap = "0.5rem", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{ gap }}
        {...props}
      >
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton key={index} width={index === lines - 1 ? "80%" : "100%"} />
        ))}
      </div>
    )
  },
)
SkeletonText.displayName = "SkeletonText"

export interface SkeletonCircleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: string
}

export const SkeletonCircle = React.forwardRef<
  HTMLDivElement,
  SkeletonCircleProps
>(({ size = "2rem", className, ...props }, ref) => {
  return (
    <Skeleton
      ref={ref}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  )
})
SkeletonCircle.displayName = "SkeletonCircle"
