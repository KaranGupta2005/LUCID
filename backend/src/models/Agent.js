import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['scraping', 'filtering', 'synthesis', 'reasoning', 'audit'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'active'
  },
  config: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  metrics: {
    executionCount: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    avgExecutionTime: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export const Agent = mongoose.model('Agent', agentSchema);
