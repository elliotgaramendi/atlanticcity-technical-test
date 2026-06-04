import type { Pokemon } from "@atlanticcity/domain";
import { pokeApiRepository } from "@atlanticcity/infrastructure";
import { useQueries } from "@tanstack/react-query";

import {
  pokemonCategoryLabels,
  pokemonCategoryTypes,
  type PokemonCategoryType
} from "../pokemon-categories";

export interface PokemonCategory {
  error: Error | null;
  items: Pokemon[];
  label: string;
  refetch: () => void;
  status: "empty" | "error" | "loading" | "success";
  type: PokemonCategoryType;
}

export function usePokemonCategories(): PokemonCategory[] {
  const queries = useQueries({
    queries: pokemonCategoryTypes.map((type) => ({
      queryFn: () => pokeApiRepository.getPokemonByType(type),
      queryKey: ["pokemon-category", type]
    }))
  });

  return pokemonCategoryTypes.map((type, index) => {
    const query = queries[index];
    if (!query) {
      return {
        error: null,
        items: [],
        label: pokemonCategoryLabels[type],
        refetch: () => undefined,
        status: "loading",
        type
      };
    }

    const items = query.data?.slice(0, 10) ?? [];

    return {
      error: query.error instanceof Error ? query.error : null,
      items,
      label: pokemonCategoryLabels[type],
      refetch: () => void query.refetch(),
      status: query.isPending
        ? "loading"
        : query.isError
          ? "error"
          : items.length === 0
            ? "empty"
            : "success",
      type
    };
  });
}
