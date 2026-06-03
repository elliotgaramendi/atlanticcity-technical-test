import type { Pokemon } from "@atlanticcity/domain";
import { AppButton, AppCard, AppInput, PokemonCard, showAppToast } from "@atlanticcity/ui";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { SearchDialog } from "../search/SearchDialog";
import { demoPokemon } from "../../components/showcase/demo-pokemon";

const filters = ["Todos", "Agua", "Fuego", "Electrico", "Planta", "Hielo", "Fantasma", "Dragon"];

export function HomePage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const pokemon = demoPokemon as Pokemon[];
  const filteredPokemon = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return pokemon.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        String(item.id).includes(normalizedQuery);
      const matchesType =
        activeFilter === "Todos" ||
        item.types.some((type) => type.name.toLowerCase() === activeFilter.toLowerCase());

      return matchesQuery && matchesType;
    });
  }, [activeFilter, pokemon, query]);

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.34em] text-cyan-500">
            <Sparkles aria-hidden="true" size={16} />
            Sistema de exploracion
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            Explorar Pokemon
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Una base de datos visual de criaturas registradas en Atlantic City.
            Filtra por tipo, busca por nombre o numero, y abre una ficha completa.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MetricCard label="Registros" value="060" />
          <MetricCard label="Tipos" value="18" />
          <MetricCard label="Region" value="Kanto" />
        </div>
      </section>

      <section className="mt-10 grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <AppInput
            className="pl-11"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre o ID"
            value={query}
          />
        </div>
        <AppButton className="h-12" onClick={() => setIsSearchOpen(true)}>
          <SlidersHorizontal aria-hidden="true" size={18} />
          Busqueda avanzada
        </AppButton>
      </section>

      <section className="mt-5 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <AppButton
            key={filter}
            onClick={() => setActiveFilter(filter)}
            size="sm"
            variant={activeFilter === filter ? "default" : "outline"}
          >
            {filter}
          </AppButton>
        ))}
      </section>

      <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredPokemon.map((item) => (
          <PokemonCard
            key={item.id}
            {...item}
            onClick={() =>
              showAppToast.success(
                "Ultimo Pokemon visitado",
                `${item.name} quedo registrado en la bitacora.`
              )
            }
          />
        ))}
      </section>

      <footer className="mt-14 border-t border-border py-8 text-center text-sm text-muted-foreground">
        Atlantic City Pokedex · datos cortesia de PokeAPI
      </footer>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        pokemon={pokemon}
      />
    </>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <AppCard className="min-w-24 rounded-2xl p-4">
      <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg">{value}</p>
    </AppCard>
  );
}
