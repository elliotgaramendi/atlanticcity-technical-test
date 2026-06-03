import { PokemonCard, showAppToast } from "@atlanticcity/ui";
import { demoPokemon } from "./demo-pokemon";

export function PokemonPreviewGrid() {
  return (
    <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {demoPokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          {...pokemon}
          onClick={() =>
            showAppToast.success(
              "Ultimo Pokemon visitado",
              `${pokemon.name} quedo registrado en la bitacora.`
            )
          }
        />
      ))}
    </section>
  );
}
