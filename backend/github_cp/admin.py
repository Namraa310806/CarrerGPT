from django.contrib import admin

from .models import CPStats


@admin.register(CPStats)
class CPStatsAdmin(admin.ModelAdmin):
	list_display = ("id", "user", "platform", "username", "fetched_at")
	search_fields = ("username", "user__email")
	list_filter = ("platform", "fetched_at")
