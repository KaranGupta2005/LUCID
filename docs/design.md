# System Design Document

## 1. Architectural Overview

### Supervisor-Subagent Model

The architecture implements a hierarchical orchestration pattern where a central supervisor agent acts as the primary coordinator:

- **Supervisor Agent**: Receives complex queries, decomposes them into sub-tasks, and routes to specialized agents
- **Specialized Sub-Agents**: Domain-specific agents with granular permissions to access particular data sources
- **Response Synthesis**: Supervisor aggregates outputs from sub-agents into cohesive final responses
- **Permission Isolation**: Each sub-agent has access only to its designated data domains (e.g., R&D agent accesses clinical trial data via Amazon Athena, Finance agent queries stock data via Amazon Redshift)

### One Agent One Tool Principle

To eliminate tool-selection noise and ensure deterministic execution:

- Each agent is assigned exactly one tool or capability
- Agents do not choose between multiple tools, preventing ambiguous decision paths
- Single-responsibility design reduces cognitive overhead and improves reliability
- Specialized agents include: Scraping Agent, Filtering Agent, Synthesis Agent, Reasoning Agent, Audit Agent

### Deterministic Orchestration

The system enforces strict separation between reasoning and infrastructure tasks:

- **LLM Reasoning Layer**: Handles tasks requiring intelligence (analysis, synthesis, decision-making)
- **Pure Function Layer**: Executes infrastructure tasks (database writes, timestamps, file commits, GitHub operations)
- **Direct Invocation**: Infrastructure functions are called directly from orchestration layer, not through LLM tool calls
- **Token Efficiency**: Reduces token consumption by avoiding unnecessary LLM involvement in deterministic operations

### Direct Function Invocation vs MCP

While Model Context Protocol (MCP) provides standardized communication, the architecture prioritizes direct function calls:

- **MCP Usage**: Thin adapter layer for external clients (VS Code, LM Studio)
- **Direct Calls**: Preferred for production workflows to maximize determinism
- **Decoupled Design**: Workflow engine remains independent of MCP server
- **Stability**: Eliminates abstraction layers that can introduce flickering failures

### KISS Principle

The architecture adheres to "Keep It Simple, Stupid" philosophy:

- Flat, readable, function-driven designs over deeply nested abstractions
- Avoids complexity that threatens reliability
- Prioritizes debuggability and maintainability
- Enables easy integration with AI-assisted coding tools

## 2. Use-Case Workflows

### Biopharmaceutical R&D Analysis

#### User Input
Complex query: "How do clinical trial results impact stock prices and patent filings?"

#### Supervisor Agent
- Decomposes query into three domain-specific sub-queries
- Routes to R&D Agent, Finance Agent, and Legal Agent
- Establishes execution order and dependencies

#### Specialized Agents

**R&D Agent**
- Accesses clinical trial reports via Amazon Athena
- Extracts trial outcomes, efficacy data, and timelines

**Finance Agent**
- Queries stock price data via Amazon Redshift
- Analyzes historical correlations between trial announcements and stock movement

**Legal Agent**
- Reviews patent filing database
- Identifies relevant intellectual property implications

#### Knowledge Graph
- Entities extracted: trial names, drug compounds, patent IDs, stock symbols
- Relationships mapped: trial-to-patent, trial-to-stock-movement
- Parent-child structure: full reports (parent) with key findings (child)

#### Consortium Reasoning
- GPT, Gemini, Claude, and Llama generate independent analysis drafts
- Reasoning Agent audits for consistency and factual grounding
- Consensus output synthesized from multi-model agreement

#### Output
Holistic response integrating R&D, financial, and legal perspectives with source attribution

---

### Multimodal Media Generation

#### User Input
News feed URLs or topic keywords for podcast generation

#### Supervisor Agent
- Initiates web search workflow
- Coordinates scraping, filtering, and script generation agents

#### Specialized Agents

**Web Search Agent**
- Performs targeted searches for relevant content
- Returns list of candidate URLs

**Scraping Agent**
- Extracts markdown content from identified sources
- Handles pagination and dynamic content loading

**Filtering Agent**
- Applies semantic relevance scoring
- Removes low-quality or duplicate content
- Validates content completeness

**Script Generation Agent**
- Synthesizes filtered content into podcast script
- Structures narrative flow and key talking points

**Veo JSON Builder Agent**
- Generates video generation instructions
- Specifies visual elements, transitions, and timing

**Audio Synthesis Agent**
- Converts script to speech using TTS models
- Applies voice modulation and pacing

#### Knowledge Graph
- Not primary focus for this workflow
- Lightweight entity tracking for topic consistency

#### Consortium Reasoning
- Multiple models generate script variations
- Reasoning Agent selects most coherent and engaging version

#### Output
- Professional podcast script
- Audio file (MP3/WAV)
- Video generation instructions (JSON)
- GitHub pull request with all assets

---

### Curriculum Intelligence Pipeline

#### User Input
University course catalog URLs or YouTube playlist links

#### Supervisor Agent
- Initiates funnel architecture workflow
- Coordinates extraction, filtering, and categorization phases

#### Extraction Phase

**Scraping Agent**
- Parses course catalog HTML using BeautifulSoup
- Extracts YouTube transcripts via YouTube Data API v3
- Captures course titles, descriptions, prerequisites, academic levels

#### Filtering Phase

**Filtering Agent**
- Applies semantic relevance filters
- Removes outdated or irrelevant courses
- Validates data completeness (title, description, level)
- Deduplicates entries

#### Categorization Phase

**Categorization Agent**
- Classifies courses along tailored dimensions (discipline, competency, difficulty)
- Maps to industry skill frameworks
- Generates estimated reading/viewing times

**Synthesis Agent**
- Creates structured syllabus with module breakdown
- Generates insights per module
- Produces curriculum benchmark report

#### Knowledge Graph

**Parent-Child Structure**
- Full transcripts split into 512-character parent chunks
- Parent chunks subdivided into 140-character child chunks
- Child chunks contain embeddings for vector search
- Parent chunks provide full context for LLM response generation

**Entity Linking**
- Concepts extracted: "Neural Networks," "Backpropagation," "Gradient Descent"
- Prerequisite relationships mapped: "Linear Algebra" → "Neural Networks"
- Visual concept map generated for interactive exploration

#### Consortium Reasoning
- Multiple models validate curriculum categorization
- Achieves 90%+ agreement with human expert analysis

#### Output
- Structured syllabus with progress tracking
- Concept map visualization
- Curriculum benchmark report
- Master notes with timestamps and screenshots

---

### AI Learning Copilot

#### User Input
Learning goal: "Learn Next.js"

#### Planner Agent (Curriculum Architect)
- Analyzes user goal and current knowledge state
- Queries Learning Memory for completed topics
- Identifies weak areas from past assessments
- Generates hierarchical roadmap with milestones

#### Socratic Tutor Agent (Instructional Agent)
- Conducts real-time learning session
- Applies Socratic prompting strategy
- Adapts to Learning Mode (Student vs Developer)
- Provides hints, code snippets, or conceptual analogies
- Avoids direct answers to encourage critical thinking

#### Code Pathologist Agent (Diagnostic Agent)
- User submits code for "Explain My Code" feature
- Analyzes logic, edge cases, and security vulnerabilities
- Identifies fundamental misunderstandings
- Signals Planner Agent to update roadmap if gaps detected

#### Assessment Specialist Agent (Evaluator Agent)
- Generates contextual quiz based on current topic
- Evaluates user answers with detailed feedback
- Triggers review session if assessment failed
- Updates Learning Memory with performance data

#### Knowledge Graph
- Learning path stored as directed graph
- Nodes: topics, concepts, code examples
- Edges: prerequisite relationships, difficulty progression
- User progress tracked per node

#### Consortium Reasoning
- Multiple models generate quiz questions
- Reasoning Agent ensures questions are fair and relevant
- Consensus on correct answers and explanations

#### Output
- Personalized learning roadmap
- Real-time tutoring with Socratic dialogue
- Code analysis with vulnerability detection
- Adaptive quizzes with automated feedback loops
- Neural Sync Streak gamification

## 3. Data & Retrieval Design

### Parent-Child Document Structure

**Parent Chunks (512 characters)**
- Provide sufficient context for LLM to formulate coherent responses
- Stored in graph database with metadata (source, timestamp, author)
- Retrieved when child chunk matches query

**Child Chunks (140 characters)**
- Contain embeddings for high-granularity vector search
- Enable precise matching of specific questions to relevant content
- Linked to parent chunks via graph relationships

**Retrieval Flow**
1. User query converted to embedding
2. Vector search identifies top-k child chunks by cosine similarity
3. Parent chunks of matched children retrieved for full context
4. LLM generates response using parent context and original query

### Graph Database Integration

**Neo4j Implementation**
- Nodes: documents, chunks, entities, concepts
- Relationships: PARENT_OF, PREREQUISITE, RELATED_TO, MENTIONS
- Enables complex traversal queries for root cause analysis
- Supports concept map visualization

**Entity Extraction**
- Named entities identified using NLP models
- Entities linked across documents for cross-referencing
- Relationship types inferred from context

**Concept Map Generation**
- Graph traversal identifies prerequisite chains
- Visual representation shows learning path dependencies
- Interactive exploration allows users to navigate knowledge structure

### Funnel Architecture

**Extract Phase**
- Raw data ingestion from multiple sources
- Minimal processing to preserve original content
- Metadata capture (source URL, timestamp, author)

**Filter Phase**
- Semantic relevance scoring using embeddings
- Quality assessment (completeness, accuracy, readability)
- Deduplication based on content similarity
- Validation against predefined criteria

**Categorize Phase**
- Classification along multiple dimensions
- Tagging with standardized taxonomy
- Mapping to industry frameworks or standards
- Structured output generation (syllabus, report, notes)

## 4. Deployment Architecture

### Docker Containers

**Containerization Strategy**
- Each agent type packaged as separate Docker image
- Microservices architecture for independent scaling
- Environment-aware configuration via environment variables
- Isolated dependencies prevent version conflicts

**Container Types**
- Supervisor orchestrator container
- Specialized agent containers (scraping, filtering, synthesis, reasoning, audit)
- Knowledge graph database container (Neo4j)
- API gateway container
- Frontend application container

### Kubernetes Scaling

**Orchestration Features**
- Auto-scaling based on CPU/memory utilization and request queue depth
- Self-healing: automatic restart of failed containers
- Rolling updates for zero-downtime deployments
- Load balancing across agent replicas

**Resource Allocation**
- Scraping agents: high network I/O, moderate CPU
- Reasoning agents: high CPU/GPU, moderate memory
- Database: high memory, persistent storage
- API: moderate CPU, high network I/O

**Scaling Policies**
- Horizontal scaling for stateless agents
- Vertical scaling for database and reasoning nodes
- Independent scaling per agent type based on workload

### Externalized Prompt Repository

**GitHub-Based Management**
- Prompts stored as Markdown files in version-controlled repository
- Non-technical stakeholders can update prompts via pull requests
- No code redeployment required for prompt changes
- Audit trail of prompt evolution through Git history

**Prompt Structure**
- System prompts define agent personality and constraints
- User prompt templates with variable placeholders
- Few-shot examples for consistent output formatting
- Validation rules for prompt syntax

**Deployment Flow**
1. Stakeholder updates prompt in GitHub
2. CI/CD pipeline validates prompt syntax
3. Agents pull latest prompts on startup or via webhook
4. Changes take effect without application restart

### Observability & Reasoning Audit

**Logging Infrastructure**
- Structured logs with agent ID, task ID, timestamp, and reasoning chain
- Centralized log aggregation (e.g., ELK stack, CloudWatch)
- Real-time monitoring dashboards for agent performance

**Reasoning Audit Trail**
- Each consortium decision logged with individual model outputs
- Consensus formation process recorded
- Disagreements and resolution strategies documented
- Source attribution for all knowledge graph entries

**Metrics & Monitoring**
- Agent execution time and success rate
- Model inference costs per task type
- Knowledge graph query performance
- User interaction patterns and satisfaction scores

**Alerting**
- Anomaly detection for agent failures or performance degradation
- Cost threshold alerts for inference spending
- Data quality alerts for knowledge graph inconsistencies

## 5. Multimodal Reasoning Layer

### Thinking with Video Paradigm

**Unified Temporal Framework**
- Video generation models (Veo-3, Sora-2) used as reasoning engines
- Captures dynamic processes and continuous changes
- Bridges visual and textual reasoning in single model

**Advantages Over Static Images**
- Temporal continuity enables understanding of cause-effect relationships
- Motion and change provide additional reasoning signals
- Supports complex "Eyeballing Puzzles" requiring spatial-temporal reasoning

**Benchmark Performance**
- MATH benchmark: 92% accuracy
- MMMU benchmark: 75.53% accuracy
- Demonstrates effectiveness of video-based reasoning

### Application Scenarios

**Educational Content**
- Generate video explanations of complex concepts
- Visualize abstract processes (e.g., algorithm execution, chemical reactions)
- Create animated diagrams for learning materials

**Media Synthesis**
- Automated video generation from podcast scripts
- Visual storytelling with synchronized narration
- Professional-quality output without manual editing

**Diagnostic Analysis**
- Video-based code execution visualization
- Step-by-step debugging walkthroughs
- Interactive demonstrations of correct vs incorrect implementations

## 6. Technology Stack

### Backend

**MERN Stack Components**
- **MongoDB**: Document storage for tasks, agents, and user data
- **Express.js**: API routing and middleware
- **Node.js**: Event-driven orchestration and WebSocket handling

**Core Services**
- Event Bus: Pub/sub backbone for agent communication
- Supervisor: Main orchestrator for task decomposition and routing
- Workflow Engine: Deterministic flow execution
- Agent Registry: Dynamic agent registration and discovery

**Database Layer**
- MongoDB: Normalized storage for structured data
- Redis: Caching and session management
- Neo4j: Graph database for knowledge relationships

### Frontend

**React/Next.js Stack**
- Server-side rendering for performance
- Component-based UI architecture
- Real-time updates via WebSocket
- Responsive design for cross-device compatibility

**State Management**
- Zustand for global application state
- React hooks for local component state

**UI Features**
- Dashboard with active syllabi and progress tracking
- Concept map visualization with interactive graph
- Ask Scholar floating chat interface
- Master notes with Paper mode aesthetics
- PDF export functionality

### ML Services

**Python FastAPI**
- High-performance async API for model inference
- Pydantic schemas for request/response validation
- Uvicorn ASGI server for production deployment

**Model Components**
- Failure Predictor: Risk assessment and anomaly detection
- Document Ranker: Relevance scoring for retrieval
- Embedding Encoder: Sentence-BERT or OpenAI Ada for vector generation

**ML Pipeline**
- Preprocessing: Text cleaning, tokenization, normalization
- Inference: Model prediction with batch support
- Postprocessing: Output formatting and threshold application

### Cloud Infrastructure

**Amazon Web Services (AWS)**
- Amazon Bedrock: Multi-agent collaboration framework
- Amazon S3: Object storage for documents and media
- Amazon Athena: SQL queries on structured data
- Amazon Redshift: High-performance OLAP analysis

**Google Cloud Platform (GCP)**
- YouTube Data API v3: Transcript and metadata retrieval
- Cloud Storage: Backup and archival
- Vertex AI: Alternative model hosting

### AI Model Consortium

**Foundation Models**
- OpenAI: GPT-4o, GPT-5, GPT-o3 for complex reasoning
- Google: Gemini for multimodal understanding
- Anthropic: Claude 3.5 Sonnet for long-context analysis
- Meta: Llama 3 for cost-efficient inference

**Specialized Models**
- Vision-Language Models (VLMs): Image and video understanding
- Veo-3: Video generation and temporal reasoning
- Text-to-Speech: Audio synthesis for podcast generation
- Sentence-BERT: Efficient text embeddings

### Development Tools

**Agent SDKs**
- OpenAI Agents SDK: Multi-agent orchestration
- Google ADK (Agent Development Kit): Tool integration

**Data Processing**
- BeautifulSoup: HTML parsing and web scraping
- LangChain: Document chunking and chain orchestration
- SpaCy: Free alternative for embeddings and NLP

**DevOps**
- Docker: Containerization for consistent environments
- Kubernetes: Orchestration for scaling and resilience
- GitHub: Version control and externalized prompt management
- CI/CD: Automated testing and deployment pipelines

### Cost Optimization

**Model Routing Strategy**
- Routine tasks: Smaller, cheaper models (Llama 3)
- Complex reasoning: Premium models (GPT-4o, Claude 3.5)
- Infrastructure tasks: Pure functions (zero inference cost)

**Free Tier Utilization**
- Neo4j AuraDB: Free instance for prototyping
- SpaCy embeddings: Open-source alternative to paid APIs
- AWS/GCP free tiers: Initial development and testing

**Monitoring**
- Real-time cost tracking per model and task type
- Budget alerts and automatic throttling
- Inference optimization through caching and batching
