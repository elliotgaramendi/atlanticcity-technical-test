export type PokemonId = number;
export type PokemonName = string;
export type ThemeMode = "dark" | "light";

export interface PokemonType {
  name: string;
  slot?: number;
}

export interface PokemonStat {
  baseStat: number;
  effort: number;
  name: string;
}

export interface Pokemon {
  id: PokemonId;
  imageUrl: string;
  name: PokemonName;
  types: PokemonType[];
}

export interface PokemonDetail extends Pokemon {
  abilities: string[];
  baseExperience: number;
  height: number;
  stats: PokemonStat[];
  weight: number;
}

export interface PokemonHistoryItem {
  id: PokemonId;
  imageUrl: string;
  name: PokemonName;
  visitedAt: string;
  visitCount: number;
  visitId: string;
}

export interface UserSession {
  authenticatedAt?: string;
  dismissedLastVisitedVisitId?: string;
  displayName?: string;
  email?: string;
  id: string;
  lastVisitedPokemonName?: PokemonName;
  lastVisitedVisitId?: string;
}
