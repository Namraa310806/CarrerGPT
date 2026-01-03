from __future__ import annotations

from collections import Counter
from typing import Dict, List

import requests


def fetch_github_stats(username: str) -> Dict[str, object]:
    base = f"https://api.github.com/users/{username}"
    user_resp = requests.get(base, timeout=10)
    user_resp.raise_for_status()
    user_data = user_resp.json()

    repos_resp = requests.get(f"{base}/repos", params={"per_page": 100}, timeout=15)
    repos_resp.raise_for_status()
    repos = repos_resp.json()

    total_stars = sum(r.get("stargazers_count", 0) for r in repos)
    total_forks = sum(r.get("forks_count", 0) for r in repos)
    languages: List[str] = [r.get("language") for r in repos if r.get("language")]
    lang_counts = Counter(languages)

    top_languages = [
        {"language": lang, "count": count}
        for lang, count in lang_counts.most_common(5)
    ]

    repo_summaries = [
        {
            "name": r.get("name"),
            "stars": r.get("stargazers_count", 0),
            "forks": r.get("forks_count", 0),
            "language": r.get("language"),
            "pushed_at": r.get("pushed_at"),
        }
        for r in repos[:20]
    ]

    return {
        "public_repos": user_data.get("public_repos", 0),
        "followers": user_data.get("followers", 0),
        "following": user_data.get("following", 0),
        "total_stars": total_stars,
        "total_forks": total_forks,
        "top_languages": top_languages,
        "recent_repos": repo_summaries,
    }


def fetch_leetcode_stats(username: str) -> Dict[str, object]:
    # Uses a community LeetCode stats API; replace with official integration if needed
    url = f"https://leetcode-stats-api.herokuapp.com/{username}"
    resp = requests.get(url, timeout=10)
    resp.raise_for_status()
    data = resp.json()
    # Normalize a subset of useful fields
    return {
        "total_solved": data.get("totalSolved"),
        "easy_solved": data.get("easySolved"),
        "medium_solved": data.get("mediumSolved"),
        "hard_solved": data.get("hardSolved"),
        "ranking": data.get("ranking"),
        "contribution_points": data.get("contributionPoints"),
        "reputation": data.get("reputation"),
        "submission_calendar": data.get("submissionCalendar"),
    }
