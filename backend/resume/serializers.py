from rest_framework import serializers

from .models import ResumeUpload


class ResumeUploadSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = ResumeUpload
        fields = [
            "id",
            "user",
            "file",
            "feedback",
            "parsed_text",
            "created_at",
        ]
        read_only_fields = ["feedback", "parsed_text", "created_at"]
