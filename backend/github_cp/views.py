from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CPStats
from .serializers import CPStatsSerializer
from .utils import fetch_github_stats, fetch_leetcode_stats


class CPStatsListView(generics.ListAPIView):
	serializer_class = CPStatsSerializer
	permission_classes = [permissions.IsAuthenticated]

	def get_queryset(self):
		return CPStats.objects.filter(user=self.request.user)


class GitHubFetchView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		username = request.data.get("username")
		if not username:
			return Response({"detail": "username is required"}, status=status.HTTP_400_BAD_REQUEST)
		stats = fetch_github_stats(username)
		CPStats.objects.create(
			user=request.user,
			platform=CPStats.Platform.GITHUB,
			username=username,
			stats_json=stats,
		)
		return Response({"platform": "github", "username": username, "stats": stats})


class LeetCodeFetchView(APIView):
	permission_classes = [permissions.IsAuthenticated]

	def post(self, request):
		username = request.data.get("username")
		if not username:
			return Response({"detail": "username is required"}, status=status.HTTP_400_BAD_REQUEST)
		stats = fetch_leetcode_stats(username)
		CPStats.objects.create(
			user=request.user,
			platform=CPStats.Platform.LEETCODE,
			username=username,
			stats_json=stats,
		)
		return Response({"platform": "leetcode", "username": username, "stats": stats})
