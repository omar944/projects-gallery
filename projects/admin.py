from django.contrib import admin

from .models import Project, Photo, Technology, SuperVisor

admin.site.register(Project)
admin.site.register(Photo)
admin.site.register(Technology)
admin.site.register(SuperVisor)
