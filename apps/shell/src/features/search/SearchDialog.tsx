import type { Pokemon } from "@atlanticcity/domain";
import { AppButton, AppCard, AppDialog, AppInput, EmptyState } from "@atlanticcity/ui";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

interface SearchDialogProps {
  onOpenChange: (open: boolean) => void;
  onPokemonSelect: (pokemon: Pokemon) => void;
  open: boolean;
  pokemon: Pokemon[];
}

export function SearchDialog({
  onOpenChange,
  onPokemonSelect,
  open,
  pokemon
}: SearchDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    window.setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return pokemon.slice(0, 2);

    return pokemon.filter((item) => {
      const paddedId = String(item.id).padStart(3, "0");
      return (
        item.name.toLowerCase().includes(normalizedQuery) ||
        String(item.id).includes(normalizedQuery) ||
        paddedId.includes(normalizedQuery)
      );
    });
  }, [pokemon, query]);

  function handleSelect(pokemon: Pokemon) {
    onPokemonSelect(pokemon);
    onOpenChange(false);
  }

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
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
            onClick={() => onOpenChange(false)}
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
            placeholder="Escribe mew, pikachu o 150"
            value={query}
          />
          <span className="absolute right-5 top-1/2 hidden -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 font-mono text-xs text-muted-foreground dark:bg-slate-900 sm:inline">
            ESC
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Escribe un nombre o numero. {results.length} resultados
        </p>

        {results.length === 0 ? (
          <EmptyState
            className="mt-7"
            description="No hay coincidencias entre las categorias cargadas."
            title="Sin resultados"
          />
        ) : (
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {results.map((item) => (
              <button
                className="text-left"
                key={item.id}
                onClick={() => handleSelect(item)}
                type="button"
              >
                <AppCard className="flex items-center gap-4 rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10">
                  <img
                    alt={item.name}
                    className="h-16 w-16 rounded-2xl bg-sky-100 object-contain p-2 dark:bg-sky-400/10"
                    src={item.imageUrl}
                  />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      #{String(item.id).padStart(3, "0")}
                    </p>
                    <p className="mt-1 font-semibold">{item.name}</p>
                  </div>
                </AppCard>
              </button>
            ))}
          </div>
        )}
      </div>
    </AppDialog>
  );
}
