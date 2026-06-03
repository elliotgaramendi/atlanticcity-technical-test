import type { ThemeMode } from "@atlanticcity/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      mode: "dark",
      setMode: (mode) => set({ mode })
    }),
    {
      name: "atlanticcity-theme"
    }
  )
);
