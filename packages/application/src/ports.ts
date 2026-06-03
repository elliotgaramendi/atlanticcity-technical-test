import type { PokemonHistoryItem, UserSession } from "@atlanticcity/domain";

export interface HistoryRepository {
  clear(): void;
  getAll(): PokemonHistoryItem[];
  save(item: PokemonHistoryItem): void;
}

export interface SessionRepository {
  get(): UserSession | null;
  save(session: UserSession): void;
}
