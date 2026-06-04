import type { HistoryRepository, SessionRepository } from "../ports";
import { getLastVisitedPokemon } from "./history";

export function shouldShowLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): boolean {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return false;

  return (
    sessionRepository.get()?.dismissedLastVisitedVisitId !==
    lastVisited.visitId
  );
}

export function dismissLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): void {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return;

  const session = sessionRepository.get();

  sessionRepository.save({
    ...session,
    id: session?.id ?? "anonymous",
    dismissedLastVisitedVisitId: lastVisited.visitId,
    lastVisitedPokemonName: lastVisited.name,
    lastVisitedVisitId: lastVisited.visitId
  });
}
