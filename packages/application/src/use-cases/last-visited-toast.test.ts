import type { PokemonHistoryItem, UserSession } from "@atlanticcity/domain";
import { beforeEach, describe, expect, it } from "vitest";

import type { HistoryRepository, SessionRepository } from "../ports";
import {
  dismissLastVisitedToast,
  shouldShowLastVisitedToast
} from "./last-visited-toast";

describe("last visited toast use cases", () => {
  let historyRepository: StaticHistoryRepository;
  let sessionRepository: InMemorySessionRepository;

  beforeEach(() => {
    historyRepository = new StaticHistoryRepository([mewtwoVisit]);
    sessionRepository = new InMemorySessionRepository();
  });

  it("shows the toast when history exists and it was not dismissed", () => {
    expect(
      shouldShowLastVisitedToast(historyRepository, sessionRepository)
    ).toBe(true);
  });

  it("dismisses the current last visited pokemon", () => {
    dismissLastVisitedToast(historyRepository, sessionRepository);

    expect(sessionRepository.get()).toMatchObject({
      dismissedLastVisitedVisitId: "visit-mewtwo-1",
      lastVisitedPokemonName: "mewtwo",
      lastVisitedVisitId: "visit-mewtwo-1"
    });
  });

  it("does not show the toast again when the same visit was dismissed", () => {
    dismissLastVisitedToast(historyRepository, sessionRepository);

    expect(
      shouldShowLastVisitedToast(historyRepository, sessionRepository)
    ).toBe(false);
  });

  it("shows the toast again when a new visit id exists", () => {
    dismissLastVisitedToast(historyRepository, sessionRepository);
    historyRepository.setItems([{ ...mewtwoVisit, visitId: "visit-mewtwo-2" }]);

    expect(
      shouldShowLastVisitedToast(historyRepository, sessionRepository)
    ).toBe(true);
  });

  it("does not show the toast without history", () => {
    historyRepository.setItems([]);

    expect(
      shouldShowLastVisitedToast(historyRepository, sessionRepository)
    ).toBe(false);
  });
});

const mewtwoVisit: PokemonHistoryItem = {
  id: 150,
  imageUrl: "https://example.com/mewtwo.png",
  name: "mewtwo",
  visitedAt: "2026-06-04T10:00:00.000Z",
  visitCount: 1,
  visitId: "visit-mewtwo-1"
};

class StaticHistoryRepository implements HistoryRepository {
  constructor(private items: PokemonHistoryItem[]) {}

  clear(): void {
    this.items = [];
  }

  getAll(): PokemonHistoryItem[] {
    return this.items;
  }

  save(item: PokemonHistoryItem): PokemonHistoryItem {
    this.items = [item];
    return item;
  }

  setItems(items: PokemonHistoryItem[]): void {
    this.items = items;
  }
}

class InMemorySessionRepository implements SessionRepository {
  private session: UserSession | null = null;

  get(): UserSession | null {
    return this.session;
  }

  save(session: UserSession): void {
    this.session = session;
  }
}
