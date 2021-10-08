from .models import Project, Photo, SuperVisor, Technology, Student
from .fields import SlugRelatedField
from rest_framework import serializers


class ProjectReadSerializer(serializers.ModelSerializer):
    supervisors = SlugRelatedField(many=True, read_only=True, slug_field='name')
    tools = SlugRelatedField(many=True, read_only=True, slug_field='name')
    photos = serializers.SerializerMethodField()
    visits_count = serializers.IntegerField(read_only=True)
    students = SlugRelatedField(many=True, read_only=True, slug_field='name')
    class Meta:
        model = Project
        fields = ('id', 'posted_at', 'projectName',
                  'description', 'studyYear', 'specification',
                  'mark', 'documentation', 'presentation',
                  'supervisors', 'tools', 'photos', 'visits_count', 'students'
                  )

    def get_photos(self, obj):
        request = self.context.get("request")
        images = obj.photos.all()
        images_list = []
        for img in images:
            image = request.build_absolute_uri(img.photo.url)
            thumbnail = request.build_absolute_uri(img.thumbnail.url)
            images_list.append({'image': image, 'thumbnail': thumbnail})
        return images_list


class ProjectWriteSerializer(serializers.ModelSerializer):
    supervisors = SlugRelatedField(many=True, slug_field='name', queryset=SuperVisor.objects.all(), required=True)
    tools = SlugRelatedField(many=True, slug_field='name', queryset=Technology.objects.all(), required=True)
    students = SlugRelatedField(many=True, slug_field='name', queryset=Student.objects.all(), required=True)

    class Meta:
        model = Project
        fields = ('id', 'posted_at', 'projectName',
                  'description', 'studyYear', 'specification',
                  'mark', 'documentation', 'presentation',
                  'supervisors', 'tools', 'students'
                  )

    def create(self, validated_data):
        presentation = validated_data.pop('presentation', None)
        documentation = validated_data.pop('documentation', None)
        instance = super().create(validated_data)
        instance.presentation=presentation
        instance.documentation=documentation
        instance.save()
        return instance
