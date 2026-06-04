import { Outlet } from "react-router-dom";

import { LastVisitedToastGate } from "../../features/history/LastVisitedToastGate";
import { useSessionStore, useThemeStore } from "../../stores";
import { ShellHeader } from "./ShellHeader";

export function AuthenticatedLayout() {
  const { mode, setMode } = useThemeStore();
  const { logout, session } = useSessionStore();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ShellHeader
        mode={mode}
        onLogout={logout}
        onModeChange={setMode}
        session={session}
      />
      <LastVisitedToastGate />
      <main className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
        <Outlet />
      </main>
      <footer className="mt-14 border-t border-border py-8 text-center text-sm text-muted-foreground">
        Atlantic City Pokedex · datos cortesia de PokeAPI
      </footer>
    </div>
  );
}
