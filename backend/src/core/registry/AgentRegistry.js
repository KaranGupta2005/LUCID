export class AgentRegistry {
  constructor() {
    this.agents = new Map();
  }

  register(name, agentClass) {
    this.agents.set(name, agentClass);
    console.log(`Agent registered: ${name}`);
  }

  get(name) {
    return this.agents.get(name);
  }

  list() {
    return Array.from(this.agents.keys());
  }

  unregister(name) {
    this.agents.delete(name);
  }
}

export const agentRegistry = new AgentRegistry();
