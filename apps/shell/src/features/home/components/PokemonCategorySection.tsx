import type { Pokemon } from "@atlanticcity/domain";
import { EmptyState, ErrorState, LoadingState, PokemonCard } from "@atlanticcity/ui";

import type { PokemonCategory } from "../hooks/usePokemonCategories";

interface PokemonCategorySectionProps {
  category: PokemonCategory;
  onPokemonSelect: (pokemon: Pokemon) => void;
  query: string;
}

export function PokemonCategorySection({
  category,
  onPokemonSelect,
  query
}: PokemonCategorySectionProps) {
  const normalizedQuery = query.trim().toLowerCase();
  const visibleItems = category.items.filter((pokemon) => {
    if (!normalizedQuery) return true;

    return (
      pokemon.name.toLowerCase().includes(normalizedQuery) ||
      String(pokemon.id).includes(normalizedQuery) ||
      String(pokemon.id).padStart(3, "0").includes(normalizedQuery)
    );
  });

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-500">
            Tipo {category.type}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {category.label}
          </h2>
        </div>
        <span className="rounded-full border border-sky-200 px-3 py-1 font-mono text-sm text-muted-foreground dark:border-sky-400/20">
          {visibleItems.length}/10
        </span>
      </div>

      {category.status === "loading" ? (
        <LoadingState items={4} />
      ) : category.status === "error" ? (
        <ErrorState
          description={`No pudimos cargar los Pokemon de tipo ${category.label}.`}
          onRetry={category.refetch}
          title="Categoria no disponible"
        />
      ) : visibleItems.length === 0 ? (
        <EmptyState
          description="Prueba con otro nombre, numero o categoria."
          title="Sin coincidencias locales"
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleItems.map((pokemon) => (
            <PokemonCard
              key={`${category.type}-${pokemon.id}`}
              {...pokemon}
              onClick={() => onPokemonSelect(pokemon)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
