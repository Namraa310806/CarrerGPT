from django.conf import settings
from django.db import models


class Roadmap(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	track_name = models.CharField(max_length=100)
	skills = models.TextField(blank=True)
	roadmap_json = models.JSONField(default=dict)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self):
		return f"{self.track_name} - {self.user.email}"
