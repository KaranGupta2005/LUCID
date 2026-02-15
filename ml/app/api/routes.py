from fastapi import APIRouter, HTTPException
from app.api.schemas import PredictionRequest, PredictionResponse, EmbeddingRequest
from app.services.model_loader import ModelLoader
from app.pipelines.inference import InferencePipeline

router = APIRouter()
model_loader = ModelLoader()
inference_pipeline = InferencePipeline()

@router.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        result = await inference_pipeline.predict(request.data)
        return PredictionResponse(prediction=result, confidence=0.92)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/embed")
async def generate_embedding(request: EmbeddingRequest):
    try:
        embedding = await inference_pipeline.embed(request.text)
        return {"embedding": embedding, "dimension": len(embedding)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/models")
async def list_models():
    return {"models": model_loader.list_available_models()}
