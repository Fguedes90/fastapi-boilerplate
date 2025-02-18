import { useTheme } from "next-themes"
import type React from "react"

import { Radio, RadioGroup } from "@/components/ui/radio"

const Appearance: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Appearance</h1>

      <RadioGroup
        onValueChange={(value: string) => setTheme(value)}
        value={theme}
        className="space-y-2"
      >
        <Radio value="system">System</Radio>
        <Radio value="light">Light Mode</Radio>
        <Radio value="dark">Dark Mode</Radio>
      </RadioGroup>
    </div>
  )
}

export default Appearance
