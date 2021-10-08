from django.urls import path, include
from .views import ProjectView, ProjectVisit, get_projects_count, get_visits_count, ProjectGetView

urlpatterns = [
    path('projects', ProjectView.as_view()),
    path('projects/<int:pk>/visit', ProjectVisit.as_view()),
    path('projects/<int:pk>', ProjectGetView.as_view()),
    path('projects-count', get_projects_count),
    path('visits-count', get_visits_count),
]
