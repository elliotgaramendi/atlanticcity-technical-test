import type { Pokemon, PokemonHistoryItem } from "@atlanticcity/domain";
import { emitHistoryCleared, emitPokemonVisited } from "../events";
import type { HistoryRepository } from "../ports";

export function saveVisitedPokemon(
  repository: HistoryRepository,
  pokemon: Pokemon,
  visitedAt = new Date().toISOString()
): PokemonHistoryItem {
  const item: PokemonHistoryItem = {
    id: pokemon.id,
    imageUrl: pokemon.imageUrl,
    name: pokemon.name,
    visitedAt,
    visitCount: 1,
    visitId: createVisitId()
  };

  const savedItem = repository.save(item);
  emitPokemonVisited(savedItem);

  return savedItem;
}

export function getVisitedHistory(
  repository: HistoryRepository
): PokemonHistoryItem[] {
  return repository.getAll();
}

export function clearHistory(repository: HistoryRepository): void {
  repository.clear();
  emitHistoryCleared();
}

export function getLastVisitedPokemon(
  repository: HistoryRepository
): PokemonHistoryItem | null {
  return repository.getAll()[0] ?? null;
}

function createVisitId(): string {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
