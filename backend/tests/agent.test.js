import { ScrapingAgent } from '../src/agents/scraping/ScrapingAgent.js';

describe('ScrapingAgent', () => {
  let agent;

  beforeEach(() => {
    agent = new ScrapingAgent();
  });

  test('should execute scraping task', async () => {
    const task = { url: 'https://example.com' };
    const result = await agent.execute(task);
    
    expect(result).toHaveProperty('url');
    expect(result).toHaveProperty('content');
  });
});
