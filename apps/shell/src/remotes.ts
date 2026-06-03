import { workspaceApps } from "@atlanticcity/config";
import type { ComponentType } from "react";

export interface ShellRemote {
  id: "pokemon-detail" | "pokemon-history";
  load: () => Promise<{ default: ComponentType }>;
  name: string;
  remoteUrl: string;
}

export const shellRemotes: ShellRemote[] = [
  {
    id: "pokemon-detail",
    load: () => import("pokemonDetail/App"),
    name: workspaceApps.detail.name,
    remoteUrl:
      import.meta.env.VITE_POKEMON_DETAIL_REMOTE_URL ??
      "http://localhost:3001/remoteEntry.js"
  },
  {
    id: "pokemon-history",
    load: () => import("pokemonHistory/App"),
    name: workspaceApps.history.name,
    remoteUrl:
      import.meta.env.VITE_POKEMON_HISTORY_REMOTE_URL ??
      "http://localhost:3002/remoteEntry.js"
  }
];
