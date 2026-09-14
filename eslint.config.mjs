import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // No forma parte del build: se pega dentro de Google Ads, que es quien
    // invoca `main` y expone sus propios globales (AdsApp, UrlFetchApp…).
    "scripts/**",
  ]),
]);

export default eslintConfig;
