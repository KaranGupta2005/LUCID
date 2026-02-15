from typing import Dict, Any, List
from app.pipelines.preprocessing import Preprocessor
from app.pipelines.postprocess import Postprocessor
from app.models.embeddings.encoder import EmbeddingEncoder
from app.models.failure_predictor.model import FailurePredictor

class InferencePipeline:
    def __init__(self):
        self.preprocessor = Preprocessor()
        self.postprocessor = Postprocessor()
        self.encoder = EmbeddingEncoder()
        self.failure_predictor = FailurePredictor()
        
    async def predict(self, data: Dict[str, Any]) -> Any:
        """Run full inference pipeline"""
        # Preprocess
        processed_data = self.preprocessor.preprocess(data)
        
        # Run prediction
        prediction = self.failure_predictor.predict(processed_data)
        
        # Postprocess
        result = self.postprocessor.format_output(prediction)
        
        return result
    
    async def embed(self, text: str) -> List[float]:
        """Generate embeddings for text"""
        cleaned_text = self.preprocessor.clean_text(text)
        embedding = self.encoder.encode(cleaned_text)
        return embedding.tolist()
    
    async def batch_predict(self, data_list: List[Dict[str, Any]]) -> List[Any]:
        """Run inference on multiple inputs"""
        results = []
        for data in data_list:
            result = await self.predict(data)
            results.append(result)
        return results
