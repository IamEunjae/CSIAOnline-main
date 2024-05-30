# views.py
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
#from rest_framework.JsonResponse import JsonResponse
from django.http import JsonResponse
from rest_framework import status
from .models import Reservation
from .serializers import ReservationSerializer
import json

@csrf_exempt
def counsel_view(request):
    if request.method == 'PUT':
        # Logic for PUT request (API request)
        data = json.loads(request.body)
        print(data)
        timeSlot = data.get("timeSlot")
        print(type(timeSlot))
        print(timeSlot+"printed time")
        try:
            reservation = Reservation.objects.get(timeSlot=timeSlot)
            print(reservation)
        except Reservation.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid time slot"}, status=status.HTTP_400_BAD_REQUEST
            )

        reservation.availability = False
        reservation.student_id = request.user.student_id  
        reservation.save()
        serializer = ReservationSerializer(reservation)
        serialized_data = serializer.data
        return JsonResponse(serialized_data, content_type="application/json")
    
    elif request.method == 'DELETE':
        # Logic for DELETE request (API request)
        data = json.loads(request.body)
        timeSlot = data.get("timeSlot")
        try:
            reservation = Reservation.objects.get(timeSlot=timeSlot, student_id=request.user.student_id)
        except Reservation.DoesNotExist:
            return JsonResponse(
                {"error": "Invalid time slot or unauthorized"}, status=status.HTTP_400_BAD_REQUEST
            )

        reservation.availability = True
        reservation.student_id = None
        reservation.save()
        serializer = ReservationSerializer(reservation)
        return JsonResponse(serializer.data, content_type="application/json")

    # Logic for rendering HTML page
    Reservations = Reservation.objects.all()
    print(request.user.student_id)
    return render(request, "index.html", {"Reservations": Reservations, "current_student_id": request.user.student_id})
