import type { ThemeMode } from "@atlanticcity/domain";
import { localStorageThemeRepository } from "@atlanticcity/infrastructure";
import { AppToastProvider } from "@atlanticcity/ui";
import { useEffect, useState } from "react";

import { UiShowcase } from "./components/UiShowcase";

export function App() {
  const [mode, setMode] = useState<ThemeMode>(
    () => localStorageThemeRepository.get() ?? "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  function handleModeChange(nextMode: ThemeMode) {
    setMode(nextMode);
    localStorageThemeRepository.save(nextMode);
  }

  return (
    <>
      <UiShowcase mode={mode} onModeChange={handleModeChange} />
      <AppToastProvider />
    </>
  );
}
