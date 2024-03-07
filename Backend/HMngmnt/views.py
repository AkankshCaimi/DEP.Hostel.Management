# Create your views here.
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import never_cache
from .models import Application, Faculty, CustomUser
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
import json
import jwt, datetime
from .decorators import token_required, admin_required, validate_token, staff_required
from django.core.serializers import serialize
from .helpers import get_user_dict, handle_file_attachment
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
@never_cache
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
def logout_ep(request):
    response=JsonResponse({'message': 'Logged out successfully'})
    response.delete_cookie('secret')
    return response

@csrf_exempt  
@never_cache
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

# ----------------STUDENT ONLY FUNCTIONS----------------
@csrf_exempt
@token_required
def get_application_status(request):
    user=request.new_param
    application=Application.objects.filter(student__id=user.get('id')).select_related('student', 'faculty').first()
    if application is None:
        return JsonResponse({'message': 'Student page', 'data': None})
    applicationX={
        'application_id': application.application_id,
        'student': application.student.name,
        'affiliation': application.affiliation,
        'faculty': application.faculty.faculty.name,
        'status': application.status,
        'address': application.address,
        'arrival': application.arrival,
        'departure': application.departure,
        'instiId': handle_file_attachment(application.instiId.path),
        'letter': handle_file_attachment(application.letter.path)
    }

    return JsonResponse({'message': 'Student page', 'data': applicationX})

@csrf_exempt
@token_required
def get_application(request, id):
    application=Application.objects.select_related('faculty', 'student').get(application_id=id)
    applicationX={
        'student': application.student.name,
        'application_id': application.application_id,
        'affiliation': application.affiliation,
        'faculty': application.faculty.faculty.name,
        'status': application.status,
        'address': application.address,
        'arrival': application.arrival,
        'departure': application.departure,
        'instiId': handle_file_attachment(application.instiId.path),
        'letter': handle_file_attachment(application.letter.path)
    }
    return JsonResponse({'message': 'Student page', 'data': applicationX})

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
    applications=Application.objects.select_related('student', 'faculty')
    application_list = [
        {
            'application_id': application.application_id,
            'student': application.student.name,
            'affiliation': application.affiliation,
            'faculty': application.faculty.faculty.name,
            'status': application.status
        }
        for application in applications
    ]
    print('application_list:', application_list)
    return JsonResponse({'message': 'Admin page', 'data': application_list})

# ----------------STAFF ONLY FUNCTIONS----------------
@csrf_exempt
@staff_required
def view_applications(request):
    user=request.new_param
    print('user:', user)
    faculty=Faculty.objects.get(faculty=CustomUser.objects.get(pk=user.get('id')))
    if not faculty.is_hod:
        print('faculty:', faculty)
        applications = Application.objects.filter(faculty=faculty).select_related('student', 'faculty')
        application_list=[{
            'application_id': application.application_id,
            'student': application.student.name,
            'affiliation': application.affiliation,
            'faculty': application.faculty.faculty.name,
            'status': application.status
        } for application in applications]
        print('application_list:', application_list)
        return JsonResponse({'message': 'Staff page', 'data': {'own': application_list}})
    else:
        print("HOD here")
        # applications for hod approval
        applications1=Application.objects.filter(status='Pending HOD Approval', faculty__department=faculty.department).select_related('student', 'faculty')
        #applications for own approval
        applications2 = Application.objects.filter(faculty=faculty).select_related('student', 'faculty')

        application_list1=[{
            'application_id': application.application_id,
            'student': application.student.name,
            'affiliation': application.affiliation,
            'faculty': application.faculty.faculty.name,
            'status': application.status
        } for application in applications1]
        application_list2=[{
            'application_id': application.application_id,
            'student': application.student.name,
            'affiliation': application.affiliation,
            'faculty': application.faculty.faculty.name,
            'status': application.status
        } for application in applications2]
        # print('application_list:', application_list)
        # return JsonResponse({'message': 'Staff page', 'data': application_list})
        return JsonResponse({'message': 'Staff page', 'data': {'hod': application_list1, 'own': application_list2}})

@csrf_exempt
@staff_required
def approve_applications(request):
    try:
        data = json.loads(request.body)
        application_ids = data.get('application_ids', [])
        for app_id in application_ids:
            application = get_object_or_404(Application, id=app_id)
            # Simulate the approval process
            if application.status.startswith('P'):
                application.status = 'APR'
                application.save()

        return JsonResponse({'message': 'Applications approved successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    
@csrf_exempt
@staff_required
def update_application(request):
    try:
        data=json.loads(request.body)
        data=data['data']
        mapping={
            0:'Pending SA Approval',
            1: 'Pending HOD Approval',
            2: 'Pending Admin Approval',
        }
        for obj in data:
            application=Application.objects.get(application_id=obj['appId'])
            application.status=mapping[int(obj['action'])]
            application.save()
        return JsonResponse({'message': 'Applications updated successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def download_pdf(request):
  # Replace with the actual path to your PDF file
    instiID=handle_file_attachment("C:/Users/devan/Desktop/My Folder/DEP.Hostel.Management/Backend/documents/gradesheet_till_4th.pdf")
    letter=handle_file_attachment("C:/Users/devan/Desktop/My Folder/DEP.Hostel.Management/Backend/documents/gradesheet_till_4th.pdf")
    resp={
        'instiID': instiID,
        'letter': letter
    }
    return JsonResponse(resp)