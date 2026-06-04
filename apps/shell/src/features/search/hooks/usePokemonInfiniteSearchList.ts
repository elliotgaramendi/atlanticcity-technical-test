import type { Pokemon } from "@atlanticcity/domain";
import { pokeApiRepository } from "@atlanticcity/infrastructure";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const pageSize = 30;

export function usePokemonInfiniteSearchList(enabled: boolean) {
  const query = useInfiniteQuery<
    Pokemon[],
    Error,
    InfiniteData<Pokemon[]>,
    ["pokemon-search-list"],
    number
  >({
    enabled,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < pageSize ? undefined : pages.length * pageSize,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => pokeApiRepository.getPokemonList(pageSize, pageParam),
    queryKey: ["pokemon-search-list"]
  });

  const pokemon = useMemo(
    () => dedupePokemon(query.data?.pages.flat() ?? []),
    [query.data]
  );

  return {
    ...query,
    pokemon
  };
}

function dedupePokemon(pokemon: Pokemon[]): Pokemon[] {
  const pokemonById = new Map<number, Pokemon>();

  for (const item of pokemon) {
    if (!pokemonById.has(item.id)) {
      pokemonById.set(item.id, item);
    }
  }

  return [...pokemonById.values()];
}
