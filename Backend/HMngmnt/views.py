# Create your views here.
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.db import IntegrityError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.cache import never_cache

from .email import send, templates
from .models import Application, Batch, Caretaker, Faculty, CustomUser, Hostel, Student, Room, Application_Final, Warden, Wing, SavedMappings
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
import jwt, datetime
from .decorators import token_required, admin_required, validate_token, staff_required
from .helpers import get_user_dict, handle_file_attachment, parse_xl, extract_roll_number_info
import os
import random

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

@csrf_exempt
def index(request):
    # add_fac('Dr. Puneet Goyal')
    print(request.COOKIES.get('secret'))
    payload=jwt.decode(request.COOKIES.get('secret'), 'secret', algorithms="HS256")
    print(payload)
    return HttpResponse("Hello, world. You're at the HMngmnt index.")

@csrf_exempt
@token_required
def internship(request):
    facultyE= request.POST.get('facultyEmail')
    student= request.POST.get('studentEmail')
    gender= request.POST.get('gender')
    correction= request.POST.get('correction')
    if correction is not None:
        application=Application.objects.get(application_id=correction)
        print(request.POST)
        for key, val in request.POST.items():
            print(key, val)
            if key=='correction' or key=='studentName' or key=='studentEmail':
                continue
            if val:
                if key=='gender':
                    application.student.gender=val
                    application.student.save()
                elif key=='affiliation':
                    application.affiliation=val
                elif key=='address':
                    application.address=val
                elif key=='contactNumber':
                    application.phone=val
                elif key=='facultyEmail':
                    application.faculty=Faculty.objects.get(faculty__email=val)
                elif key=='arrivalDate':
                    application.arrival=val
                elif key=='departureDate':
                    application.departure=val

        if request.FILES.get('instituteID'):
            application.instiId=request.FILES.get('instituteID')
        if request.FILES.get('instituteLetter'):
            application.letter=request.FILES.get('instituteLetter')
        application.comments='None'
        if "Faculty" in application.status:
            application.status='Pending Faculty Approval'
        elif "HOD" in application.status:
            application.status='Pending HOD Approval'
        elif "Admin" in application.status:
            application.status='Pending Admin Approval'
        application.save()

        # print(application, 'hahaha', request.POST)
        return HttpResponse("Application corrected successfully", status=200)
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
def update_payment(request):
    if request.method=='POST':
        # data=json.loads(request.body)
        application=Application.objects.get(application_id=request.POST.get('application_id'))
        application.payment_proof=request.FILES.get('payment_proof')
        application.payment_id=request.POST.get('payment_id')
        application.status='Payment Proof Uploaded'
        application.save()
        return JsonResponse({'message': 'Payment verified successfully'})
    return JsonResponse({'error': 'Invalid request'}, status=400)

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
    if "Rejected" in application.status:
        applicationX['comments']=application.comments
    # print('here: ', application.letter.path, application.instiId.path)
    return JsonResponse({'message': 'Student page', 'data': applicationX})

@csrf_exempt
@token_required
def get_application(request, id):
    application=Application.objects.select_related('faculty', 'student').get(application_id=id)
    applicationX={
        'student_name': application.student.name,
        'application_id': application.application_id,
        'affiliation': application.affiliation,
        'faculty': application.faculty.faculty.name,
        'status': application.status,
        'address': application.address,
        'arrival_date': application.arrival,
        'departure_date': application.departure,
        'institute_id': handle_file_attachment(application.instiId.path),
        'institute_letter': handle_file_attachment(application.letter.path),
        'student_email': application.student.email,
        'payment_proof': handle_file_attachment(application.payment_proof.path) if application.payment_proof else None,
        'payment_id': application.payment_id if application.payment_id else None
    }
    # print('here:', application.instiId.path, application.letter.path)
    return JsonResponse({'message': 'Student page', 'data': applicationX})

# ----------------ADMIN ONLY FUNCTIONS----------------

@csrf_exempt
@admin_required
def add_users(request):
    xlFile= request.FILES.get('file')
    type=request.POST.get('type')
    if xlFile:
    # name=request.POST.get('name')
        with open('temp.xlsx', 'wb+') as destination:
            for chunk in xlFile.chunks():
                destination.write(chunk)
        users=parse_xl('temp.xlsx', type)
        # print("here:", users)
        if type=='faculty':
            for userX in users:
                # print(user)
                try:
                    user=CustomUser(name=userX[0], email=userX[1], gender=userX[4])
                    user.set_password('devanshu')
                    user.is_staff=True
                    user.is_active=True
                    user.save()
                    faculty=Faculty(faculty=user, department=userX[2], is_hod=userX[3], faculty_phone=userX[5])
                    faculty.save()
                except IntegrityError as e:
                    pass
        elif type=='student':
            for userX in users:
                user=CustomUser(name=userX[0], email=userX[1], gender=userX[3])
                user.set_password('devanshu')
                user.is_active=True
                try:
                    user.save()
                except:
                    pass
                batch, roll=extract_roll_number_info(userX[1])
            
                batch, is_created=Batch.objects.get_or_create(batch=batch)
                try:
                    room=Room.objects.get(room_no=userX[6])
                except:
                    room=None
                student=Student(student=user, department=userX[2], student_phone=userX[4], student_roll=roll, student_year=userX[5], student_room=room, student_batch=batch)
                student.save()
        # delete file temp.xlsx
        os.remove('temp.xlsx')

        return JsonResponse({'message': 'Success'})
    else:
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phoneNumber')
        gender=request.POST.get('gender')
        department=request.POST.get('department')
        # roll=request.POST.get('roll') or None
        year=request.POST.get('year') or None
        # print(name, email, phone, gender, department)
        is_hod=request.POST.get('is_hod') 
        if type=='faculty':
            user=CustomUser(name=name, email=email, gender=gender)
            user.set_password('devanshu')
            user.is_staff=True
            user.is_active=True
            user.save()
            faculty=Faculty(faculty=user, department=department, is_hod=False, faculty_phone=phone)
            faculty.save()
        elif type=='student':
            user=CustomUser(name=name, email=email, gender=gender)
            user.set_password('devanshu')
            user.is_active=True
            # print(department, phone, year)
            batch, roll=extract_roll_number_info(email)
            print(batch, roll)
            # save only if dont exist

            batch, is_created=Batch.objects.get_or_create(batch=batch)
            print(batch)
            student=Student(student=user, department=department, student_phone=phone, student_roll=roll, student_year=year, student_batch=batch)
            user.save()
            student.save()
        return JsonResponse({'message': 'Success'})


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
            'status': application.status,
            'gender': application.student.gender,
            'hostel': application.application_final.hostel.hostel_name if application.status=='Pending Caretaker Action' else None
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
    # print('user:', user)
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
def view_final_applications(request):
    user=request.new_param
    user=CustomUser.objects.get(pk=user.get('id'))
    hostel=user.caretaker.hostel
    print('hostel:', hostel)
    applications=Application_Final.objects.select_related('application', 'application__student', 'application__faculty').filter(hostel=hostel)
    application_list = [
        {
            'application_id': application.application.application_id,
            'student': application.application.student.name,
            'affiliation': application.application.affiliation,
            'faculty': application.application.faculty.faculty.name,
            'status': application.application.status
        }
        for application in applications
    ]
    print('application_list:', application_list)
    # return JsonResponse({'message': 'Staff page', 'data': {'own': []}})
    return JsonResponse({'message': 'Staff page', 'data': {'own':application_list}})    


@csrf_exempt
@staff_required
def update_application(request):
    try:
        # print(request.body.decode('utf-8'))
        data=json.loads(request.body.decode('utf-8'))
        data=data['updatedSelectedOptions']
        # print('here',data)
        # print(request.path)
        for application_id, status in data.items():
            # print('application_id:', application_id)
            # print('status:', status['hostel'])
            application=Application.objects.get(application_id=int(application_id))
            # print('application:', application)
            application.status=status['value']
            if 'Rejected' in status['value']:
                application.comments=status['comments']
            elif status['value']=='Pending Caretaker Action':
                # Application_Final(application=application, hostel=Hostel.objects.get(hostel_name=status['hostel'])).save()
                hostel=Hostel.objects.get(hostel_name=str(status['hostel']))
                print('here')
                print('hostel:', hostel)
                new_app=Application_Final(application=application, hostel=hostel)
                new_app.save()
            application.save()
        return JsonResponse({'message': 'Applications updated successfully.'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@staff_required
def send_email(request):
    recipient=request.GET.get('recipient')
    template=int(request.GET.get('template'))
    if(template==0):
        id=int(request.GET.get('id')) or None
        application=Application.objects.get(application_id=id)
        application.status='Pending Payment'
        application.save()
    template=templates[int(template)]
    send(template, [recipient])
    return JsonResponse({'message': 'Email sent successfully.'})

@csrf_exempt
# @staff_required
def generate_pdf(request):
    application_id = request.GET.get('application_id')
    application = Application.objects.get(application_id=application_id)

    # Create a list to hold the data for the PDF
    data = []

    # Add the text fields to the data list
    data.append(['Student Name:', application.student.name])
    data.append(['Affiliation:', application.affiliation])
    data.append(['Faculty:', application.faculty.faculty.name])
    # data.append(['Status:', application.status])
    data.append(['Address:', application.address])
    data.append(['Arrival Date:', application.arrival])
    data.append(['Departure Date:', application.departure])

    # Create a PDF document
    doc = SimpleDocTemplate("./documents/datagen.pdf", pagesize=letter)

    # Create a list to hold the flowables (elements) of the document
    elements = []

    # Create a style for the text fields
    styles = getSampleStyleSheet()
    style = styles["Normal"]

    # Add the text fields to the document
    for field in data:
        text = f"{field[0]} {field[1]}"
        p = Paragraph(text, style)
        elements.append(p)
        elements.append(Spacer(1, 12))

    # Build the document and save it
    doc.build(elements)

    # Send the PDF file as a response to the frontend
    with open("./documents/datagen.pdf", "rb") as f:
        response = HttpResponse(f.read(), content_type="application/pdf")
        response["Content-Disposition"] = "inline; filename=output.pdf"
    
    # delete the file
    os.remove("./documents/datagen.pdf")
    return response
    
@csrf_exempt
@staff_required
def room(request, id):
    print('id:', id)
    room=Room.objects.get(room_no=id)
    students=room.student_set.all()
    if len(students):
        students_list=[{
            'name': student.student.name,
            'email': student.student.email,
        } for student in students]
        print('students_list:', students_list)
        return JsonResponse({'message': 'Staff page', 'data': students_list})
    students=room.application_final_set.all()
    print('students:', students)
    if len(students):
        students_list=[{
            'name': student.application.student.name,
            'email': student.application.student.email,
            'phone': student.application.phone
        } for student in students]
        print('students_list:', students_list)
        return JsonResponse({'message': 'Staff page', 'data': students_list})
    return JsonResponse({'message': 'Staff page', 'data': []})

@csrf_exempt
@staff_required
def allot_room(request):
    application_id = request.GET.get('application_id')
    room_no = request.GET.get('room_id')
    application = Application.objects.get(application_id=application_id)
    application.status='Room Allotted'
    room = Room.objects.get(room_no=room_no)
    application_final=application.application_final
    application_final.room=room
    application.save()
    application_final.save()
    return JsonResponse({'message': 'Room allotted successfully.'})
# ----------------WARDEN FUNCTIONS----------------
@csrf_exempt
# @staff_required
def get_hostels(request):
    hostels=Hostel.objects.select_related('caretaker__caretaker').all()
    hostels_list=[{
        'hostel_no': hostel.hostel_no,
        'hostel_name': hostel.hostel_name,
        'hostel_type': hostel.hostel_type,
        'num_floors': hostel.num_floors,
        'capacity': hostel.capacity,
        'caretaker': hostel.caretaker.caretaker.email
    } for hostel in hostels]
    return JsonResponse({'message': 'Warden page', 'data': hostels_list})

@csrf_exempt
@staff_required
def get_hostel_rooms(request, hostel_no):
    # hostel=request.GET.get(hostel_no=hostel_no)
    rooms=Room.objects.filter(hostel__main__hostel_no=hostel_no).order_by('room_no')
    # floor=request.GET.get('floor')
    # rooms=Room.objects.filter(hostel__hostel_name=hostel, floor=int(floor))
    rooms_list=[{
        'room_no': room.room_no,
        'room_occupancy': room.room_occupancy,
        'room_current_occupancy': room.current_occupancy,
        'floor': room.floor,
        'students': [{'name': st.student.name, 'email': st.student.email} for st in room.student_set.all()] if hasattr(room, 'student_set') else []

    } for room in rooms]
    return JsonResponse({'message': 'Warden page', 'data': rooms_list})
    # return JsonResponse({'message': 'Warden page', 'data': []})

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


@csrf_exempt
def add_data(req):
    # mp={
    #     0: 'Chenab',
    #     1: 'Beas',
    #     2: 'Satluj',
    #     3: 'Brahmaputra',
    #     4: 'Raavi',
    #     5: 'T6',
    # }
    # for i in range(0, 6):
    #     if True:
    #         hostel=Hostel.objects.get(hostel_no=i)
    #         user=CustomUser(name=f'Warden {mp[i]}', email='warden1.'+mp[i].lower()+'@iitrpr.ac.in', is_staff=True)
    #         user.set_password('devanshu')
    #         warden=Warden(warden=user, hostel=hostel)
    #         user.save()
    #         warden.save()
    #     else:
    #         hostel=Hostel.objects.get(hostel_no=i)
    #         user=CustomUser(name=f'Warden {mp[i]}', email='warden1.'+mp[i].lower()+'.boys'+'@iitrpr.ac.in', is_staff=True)
    #         user.set_password('devanshu')
    #         caretaker=Caretaker(caretaker=user, hostel=hostel)
    #         user.save()
    #         caretaker.save()
    #         user=CustomUser(name=f'Warden {mp[i]}', email='warden1.'+mp[i].lower()+'.girls'+'.@iitrpr.ac.in', is_staff=True)
    #         user.set_password('devanshu')
    #         caretaker=Caretaker(caretaker=user, hostel=hostel)
    #         user.save()

    for b in ['2019B', '2020B', '2021B', '2022B', '2023B', '2021M', '2022M', '2023M', '2020Z', '2021Z', '2022Z', '2023Z']:
    #     batch, bool=Batch.objects.get_or_create(batch=b)
    #     # batch.save()     
    #     for _ in range(0,20):
    #         roll=random.randint(1001, 1999)
    #         dep=random.choice(['CSE', 'EE', 'ME', 'CE', 'HSS', 'MNC'])
    #         roll=b[:4]+dep[:2]+b[4:]+str(roll)
    #         user=CustomUser(name=f'Student {_}', email=f'{roll}@iitrpr.ac.in', gender=random.choice(['Male', 'Male', 'Female']))
    #         user.set_password('devanshu')
    #         # print(roll, end="  ")
    #         student=Student(student=user, department=dep, student_phone=f'{random.randint(7000000000, 9999999999)}',
    #                         student_roll=roll, student_year=int(b[:4]), student_batch=batch)
    #         user.save()
    #         student.save()
        students=Student.objects.filter(student_batch__batch=b)
        for student in students:
            if student.student.gender=='Male':
                continue
                hostel=Hostel.objects.get(hostel_no=random.choice([0, 1, 2, 3,5]))
                wing=random.choice(Wing.objects.filter(hostel=hostel, wing_type='Boys'))
                # occ=random.randint(1, 3)
                init=wing.wing_name.split(' ')
                init=init[0][0]+init[1][0]
                room_no=init+'-'+str(random.randint(101, (wing.num_floors+1)*100 - 1))
                room, _=Room.objects.get_or_create(room_no=room_no,
                                      floor=int(room_no.split('-')[1][0]),
                                      hostel=hostel,
                                      hostel_wing=wing,
                                      room_occupancy=2)
                student.student_room=room
                student.save()
            else:
                hostel=Hostel.objects.get(hostel_no=random.choice([4,3]))
                wing=random.choice(Wing.objects.filter(hostel=hostel, wing_type='Girls'))
                init=wing.wing_name.split(' ')
                init=init[0][0]+init[1][0]
                room_no=init+'-'+str(random.randint(101, (wing.num_floors+1)*100 - 1))
                room, _=Room.objects.get_or_create(room_no=room_no,
                                        floor=int(room_no.split('-')[1][0]),
                                        hostel=hostel,
                                        hostel_wing=wing,
                                        room_occupancy=2)
                student.student_room=room
                student.save()
            # room=Room.objects.create(room_no=f')
    # for student in Student.objects.all():
    #     student.student_room=None
    #     student.save()
    # for i in range(1, 100):
    #     user=CustomUser(name=f'Faculty{i}', 
    #                     email=f'faculty{i}@iitrpr.ac.in',
    #                     is_staff=True,
    #                     gender=random.choice(['M', 'F'])
    #                     )
    #     user.set_password('devanshu')
    #     faculty=Faculty(faculty=user, department=random.choice(['CSE', 'EE', 'ME', 'CE', 'HSS', 'MNC']), 
    #                     faculty_phone=f'{random.randint(7000000000, 9999999999)}', 
    #     )
    #     user.save()
    #     faculty.save()
    return JsonResponse({'message': 'Success'})

# @csrf_exempt
# def sandbox(request):
#     # Get all the hostels
#     wings = Wing.objects.all()

#     # Get all the batches
#     batches = Batch.objects.all()

#     girls_matrix = {}
#     boys_matrix = {}

#     # Iterate over each batch
#     for batch in batches:
#         # Create empty dictionaries for the current batch for girls and boys
#         girls_batch_dict = {}
#         boys_batch_dict = {}
        
#         # Iterate over each hostel
#         for wing in wings:
#             if wing.wing_type=='Boys':
#                 num_girls = Student.objects.filter(student_batch=batch, student_room__hostel=hostel, student__gender='Male').count()
#                 girls_batch_dict[wing.wing_name] = num_girls
#             else:
#                 num_boys = Student.objects.filter(student_batch=batch, student_room__hostel=hostel, student__gender='Female').count()
#                 boys_batch_dict[hostel.hostel_name] = num_boys
        
#         # Add the dictionaries for the current batch to the main matrices
#         girls_matrix[batch.batch] = girls_batch_dict
#         boys_matrix[batch.batch] = boys_batch_dict

#     # Return both matrices
#     # return girls_matrix, boys_matrix
#     print('boys:\n', boys_matrix)
#     print('girls:\n', girls_matrix)
#     volumes={}
#     for hostel in hostels:
#         volumes[hostel.hostel_name]=hostel.capacity
#     for batch in batches:
#         volumes[batch.batch]=batch.number_of_boys
#     return JsonResponse({'message': 'Success', 'boys': boys_matrix, 'volumes':volumes})
#     # return JsonResponse({"Success"})
@csrf_exempt
def sandbox(request):
    batches = Batch.objects.all()
    hostels = Hostel.objects.all()
    gender=request.GET.get('gender')
    if SavedMappings.objects.filter(name=f'current {gender}').exists():
        data=SavedMappings.objects.get(name=f'current {gender}')
        matrix=data.mapping
        wing_room_capacities=data.wing_room_capacities
    else:
        matrix = []
        # Header row for the matrix
        header_row = ['Batch']
        for hostel in hostels:
            wings=hostel.wing_set.filter(wing_type=gender)
            header_row.extend([f'{wing.wing_name}' for wing in wings])
        # header_row.extend(['Total Strength Allocated'])
        matrix.append(header_row)

        # Populate matrix with data
        for batch in batches:
            batch_row = [batch.batch]
            # cnt=0
            for hostel in hostels:
                # wings = Wing.objects.filter(hostel=hostel)
                wings=hostel.wing_set.filter(wing_type=gender)
                wing_data = []
                for wing in wings:
                    students_count = Student.objects.filter(student_batch=batch, student_room__hostel=hostel, student_room__hostel_wing=wing).count()
                    # cnt+=students_count
                    wing_data.append(students_count)
                batch_row.extend(wing_data)
            # batch_row.extend([cnt])
            matrix.append(batch_row)
        wing_room_capacities={}
        for wing in Wing.objects.filter(wing_type=gender):
            temp=wing.room_set.all().values_list('room_occupancy', flat=True)
            wing_room_capacities[wing.wing_name]=temp[0] if len(temp) else 0
        current, _=SavedMappings.objects.get_or_create(name=f'current {gender}')
    batch_strengths = {}
    for batch in batches:
        batch_strengths[batch.batch] = batch.number_of_boys if gender=='Boys' else batch.number_of_girls
    wing_capacities= {}
    for wing in Wing.objects.filter(wing_type=gender):
        wing_capacities[wing.wing_name]=wing.capacity
    if _:
        current.mapping=matrix
        current.wing_room_capacities=wing_room_capacities
        current.save()
    return JsonResponse({'data':matrix, 'message': 'Success',
                         'batch_strengths': batch_strengths, 'wing_capacities': wing_capacities, 'wing_room_capacities': wing_room_capacities})


@csrf_exempt
def receive_from_sandbox(request):
    data = json.loads(request.body)
    save_name=data['name']
    if SavedMappings.objects.filter(name=save_name).exists():
        return JsonResponse({"message":"Choose a different name"})
    
    data=data['data']
    print(data)
    print()
    print()
    converted_data = {
        'data':[],
        'wing_room_capacities': data['room_capacities'],
    }
    batches=data['data'].keys()
    converted_data['data'].append(['Batch']+list(data['room_capacities'].keys()))
    for batch in batches:
        # converted_data['data'].append([batch]+wing_data)
        row=[batch]
        for wing in data['room_capacities'].keys():
            row.append(data['data'][batch].get(wing, 0))
        converted_data['data'].append(row)
    print(converted_data)
    SavedMappings.objects.create(name=save_name,mapping=converted_data['data'], wing_room_capacities=converted_data['wing_room_capacities'])
    return JsonResponse({"message":"Success"})

@csrf_exempt
def apply_saved_mapping(request):
    name=request.GET.get('name')
    if not SavedMappings.objects.filter(name=name).exists():
        return JsonResponse({'message': 'Invalid name'})
    data=SavedMappings.objects.get(name=name).data


    return JsonResponse({'message': 'Success', 'data': data})
