import {
  subscribeToHistoryCleared,
  subscribeToPokemonVisited
} from "@atlanticcity/application";
import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { useEffect, useState } from "react";

export function useVisitedHistory() {
  const [history, setHistory] = useState<PokemonHistoryItem[]>(() =>
    localStorageHistoryRepository.getAll()
  );

  useEffect(() => {
    const refreshHistory = () => setHistory(localStorageHistoryRepository.getAll());
    const unsubscribeVisited = subscribeToPokemonVisited(refreshHistory);
    const unsubscribeCleared = subscribeToHistoryCleared(refreshHistory);

    return () => {
      unsubscribeVisited();
      unsubscribeCleared();
    };
  }, []);

  return history;
}
