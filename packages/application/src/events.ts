import type { PokemonHistoryItem } from "@atlanticcity/domain";

export interface PokemonVisitedEvent {
  pokemon: PokemonHistoryItem;
}

export interface HistoryClearedEvent {
  clearedAt: string;
}

export function emitPokemonVisited(pokemon: PokemonHistoryItem): void {
  eventTarget.dispatchEvent(
    createTypedEvent<PokemonVisitedEvent>(pokemonVisitedEventName, { pokemon })
  );
}

export function subscribeToPokemonVisited(
  handler: (event: PokemonVisitedEvent) => void
): () => void {
  return subscribe(pokemonVisitedEventName, handler);
}

export function emitHistoryCleared(clearedAt = new Date().toISOString()): void {
  eventTarget.dispatchEvent(
    createTypedEvent<HistoryClearedEvent>(historyClearedEventName, { clearedAt })
  );
}

export function subscribeToHistoryCleared(
  handler: (event: HistoryClearedEvent) => void
): () => void {
  return subscribe(historyClearedEventName, handler);
}

const pokemonVisitedEventName = "pokemon:visited";
const historyClearedEventName = "atlanticcity:history-cleared";
const fallbackTarget = new EventTarget();
const eventTarget = globalThis.window ?? fallbackTarget;

function subscribe<T>(
  eventName: string,
  handler: (event: T) => void
): () => void {
  const listener = (event: Event) => {
    handler((event as CustomEvent<T>).detail);
  };

  eventTarget.addEventListener(eventName, listener);

  return () => eventTarget.removeEventListener(eventName, listener);
}

function createTypedEvent<T>(eventName: string, detail: T): CustomEvent<T> {
  if (typeof CustomEvent !== "undefined") {
    return new CustomEvent(eventName, { detail });
  }

  const event = new Event(eventName) as CustomEvent<T>;
  Object.defineProperty(event, "detail", { value: detail });
  return event;
}
