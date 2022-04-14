export type CacheKeys = 'courses-list' | 'students-list'

export interface ICacheProvider {
  save(key: CacheKeys, value: any): Promise<void>;
  recover<T>(key: CacheKeys): Promise<T | null>;
  invalidate(key: CacheKeys): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}