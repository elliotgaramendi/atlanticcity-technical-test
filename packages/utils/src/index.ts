export function formatPort(port: number): string {
  return `localhost:${port}`;
}

export const storageKeys = {
  history: "atlanticcity:pokemon-history",
  session: "atlanticcity:user-session",
  theme: "atlanticcity:theme"
} as const;

export function normalizePokemonName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
}

export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(3, "0")}`;
}

export function getPokemonImage(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
