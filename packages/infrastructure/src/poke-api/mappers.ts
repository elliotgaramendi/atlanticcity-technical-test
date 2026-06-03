import type { Pokemon, PokemonDetail } from "@atlanticcity/domain";
import { getPokemonImage } from "@atlanticcity/utils";
import type {
  PokeApiNamedResource,
  PokeApiPokemonDetailResponse
} from "./types";

export function mapNamedResourceToPokemon(
  resource: PokeApiNamedResource,
  types: Pokemon["types"] = []
): Pokemon {
  const id = getPokemonIdFromUrl(resource.url);

  return {
    id,
    imageUrl: getPokemonImage(id),
    name: resource.name,
    types
  };
}

export function mapPokemonDetail(
  data: PokeApiPokemonDetailResponse
): PokemonDetail {
  const imageUrl =
    data.sprites.other?.["official-artwork"]?.front_default ??
    data.sprites.front_default ??
    getPokemonImage(data.id);

  return {
    abilities: data.abilities
      .map(({ ability }) => ability?.name)
      .filter((name): name is string => Boolean(name)),
    baseExperience: data.base_experience,
    height: data.height,
    id: data.id,
    imageUrl,
    name: data.name,
    stats: data.stats.map((stat) => ({
      baseStat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name
    })),
    types: data.types.map((type) => ({
      name: type.type.name,
      slot: type.slot
    })),
    weight: data.weight
  };
}

function getPokemonIdFromUrl(url: string): number {
  const match = /\/pokemon\/(?<id>\d+)\/?$/.exec(url);
  return Number(match?.groups?.id ?? 0);
}
