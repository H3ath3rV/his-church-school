import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

const plugins = [react(), tailwindcss()];
const assetVersion =
  process.env.VITE_ASSET_VERSION?.trim() ||
  process.env.GITHUB_SHA?.slice(0, 12);

if (process.env.CI && !assetVersion) {
  throw new Error(
    "Set VITE_ASSET_VERSION to the deployment commit SHA before building in CI."
  );
}

export default defineConfig({
  base: "./",
  plugins,
  define: {
    __ASSET_VERSION__: JSON.stringify(assetVersion || "local"),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
