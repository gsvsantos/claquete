import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly cache: Map<string, unknown> = new Map<string, unknown>();

  public put<TValue>(cacheKey: string, value: TValue): void {
    this.cache.set(cacheKey, value as unknown);
  }

  public get<TValue>(cacheKey: string): TValue | undefined {
    return this.cache.get(cacheKey) as TValue | undefined;
  }

  public clear(): void {
    this.cache.clear();
  }

  public removeByPrefix(prefixKey: string): void {
    for (const key of Array.from(this.cache.keys())) {
      if (key.startsWith(prefixKey)) this.cache.delete(key);
    }
  }
}
