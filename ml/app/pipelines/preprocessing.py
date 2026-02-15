import re
from typing import Dict, Any, List

class Preprocessor:
    def __init__(self):
        self.stop_words = set(['the', 'a', 'an', 'in', 'on', 'at'])
        
    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        # Remove special characters
        text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    
    def remove_stop_words(self, text: str) -> str:
        """Remove common stop words"""
        words = text.split()
        filtered = [w for w in words if w not in self.stop_words]
        return ' '.join(filtered)
    
    def preprocess(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Main preprocessing pipeline"""
        if 'text' in data:
            data['text'] = self.clean_text(data['text'])
            data['text'] = self.remove_stop_words(data['text'])
        return data
    
    def batch_preprocess(self, data_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Preprocess multiple data points"""
        return [self.preprocess(data) for data in data_list]
