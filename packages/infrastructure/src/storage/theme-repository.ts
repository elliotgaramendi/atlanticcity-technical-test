import type { ThemeMode } from "@atlanticcity/domain";
import { storageKeys } from "@atlanticcity/utils";
import { readJson, writeJson } from "./safe-storage";

export const localStorageThemeRepository = {
  get(): ThemeMode | null {
    return readJson<ThemeMode | null>(storageKeys.theme, null);
  },

  save(theme: ThemeMode): void {
    writeJson(storageKeys.theme, theme);
  }
};
