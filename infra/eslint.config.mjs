// @ts-check

import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs["flat/all"],
  {
    rules: {
      "unicorn/filename-case": "off",
      "unicorn/prevent-abbreviations": "off",
    },
  },
  eslintConfigPrettier,
);
