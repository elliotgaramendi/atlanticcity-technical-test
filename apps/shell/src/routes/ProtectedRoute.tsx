import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useSessionStore } from "../stores";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (!isAuthenticated()) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return children;
}
