from django.urls import path

from .views import HistoryView, QuestionView, SubmitView

urlpatterns = [
    path("question/", QuestionView.as_view(), name="interview-question"),
    path("submit/", SubmitView.as_view(), name="interview-submit"),
    path("history/", HistoryView.as_view(), name="interview-history"),
]
