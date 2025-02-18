#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function migrateDialogComponents(filePath) {
  let content = fs.readFileSync(filePath, "utf8")

  // More comprehensive replacement of DialogRoot
  content = content.replace(
    /<DialogRoot\s+base:\s*"[^"]*"\s*md:\s*"[^"]*"\s*}}\s*placement="[^"]*"\s*open={[^}]*}\s*onOpenChange={[^}]*}/g,
    "<Dialog",
  )

  // Remove Chakra UI specific attributes and fix imports
  content = content.replace(
    /import\s*{[^}]*DialogRoot[^}]*}\s*from\s*"[^"]*"/g,
    'import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"',
  )

  // Clean up Button and icon attributes
  content = content.replace(/value="[^"]*"/g, "")
  content = content.replace(/my={[^}]*}/g, "")
  content = content.replace(/fontSize="[^"]*"/g, "")

  // Adjust self-closing elements and icon usage
  content = content.replace(/<FaExchangeAlt\s*\/>/g, "<FaExchangeAlt />")

  fs.writeFileSync(filePath, content)
}

function findFilesToMigrate(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      findFilesToMigrate(fullPath)
    } else if (
      file.endsWith(".tsx") &&
      fs.readFileSync(fullPath, "utf8").includes("DialogRoot")
    ) {
      console.log(`Migrating: ${fullPath}`)
      migrateDialogComponents(fullPath)
    }
  }
}

findFilesToMigrate(path.join(__dirname, "..", "src"))
console.log("Dialog component migration completed.")
