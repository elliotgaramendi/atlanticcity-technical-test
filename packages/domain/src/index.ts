export type PokemonId = number;
export type PokemonName = string;

export interface PokemonSummary {
  id: PokemonId;
  name: PokemonName;
  imageUrl: string;
}
