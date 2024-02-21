# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Application, Faculty, CustomUser
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
import jwt, datetime
from .decorators import token_required, admin_required, validate_token, staff_required
from django.core.serializers import serialize
from .helpers import get_user_dict
from django.core.serializers.json import DjangoJSONEncoder

@csrf_exempt
def index(request):
    # add_fac('Dr. Puneet Goyal')
    print(request.COOKIES.get('secret'))
    payload=jwt.decode(request.COOKIES.get('secret'), 'secret', algorithms="HS256")
    print(payload)
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
@token_required
# write again
def internship(request):
    facultyE= request.POST.get('facultyEmail')
    student= request.POST.get('studentEmail')
    gender= request.POST.get('gender')
    if CustomUser.objects.get(email=student) is None:
        return HttpResponse("Student not found", status=300)
    if CustomUser.objects.get(email=facultyE) is None:
        return HttpResponse("Faculty not found", status=300)
    application = Application(
        student= CustomUser.objects.get(email=student),
        affiliation= request.POST.get('affiliation'),
        address= request.POST.get('address'),
        phone= request.POST.get('contactNumber'),
        faculty= Faculty.objects.get(faculty__email=facultyE),
        arrival= request.POST.get('arrivalDate'),
        departure= request.POST.get('departureDate'),
        instiId= request.FILES.get('instituteID'),
        letter= request.FILES.get('instituteLetter'),
    )
    #update gender in user
    user=CustomUser.objects.get(email=student)
    user.gender=gender
    user.save()

    application.save()
    return HttpResponse("Application submitted successfully", status=200)

@csrf_exempt
# add user info
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
        # user=get_user_dict(user, ['email', 'name'])
        # login(request, user)
        # print(user.name, user.email, user.password, user.is_staff, user.is_superuser, user.is_active, user)
        response= JsonResponse({'message': 'Signup successful', 'data': {'email': user.email, 'name': user.name}})
        user.save()
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'role':  "admin" if user.is_superuser else "staff" if user.is_staff else "student"
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
        if user is not None:
            user_json=get_user_dict(user, ['email', 'name', 'is_staff', 'is_superuser'])
            # login(request, user)
            payload = {
                'id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'role': "admin" if user.is_superuser else "staff" if user.is_staff else "student"
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
def get_user_info(request):
    if request.method=='GET':
        cookie=request.COOKIES.get('secret')
        # print('cookie:', cookie)
        if not cookie:
            return JsonResponse({'error': 'Token is missing'}, status=300)
        decoded= validate_token(cookie)
        # print(decoded)
        if decoded is None or decoded.get('id') is None:
            return JsonResponse({'error': 'User is not found'}, status=301)
        user=CustomUser.objects.get(pk=decoded.get('id'))
        user=get_user_dict(user, ['email', 'name', 'is_staff', 'is_superuser'])
        return JsonResponse({'message': 'User page', 'data': user})


# ----------------ADMIN ONLY FUNCTIONS----------------

@csrf_exempt
@admin_required
def add_students(request):
    xlFile= request.FILES.get('file')
    name=request.POST.get('name')
    print(xlFile, name)
    return JsonResponse({'message': 'Admin page'})

@csrf_exempt
@admin_required
def add_faculty(request):
    return JsonResponse({'message': 'Admin page'})

@csrf_exempt
@admin_required
def get_applications(request):
    applications = Application.objects.all()

    # Serialize the applications with custom encoder
    applications_data = serialize('json', applications, cls=DjangoJSONEncoder)

    # Deserialize the serialized data
    applications_list = json.loads(applications_data)

    # Replace student and prof references with their names
    for application in applications_list:
        fields = application['fields']
        student_id = fields.get('student')
        faculty_id = fields.get('faculty')

        # Fetch the names based on the IDs (assuming your model has 'name' fields)
        student_name = CustomUser.objects.get(pk=student_id).name if student_id else None
        faculty_name = CustomUser.objects.get(pk=faculty_id).name if faculty_id else None

        # Replace the references with names
        fields['student'] = student_name
        fields['prof'] = faculty_name

    return JsonResponse({'message': 'Admin page', 'data': applications_list})

    # return JsonResponse({'message': 'Admin page'})


# ----------------STAFF ONLY FUNCTIONS----------------
@csrf_exempt
@staff_required
def view_applications(request):
    user=request.new_param
    print('user:', user)
    faculty=CustomUser.objects.get(pk=user.get('id'))
    print('faculty:', faculty)
    applications = Application.objects.filter(faculty__faculty=faculty)
    applications=serialize('json', applications, cls=DjangoJSONEncoder)
    applications = json.loads(applications)
    for application in applications:
        fields = application['fields']
        student_id = fields.get('student')
        faculty_id = fields.get('faculty')

        # Fetch the names based on the IDs (assuming your model has 'name' fields)
        student_name = CustomUser.objects.get(pk=student_id).name if student_id else None
        faculty_name = CustomUser.objects.get(pk=faculty_id).name if faculty_id else None

        # Replace the references with names
        fields['student'] = student_name
        fields['prof'] = faculty_name
    # print('applications:', applications)
    return JsonResponse({'message': 'Staff page', 'data': applications})