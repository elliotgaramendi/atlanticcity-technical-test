export const pokemonCategoryTypes = [
  "fire",
  "water",
  "grass",
  "electric",
  "psychic",
  "ice",
  "dragon",
  "ghost"
] as const;

export type PokemonCategoryType = (typeof pokemonCategoryTypes)[number];

export const pokemonCategoryLabels: Record<PokemonCategoryType, string> = {
  dragon: "Dragon",
  electric: "Electric",
  fire: "Fire",
  ghost: "Ghost",
  grass: "Grass",
  ice: "Ice",
  psychic: "Psychic",
  water: "Water"
};
