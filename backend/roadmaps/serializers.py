from rest_framework import serializers

from .models import Roadmap
from .utils import generate_roadmap


class RoadmapSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Roadmap
        fields = ["id", "user", "track_name", "skills", "roadmap_json", "created_at"]
        read_only_fields = ["roadmap_json", "created_at"]

    def create(self, validated_data):
        track = validated_data.get("track_name")
        skills = validated_data.get("skills", "")
        roadmap = generate_roadmap(track, skills)
        validated_data["roadmap_json"] = roadmap
        return super().create(validated_data)
