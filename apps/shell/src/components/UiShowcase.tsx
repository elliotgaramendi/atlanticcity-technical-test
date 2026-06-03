import {
  AppButton,
  AppCard,
  AppDialog,
  AppInput,
  EmptyState,
  ErrorState,
  LoadingState,
  PokemonCard,
  showAppToast,
  ThemeToggle
} from "@atlanticcity/ui";
import {
  ArrowRight,
  Database,
  LogOut,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import type { ThemeMode } from "@atlanticcity/domain";

const demoPokemon = [
  {
    id: 1,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    name: "Bulbasaur",
    types: [{ name: "planta" }, { name: "veneno" }]
  },
  {
    id: 4,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    name: "Charmander",
    types: [{ name: "fuego" }]
  },
  {
    id: 7,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    name: "Squirtle",
    types: [{ name: "agua" }]
  },
  {
    id: 150,
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    name: "Mewtwo",
    types: [{ name: "psiquico" }]
  }
];

interface UiShowcaseProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

export function UiShowcase({ mode, onModeChange }: UiShowcaseProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/25">
              <Database aria-hidden="true" size={20} />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Atlantic City</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
                Pokedex
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <AppButton size="sm">Buscar</AppButton>
            <AppButton size="sm" variant="ghost">
              Historial
            </AppButton>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle mode={mode} onModeChange={onModeChange} />
            <AppButton className="hidden sm:inline-flex" size="sm" variant="outline">
              Explorador ask
              <LogOut aria-hidden="true" size={16} />
            </AppButton>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
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
            {[
              ["Registros", "060"],
              ["Tipos", "18"],
              ["Region", "Kanto"]
            ].map(([label, value]) => (
              <AppCard className="min-w-24 rounded-2xl p-4" key={label}>
                <p className="text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                  {label}
                </p>
                <p className="mt-1 font-mono text-lg">{value}</p>
              </AppCard>
            ))}
          </div>
        </section>

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

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          <LoadingState items={2} />
          <EmptyState
            action={<AppButton variant="outline">Resetear filtros</AppButton>}
            description="No hay coincidencias para los filtros actuales."
            title="Sin resultados"
          />
          <ErrorState
            description="La sincronizacion con el modulo remoto se interrumpio."
            onRetry={() => showAppToast.info("Reintentando conexion")}
            title="Modulo no disponible"
          />
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <AppButton onClick={() => showAppToast.success("Toast correcto")}>
            Probar toast
            <ArrowRight aria-hidden="true" size={18} />
          </AppButton>
          <AppButton variant="outline">
            <ShieldCheck aria-hidden="true" size={18} />
            Estado focus/hover
          </AppButton>
          <AppButton disabled>Boton deshabilitado</AppButton>
        </section>
      </main>
    </div>
  );
}
