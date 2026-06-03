import type { Pokemon, PokemonDetail } from "@atlanticcity/domain";
import { normalizePokemonName } from "@atlanticcity/utils";
import { pokeApiClient } from "../http/poke-api-client";
import {
  adaptNamedResourceToPokemon,
  adaptPokemonDetailResponse
} from "./adapters";
import type {
  PokeApiPokemonDetailResponse,
  PokeApiPokemonListResponse,
  PokeApiTypeResponse
} from "./responses";

export const pokeApiRepository = {
  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiTypeResponse>(
      `/type/${normalizePokemonName(type)}`
    );

    return data.pokemon.map(({ pokemon }) =>
      adaptNamedResourceToPokemon(pokemon, [{ name: data.name }])
    );
  },

  async getPokemonDetail(name: string): Promise<PokemonDetail> {
    const { data } = await pokeApiClient.get<PokeApiPokemonDetailResponse>(
      `/pokemon/${normalizePokemonName(name)}`
    );

    return adaptPokemonDetailResponse(data);
  },

  async getPokemonList(limit = 30, offset = 0): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiPokemonListResponse>(
      "/pokemon",
      { params: { limit, offset } }
    );

    return data.results.map((pokemon) => adaptNamedResourceToPokemon(pokemon));
  }
};
