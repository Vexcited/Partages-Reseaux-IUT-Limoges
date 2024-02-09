import typescript from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";
import solid from "eslint-plugin-solid/configs/typescript.js";

export default [
  { // Apply to `cjs`, `.mjs` and `.js` files.
    files: ["**/*.?([cm])js"]
  },
  { // Apply to `.ts` and `.tsx` files.
    ignores: [".output/**", ".vinxi/**", "node_modules/**"],
    files: ["**/*.{ts,tsx}"],
    ...solid,
    languageOptions: {
      parser: typescript,
      parserOptions: {
        project: "tsconfig.json"
      }
    }
  },
  {
    ignores: [".output/**", ".vinxi/**", "node_modules/**"],
    plugins: { stylistic },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/semi": ["error", "always"],
      "stylistic/eol-last": ["error", "always"],
      "stylistic/quotes": ["error", "double"],
      "stylistic/dot-location": ["error", "property"],
      "stylistic/array-bracket-spacing": ["error", "never"],
      "stylistic/arrow-parens": ["error", "always"],
      "stylistic/arrow-spacing": "error",
      "stylistic/block-spacing": ["error", "always"],
      "stylistic/brace-style": ["error", "stroustrup"],
      "stylistic/comma-dangle": ["error", "never"],
      "stylistic/comma-spacing": ["error", { before: false, after: true }],
      "stylistic/function-call-spacing": ["error", "never"],
      "stylistic/no-trailing-spaces": "error"
    }
  }
];
