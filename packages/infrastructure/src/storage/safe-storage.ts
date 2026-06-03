export function safeStorage(): Storage | null {
  try {
    return globalThis.window?.localStorage ?? null;
  } catch {
    return null;
  }
}

export function readJson<T>(key: string, fallback: T): T {
  const value = safeStorage()?.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  safeStorage()?.setItem(key, JSON.stringify(value));
}
