from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Project, Visit
from .serializers import ProjectReadSerializer, ProjectWriteSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from django.db.models import Count
from .view_helpers import upload_photos
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

class ProjectView(generics.ListCreateAPIView):
    serializer_class = ProjectReadSerializer
    queryset = Project.objects.all()
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        data = Project.objects.annotate(visits_count=Count('visits'))
        
        if settings.ACCEPT_PROJECTS:
            data = data.filter(accepted=True)
        
        year = request.GET.get('studyYear')
        if year:
            data = data.filter(studyYear=year)

        specification = request.GET.get('specification')
        if specification:
            data = data.filter(specification=specification)

        tool = request.GET.get('tool')
        if tool:
            data = data.filter(tools__name=tool)

        supervisor = request.GET.get('supervisor')
        if supervisor:
            data = data.filter(supervisors__name=supervisor)
        data = data.order_by('-posted_at')

        page = self.paginate_queryset(data)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        data = request.data
        images = dict(data.lists())['image'] if data.get('image') else None
        serializer = ProjectWriteSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        project_id = serializer.data.get('id')
        project = Project.objects.get(pk=project_id)

        if images is None:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        upload_photos(images, project)

        serializer = self.get_serializer(project)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProjectGetView(generics.RetrieveAPIView):
    serializer_class = ProjectReadSerializer
    queryset = Project.objects.all()


class ProjectVisit(APIView):
    authentication_classes = []
    def post(self, request, pk):
        session = request.data.get('token')
        if session is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            Visit.objects.get(session=session, project=pk)
            return Response({"visits": Visit.objects.filter(project=pk).count()}, status=status.HTTP_200_OK)
        except Visit.DoesNotExist:
            pass
        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        instance = Visit.objects.create(session=session, project=project)
        instance.save()
        return Response({"visits": Visit.objects.filter(project=pk).count()}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_projects_count(request):
    count = Project.objects.all().count()
    return Response({'total_projects': count}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_visits_count(request):
    count = Visit.objects.all().count()
    return Response({'total_visits': count}, status=status.HTTP_200_OK)
