import type { Pokemon, PokemonHistoryItem } from "@atlanticcity/domain";
import { beforeEach, describe, expect, it } from "vitest";

import type { HistoryRepository } from "../ports";
import {
  clearHistory,
  getLastVisitedPokemon,
  getVisitedHistory,
  saveVisitedPokemon
} from "./history";

describe("history use cases", () => {
  let repository: InMemoryHistoryRepository;

  beforeEach(() => {
    repository = new InMemoryHistoryRepository();
  });

  it("saves a visited pokemon", () => {
    const saved = saveVisitedPokemon(repository, pikachu, "2026-06-04T10:00:00.000Z");

    expect(saved).toMatchObject({
      id: 25,
      imageUrl: pikachu.imageUrl,
      name: "pikachu",
      visitedAt: "2026-06-04T10:00:00.000Z",
      visitCount: 1
    });
    expect(saved.visitId).toEqual(expect.any(String));
    expect(getVisitedHistory(repository)).toHaveLength(1);
  });

  it("increments visits and avoids duplicated rows", () => {
    saveVisitedPokemon(repository, pikachu, "2026-06-04T10:00:00.000Z");
    const savedAgain = saveVisitedPokemon(
      repository,
      pikachu,
      "2026-06-04T10:10:00.000Z"
    );

    expect(savedAgain.visitCount).toBe(2);
    expect(savedAgain.visitedAt).toBe("2026-06-04T10:10:00.000Z");
    expect(getVisitedHistory(repository)).toHaveLength(1);
  });

  it("moves the last visited pokemon to the beginning", () => {
    saveVisitedPokemon(repository, pikachu, "2026-06-04T10:00:00.000Z");
    saveVisitedPokemon(repository, charmander, "2026-06-04T10:05:00.000Z");
    saveVisitedPokemon(repository, pikachu, "2026-06-04T10:10:00.000Z");

    const history = getVisitedHistory(repository);

    expect(history.map((item) => item.name)).toEqual(["pikachu", "charmander"]);
    expect(history[0]?.visitCount).toBe(2);
  });

  it("returns the last visited pokemon", () => {
    saveVisitedPokemon(repository, pikachu, "2026-06-04T10:00:00.000Z");
    saveVisitedPokemon(repository, charmander, "2026-06-04T10:05:00.000Z");

    expect(getLastVisitedPokemon(repository)?.name).toBe("charmander");
  });

  it("clears history", () => {
    saveVisitedPokemon(repository, pikachu, "2026-06-04T10:00:00.000Z");

    clearHistory(repository);

    expect(getVisitedHistory(repository)).toEqual([]);
    expect(getLastVisitedPokemon(repository)).toBeNull();
  });
});

const pikachu: Pokemon = {
  id: 25,
  imageUrl: "https://example.com/pikachu.png",
  name: "pikachu",
  types: [{ name: "electric" }]
};

const charmander: Pokemon = {
  id: 4,
  imageUrl: "https://example.com/charmander.png",
  name: "charmander",
  types: [{ name: "fire" }]
};

class InMemoryHistoryRepository implements HistoryRepository {
  private items: PokemonHistoryItem[] = [];

  clear(): void {
    this.items = [];
  }

  getAll(): PokemonHistoryItem[] {
    return this.items;
  }

  save(item: PokemonHistoryItem): PokemonHistoryItem {
    const current = this.items.find((entry) => entry.id === item.id);
    const nextItem = {
      ...item,
      visitCount: current ? current.visitCount + 1 : item.visitCount
    };

    this.items = [
      nextItem,
      ...this.items.filter((entry) => entry.id !== item.id)
    ];

    return nextItem;
  }
}
