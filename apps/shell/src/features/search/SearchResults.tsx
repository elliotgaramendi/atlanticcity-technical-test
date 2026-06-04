import type { Pokemon } from "@atlanticcity/domain";
import { EmptyState, ErrorState, LoadingState, Skeleton } from "@atlanticcity/ui";
import { SearchX } from "lucide-react";
import type { RefObject } from "react";

import { SearchResultCard } from "./SearchResultCard";

interface SearchResultsProps {
  isExactMode: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  notFound: boolean;
  onRetry: () => void;
  onSelect: (pokemon: Pokemon) => void;
  pokemon: Pokemon[];
  status: "empty" | "error" | "loading" | "not-found" | "success";
}

export function SearchResults({
  isExactMode,
  isFetchingNextPage,
  isLoading,
  loadMoreRef,
  notFound,
  onRetry,
  onSelect,
  pokemon,
  status
}: SearchResultsProps) {
  if (status === "loading" || isLoading) {
    return <LoadingState className="mt-7" items={6} />;
  }

  if (status === "error") {
    return (
      <ErrorState
        className="mt-7"
        description="No pudimos sincronizar con PokeAPI. Intenta nuevamente."
        onRetry={onRetry}
        title="Busqueda interrumpida"
      />
    );
  }

  if (status === "not-found" || notFound) {
    return (
      <EmptyState
        className="mt-7"
        description="La busqueda es exacta. Revisa el nombre completo del Pokemon."
        icon={SearchX}
        title="No encontrado"
      />
    );
  }

  if (status === "empty" || pokemon.length === 0) {
    return (
      <EmptyState
        className="mt-7"
        description="No hay Pokemon disponibles para mostrar en este momento."
        title="Sin resultados"
      />
    );
  }

  return (
    <>
      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pokemon.map((item) => (
          <SearchResultCard key={item.id} onSelect={onSelect} pokemon={item} />
        ))}
      </div>

      {!isExactMode ? (
        <div ref={loadMoreRef} className="py-6">
          {isFetchingNextPage ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              <Skeleton className="min-h-40 rounded-3xl bg-sky-200/50 dark:bg-sky-400/10" />
              <Skeleton className="hidden min-h-40 rounded-3xl bg-sky-200/50 dark:bg-sky-400/10 sm:block" />
              <Skeleton className="hidden min-h-40 rounded-3xl bg-sky-200/50 dark:bg-sky-400/10 lg:block" />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
