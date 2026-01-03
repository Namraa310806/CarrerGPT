from django.contrib import admin

from .models import Roadmap


@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "track_name", "created_at")
	search_fields = ("user__email", "track_name")
	list_filter = ("track_name", "created_at")
