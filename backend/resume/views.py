import logging

from rest_framework import generics, permissions

from .models import ResumeUpload
from .serializers import ResumeUploadSerializer
from .utils import analyze_resume_text, extract_text

logger = logging.getLogger(__name__)


class ResumeUploadView(generics.ListCreateAPIView):
	serializer_class = ResumeUploadSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return ResumeUpload.objects.filter(user=self.request.user)

	def perform_create(self, serializer):
		instance = serializer.save(user=self.request.user)
		try:
			text = extract_text(instance.file.path)
			feedback = analyze_resume_text(text)
			instance.parsed_text = text
			instance.feedback = feedback
			instance.save(update_fields=["parsed_text", "feedback"])
		except Exception as exc:  # noqa: BLE001
			logger.exception("Resume analysis failed")
			raise exc
