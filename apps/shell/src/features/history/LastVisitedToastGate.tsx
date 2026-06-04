import { localStorageHistoryRepository } from "@atlanticcity/infrastructure";
import { showAppToast } from "@atlanticcity/ui";
import { formatPokemonId } from "@atlanticcity/utils";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useSessionStore } from "../../stores";

export function LastVisitedToastGate() {
  const location = useLocation();
  const session = useSessionStore((state) => state.session);
  const shownVisitIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!session) return;
    if (!["/", "/history"].includes(location.pathname)) return;

    const lastVisited = localStorageHistoryRepository.getAll()[0];
    if (!lastVisited) return;

    const routeVisitKey = `${location.pathname}:${lastVisited.visitId}`;
    if (shownVisitIdRef.current === routeVisitKey) return;

    shownVisitIdRef.current = routeVisitKey;

    showAppToast.lastVisited(
      "Último Pokemon visitado",
      `${lastVisited.name} ${formatPokemonId(lastVisited.id)} · ${lastVisited.visitCount
      } visita${lastVisited.visitCount === 1 ? "" : "s"}`,
      lastVisited.imageUrl
    );
  }, [location.pathname, session]);

  return null;
}
