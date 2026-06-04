import type { Pokemon } from "@atlanticcity/domain";
import { AppDialog, ErrorState, LoadingState, showAppToast } from "@atlanticcity/ui";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import type { PokemonDetailRemoteProps } from "pokemonDetail/App";
import { shellRemotes } from "../../remotes";

type DetailRemoteStatus =
  | { pokemonId: number; type: "error" }
  | {
      Component: ComponentType<PokemonDetailRemoteProps>;
      pokemonId: number;
      type: "ready";
    }
  | { type: "loading" };

interface PokemonDetailRemoteDialogProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  pokemon: Pokemon | null;
}

const detailRemote = shellRemotes.find((remote) => remote.id === "pokemon-detail");

export function PokemonDetailRemoteDialog({
  onOpenChange,
  open,
  pokemon
}: PokemonDetailRemoteDialogProps) {
  const [status, setStatus] = useState<DetailRemoteStatus>({ type: "loading" });

  useEffect(() => {
    if (!open || !pokemon || !detailRemote) return;

    let isMounted = true;

    fetch(detailRemote.remoteUrl, { mode: "no-cors" })
      .then(() => detailRemote.load())
      .then((module) => {
        if (!isMounted) return;
        setStatus({
          Component: module.default as ComponentType<PokemonDetailRemoteProps>,
          pokemonId: pokemon.id,
          type: "ready"
        });
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        console.warn("Pokemon detail remote unavailable", error);
        setStatus({ pokemonId: pokemon.id, type: "error" });
      });

    return () => {
      isMounted = false;
    };
  }, [open, pokemon]);

  return (
    <AppDialog
      description={
        pokemon
          ? `Detalle remoto preparado para ${pokemon.name}.`
          : "Detalle remoto de Pokemon."
      }
      eyebrow="Ficha remota"
      open={open}
      onOpenChange={onOpenChange}
      title={pokemon ? `Detalle de ${pokemon.name}` : "Detalle Pokemon"}
    >
      <div className="min-h-96">
        {status.type === "ready" && pokemon && status.pokemonId === pokemon.id ? (
          <status.Component
            pokemonName={pokemon.name}
            onVisited={(item) =>
              showAppToast.success(
                "Visita registrada",
                `${item.name} · ${item.visitCount} visita${
                  item.visitCount === 1 ? "" : "s"
                }`
              )
            }
          />
        ) : status.type === "error" &&
          pokemon &&
          status.pokemonId === pokemon.id ? (
          <ErrorState
            description="El microfrontend de detalle no esta levantado. El Shell mantiene este fallback visible."
            title="Detail remoto no disponible"
          />
        ) : (
          <LoadingState variant="detail" />
        )}
      </div>
    </AppDialog>
  );
}
