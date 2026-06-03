import { AppButton, AppCard, AppDialog, AppInput } from "@atlanticcity/ui";
import { Search, SlidersHorizontal } from "lucide-react";
import { demoPokemon } from "./demo-pokemon";

export function SearchControls() {
  return (
    <>
      <section className="mt-10 grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <AppInput className="pl-11" placeholder="Buscar por nombre o ID" />
        </div>
        <AppDialog
          description="Prueba visual del modal fullscreen compacto, busqueda y resultados."
          title="Busqueda avanzada"
          trigger={
            <AppButton className="h-12">
              <SlidersHorizontal aria-hidden="true" size={18} />
              Busqueda avanzada
            </AppButton>
          }
        >
          <div className="space-y-5">
            <AppInput autoFocus placeholder="Escribe mew, pika o dragonite" />
            <div className="grid gap-3 sm:grid-cols-2">
              {demoPokemon.slice(2).map((pokemon) => (
                <AppCard className="flex items-center gap-4 p-4" key={pokemon.id}>
                  <img
                    alt={pokemon.name}
                    className="h-14 w-14 rounded-2xl bg-sky-100 object-contain p-1 dark:bg-sky-400/10"
                    src={pokemon.imageUrl}
                  />
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">
                      #{String(pokemon.id).padStart(3, "0")}
                    </p>
                    <p className="font-semibold">{pokemon.name}</p>
                  </div>
                </AppCard>
              ))}
            </div>
          </div>
        </AppDialog>
      </section>

      <section className="mt-5 flex flex-wrap gap-2">
        {["Todos", "Agua", "Fuego", "Electrico", "Planta", "Hielo"].map(
          (type, index) => (
            <AppButton
              key={type}
              size="sm"
              variant={index === 0 ? "default" : "outline"}
            >
              {type}
            </AppButton>
          )
        )}
      </section>
    </>
  );
}
