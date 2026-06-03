export interface PokeApiNamedResourceResponse {
  name: string;
  url: string;
}

export interface PokeApiPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResourceResponse[];
}

export interface PokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: PokeApiNamedResourceResponse;
    slot: number;
  }>;
}

export interface PokeApiPokemonDetailResponse {
  abilities: Array<{
    ability: PokeApiNamedResourceResponse | null;
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
    stat: PokeApiNamedResourceResponse;
  }>;
  types: Array<{
    slot: number;
    type: PokeApiNamedResourceResponse;
  }>;
  weight: number;
}
