import Redis, { Redis as RedisClient } from 'ioredis';
import { injectable } from 'inversify';

import cacheConfig from '@src/config/cache';
import { CacheKeys, ICacheProvider } from './ICacheProvider';

@injectable()
export class CacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: CacheKeys, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: CacheKeys): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async invalidate(key: CacheKeys): Promise<void> {
    await this.client.del(key);
  }

  public async invalidatePrefix(prefix: CacheKeys): Promise<void> {
    // pegar todos as chaves que começa com o prefixo passado, ex: providers-list:*<qualquer valor>
    const keys = await this.client.keys(`${prefix}:*`);

    // executar varias ações ao mesmo tempo de maneira performatica
    const pipeline = this.client.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
