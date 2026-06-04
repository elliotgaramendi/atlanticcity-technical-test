import { AppButton, AppCard, AppInput } from "@atlanticcity/ui";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";

import { PokemonDetailView } from "./PokemonDetailView";

const suggestedPokemon = ["pikachu", "charizard", "mewtwo", "bulbasaur", "squirtle"];

export function StandaloneDetailPage() {
  const [draftName, setDraftName] = useState("pikachu");
  const [pokemonName, setPokemonName] = useState("pikachu");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = draftName.trim();
    if (nextName) setPokemonName(nextName);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:py-10">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-cyan-500">
            Pokemon Detail MFE
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
            Laboratorio de detalle
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Escribe un Pokemon o usa un sugerido para probar el remoto de forma
            independiente en localhost:3001.
          </p>
        </header>

        <AppCard className="p-4 sm:p-5" tone="glass">
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
            <div className="relative flex-1">
              <Search
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500"
                size={18}
              />
              <AppInput
                className="pl-11"
                onChange={(event) => setDraftName(event.target.value)}
                placeholder="mewtwo, pikachu, charizard..."
                value={draftName}
              />
            </div>
            <AppButton type="submit">Cargar detalle</AppButton>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestedPokemon.map((name) => (
              <AppButton
                key={name}
                onClick={() => {
                  setDraftName(name);
                  setPokemonName(name);
                }}
                size="sm"
                type="button"
                variant="outline"
              >
                {name}
              </AppButton>
            ))}
          </div>
        </AppCard>

        <PokemonDetailView pokemonName={pokemonName} />
      </section>
    </main>
  );
}
