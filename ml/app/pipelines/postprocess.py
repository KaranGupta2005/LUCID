from typing import Dict, Any, List

class Postprocessor:
    def __init__(self):
        self.confidence_threshold = 0.5
        
    def format_output(self, prediction: Dict[str, Any]) -> Dict[str, Any]:
        """Format model output for API response"""
        return {
            "result": prediction,
            "formatted": True,
            "timestamp": self._get_timestamp()
        }
    
    def apply_threshold(self, predictions: List[float], threshold: float = None) -> List[bool]:
        """Apply confidence threshold to predictions"""
        threshold = threshold or self.confidence_threshold
        return [p > threshold for p in predictions]
    
    def aggregate_predictions(self, predictions: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Aggregate multiple predictions"""
        return {
            "count": len(predictions),
            "average_confidence": sum(p.get("confidence", 0) for p in predictions) / len(predictions),
            "predictions": predictions
        }
    
    def _get_timestamp(self) -> str:
        """Get current timestamp"""
        from datetime import datetime
        return datetime.utcnow().isoformat()
