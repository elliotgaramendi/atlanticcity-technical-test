import { Outlet } from "react-router-dom";

import { ShellHeader } from "./ShellHeader";
import { useSessionStore, useThemeStore } from "../../stores";

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
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <Outlet />
      </main>
    </div>
  );
}
