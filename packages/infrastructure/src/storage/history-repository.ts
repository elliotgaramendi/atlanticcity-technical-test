import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { storageKeys } from "@atlanticcity/utils";
import { readJson, safeStorage, writeJson } from "./safe-storage";

type StoredPokemonHistoryItem = PokemonHistoryItem | Omit<PokemonHistoryItem, "visitCount">;

export const localStorageHistoryRepository = {
  clear(): void {
    safeStorage()?.removeItem(storageKeys.history);
  },

  getAll(): PokemonHistoryItem[] {
    return readJson<StoredPokemonHistoryItem[]>(storageKeys.history, []).map(
      normalizeHistoryItem
    );
  },

  save(item: PokemonHistoryItem): PokemonHistoryItem {
    const history = this.getAll();
    const current = history.find((entry) => entry.id === item.id);
    const nextItem: PokemonHistoryItem = {
      ...item,
      visitCount: current ? current.visitCount + 1 : item.visitCount
    };

    writeJson(storageKeys.history, [
      nextItem,
      ...history.filter((entry) => entry.id !== item.id)
    ]);

    return nextItem;
  }
};

function normalizeHistoryItem(item: StoredPokemonHistoryItem): PokemonHistoryItem {
  return {
    ...item,
    visitCount: "visitCount" in item ? item.visitCount : 1
  };
}
