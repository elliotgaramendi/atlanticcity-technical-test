import type { Pokemon, PokemonDetail } from "@atlanticcity/domain";
import { normalizePokemonName } from "@atlanticcity/utils";
import { pokeApiClient } from "../http/poke-api-client";
import { mapNamedResourceToPokemon, mapPokemonDetail } from "./mappers";
import type {
  PokeApiPokemonDetailResponse,
  PokeApiPokemonListResponse,
  PokeApiTypeResponse
} from "./types";

export const pokeApiRepository = {
  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiTypeResponse>(
      `/type/${normalizePokemonName(type)}`
    );

    return data.pokemon.map(({ pokemon }) =>
      mapNamedResourceToPokemon(pokemon, [{ name: data.name }])
    );
  },

  async getPokemonDetail(name: string): Promise<PokemonDetail> {
    const { data } = await pokeApiClient.get<PokeApiPokemonDetailResponse>(
      `/pokemon/${normalizePokemonName(name)}`
    );

    return mapPokemonDetail(data);
  },

  async getPokemonList(limit = 30, offset = 0): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiPokemonListResponse>(
      "/pokemon",
      { params: { limit, offset } }
    );

    return data.results.map((pokemon) => mapNamedResourceToPokemon(pokemon));
  }
};
