from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application, Faculty
# from ../add_fac import add_fac
from .add_fac import add_fac
# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json

@csrf_exempt
def index(request):
    # add_fac('Dr. Puneet Goyal')
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
def internship(request):
    # print(request.FILES)
    # vals= request.POST
    facultyE= request.POST.get('facultyEmail')
    # print("email is this:", facultyE)
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
        faculty= Faculty.objects.get(faculty_email=facultyE),
        arrival= request.POST.get('arrivalDate'),
        departure= request.POST.get('departureDate'),
        instiId= request.FILES.get('instituteID'),
        letter= request.FILES.get('instituteLetter'),
    )
    print(application)
    application.save()

    return HttpResponse("this is internship")

@csrf_exempt
def signup_ep(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('name')
        password = data.get('password')
        email = data.get('email')
        role=data.get('role')
        print(username, password, email)
        # print(request.POST)
        user=User.objects.get_or_create(username=username,password=password,email=email)
        if role=='faculty' or role=='admin':
            user.is_staff=True
        user.save()
        login(request, user)
        return JsonResponse({'message': 'Signup successful'})

@csrf_exempt
def login_ep(request):
 if request.method == 'POST':
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    print(email, password)
    # user=authenticate(email=email,password=password)
    user=User.objects.get(email=email)
    if user is not None:
        login(request, user)
        return JsonResponse({'message': 'Login successful'})
    else:
        return JsonResponse({'message': 'Invalid login credentials'}, status=404)