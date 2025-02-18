import path from "node:path"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      client: path.resolve(__dirname, "./src/client"),
      components: path.resolve(__dirname, "./src/components"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      lib: path.resolve(__dirname, "./src/lib"),
      routes: path.resolve(__dirname, "./src/routes"),
      theme: path.resolve(__dirname, "./src/theme"),
    },
  },
  plugins: [react(), TanStackRouterVite()],
})
