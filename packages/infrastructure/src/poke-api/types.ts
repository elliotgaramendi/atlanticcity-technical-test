export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: PokeApiNamedResource;
    slot: number;
  }>;
}

export interface PokeApiPokemonDetailResponse {
  abilities: Array<{
    ability: PokeApiNamedResource | null;
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  height: number;
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: PokeApiNamedResource;
  }>;
  types: Array<{
    slot: number;
    type: PokeApiNamedResource;
  }>;
  weight: number;
}
