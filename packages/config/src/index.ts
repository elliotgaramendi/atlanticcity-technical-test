export const workspaceApps = {
  shell: {
    name: "Shell Host",
    port: 3000,
    path: "apps/shell"
  },
  detail: {
    name: "Pokemon Detail MFE",
    port: 3001,
    path: "apps/pokemon-detail"
  },
  history: {
    name: "Pokemon History MFE",
    port: 3002,
    path: "apps/pokemon-history"
  }
} as const;

export type WorkspaceAppKey = keyof typeof workspaceApps;

type ViteEnv = {
  VITE_POKE_API_BASE_URL?: string;
  VITE_POKEMON_DETAIL_REMOTE_URL?: string;
  VITE_POKEMON_HISTORY_REMOTE_URL?: string;
};

const env = ((import.meta as ImportMeta & { env?: ViteEnv }).env ?? {}) as ViteEnv;

export const pokeApiBaseUrl =
  env.VITE_POKE_API_BASE_URL ?? "https://pokeapi.co/api/v2";

export const remoteUrls = {
  pokemonDetail:
    env.VITE_POKEMON_DETAIL_REMOTE_URL ??
    "http://localhost:3001/remoteEntry.js",
  pokemonHistory:
    env.VITE_POKEMON_HISTORY_REMOTE_URL ??
    "http://localhost:3002/remoteEntry.js"
} as const;

export interface ShellRemoteConfig {
  id: "pokemon-detail" | "pokemon-history";
  name: string;
  remoteUrl: string;
}

export const shellRemoteConfigs = [
  {
    id: "pokemon-detail",
    name: workspaceApps.detail.name,
    remoteUrl: remoteUrls.pokemonDetail
  },
  {
    id: "pokemon-history",
    name: workspaceApps.history.name,
    remoteUrl: remoteUrls.pokemonHistory
  }
] satisfies ShellRemoteConfig[];

export const federationSharedDependencies = {
  react: { singleton: true },
  "react/compiler-runtime": { singleton: true },
  "react-dom": { singleton: true },
  "react-router-dom": { singleton: true },
  "@tanstack/react-query": { singleton: true }
} as const;

export const viteResolveDedupeDependencies = Object.keys(
  federationSharedDependencies
);

export const viteOptimizeDepsExclude = [
  "@module-federation/runtime",
  "@module-federation/runtime-tools",
  "@module-federation/vite"
];
