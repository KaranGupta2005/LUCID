import neo4j from 'neo4j-driver';
import { config } from '../../config/env.js';

export class GraphManager {
  constructor() {
    this.driver = neo4j.driver(
      config.neo4jUri,
      neo4j.auth.basic(config.neo4jUser, config.neo4jPassword)
    );
  }

  async createNode(label, properties) {
    const session = this.driver.session();
    
    try {
      const result = await session.run(
        `CREATE (n:${label} $props) RETURN n`,
        { props: properties }
      );
      return result.records[0].get('n');
    } finally {
      await session.close();
    }
  }

  async createRelationship(fromId, toId, type) {
    const session = this.driver.session();
    
    try {
      await session.run(
        `MATCH (a), (b) WHERE id(a) = $fromId AND id(b) = $toId
         CREATE (a)-[r:${type}]->(b) RETURN r`,
        { fromId, toId }
      );
    } finally {
      await session.close();
    }
  }

  async close() {
    await this.driver.close();
  }
}
