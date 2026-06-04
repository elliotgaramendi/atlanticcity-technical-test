import { describe, expect, it } from "vitest";

import {
  formatPokemonId,
  getPokemonImage,
  normalizePokemonName,
  storageKeys
} from "./index";

describe("utils", () => {
  describe("normalizePokemonName", () => {
    it("normalizes casing and surrounding whitespace", () => {
      expect(normalizePokemonName("  Pikachu  ")).toBe("pikachu");
    });

    it("normalizes internal spaces into API-friendly separators", () => {
      expect(normalizePokemonName("Mr Mime")).toBe("mr-mime");
    });
  });

  describe("formatPokemonId", () => {
    it("formats ids with three-digit padding", () => {
      expect(formatPokemonId(1)).toBe("#001");
      expect(formatPokemonId(25)).toBe("#025");
      expect(formatPokemonId(150)).toBe("#150");
    });
  });

  describe("getPokemonImage", () => {
    it("returns the official artwork image URL for the given id", () => {
      expect(getPokemonImage(25)).toBe(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      );
    });
  });

  describe("storageKeys", () => {
    it("keeps the expected persistent storage keys", () => {
      expect(storageKeys).toEqual({
        history: "atlanticcity:pokemon-history",
        session: "atlanticcity:user-session",
        theme: "atlanticcity:theme"
      });
    });
  });
});
