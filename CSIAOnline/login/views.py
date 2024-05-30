from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login
from .models import CustomUser
import json

@csrf_exempt
def custom_login(request):
    if request.method == "POST":
        # Get data from the form
        data = json.loads(request.body.decode('utf-8'))
        student_id = data.get("student_id")
        email = data.get("email")
        password = data.get("password")

        # Check if there is any matching object in the CustomUser table
        try:
            user = CustomUser.objects.get(
                student_id=student_id, email=email, password=password
            )
            # Log in the user for the current session
            login(request, user)
            # Return a success response
            return JsonResponse({"status": "success"})
        except CustomUser.DoesNotExist:
            # If no match is found, return an error message
            return JsonResponse(
                {"error": "Invalid login credentials. Please check your inputs."},
                status=400,
            )

    return render(request, "login/login.html")
