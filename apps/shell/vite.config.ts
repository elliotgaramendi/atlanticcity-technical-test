import { federation } from "@module-federation/vite";
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const shared = {
  react: { singleton: true },
  "react/compiler-runtime": { singleton: true },
  "react-dom": { singleton: true },
  "react-router-dom": { singleton: true },
  "@tanstack/react-query": { singleton: true }
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "../..", "");
  const pokemonDetailRemoteUrl =
    env.VITE_POKEMON_DETAIL_REMOTE_URL ??
    "http://localhost:3001/remoteEntry.js";
  const pokemonHistoryRemoteUrl =
    env.VITE_POKEMON_HISTORY_REMOTE_URL ??
    "http://localhost:3002/remoteEntry.js";

  return {
    envDir: "../..",
    publicDir: "../../public",
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset({ compilationMode: "annotation" })]
      }),
      ...federation({
        name: "shell",
        filename: "remoteEntry.js",
        dts: false,
        remotes: {
          pokemonDetail: {
            type: "module",
            name: "pokemonDetail",
            entry: pokemonDetailRemoteUrl,
            entryGlobalName: "pokemonDetail",
            shareScope: "default"
          },
          pokemonHistory: {
            type: "module",
            name: "pokemonHistory",
            entry: pokemonHistoryRemoteUrl,
            entryGlobalName: "pokemonHistory",
            shareScope: "default"
          }
        },
        shared
      })
    ],
    server: {
      origin: "http://localhost:3000",
      port: 3000,
      strictPort: true
    },
    build: {
      target: "chrome89"
    },
    preview: {
      port: 3000,
      strictPort: true
    }
  };
});
