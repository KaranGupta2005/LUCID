import { Supervisor } from '../../core/supervisor/Supervisor.js';

const supervisor = new Supervisor();

export const executeAgent = async (req, res) => {
  try {
    const { task } = req.body;
    const result = await supervisor.orchestrate(task);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listAgents = async (req, res) => {
  try {
    const agents = ['scraping', 'filtering', 'synthesis', 'reasoning', 'audit'];
    res.json({ agents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
