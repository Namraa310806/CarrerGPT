from django.urls import path

from .views import CPStatsListView, GitHubFetchView, LeetCodeFetchView

urlpatterns = [
    path("stats/", CPStatsListView.as_view(), name="cp-stats"),
    path("github/", GitHubFetchView.as_view(), name="github-fetch"),
    path("leetcode/", LeetCodeFetchView.as_view(), name="leetcode-fetch"),
]
