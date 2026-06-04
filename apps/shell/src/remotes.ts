import { shellRemoteConfigs } from "@atlanticcity/config";

export interface ShellRemoteModule {
  default: unknown;
}

export interface ShellRemote {
  id: "pokemon-detail" | "pokemon-history";
  load: () => Promise<ShellRemoteModule>;
  name: string;
  remoteUrl: string;
}

const remoteLoaders = {
  "pokemon-detail": () => import("pokemonDetail/App"),
  "pokemon-history": () => import("pokemonHistory/App")
} satisfies Record<ShellRemote["id"], ShellRemote["load"]>;

export const shellRemotes: ShellRemote[] = shellRemoteConfigs.map((remote) => ({
  ...remote,
  load: remoteLoaders[remote.id]
}));
