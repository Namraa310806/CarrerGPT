from rest_framework import serializers

from .models import CPStats


class CPStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CPStats
        fields = ["id", "platform", "username", "stats_json", "fetched_at"]
        read_only_fields = fields
