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
