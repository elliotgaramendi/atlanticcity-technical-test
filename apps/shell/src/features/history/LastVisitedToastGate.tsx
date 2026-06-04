import {
  dismissLastVisitedToast,
  shouldShowLastVisitedToast
} from "@atlanticcity/application";
import type { UserSession } from "@atlanticcity/domain";
import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { showAppToast } from "@atlanticcity/ui";
import { formatPokemonId } from "@atlanticcity/utils";
import { useEffect, useRef } from "react";

import { useSessionStore } from "../../stores";

export function LastVisitedToastGate() {
  const session = useSessionStore((state) => state.session);
  const shownVisitIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!session) return;
    if (!shouldShowLastVisitedToast(localStorageHistoryRepository, shellSessionRepository)) {
      return;
    }

    const lastVisited = localStorageHistoryRepository.getAll()[0];
    if (!lastVisited || shownVisitIdRef.current === lastVisited.visitId) return;

    shownVisitIdRef.current = lastVisited.visitId;

    showAppToast.lastVisited(
      "Ultimo Pokemon visitado",
      `${lastVisited.name} ${formatPokemonId(lastVisited.id)} · ${
        lastVisited.visitCount
      } visita${lastVisited.visitCount === 1 ? "" : "s"}`,
      dismissCurrentToast
    );

    function dismissCurrentToast() {
      dismissLastVisitedToast(localStorageHistoryRepository, shellSessionRepository);
    }
  }, [session]);

  return null;
}

const shellSessionRepository = {
  get(): UserSession | null {
    return useSessionStore.getState().session;
  },
  save(nextSession: UserSession): void {
    useSessionStore.getState().updateSession(nextSession);
  }
};
