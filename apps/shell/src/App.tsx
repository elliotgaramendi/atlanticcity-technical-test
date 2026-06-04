import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthenticatedLayout } from "./components/layout/AuthenticatedLayout";
import { ShellProviders } from "./components/providers/ShellProviders";
import { LoginPage } from "./features/auth/LoginPage";
import { HistoryPage } from "./features/history/HistoryPage";
import { HomePage } from "./features/home/HomePage";
import { GuestRoute } from "./routes/GuestRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useThemeStore } from "./stores";

export function App() {
  const mode = useThemeStore((state) => state.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <ShellProviders>
      <Routes>
        <Route
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
          path="/login"
        />
        <Route
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          <Route element={<HomePage />} index />
          <Route element={<HistoryPage />} path="/history" />
        </Route>
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </ShellProviders>
  );
}
