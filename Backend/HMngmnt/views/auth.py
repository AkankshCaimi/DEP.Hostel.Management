from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import never_cache
from django.contrib.auth import authenticate

from ..models import CustomUser, Room, Hostel, Student, Wing
from ..helpers import get_user_dict
from ..decorators import validate_token, token_required
import json
import jwt, datetime

@csrf_exempt
def index(request):
    # for student in Student.objects.all():
    #     student.student_room=None
    #     student.save()
    wing=Wing.objects.get(wing_name='Raavi West')
    rooms=wing.room_set.all()
    for room in rooms:
        print(room.room_no, ":", room.student_set.all())
        if room.student_set.all().count():
            for x in room.student_set.all():
                print(x.student.name, x.student.gender)
    return JsonResponse({"message":"Hello, world. You're at the HMngmnt index."})


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
        # user=get_user_dict(user, ['email', 'name'])
        # login(request, user)
        # print(user.name, user.email, user.password, user.is_staff, user.is_superuser, user.is_active, user)
        response= JsonResponse({'message': 'Signup successful', 'data': {'email': user.email, 'name': user.name}})
        user.save()
        # payload = {
        #     'id': user.id,
        #     'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        #     'iat': datetime.datetime.utcnow(),
        #     'role':  "admin" if user.is_superuser else "staff" if user.is_staff else "student"
        # }
        # token = jwt.encode(payload, 'secret', algorithm='HS256')
        # response.set_cookie('secret', token, expires=payload['exp'], secure=True, httponly=True)
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
            user_json=get_user_dict(user)
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
        
        user=get_user_dict(user)

        return JsonResponse({'message': 'User page', 'data': user})
    
@csrf_exempt
@token_required
def profile(req):
    if req.method == 'GET':
        # email=req.GET.get('email')
        pk=req.new_param.get('id')
        user=CustomUser.objects.get(pk=pk)
        print(user)
        ret={
            'name': user.name,
            'email': user.email,
            # 'role': 'admin' if user.is_superuser else 'staff' if user.is_staff else 'student'
        }
        if hasattr(user,'student'):
            ret['role']='student'
            ret['phone']=user.student.student_phone
            if hasattr(user.student, 'student_room'):
                ret['room']=user.student.student_room.room_no
                ret['hostel']=user.student.student_room.hostel.hostel_name
        else:
            ret['role']='outside student'
            application=list(user.application_set.all())
            if len(application)!=0:
                application=application[0]
                ret['phone']=application.phone
                if hasattr(application, 'application_final'):
                    application=application.application_final
                    if hasattr(application, 'hostel') and application.hostel is not None:
                        ret['hostel']=application.hostel.hostel_name
                    if hasattr(application, 'room') and application.room is not None:
                        print(1)
                        ret['room']=application.room.room_no
        return JsonResponse({'message': 'User profile', 'data': ret})
