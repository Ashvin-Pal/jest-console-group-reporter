import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  entry: ["src/index.ts"],
  tsconfig: "./tsconfig.json",
  dts: true,
});
