import {
  subscribeToHistoryCleared,
  subscribeToPokemonVisited
} from "@atlanticcity/application";
import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { useCallback, useEffect, useState } from "react";

export function useVisitedHistory() {
  const [history, setHistory] = useState<PokemonHistoryItem[]>(() =>
    localStorageHistoryRepository.getAll()
  );
  const refreshHistory = useCallback(
    () => setHistory(localStorageHistoryRepository.getAll()),
    []
  );

  useEffect(() => {
    const unsubscribeVisited = subscribeToPokemonVisited(refreshHistory);
    const unsubscribeCleared = subscribeToHistoryCleared(refreshHistory);
    const handleStorage = () => refreshHistory();

    window.addEventListener("storage", handleStorage);

    return () => {
      unsubscribeVisited();
      unsubscribeCleared();
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshHistory]);

  return { history, refreshHistory };
}
