import { saveVisitedPokemon } from "@atlanticcity/application";
import type { Pokemon, PokemonHistoryItem } from "@atlanticcity/domain";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { useEffect } from "react";

const recentlySavedVisits = new Map<string, number>();
const duplicateGuardMs = 1500;

interface UseSavePokemonVisitParams {
  enabled: boolean;
  onVisited?: (item: PokemonHistoryItem) => void;
  pokemon?: Pokemon;
}

export function useSavePokemonVisit({
  enabled,
  onVisited,
  pokemon
}: UseSavePokemonVisitParams) {
  useEffect(() => {
    if (!enabled || !pokemon) return;

    const savedAt = recentlySavedVisits.get(pokemon.name);
    const now = Date.now();
    if (savedAt && now - savedAt < duplicateGuardMs) return;

    recentlySavedVisits.set(pokemon.name, now);
    onVisited?.(saveVisitedPokemon(localStorageHistoryRepository, pokemon));
  }, [enabled, onVisited, pokemon]);
}
