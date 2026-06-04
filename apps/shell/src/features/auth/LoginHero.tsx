import { AppCard } from "@atlanticcity/ui";
import { KeyRound, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

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
      <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
        Inicia sesion con tus credenciales de explorador para acceder a la base
        de datos visual de criaturas, estadisticas y reportes de campo.
      </p>

      <div className="mt-10 grid gap-3">
        <LoginBenefit
          icon={<ShieldCheck aria-hidden="true" size={18} />}
          text="Cada sesion queda registrada en tu historial."
          title="Credencial verificada"
        />
        <LoginBenefit
          icon={<KeyRound aria-hidden="true" size={18} />}
          text="Comunicacion segura con la base de datos PokeAPI."
          title="Acceso cifrado"
        />
      </div>
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
        <p className="mt-1 text-xs uppercase tracking-[0.34em] text-muted-foreground">
          Atlantic City
        </p>
      </div>
    </div>
  );
}

function LoginBenefit({
  icon,
  text,
  title
}: {
  icon: ReactNode;
  text: string;
  title: string;
}) {
  return (
    <AppCard className="flex items-center gap-4 rounded-2xl p-4" tone="glass">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-cyan-300">
        {icon}
      </span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-muted-foreground">{text}</span>
      </span>
    </AppCard>
  );
}
