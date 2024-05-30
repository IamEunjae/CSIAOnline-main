from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("login.urls")),  # Blank root for login app
    path("", include("counsel.urls")),  # 'app1/' path for app1 # Include login app URLs
    path("", include("home.urls")),
    # Add other app paths as needed
    path("", include("yaja.urls")),
]

