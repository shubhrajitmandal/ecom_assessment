type CacheValue<T> = {
  value: T;
  expires: number;
};

const cache = new Map<string, CacheValue<any>>();

export const setCache = <T>(key: string, value: T, ttl: number): void => {
  const expires = Date.now() + ttl;
  cache.set(key, { value, expires });
};

export const getCache = <T>(key: string): T | null => {
  const cached = cache.get(key);
  if (!cached) return null;

  if (cached.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return cached.value;
};
