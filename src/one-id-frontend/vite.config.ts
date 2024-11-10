import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      declarations: path.resolve(__dirname, "../declarations"),
    },
  },
  define: {
    global: "globalThis",
  },
  build: {
    target: "esnext",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
});
