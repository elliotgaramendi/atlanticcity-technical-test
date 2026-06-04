import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppToastProvider } from "@atlanticcity/ui";
import type { ReactNode } from "react";
import { useMemo } from "react";

export function ShellProviders({ children }: { children: ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5
          }
        }
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <AppToastProvider />
    </QueryClientProvider>
  );
}
