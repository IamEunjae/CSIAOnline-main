from django.urls import path
from . import views
from .views import login

urlpatterns = [
    path("", views.custom_login, name = "login")
]

# urlpatterns = [
#     path("", views.login, name="login")
#     path('login/', login_view, name='login'),
#     # Add other login-related paths as needed
# ]

