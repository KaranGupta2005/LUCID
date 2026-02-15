from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class PredictionRequest(BaseModel):
    data: Dict[str, Any]
    model_name: Optional[str] = "default"

class PredictionResponse(BaseModel):
    prediction: Any
    confidence: float
    model_used: Optional[str] = None

class EmbeddingRequest(BaseModel):
    text: str
    model: Optional[str] = "sentence-transformers"

class RankingRequest(BaseModel):
    query: str
    documents: List[str]
    top_k: int = 5

class RankingResponse(BaseModel):
    ranked_docs: List[Dict[str, Any]]
    scores: List[float]
