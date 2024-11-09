import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import * as dotenv from "dotenv";
import { nodePolyfills } from "vite-plugin-node-polyfills";

dotenv.config({ path: "../../.env" });

export default defineConfig({
	build: {
		emptyOutDir: true,
	},
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "globalThis",
			},
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
	plugins: [
		react(),
		environment("all", { prefix: "CANISTER_" }),
		environment("all", { prefix: "DFX_" }),
		nodePolyfills(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			// declarations: path.resolve(__dirname, "../declarations"),
		},
	},
});
