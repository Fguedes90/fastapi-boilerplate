import { ThemeProvider as ThemeProviderBase } from "./theme-provider"
import { Toaster } from "./toaster"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProviderBase defaultTheme="system" storageKey="ui-theme">
      {children}
      <Toaster />
    </ThemeProviderBase>
  )
}
