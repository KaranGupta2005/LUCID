# LUCID ML Service

Machine Learning service for LUCID platform with failure prediction, document ranking, and embeddings.

## Features

- Failure prediction model
- Document ranking
- Text embeddings generation
- Preprocessing and postprocessing pipelines

## Setup

```bash
pip install -r requirements.txt
python -m app.main
```

## Docker

```bash
docker build -t lucid-ml .
docker run -p 8001:8001 lucid-ml
```

## API Endpoints

- `GET /health` - Health check
- `POST /api/v1/predict` - Run prediction
- `POST /api/v1/embed` - Generate embeddings
- `GET /api/v1/models` - List available models
