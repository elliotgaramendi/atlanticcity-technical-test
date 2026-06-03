import type { ThemeMode } from "@atlanticcity/domain";
import { Moon, Sun } from "lucide-react";
import { AppButton } from "../app";

export interface ThemeToggleProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

export function ThemeToggle({ mode, onModeChange }: ThemeToggleProps) {
  const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";

  return (
    <AppButton
      aria-label={`Cambiar a tema ${nextMode}`}
      className="h-11 w-11 p-0"
      onClick={() => onModeChange(nextMode)}
      size="icon"
      variant="outline"
    >
      {mode === "dark" ? (
        <Sun aria-hidden="true" size={18} />
      ) : (
        <Moon aria-hidden="true" size={18} />
      )}
    </AppButton>
  );
}
