import React, { type PropsWithChildren } from "react"
import "../../globals.css"
import { system } from "../../theme"
import { ColorModeProvider } from "./color-mode"
import { ThemeProvider } from "./theme-provider"
import { Toaster } from "./toaster"

export function CustomProvider(props: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="light">
      <ChakraProvider value={system}>
        <ColorModeProvider defaultTheme="light">
          {props.children}
        </ColorModeProvider>
        <Toaster />
      </ChakraProvider>
    </ThemeProvider>
  )
}
