// @ts-check

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.test.ts"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules, "vitest/valid-title": "off" },
    settings: { vitest: { typecheck: true } },
  },
  eslintPluginUnicorn.configs["flat/all"],
  {
    rules: { "unicorn/filename-case": "off" },
  },
  eslintConfigPrettier,
);
