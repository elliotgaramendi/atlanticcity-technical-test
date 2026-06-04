import { Skeleton } from "@atlanticcity/ui";
import { AlertTriangle, Loader2 } from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import type { ShellRemote } from "../remotes";

type RemoteStatus =
  | { type: "loading" }
  | { type: "error" }
  | { Component: ComponentType; type: "ready" };

interface RemoteSlotProps {
  remote: ShellRemote;
  remoteProps?: Record<string, unknown>;
}

export function RemoteSlot({ remote, remoteProps }: RemoteSlotProps) {
  const [status, setStatus] = useState<RemoteStatus>({ type: "loading" });

  useEffect(() => {
    let isMounted = true;

    fetch(remote.remoteUrl, { mode: "no-cors" })
      .then(() => remote.load())
      .then((module) => {
        if (isMounted) {
          setStatus({ Component: module.default as ComponentType, type: "ready" });
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          console.warn(`Remote unavailable: ${remote.name}`, error);
          setStatus({ type: "error" });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [remote]);

  return (
    <div className="min-h-96 [&_main]:min-h-96 [&_section]:min-h-96">
      {status.type === "ready" ? (
        <status.Component {...remoteProps} />
      ) : status.type === "error" ? (
        <RemoteFallback name={remote.name} />
      ) : (
        <RemoteSkeleton name={remote.name} />
      )}
    </div>
  );
}

function RemoteSkeleton({ name }: { name: string }) {
  return (
    <div className="flex min-h-96 flex-col justify-center rounded-lg border border-blue-800 bg-slate-900/70 p-6 text-blue-200">
      <span className="mb-5 inline-flex items-center gap-2 text-sm">
        <Loader2 aria-hidden="true" className="animate-spin" size={16} />
        Cargando {name}
      </span>
      <div className="space-y-3" aria-hidden="true">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-2/3" />
      </div>
    </div>
  );
}

function RemoteFallback({ name }: { name: string }) {
  return (
    <div className="flex min-h-96 flex-col justify-center rounded-lg border border-sky-300/30 bg-sky-400/10 p-6 text-sky-50">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-sky-400/20 text-sky-200">
        <AlertTriangle aria-hidden="true" size={22} />
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
        Remote fallback
      </p>
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="mt-2 max-w-md text-sm text-sky-100/80">
        Si este microfrontend no esta levantado, el Shell mantiene este estado visible.
      </p>
    </div>
  );
}
