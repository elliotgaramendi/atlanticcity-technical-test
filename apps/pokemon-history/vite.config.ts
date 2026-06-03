import { federation } from "@module-federation/vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const shared = {
  react: { singleton: true },
  "react/compiler-runtime": { singleton: true },
  "react-dom": { singleton: true },
  "react-router-dom": { singleton: true },
  "@tanstack/react-query": { singleton: true }
};

export default defineConfig({
  envDir: "../..",
  publicDir: "../../public",
  plugins: [
    react({ reactRefreshHost: "http://localhost:3000" }),
    babel({ presets: [reactCompilerPreset({ compilationMode: "annotation" })] }),
    ...federation({
      name: "pokemonHistory",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared
    })
  ],
  server: {
    origin: "http://localhost:3002",
    port: 3002,
    strictPort: true
  },
  build: {
    target: "chrome89"
  },
  preview: {
    port: 3002,
    strictPort: true
  }
});
