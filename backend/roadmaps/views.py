from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Roadmap
from .serializers import RoadmapSerializer
from .utils import generate_roadmap


class RoadmapListCreateView(generics.ListCreateAPIView):
	serializer_class = RoadmapSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return Roadmap.objects.filter(user=self.request.user)


class RoadmapPreviewView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def get(self, request):
		track = request.query_params.get("track", "sde")
		skills = request.query_params.get("skills", "")
		roadmap = generate_roadmap(track, skills)
		return Response(roadmap)
