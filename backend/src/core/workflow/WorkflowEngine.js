export class WorkflowEngine {
  constructor() {
    this.workflows = new Map();
  }

  registerWorkflow(name, steps) {
    this.workflows.set(name, steps);
  }

  async executeWorkflow(name, context) {
    const steps = this.workflows.get(name);
    
    if (!steps) {
      throw new Error(`Workflow ${name} not found`);
    }

    let result = context;
    
    for (const step of steps) {
      result = await step(result);
    }
    
    return result;
  }
}

export const workflowEngine = new WorkflowEngine();
