from __future__ import annotations

from pathlib import Path
from typing import Dict, List

import PyPDF2


def extract_text(file_path: str) -> str:
    path = Path(file_path)
    if path.suffix.lower() == ".pdf":
        with path.open("rb") as fh:
            reader = PyPDF2.PdfReader(fh)
            pages = [page.extract_text() or "" for page in reader.pages]
            return "\n".join(pages).strip()
    return path.read_text(encoding="utf-8", errors="ignore")


def analyze_resume_text(text: str) -> Dict[str, object]:
    lower = text.lower()
    keywords = ["python", "django", "react", "aws", "sql", "machine learning", "leadership"]
    hits: List[str] = [kw for kw in keywords if kw in lower]
    score = min(100, 40 + len(hits) * 10)

    strengths = hits or ["Clear structure"]
    gaps = [kw for kw in keywords if kw not in hits]
    suggestions = [
        "Quantify achievements with metrics.",
        "Add links to GitHub/portfolio.",
        "Highlight impact and ownership.",
    ]

    return {
        "score": score,
        "strengths": strengths,
        "gaps": gaps,
        "suggestions": suggestions,
    }
