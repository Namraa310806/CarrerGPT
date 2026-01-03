from django.db.models import Avg
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from github_cp.models import CPStats
from interview.models import InterviewHistory
from resume.models import ResumeUpload
from roadmaps.models import Roadmap


class AnalyticsSummaryView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request):
		user = request.user

		resume_qs = ResumeUpload.objects.filter(user=user)
		resume_count = resume_qs.count()
		latest_resume = resume_qs.order_by("-created_at").first()
		resume_score = None
		if latest_resume and isinstance(latest_resume.feedback, dict):
			resume_score = latest_resume.feedback.get("score")

		cp_qs = CPStats.objects.filter(user=user)
		gh_latest = cp_qs.filter(platform=CPStats.Platform.GITHUB).order_by("-fetched_at").first()
		lc_latest = cp_qs.filter(platform=CPStats.Platform.LEETCODE).order_by("-fetched_at").first()

		interview_qs = InterviewHistory.objects.filter(user=user)
		interview_count = interview_qs.count()
		interview_avg = interview_qs.aggregate(avg=Avg("score"))['avg'] or 0

		roadmap_count = Roadmap.objects.filter(user=user).count()

		data = {
			"resume": {
				"count": resume_count,
				"latest_score": resume_score,
				"latest_feedback": latest_resume.feedback if latest_resume else None,
			},
			"github": gh_latest.stats_json if gh_latest else None,
			"leetcode": lc_latest.stats_json if lc_latest else None,
			"interview": {
				"count": interview_count,
				"avg_score": interview_avg,
			},
			"roadmap": {
				"count": roadmap_count,
			},
		}
		return Response(data)
