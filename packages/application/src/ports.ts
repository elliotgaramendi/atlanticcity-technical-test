import type { PokemonHistoryItem, UserSession } from "@atlanticcity/domain";

export interface HistoryRepository {
  clear(): void;
  getAll(): PokemonHistoryItem[];
  save(item: PokemonHistoryItem): PokemonHistoryItem;
}

export interface SessionRepository {
  get(): UserSession | null;
  save(session: UserSession): void;
}
