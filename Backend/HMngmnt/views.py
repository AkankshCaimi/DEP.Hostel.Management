# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application, Faculty, CustomUser
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
import jwt, datetime
from .decorators import token_required, admin_required
from django.core.serializers import serialize
@csrf_exempt
def index(request):
    # add_fac('Dr. Puneet Goyal')
    print(request.COOKIES.get('secret'))
    payload=jwt.decode(request.COOKIES.get('secret'), 'secret', algorithms="HS256")
    print(payload)
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
def internship(request):
    facultyE= request.POST.get('facultyEmail')
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
        name = data.get('name')
        password = data.get('password')
        email = data.get('email')
        role=data.get('role')
        # print(name, password, email)
        # print(request.POST)
        user=CustomUser(name=name,password=password,email=email)
        # print(user)
        user.set_password(password)
        if role=='faculty' or role=='admin':
            user.is_staff=True
        user.save()
        # login(request, user)
        response= JsonResponse({'message': 'Signup successful', 'data':user})
        payload = {
            'id': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'role': "admin" if user.is_staff else "student"
        }
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        response.set_cookie('secret', token, expires=payload['exp'], secure=True, httponly=True)
        return response

@csrf_exempt
def login_ep(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        user=authenticate(request, username=email,password=password)
        user_json=serialize('json', [user])
        user_json=json.loads(user_json[1:-1])['fields']
        user_json={key: value for key, value in user_json.items() if key in ['email', 'name']}
        if user is not None:
            login(request, user)
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'role': "admin" if user.is_staff else "student"
            }
            token = jwt.encode(payload, 'secret', algorithm='HS256')
            response=JsonResponse({'message': 'Signin Successful', 'data': user_json})
            response.set_cookie('secret', token, expires=payload['exp'], secure=True, httponly=True)
            print('response:', response)
            return response
        return JsonResponse({'message': 'Invalid login credentials'}, status=303)
    else:
        return JsonResponse({'message': 'Invalid login credentials'}, status=304)
    
@csrf_exempt
@admin_required
def admin_view(request):
    return JsonResponse({'message': 'Admin page'})