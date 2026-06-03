import { pokeApiBaseUrl } from "@atlanticcity/config";
import type {
  Pokemon,
  PokemonDetail,
  PokemonHistoryItem,
  ThemeMode,
  UserSession
} from "@atlanticcity/domain";
import { getPokemonImage, normalizePokemonName, storageKeys } from "@atlanticcity/utils";
import axios from "axios";

export interface PokeApiNamedResource {
  name: string;
  url: string;
}

export interface PokeApiPokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokeApiNamedResource[];
}

export interface PokeApiTypeResponse {
  id: number;
  name: string;
  pokemon: Array<{
    pokemon: PokeApiNamedResource;
    slot: number;
  }>;
}

export interface PokeApiPokemonDetailResponse {
  abilities: Array<{
    ability: PokeApiNamedResource | null;
    is_hidden: boolean;
    slot: number;
  }>;
  base_experience: number;
  height: number;
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      "official-artwork"?: {
        front_default: string | null;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: PokeApiNamedResource;
  }>;
  types: Array<{
    slot: number;
    type: PokeApiNamedResource;
  }>;
  weight: number;
}

export const pokeApiClient = axios.create({
  baseURL: pokeApiBaseUrl
});

export const pokeApiRepository = {
  async getPokemonByType(type: string): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiTypeResponse>(
      `/type/${normalizePokemonName(type)}`
    );

    return data.pokemon.map(({ pokemon }) => mapNamedResourceToPokemon(pokemon, [
      { name: data.name }
    ]));
  },

  async getPokemonDetail(name: string): Promise<PokemonDetail> {
    const { data } = await pokeApiClient.get<PokeApiPokemonDetailResponse>(
      `/pokemon/${normalizePokemonName(name)}`
    );

    return mapPokemonDetail(data);
  },

  async getPokemonList(limit = 30, offset = 0): Promise<Pokemon[]> {
    const { data } = await pokeApiClient.get<PokeApiPokemonListResponse>(
      "/pokemon",
      { params: { limit, offset } }
    );

    return data.results.map((pokemon) => mapNamedResourceToPokemon(pokemon));
  }
};

export const localStorageHistoryRepository = {
  clear(): void {
    safeStorage()?.removeItem(storageKeys.history);
  },

  getAll(): PokemonHistoryItem[] {
    return readJson<PokemonHistoryItem[]>(storageKeys.history, []);
  },

  save(item: PokemonHistoryItem): void {
    const history = this.getAll().filter((entry) => entry.name !== item.name);
    writeJson(storageKeys.history, [item, ...history]);
  }
};

export const localStorageSessionRepository = {
  get(): UserSession | null {
    return readJson<UserSession | null>(storageKeys.session, null);
  },

  save(session: UserSession): void {
    writeJson(storageKeys.session, session);
  }
};

export const localStorageThemeRepository = {
  get(): ThemeMode | null {
    return readJson<ThemeMode | null>(storageKeys.theme, null);
  },

  save(theme: ThemeMode): void {
    writeJson(storageKeys.theme, theme);
  }
};

function mapNamedResourceToPokemon(
  resource: PokeApiNamedResource,
  types: Pokemon["types"] = []
): Pokemon {
  const id = getPokemonIdFromUrl(resource.url);

  return {
    id,
    imageUrl: getPokemonImage(id),
    name: resource.name,
    types
  };
}

function mapPokemonDetail(data: PokeApiPokemonDetailResponse): PokemonDetail {
  const imageUrl =
    data.sprites.other?.["official-artwork"]?.front_default ??
    data.sprites.front_default ??
    getPokemonImage(data.id);

  return {
    abilities: data.abilities
      .map(({ ability }) => ability?.name)
      .filter((name): name is string => Boolean(name)),
    baseExperience: data.base_experience,
    height: data.height,
    id: data.id,
    imageUrl,
    name: data.name,
    stats: data.stats.map((stat) => ({
      baseStat: stat.base_stat,
      effort: stat.effort,
      name: stat.stat.name
    })),
    types: data.types.map((type) => ({
      name: type.type.name,
      slot: type.slot
    })),
    weight: data.weight
  };
}

function getPokemonIdFromUrl(url: string): number {
  const match = /\/pokemon\/(?<id>\d+)\/?$/.exec(url);
  return Number(match?.groups?.id ?? 0);
}

function safeStorage(): Storage | null {
  try {
    return globalThis.window?.localStorage ?? null;
  } catch {
    return null;
  }
}

function readJson<T>(key: string, fallback: T): T {
  const value = safeStorage()?.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  safeStorage()?.setItem(key, JSON.stringify(value));
}
