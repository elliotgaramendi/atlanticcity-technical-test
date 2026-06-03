import type { PokemonHistoryItem } from "@atlanticcity/domain";
import { storageKeys } from "@atlanticcity/utils";
import { readJson, safeStorage, writeJson } from "./safe-storage";

export const localStorageHistoryRepository = {
  clear(): void {
    safeStorage()?.removeItem(storageKeys.history);
  },

  getAll(): PokemonHistoryItem[] {
    return readJson<PokemonHistoryItem[]>(storageKeys.history, []);
  },

  save(item: PokemonHistoryItem): void {
    const history = this.getAll().filter((entry) => entry.name !== item.name);
    writeJson(storageKeys.history, [item, ...history]);
  }
};
