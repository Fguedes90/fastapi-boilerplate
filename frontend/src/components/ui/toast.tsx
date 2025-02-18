import * as React from "react"
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner"
import { cn } from "../../lib/utils"

export type ToastVariant =
  | "default"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"

export interface ToastOptions {
  id?: string | number
  title?: string
  description?: string
  duration?: number
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
  variant?: ToastVariant
  action?: {
    label: string
    onClick: () => void
  }
}

const variantStyles = {
  default: "bg-background text-foreground",
  success: "bg-green-500 text-white",
  error: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-500 text-white",
  loading: "bg-gray-500 text-white",
}

export const toast = (options: ToastOptions) => {
  const {
    title,
    description,
    duration = 3000,
    position = "top-right",
    variant = "default",
    action,
  } = options

  return sonnerToast(title, {
    description,
    duration,
    position,
    className: cn("!rounded-md !p-4 !shadow-lg", variantStyles[variant]),
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  })
}

export const Toaster = () => {
  return (
    <SonnerToaster
      richColors
      expand
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  )
}

// Utility functions for specific toast types
export const successToast = (
  message: string,
  options: Omit<ToastOptions, "variant"> = {},
) => toast({ ...options, title: message, variant: "success" })

export const errorToast = (
  message: string,
  options: Omit<ToastOptions, "variant"> = {},
) => toast({ ...options, title: message, variant: "error" })

export const warningToast = (
  message: string,
  options: Omit<ToastOptions, "variant"> = {},
) => toast({ ...options, title: message, variant: "warning" })

export const infoToast = (
  message: string,
  options: Omit<ToastOptions, "variant"> = {},
) => toast({ ...options, title: message, variant: "info" })

export const loadingToast = (
  message: string,
  options: Omit<ToastOptions, "variant"> = {},
) => toast({ ...options, title: message, variant: "loading" })
