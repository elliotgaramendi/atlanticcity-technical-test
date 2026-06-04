export const demoCredentials = {
  password: "Atlantic2026",
  username: "ash.ketchum@atlanticcity.dev"
} as const;

export const demoUser = {
  displayName: "Ash Ketchum",
  email: demoCredentials.username,
  id: "ash-ketchum"
} as const;
