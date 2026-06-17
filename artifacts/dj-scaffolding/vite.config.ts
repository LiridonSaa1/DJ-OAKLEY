import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const rawPort = process.env.PORT ?? "19030";
const port = Number(rawPort);
const basePath = process.env.BASE_PATH ?? "/";
const isReplit = process.env.REPL_ID !== undefined;
const isDev = process.env.NODE_ENV !== "production";

async function loadReplitPlugins() {
  if (!isReplit || !isDev) return [];
  const plugins = [];
  try {
    const m = await import("@replit/vite-plugin-runtime-error-modal");
    plugins.push(m.default());
  } catch {}
  try {
    const m = await import("@replit/vite-plugin-cartographer");
    plugins.push(m.cartographer({ root: path.resolve(import.meta.dirname, "..") }));
  } catch {}
  try {
    const m = await import("@replit/vite-plugin-dev-banner");
    plugins.push(m.devBanner());
  } catch {}
  return plugins;
}

export default defineConfig(async () => ({
  base: basePath,
  plugins: [react(), tailwindcss(), ...(await loadReplitPlugins())],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
}));
