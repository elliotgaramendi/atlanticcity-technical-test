import {
  federationSharedDependencies,
  viteOptimizeDepsExclude,
  viteResolveDedupeDependencies
} from "@atlanticcity/config";
import { federation } from "@module-federation/vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  envDir: "../..",
  publicDir: "../../public",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset({ compilationMode: "annotation" })] }),
    ...federation({
      name: "pokemonDetail",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: federationSharedDependencies
    })
  ],
  resolve: {
    dedupe: viteResolveDedupeDependencies
  },
  optimizeDeps: {
    exclude: viteOptimizeDepsExclude
  },
  server: {
    origin: "http://localhost:3001",
    port: 3001,
    strictPort: true
  },
  build: {
    target: "chrome89"
  },
  preview: {
    port: 3001,
    strictPort: true
  }
});
