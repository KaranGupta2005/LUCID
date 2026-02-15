import numpy as np
from typing import List

def calculate_accuracy(y_true: List, y_pred: List) -> float:
    """Calculate prediction accuracy"""
    correct = sum(1 for t, p in zip(y_true, y_pred) if t == p)
    return correct / len(y_true) if y_true else 0.0

def calculate_precision(y_true: List, y_pred: List) -> float:
    """Calculate precision"""
    true_positives = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    predicted_positives = sum(y_pred)
    return true_positives / predicted_positives if predicted_positives > 0 else 0.0

def calculate_recall(y_true: List, y_pred: List) -> float:
    """Calculate recall"""
    true_positives = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
    actual_positives = sum(y_true)
    return true_positives / actual_positives if actual_positives > 0 else 0.0

def calculate_f1_score(precision: float, recall: float) -> float:
    """Calculate F1 score"""
    if precision + recall == 0:
        return 0.0
    return 2 * (precision * recall) / (precision + recall)
