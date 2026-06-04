import type { UserSession } from "@atlanticcity/domain";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoCredentials, demoUser } from "../features/auth/auth-credentials";

interface LoginCredentials {
  password: string;
  username: string;
}

interface SessionStore {
  isAuthenticated: () => boolean;
  login: (credentials: LoginCredentials) => boolean;
  logout: () => void;
  session: UserSession | null;
  updateSession: (session: UserSession) => void;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: () => Boolean(get().session),
      login: (credentials) => {
        const isValid =
          credentials.username === demoCredentials.username &&
          credentials.password === demoCredentials.password;

        if (!isValid) return false;

        set({
          session: {
            ...demoUser,
            authenticatedAt: new Date().toISOString()
          }
        });

        return true;
      },
      logout: () => set({ session: null }),
      session: null,
      updateSession: (session) => set({ session })
    }),
    {
      name: "atlanticcity-session"
    }
  )
);
