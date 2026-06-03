import type { Pokemon, PokemonDetail } from "@atlanticcity/domain";
import { getPokemonImage } from "@atlanticcity/utils";
import type {
  PokeApiNamedResourceResponse,
  PokeApiPokemonDetailResponse
} from "./responses";

export function adaptNamedResourceToPokemon(
  response: PokeApiNamedResourceResponse,
  types: Pokemon["types"] = []
): Pokemon {
  const id = getPokemonIdFromUrl(response.url);

  return {
    id,
    imageUrl: getPokemonImage(id),
    name: response.name,
    types
  };
}

export function adaptPokemonDetailResponse(
  response: PokeApiPokemonDetailResponse
): PokemonDetail {
  const imageUrl =
    response.sprites.other?.["official-artwork"]?.front_default ??
    response.sprites.front_default ??
    getPokemonImage(response.id);

  return {
    abilities: response.abilities
      .map(({ ability }) => ability?.name)
      .filter((name): name is string => Boolean(name)),
    baseExperience: response.base_experience,
    height: response.height,
    id: response.id,
    imageUrl,
    name: response.name,
    stats: response.stats.map((stat) => ({
      baseStat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name
    })),
    types: response.types.map((type) => ({
      name: type.type.name,
      slot: type.slot
    })),
    weight: response.weight
  };
}

function getPokemonIdFromUrl(url: string): number {
  const match = /\/pokemon\/(?<id>\d+)\/?$/.exec(url);
  return Number(match?.groups?.id ?? 0);
}
