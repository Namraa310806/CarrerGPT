from django.conf import settings
from django.db import models


class ResumeUpload(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	file = models.FileField(upload_to="resumes/")
	feedback = models.JSONField(blank=True, null=True, default=dict)
	parsed_text = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self):
		return f"Resume {self.id} - {self.user.email}"
