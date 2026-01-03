from django.conf import settings
from django.db import models


class CPStats(models.Model):
	class Platform(models.TextChoices):
		GITHUB = "github", "GitHub"
		LEETCODE = "leetcode", "LeetCode"

	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	platform = models.CharField(max_length=20, choices=Platform.choices)
	username = models.CharField(max_length=255)
	stats_json = models.JSONField(default=dict, blank=True)
	fetched_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-fetched_at",)

	def __str__(self):
		return f"{self.platform}:{self.username}"
