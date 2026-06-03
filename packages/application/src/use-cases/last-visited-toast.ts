import type { HistoryRepository, SessionRepository } from "../ports";
import { getLastVisitedPokemon } from "./history";

export function shouldShowLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): boolean {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return false;

  return (
    sessionRepository.get()?.dismissedLastVisitedToastAt !==
    lastVisited.visitedAt
  );
}

export function dismissLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): void {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return;

  sessionRepository.save({
    id: sessionRepository.get()?.id ?? "anonymous",
    lastVisitedPokemonName: lastVisited.name,
    dismissedLastVisitedToastAt: lastVisited.visitedAt
  });
}
