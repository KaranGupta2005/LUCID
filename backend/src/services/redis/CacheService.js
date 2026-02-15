import { getRedisClient } from '../../config/redis.js';

export class CacheService {
  constructor() {
    this.defaultTTL = 3600; // 1 hour
  }

  async get(key) {
    const client = getRedisClient();
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key, value, ttl = this.defaultTTL) {
    const client = getRedisClient();
    await client.setEx(key, ttl, JSON.stringify(value));
  }

  async delete(key) {
    const client = getRedisClient();
    await client.del(key);
  }

  async clear() {
    const client = getRedisClient();
    await client.flushDb();
  }
}
