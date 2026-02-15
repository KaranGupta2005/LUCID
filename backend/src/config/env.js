import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/lucid',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  neo4jUri: process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4jUser: process.env.NEO4J_USER || 'neo4j',
  neo4jPassword: process.env.NEO4J_PASSWORD || 'password',
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
};
