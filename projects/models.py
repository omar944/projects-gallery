from django.db import models

from .helpers import upload_presentation, upload_book, upload_photo, upload_thumbnail


class SuperVisor(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Technology(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Student(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Project(models.Model):
    posted_at = models.DateTimeField(auto_now_add=True)
    projectName = models.CharField(max_length=100, verbose_name='project_name')
    description = models.TextField(max_length=1000)
    studyYear = models.CharField(max_length=20)
    specification = models.CharField(max_length=20)
    mark = models.IntegerField()
    supervisors = models.ManyToManyField(SuperVisor, related_name='project_supervisors', blank=True)
    tools = models.ManyToManyField(Technology, related_name='project_tools', blank=True)
    documentation = models.FileField(upload_to=upload_book)
    presentation = models.FileField(upload_to=upload_presentation)
    accepted = models.BooleanField(default=False)
    students = models.ManyToManyField(Student, related_name='project_students', blank=True)
    
    def __str__(self) -> str:
        return self.projectName + " " + str(self.accepted)


class Photo(models.Model):
    photo = models.ImageField(upload_to=upload_photo, null=True)
    thumbnail = models.ImageField(upload_to=upload_thumbnail, null=True)
    project = models.ForeignKey(Project, related_name='photos', on_delete=models.CASCADE)
    number = models.IntegerField()
    
    def __str__(self):
        return self.photo.url


class Visit(models.Model):
    session = models.CharField(max_length=500)
    project = models.ForeignKey(Project, related_name='visits', on_delete=models.CASCADE)
