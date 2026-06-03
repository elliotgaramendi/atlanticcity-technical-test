import type { UserSession } from "@atlanticcity/domain";
import { storageKeys } from "@atlanticcity/utils";
import { readJson, writeJson } from "./safe-storage";

export const localStorageSessionRepository = {
  get(): UserSession | null {
    return readJson<UserSession | null>(storageKeys.session, null);
  },

  save(session: UserSession): void {
    writeJson(storageKeys.session, session);
  }
};
