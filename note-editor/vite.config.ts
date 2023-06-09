import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": `${path.resolve(__dirname, "./src/components/")}`,
      "@styles": `${path.resolve(__dirname, "./src/styles/")}`,
      "@utils": `${path.resolve(__dirname, "./src/utils/")}`,
      "@customTypes": `${path.resolve(__dirname, "./src/customTypes/")}`,
      "@assets": `${path.resolve(__dirname, "./src/assets")}`,
    },
  },
});
