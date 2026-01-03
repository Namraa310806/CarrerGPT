from django.urls import path

from .views import RoadmapListCreateView, RoadmapPreviewView

urlpatterns = [
    path("", RoadmapListCreateView.as_view(), name="roadmap-list-create"),
    path("preview/", RoadmapPreviewView.as_view(), name="roadmap-preview"),
]
