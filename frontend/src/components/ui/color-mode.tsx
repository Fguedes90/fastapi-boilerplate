"use client"

import { ThemeProvider, useTheme } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { cn } from "../../lib/utils"
import { Button } from "./button"

export interface ColorModeProviderProps extends ThemeProviderProps {}

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export type ColorMode = "light" | "dark"

export interface UseColorModeReturn {
  colorMode: ColorMode
  setColorMode: (colorMode: ColorMode) => void
  toggleColorMode: () => void
}

export function useColorMode(): UseColorModeReturn {
  const { resolvedTheme, setTheme } = useTheme()
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }
  return {
    colorMode: resolvedTheme as ColorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? dark : light
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

export interface ColorModeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>(function ColorModeButton(
  { className, variant = "ghost", size = "icon", ...props },
  ref,
) {
  const { toggleColorMode } = useColorMode()

  return (
    <Button
      ref={ref}
      className={cn(className, "p-1")}
      aria-label="Toggle color mode"
      onClick={toggleColorMode}
      {...props}
    >
      <ColorModeIcon />
    </Button>
  )
})

ColorModeButton.displayName = "ColorModeButton"

// Simplified light/dark mode wrappers
export const LightMode: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("light", className)} {...props}>
    {children}
  </div>
)

export const DarkMode: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn("dark", className)} {...props}>
    {children}
  </div>
)
