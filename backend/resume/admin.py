from django.contrib import admin

from .models import ResumeUpload


@admin.register(ResumeUpload)
class ResumeUploadAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "file", "created_at")
	search_fields = ("user__email",)
	list_filter = ("created_at",)
