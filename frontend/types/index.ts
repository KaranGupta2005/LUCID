export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
}

export interface KnowledgeNode {
  id: string;
  label: string;
  connections: string[];
}
