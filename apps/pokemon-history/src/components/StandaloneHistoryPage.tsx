import { App } from "../App";

export function StandaloneHistoryPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center gap-3">
          <img
            alt="Pokemon"
            className="h-12 w-12 rounded-full bg-white object-contain p-2 shadow-lg shadow-sky-500/20"
            src="/favicon.ico"
          />
          <div>
            <p className="text-lg font-bold leading-none">Pokedex</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
              Atlantic City
            </p>
          </div>
        </header>

        <App />
      </div>
    </main>
  );
}
