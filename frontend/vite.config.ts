import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  test: {
    clearMocks: true,
    environment: "happy-dom",
    setupFiles: ["./src/testUtils/vitestSetup.ts"],
  },
});
