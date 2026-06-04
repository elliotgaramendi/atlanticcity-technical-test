export const pokemonCategoryTypes = ["fire", "water", "grass"] as const;

export type PokemonCategoryType = (typeof pokemonCategoryTypes)[number];

export const pokemonCategoryLabels: Record<PokemonCategoryType, string> = {
  fire: "Fire",
  grass: "Grass",
  water: "Water"
};
