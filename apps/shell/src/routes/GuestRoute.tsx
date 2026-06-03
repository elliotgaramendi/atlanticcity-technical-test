import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useSessionStore } from "../stores";

export function GuestRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (isAuthenticated()) {
    return <Navigate replace to="/" />;
  }

  return children;
}
