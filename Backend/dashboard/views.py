# dashboard/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import json
from .models import Appointment

from .serializers import AppointmentSerializer

def index(request):
    return JsonResponse({"message": "Welcome to the appointment API!"})
@csrf_exempt
def appointment_create(request):
    if request.method == 'POST':
        try:
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                print(data)
                print(data)
                patient_name = data.get('patientName')
                age = data.get('age')

                # Save data to the database
                appointment = Appointment.objects.create(patient_name=patient_name, age=age)
                return JsonResponse({"message": "Appointment created successfully!"}, status=201)
            
            elif request.content_type == 'multipart/form-data':
                patient_name = request.POST.get('patient_name')
                print(patient_name)

                age = request.POST.get('age')
                print(age)
                file = request.FILES.get('file')

                if file:
                    file_path = default_storage.save(file.name, file)
                    appointment = Appointment.objects.create(patient_name=patient_name, age=age, file=file_path)
                else:
                    appointment = Appointment.objects.create(patient_name=patient_name, age=age)

                return JsonResponse({"message": "Appointment created successfully!"}, status=201)

            return JsonResponse({"error": "Invalid content type"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid method"}, status=405)
