// Type definitions and interfaces for the backend

export const AgentTypes = {
  SCRAPING: 'scraping',
  FILTERING: 'filtering',
  SYNTHESIS: 'synthesis',
  REASONING: 'reasoning',
  AUDIT: 'audit'
};

export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed'
};
