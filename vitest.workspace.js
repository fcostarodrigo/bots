import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./share/vitest.config.ts",
  "./backend/vitest.config.ts",
  "./frontend/vitest.config.ts",
]);
