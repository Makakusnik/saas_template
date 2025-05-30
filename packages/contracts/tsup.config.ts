import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  outExtension({ format }) {
    // Use .mjs for ESM and .cjs for CommonJS
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // Force bundling to find all dependencies
  noExternal: [],
  cjsInterop: true,
  tsconfig: "tsconfig.build.json",
});
