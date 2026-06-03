import type { ThemeMode, UserSession } from "@atlanticcity/domain";
import {
  AppButton,
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ThemeToggle,
  showAppToast
} from "@atlanticcity/ui";
import { LogOut, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

interface ShellHeaderProps {
  mode: ThemeMode;
  onLogout: () => void;
  onModeChange: (mode: ThemeMode) => void;
  session: UserSession | null;
}

export function ShellHeader({
  mode,
  onLogout,
  onModeChange,
  session
}: ShellHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <NavLink className="flex items-center gap-3" to="/">
          <img
            alt="Pokemon"
            className="h-11 w-11 rounded-full object-contain drop-shadow-lg"
            src="/pokemon-icon.svg"
          />
          <div>
            <p className="text-sm font-bold leading-none">Atlantic City</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground">
              Pokedex
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 rounded-full border border-sky-200/60 bg-white/70 p-1 text-sm shadow-sm dark:border-sky-400/10 dark:bg-slate-950/50 sm:flex">
          <HeaderNavLink label="Buscar" to="/" />
          <HeaderNavLink label="Historial" to="/history" />
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle mode={mode} onModeChange={onModeChange} />
          <UserMenu onLogout={onLogout} session={session} />
        </div>
      </div>
    </header>
  );
}

function HeaderNavLink({ label, to }: { label: string; to: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        [
          "rounded-full px-4 py-2 transition-all duration-300 ease-out",
          isActive
            ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
            : "text-muted-foreground hover:bg-sky-100 hover:text-sky-950 dark:hover:bg-sky-950 dark:hover:text-sky-50"
        ].join(" ")
      }
      to={to}
    >
      {label}
    </NavLink>
  );
}

function UserMenu({
  onLogout,
  session
}: {
  onLogout: () => void;
  session: UserSession | null;
}) {
  const navigate = useNavigate();
  const label = session?.displayName ?? "Explorador";
  const email = session?.email ?? "trainer@atlanticcity.dev";

  function handleLogout() {
    onLogout();
    showAppToast.info("Sesion cerrada", "Tu credencial local fue eliminada.");
    navigate("/login", { replace: true });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <AppButton
          aria-label="Menu de usuario"
          className="h-11 gap-2 px-2 pr-3"
          variant="outline"
        >
          <Avatar className="h-8 w-8 border border-sky-300/60 bg-sky-100 dark:border-sky-400/20 dark:bg-sky-950">
            <AvatarFallback className="bg-transparent text-sky-600 dark:text-sky-200">
              <User aria-hidden="true" size={16} />
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline">{label}</span>
        </AppButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border-sky-200/70 bg-white/95 p-2 shadow-xl shadow-sky-950/10 dark:border-sky-400/15 dark:bg-slate-950/95"
      >
        <DropdownMenuLabel>
          <span className="block">{label}</span>
          <span className="block text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rounded-xl" onClick={handleLogout}>
          <LogOut aria-hidden="true" size={16} />
          Cerrar sesion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
