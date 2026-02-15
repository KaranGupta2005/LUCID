import express from 'express';
import { executeAgent, listAgents } from '../controllers/agentController.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

router.post('/agents/execute', executeAgent);
router.get('/agents', listAgents);

export default router;
