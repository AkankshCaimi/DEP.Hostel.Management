from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application, Faculty
# from ../add_fac import add_fac
from .add_fac import add_fac
# Create your views here.


@csrf_exempt
def index(request):
    add_fac('Dr. Puneet Goyal')
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
def internship(request):
    # print(request.FILES)
    # vals= request.POST
    facultyE= request.POST.get('facultyEmail')
    # print(facultyE, Faculty.objects.values_list('faculty_name', flat=True))
    if Faculty.objects.get(faculty_email=facultyE) is None:
        return HttpResponse("Faculty not found", status=300)
    application = Application(
        name = request.POST.get('studentName'),
        gender= request.POST.get('gender'),
        affiliation= request.POST.get('affiliation'),
        address= request.POST.get('address'),
        phone= request.POST.get('contactNumber'),
        email= request.POST.get('email'),
        faculty= request.POST.get('facultyMentorName'),
        faculty_email = Faculty.objects.get(faculty_name=facultyE),
        arrival= request.POST.get('arrivalDate'),
        departure= request.POST.get('departureDate'),
        instiId= request.FILES.get('instituteID'),
        letter= request.FILES.get('instituteLetter'),
    )
    print(application)
    application.save()

    return HttpResponse("this is internship")