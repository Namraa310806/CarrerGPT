from __future__ import annotations

from typing import Tuple

from .models import InterviewQuestion


def score_response(question: InterviewQuestion, response: str) -> Tuple[int, str]:
    """Lightweight heuristic scorer; replace with GPT in production."""
    text = (response or "").lower()
    keywords = {
        "dsa": ["time complexity", "space", "big o", "optimize", "edge case"],
        "system": ["scalable", "throughput", "latency", "cache", "database", "queue", "replication"],
        "behavioral": ["situation", "task", "action", "result", "learned"],
        "hr": ["strength", "weakness", "team", "conflict"],
    }
    kw = keywords.get(question.category, [])
    hits = sum(1 for k in kw if k in text)
    length_score = min(40, max(0, len(response.split()) // 5))
    keyword_score = min(60, hits * 12)
    score = max(10, min(100, length_score + keyword_score))

    feedback_parts = []
    if hits == 0:
        feedback_parts.append("Address key concepts for this category.")
    else:
        feedback_parts.append(f"You covered {hits} key concept(s); add more depth.")
    if length_score < 20:
        feedback_parts.append("Expand with structured details and examples.")
    else:
        feedback_parts.append("Good length; ensure clarity and structure.")
    if question.answer_hint:
        feedback_parts.append("Hint: " + question.answer_hint[:180])

    return score, " ".join(feedback_parts)
