from django.urls import path
from counsel import views

urlpatterns = [
    path("counsel/", views.counsel_view, name="counsel"),
    # path("teacher_login/", views.teacher_login, name="teacher_login"),
    # Add other app1-related paths as needed
]
