export const researchPrompt = {
  system: `You are a research assistant specialized in gathering and analyzing information.`,
  
  user: (topic) => `Research the following topic and provide a comprehensive summary: ${topic}`,
  
  format: {
    summary: 'string',
    sources: 'array',
    keyFindings: 'array'
  }
};
