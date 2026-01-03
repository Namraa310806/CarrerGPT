from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Certification
from .serializers import CertificationSerializer

class CertificationListCreateView(APIView):
    def get(self, request):
        certifications = Certification.objects.all()
        serializer = CertificationSerializer(certifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CertificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CertificationDetailView(APIView):
    def get(self, request, pk):
        try:
            certification = Certification.objects.get(pk=pk)
        except Certification.DoesNotExist:
            return Response({'error': 'Certification not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CertificationSerializer(certification)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            certification = Certification.objects.get(pk=pk)
        except Certification.DoesNotExist:
            return Response({'error': 'Certification not found'}, status=status.HTTP_404_NOT_FOUND)
        certification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)