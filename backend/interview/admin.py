from django.contrib import admin

from .models import InterviewHistory, InterviewQuestion


@admin.register(InterviewQuestion)
class InterviewQuestionAdmin(admin.ModelAdmin):
	list_display = ("id", "category", "difficulty", "question", "created_at")
	list_filter = ("category", "difficulty", "created_at")
	search_fields = ("question",)


@admin.register(InterviewHistory)
class InterviewHistoryAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "question", "score", "created_at")
	list_filter = ("score", "created_at")
	search_fields = ("user__email", "question__question")
