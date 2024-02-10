from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application, Faculty
# Create your views here.


@csrf_exempt
def index(request):
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
def internship(request):
    print(request.FILES)
    vals= request.POST
    faculty= vals['facultyMentorName']
    if faculty not in Faculty.objects.values_list('faculty_name', flat=True):
        return HttpResponse("Faculty not found", status=300)
    application = Application(
        name = vals['studentName'],
        gender= vals['gender'],
        affiliation= vals['affiliation'],
        address= vals['address'],
        phone= vals['contactNumber'],
        email= vals['email'],
        faculty= vals['facultyMentorName'],
        arrival= vals['arrivalDate'],
        departure= vals['departureDate']
    )
    print(application)
    # application.save()

    return HttpResponse("this is internship")