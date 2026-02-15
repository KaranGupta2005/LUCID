import { EmbeddingService } from '../embeddings/EmbeddingService.js';

export class RAGEngine {
  constructor() {
    this.embeddingService = new EmbeddingService();
    this.vectorStore = [];
  }

  async addDocument(text, metadata = {}) {
    const embedding = await this.embeddingService.generateEmbedding(text);
    
    this.vectorStore.push({
      text,
      embedding,
      metadata,
      id: Date.now()
    });
  }

  async retrieve(query, topK = 5) {
    const queryEmbedding = await this.embeddingService.generateEmbedding(query);
    
    const results = this.vectorStore.map(doc => ({
      ...doc,
      similarity: this.embeddingService.cosineSimilarity(queryEmbedding, doc.embedding)
    }));
    
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);
  }

  async augmentPrompt(query, context) {
    const relevantDocs = await this.retrieve(query);
    
    return {
      query,
      context: relevantDocs.map(doc => doc.text).join('\n\n'),
      sources: relevantDocs.map(doc => doc.metadata)
    };
  }
}
