# LUCID Backend

AI Agent System with multi-agent orchestration and knowledge graph.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Architecture

- **Core**: Event bus, supervisor, workflow engine, agent registry
- **Agents**: Scraping, filtering, synthesis, reasoning, audit
- **Consortium**: Model routing and consensus engine
- **Knowledge**: Graph database, embeddings, RAG
- **Services**: MongoDB, Redis, Neo4j, WebSocket

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/agents/execute` - Execute agent task
- `GET /api/agents` - List available agents
