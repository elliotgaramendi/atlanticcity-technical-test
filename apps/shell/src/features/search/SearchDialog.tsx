import type { Pokemon } from "@atlanticcity/domain";
import { AppButton, AppDialog, AppInput } from "@atlanticcity/ui";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { SearchResults } from "./SearchResults";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import {
  normalizeExactPokemonSearch,
  useExactPokemonSearch
} from "./hooks/useExactPokemonSearch";
import { usePokemonInfiniteSearchList } from "./hooks/usePokemonInfiniteSearchList";

interface SearchDialogProps {
  onOpenChange: (open: boolean) => void;
  onPokemonSelect: (pokemon: Pokemon) => void;
  open: boolean;
}

export function SearchDialog({
  onOpenChange,
  onPokemonSelect,
  open
}: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeExactPokemonSearch(query);
  const debouncedQuery = useDebouncedValue(normalizedQuery, 500);
  const isExactMode = normalizedQuery.length > 0;
  const isWaitingForDebounce = isExactMode && normalizedQuery !== debouncedQuery;
  const listQuery = usePokemonInfiniteSearchList(open && !isExactMode);
  const exactQuery = useExactPokemonSearch(debouncedQuery, open && isExactMode);

  useEffect(() => {
    if (!open) return;

    window.setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (
      !open ||
      isExactMode ||
      !sentinel ||
      !listQuery.hasNextPage ||
      listQuery.isFetchingNextPage
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void listQuery.fetchNextPage();
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [
    isExactMode,
    listQuery,
    listQuery.fetchNextPage,
    listQuery.hasNextPage,
    listQuery.isFetchingNextPage,
    open
  ]);

  const results = useMemo(() => {
    if (isExactMode) {
      return exactQuery.data ? [exactQuery.data] : [];
    }

    return listQuery.pokemon;
  }, [exactQuery.data, isExactMode, listQuery.pokemon]);

  const resultStatus = getResultStatus({
    exactError: exactQuery.isError,
    exactLoading: isWaitingForDebounce || exactQuery.isPending,
    exactMode: isExactMode,
    listError: listQuery.isError,
    listLoading: listQuery.isPending,
    notFound: exactQuery.isNotFound,
    results
  });

  function handleSelect(pokemon: Pokemon) {
    onPokemonSelect(pokemon);
    handleOpenChange(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setQuery("");
    }

    onOpenChange(nextOpen);
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={handleOpenChange}
      showHeader={false}
      size="fullscreen"
      title="Busqueda avanzada"
    >
      <div className="mx-auto flex min-h-[calc(100dvh-3rem)] w-full max-w-5xl flex-col pt-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-muted-foreground">
            Busqueda avanzada
          </p>
          <AppButton
            className="h-10 gap-2 px-4"
            onClick={() => handleOpenChange(false)}
            type="button"
            variant="outline"
          >
            Cerrar
            <X aria-hidden="true" size={16} />
          </AppButton>
        </div>

        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-500"
            size={22}
          />
          <AppInput
            ref={inputRef}
            className="h-16 rounded-3xl border-sky-400 bg-white/90 pl-14 text-xl shadow-2xl shadow-sky-500/10 dark:bg-slate-950/70"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nombre exacto: pikachu, mewtwo, charizard"
            value={query}
          />
          <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 font-mono text-xs text-muted-foreground dark:bg-slate-900 sm:inline">
            ESC
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {isExactMode
            ? "Busqueda exacta por nombre. No se buscan fragmentos."
            : `Explorando PokeAPI por paginas de 30. ${results.length} resultados cargados.`}
        </p>

        <SearchResults
          isExactMode={isExactMode}
          isFetchingNextPage={listQuery.isFetchingNextPage}
          isLoading={
            isExactMode
              ? isWaitingForDebounce || exactQuery.isPending
              : listQuery.isPending
          }
          loadMoreRef={loadMoreRef}
          notFound={exactQuery.isNotFound}
          onRetry={() => {
            if (isExactMode) {
              void exactQuery.refetch();
            } else {
              void listQuery.refetch();
            }
          }}
          onSelect={handleSelect}
          pokemon={results}
          status={resultStatus}
        />
      </div>
    </AppDialog>
  );
}

function getResultStatus({
  exactError,
  exactLoading,
  exactMode,
  listError,
  listLoading,
  notFound,
  results
}: {
  exactError: boolean;
  exactLoading: boolean;
  exactMode: boolean;
  listError: boolean;
  listLoading: boolean;
  notFound: boolean;
  results: Pokemon[];
}): "empty" | "error" | "loading" | "not-found" | "success" {
  if (exactMode) {
    if (exactLoading) return "loading";
    if (notFound) return "not-found";
    if (exactError) return "error";
    return results.length === 0 ? "empty" : "success";
  }

  if (listLoading) return "loading";
  if (listError) return "error";
  return results.length === 0 ? "empty" : "success";
}
