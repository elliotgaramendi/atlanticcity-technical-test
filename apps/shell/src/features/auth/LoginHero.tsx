
export function LoginHero() {
  return (
    <div className="max-w-2xl">
      <BrandMark />
      <h1 className="mt-10 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        Acceso al sistema de{" "}
        <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 bg-clip-text text-transparent">
          exploracion Pokemon
        </span>
      </h1>
      <p className="hidden mt-5 max-w-xl text-base leading-7 text-muted-foreground md:block">
        Inicia sesion con tus credenciales de explorador para acceder a la base
        de datos visual de criaturas, estadisticas y reportes de campo.
      </p>
    </div>
  );
}

function BrandMark() {
  return (
    <div className="flex items-center gap-4">
      <img
        alt="Pokemon"
        className="h-12 w-12 rounded-full object-contain drop-shadow-lg"
        src="/pokemon-icon.svg"
      />
      <div>
        <p className="font-bold leading-none">Pokedex</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
          Atlantic City
        </p>
      </div>
    </div>
  );
}
