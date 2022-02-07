import Redis from "../data/connections/Redis";

export class CacheRepository {
  async set(key: string, value: any): Promise<boolean> {
    const redis = await Redis.getConnection();
    const result = await redis.set(key, JSON.stringify(value));
    if (!result) return false;
    return true;
  }

  async setExpire(key: string, value: any, ttl: number) {
    const redis = await Redis.getConnection();
    const result = await redis.set(key, JSON.stringify(value), "ex", ttl);
    if (!result) return false;
    return true;
  }

  async get(key: string): Promise<any | undefined> {
    const redis = await Redis.getConnection();
    const result = await redis.get(key);
    if (!result) return undefined;
    return JSON.parse(result);
  }

  async exists(key: string): Promise<boolean> {
    const redis = await Redis.getConnection();
    const result = await redis.exists(key);
    return result > 0;
  }

  async delete(key: string): Promise<boolean> {
    const redis = await Redis.getConnection();
    const result = await redis.del(key);
    return result > 0;
  }
}
