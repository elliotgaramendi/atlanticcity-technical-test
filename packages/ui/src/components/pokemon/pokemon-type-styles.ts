const pokemonTypeStyles = {
  agua: "bg-sky-500 text-white shadow-sky-500/35",
  bicho: "bg-lime-500 text-white shadow-lime-500/30",
  dragon: "bg-indigo-500 text-white shadow-indigo-500/35",
  electrico: "bg-amber-400 text-slate-950 shadow-amber-400/30",
  fantasma: "bg-violet-500 text-white shadow-violet-500/35",
  fuego: "bg-orange-500 text-white shadow-orange-500/35",
  hielo: "bg-cyan-300 text-slate-950 shadow-cyan-300/30",
  lucha: "bg-rose-500 text-white shadow-rose-500/35",
  normal: "bg-stone-400 text-white shadow-stone-400/30",
  planta: "bg-emerald-500 text-white shadow-emerald-500/35",
  psiquico: "bg-pink-500 text-white shadow-pink-500/35",
  tierra: "bg-amber-600 text-white shadow-amber-600/30",
  veneno: "bg-purple-500 text-white shadow-purple-500/35",
  volador: "bg-blue-400 text-white shadow-blue-400/35"
} satisfies Record<string, string>;

export function getPokemonTypeStyle(type: string): string {
  return (
    pokemonTypeStyles[type.toLowerCase() as keyof typeof pokemonTypeStyles] ??
    "bg-slate-500 text-white shadow-slate-500/30"
  );
}
