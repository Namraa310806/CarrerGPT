from rest_framework import serializers

from .models import InterviewHistory, InterviewQuestion
from .scoring import score_response


class InterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewQuestion
        fields = ["id", "category", "difficulty", "question", "answer_hint", "created_at"]
        read_only_fields = fields


class InterviewSubmissionSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    user_response = serializers.CharField()

    def validate_question_id(self, value):
        if not InterviewQuestion.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid question_id")
        return value

    def create(self, validated_data):
        request = self.context["request"]
        question = InterviewQuestion.objects.get(id=validated_data["question_id"])
        score, feedback = score_response(question, validated_data["user_response"])
        history = InterviewHistory.objects.create(
            user=request.user,
            question=question,
            user_response=validated_data["user_response"],
            score=score,
            feedback=feedback,
        )
        return history


class InterviewHistorySerializer(serializers.ModelSerializer):
    question = InterviewQuestionSerializer()

    class Meta:
        model = InterviewHistory
        fields = ["id", "question", "user_response", "score", "feedback", "created_at"]
        read_only_fields = fields
