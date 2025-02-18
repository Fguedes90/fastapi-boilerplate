import { cn } from "@/lib/utils"
import * as React from "react"

const EmptyStateRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50",
      className,
    )}
    {...props}
  />
))
EmptyStateRoot.displayName = "EmptyState.Root"

const EmptyStateContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex max-w-md flex-col items-center space-y-6", className)}
    {...props}
  />
))
EmptyStateContent.displayName = "EmptyState.Content"

const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold text-foreground", className)}
    {...props}
  />
))
EmptyStateTitle.displayName = "EmptyState.Title"

const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
))
EmptyStateDescription.displayName = "EmptyState.Description"

const EmptyStateIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-20 w-20 items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
))
EmptyStateIndicator.displayName = "EmptyState.Indicator"

export const EmptyState = {
  Root: EmptyStateRoot,
  Content: EmptyStateContent,
  Title: EmptyStateTitle,
  Description: EmptyStateDescription,
  Indicator: EmptyStateIndicator,
}
