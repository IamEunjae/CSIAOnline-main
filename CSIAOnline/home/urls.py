from django.urls import path
from .views import home_view

urlpatterns = [
    path("home/", home_view, name="home"),
    # Other URL patterns specific to the home app
]
