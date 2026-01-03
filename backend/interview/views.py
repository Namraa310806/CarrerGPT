import random

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import InterviewHistory, InterviewQuestion
from .serializers import (
	InterviewHistorySerializer,
	InterviewQuestionSerializer,
	InterviewSubmissionSerializer,
)


class QuestionView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request):
		qs = InterviewQuestion.objects.all()
		category = request.query_params.get("category")
		difficulty = request.query_params.get("difficulty")
		if category:
			qs = qs.filter(category=category)
		if difficulty:
			qs = qs.filter(difficulty=difficulty)
		count = qs.count()
		if count == 0:
			return Response({"detail": "No questions available"}, status=status.HTTP_404_NOT_FOUND)
		question = qs[random.randint(0, count - 1)]
		return Response(InterviewQuestionSerializer(question).data)


class SubmitView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		serializer = InterviewSubmissionSerializer(data=request.data, context={"request": request})
		serializer.is_valid(raise_exception=True)
		history = serializer.save()
		return Response(
			{
				"score": history.score,
				"feedback": history.feedback,
				"question": InterviewQuestionSerializer(history.question).data,
			}
		)


class HistoryView(generics.ListAPIView):
	serializer_class = InterviewHistorySerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return InterviewHistory.objects.filter(user=self.request.user)
