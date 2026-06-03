import type { Pokemon, PokemonHistoryItem, UserSession } from "@atlanticcity/domain";

export interface HistoryRepository {
  clear(): void;
  getAll(): PokemonHistoryItem[];
  save(item: PokemonHistoryItem): void;
}

export interface SessionRepository {
  get(): UserSession | null;
  save(session: UserSession): void;
}

export interface PokemonVisitedEvent {
  pokemon: PokemonHistoryItem;
}

export interface HistoryClearedEvent {
  clearedAt: string;
}

export function saveVisitedPokemon(
  repository: HistoryRepository,
  pokemon: Pokemon,
  visitedAt = new Date().toISOString()
): PokemonHistoryItem {
  const item: PokemonHistoryItem = {
    id: pokemon.id,
    imageUrl: pokemon.imageUrl,
    name: pokemon.name,
    visitedAt
  };

  repository.save(item);
  emitPokemonVisited(item);

  return item;
}

export function getVisitedHistory(
  repository: HistoryRepository
): PokemonHistoryItem[] {
  return repository.getAll();
}

export function clearHistory(repository: HistoryRepository): void {
  repository.clear();
  emitHistoryCleared();
}

export function getLastVisitedPokemon(
  repository: HistoryRepository
): PokemonHistoryItem | null {
  return repository.getAll()[0] ?? null;
}

export function shouldShowLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): boolean {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return false;

  return (
    sessionRepository.get()?.dismissedLastVisitedToastAt !==
    lastVisited.visitedAt
  );
}

export function dismissLastVisitedToast(
  historyRepository: HistoryRepository,
  sessionRepository: SessionRepository
): void {
  const lastVisited = getLastVisitedPokemon(historyRepository);
  if (!lastVisited) return;

  sessionRepository.save({
    id: sessionRepository.get()?.id ?? "anonymous",
    lastVisitedPokemonName: lastVisited.name,
    dismissedLastVisitedToastAt: lastVisited.visitedAt
  });
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

const pokemonVisitedEventName = "atlanticcity:pokemon-visited";
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
