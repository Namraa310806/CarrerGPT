from django.conf import settings
from django.db import models


class InterviewQuestion(models.Model):
	class Category(models.TextChoices):
		DSA = "dsa", "DSA"
		HR = "hr", "HR"
		SYSTEM = "system", "System Design"
		BEHAVIORAL = "behavioral", "Behavioral"

	class Difficulty(models.TextChoices):
		EASY = "easy", "Easy"
		MEDIUM = "medium", "Medium"
		HARD = "hard", "Hard"

	category = models.CharField(max_length=32, choices=Category.choices, default=Category.DSA)
	difficulty = models.CharField(max_length=16, choices=Difficulty.choices, default=Difficulty.MEDIUM)
	question = models.TextField()
	answer_hint = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self):
		return f"{self.category} - {self.difficulty}: {self.question[:40]}..."


class InterviewHistory(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	question = models.ForeignKey(InterviewQuestion, on_delete=models.SET_NULL, null=True)
	user_response = models.TextField()
	score = models.IntegerField()
	feedback = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ("-created_at",)

	def __str__(self):
		return f"Attempt {self.id} by {self.user.email}"
