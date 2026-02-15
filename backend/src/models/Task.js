import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'failed'],
    default: 'pending'
  },
  assignedAgents: [{
    type: String
  }],
  result: {
    type: mongoose.Schema.Types.Mixed
  },
  priority: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

export const Task = mongoose.model('Task', taskSchema);
