import { ChakraProvider } from "@chakra-ui/react"
import React, { type PropsWithChildren } from "react"
import { system } from "../../theme"
import { ColorModeProvider } from "./color-mode"
import { Toaster } from "./toaster"
import { ThemeProvider } from "./theme-provider"
import "../../globals.css"

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
