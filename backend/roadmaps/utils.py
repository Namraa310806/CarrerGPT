from __future__ import annotations

from typing import Dict, List


BASE_ROADMAPS = {
    "sde": [
        ("Week 1", ["Data structures refresh", "Big-O practice", "Arrays/Strings"]),
        ("Week 2", ["Linked Lists", "Stacks/Queues", "Hash Maps"]),
        ("Week 3", ["Trees/Graphs basics", "DFS/BFS", "Recursion"]),
        ("Week 4", ["Dynamic Programming", "Greedy patterns", "Sliding window"]),
        ("Week 5", ["System design basics", "REST, caching, DB indexing"]),
        ("Week 6", ["Mock interviews", "Refine resume/portfolio"]),
    ],
    "data-science": [
        ("Week 1", ["Python + Numpy/Pandas", "EDA", "Data cleaning"]),
        ("Week 2", ["Stats basics", "Hypothesis testing", "A/B testing"]),
        ("Week 3", ["ML workflow", "Train/val/test", "Metrics"]),
        ("Week 4", ["Models: linear/logistic, tree-based", "Regularization"]),
        ("Week 5", ["Feature engineering", "Pipelines", "Cross-validation"]),
        ("Week 6", ["Model deployment basics", "Dashboards/notebooks"]),
    ],
    "frontend": [
        ("Week 1", ["HTML/CSS refresh", "Flex/Grid", "Accessibility"]),
        ("Week 2", ["JS/TS basics", "Async/Promises", "Tooling"]),
        ("Week 3", ["React fundamentals", "Hooks", "State mgmt"]),
        ("Week 4", ["API integration", "Auth flows", "Forms/validation"]),
        ("Week 5", ["Testing (Jest/RTL)", "Performance", "Bundle split"]),
        ("Week 6", ["UI polish", "Portfolio project", "Mock interviews"]),
    ],
    "backend": [
        ("Week 1", ["Python/Django basics", "REST principles", "Serializers"]),
        ("Week 2", ["Auth/JWT", "Permissions", "CORS"]),
        ("Week 3", ["Databases & ORM", "Migrations", "Indexes"]),
        ("Week 4", ["Async tasks", "Caching", "File storage"]),
        ("Week 5", ["Testing", "Logging", "Observability"]),
        ("Week 6", ["Deploy to cloud", "CI/CD", "Hardening"]),
    ],
}


def generate_roadmap(track: str, skills: str = "") -> Dict[str, List[Dict[str, object]]]:
    key = (track or "").lower().strip()
    template = BASE_ROADMAPS.get(key, BASE_ROADMAPS.get("sde"))
    weeks = [
        {
            "week": name,
            "topics": topics,
            "resources": [],
            "notes": skills or "",
        }
        for name, topics in template
    ]
    return {"track": key or "sde", "weeks": weeks}
