from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from django.db.models.signals import post_save

from ..models import CustomUser
from ..helpers import get_user_dict
from ..models import Room, Application, Hostel, Student, SavedMappings, Wing, Batch, Circular
from ..decorators import staff_required

import json
import random

@csrf_exempt
@staff_required
def room(request, id):
    print('id:', id)
    room=Room.objects.get(room_no=id)
    if room.is_for_guests:
        people=room.application_final_set.all()
        people_list=[{
            'name': person.application.student.name,
            'email': person.application.student.email,
            'phone': person.application.phone,
            'status': person.application.status,
            'arrival': person.application.arrival,
            'departure': person.application.departure,
        } for person in people]
        return JsonResponse({'message': 'Staff page', 'data': people_list, 'guest': True, 'current_occupancy': room.current_occupancy, 'room_occupancy': room.room_occupancy})
    students=room.student_set.all()
    students_list=[{
        'name': student.student.name,
        'email': student.student.email,
    } for student in students]
    print('students_list:', students_list)
    return JsonResponse({'message': 'Staff page', 'data': students_list, 'guest': False})
    # students=room.application_final_set.all()
    # print('students:', students)
    # if len(students):
    #     students_list=[{
    #         'name': student.application.student.name,
    #         'email': student.application.student.email,
    #         'phone': student.application.phone
    #     } for student in students]
    #     print('students_list:', students_list)
    #     return JsonResponse({'message': 'Staff page', 'data': students_list})
    # return JsonResponse({'message': 'Staff page', 'data': []})

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

def get_hostel_rooms(request, hostel_no):
    rooms=Room.objects.filter(hostel__hostel_no=hostel_no).order_by('room_no')
    rooms_list=[{
        'room_no': room.room_no,
        'room_occupancy': room.room_occupancy,
        'room_current_occupancy': room.current_occupancy,
        'floor': room.floor,
        'is_for_guests': room.is_for_guests,
        'students': [{'name': st.student.name, 'email': st.student.email} for st in room.student_set.all()] if hasattr(room, 'student_set') else [],
        'guests': [{'name': st.application.student.name, 'email': st.application.student.email} for st in room.application_final_set.all()] if hasattr(room, 'application_final_set') else []

    } for room in rooms]
    # return JsonResponse({'message': 'Warden page', 'data': rooms_list})
    return rooms_list


@csrf_exempt
@staff_required
def get_hostel(req, id):
    hostel=Hostel.objects.get(hostel_no=id)
    hostel_serialized=json.loads(serialize('json', [hostel]))[0]
    user=req.new_param
    user=CustomUser.objects.get(pk=user.get('id'))
    user_dict=get_user_dict(user)
    if  'admin' in user_dict['roles'] or 'chief warden' in user_dict['roles'] or user_dict['hostel_name']==hostel.hostel_name:
        jsonR= get_hostel_rooms(req, hostel.hostel_no)
        return JsonResponse({'message': 'Staff page', 'data': jsonR, 'hostel': hostel_serialized['fields']})
    return JsonResponse({'error': 'You are not authorized to view this page'}, status=403)

    
# ----------------WARDEN FUNCTIONS----------------
@csrf_exempt
# @staff_required
def get_hostels(request):
    hostels=Hostel.objects.select_related('caretaker__caretaker').all()
    hostels_list=[{
        'hostel_no': hostel.hostel_no,
        'hostel_name': hostel.hostel_name,
        'hostel_type': hostel.hostel_type,
        'capacity': hostel.capacity,
        'caretaker': hostel.caretaker.caretaker.email
    } for hostel in hostels]
    sorted_hostels_list=sorted(hostels_list, key=lambda x: x['hostel_no'])
    return JsonResponse({'message': 'Warden page', 'data': sorted_hostels_list})


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

@csrf_exempt
def sandbox(request):
    batches = Batch.objects.all()
    hostels = Hostel.objects.all()
    gender=request.GET.get('gender')
    if SavedMappings.objects.filter(name=f'Current {gender}').exists():
        data=SavedMappings.objects.get(name=f'Current {gender}')
        matrix=data.mapping
        wing_room_capacities=data.wing_room_capacities
        batch_strengths=data.batch_strengths
        _=False
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
            temp=wing.room_set.filter(is_for_guests=False).values_list('room_occupancy', flat=True)
            wing_room_capacities[wing.wing_name]=temp[0] if len(temp) else 0
        current, _=SavedMappings.objects.get_or_create(name=f'Current {gender}')
    wing_capacities= {}
    for wing in Wing.objects.filter(wing_type=gender):
        wing_capacities[wing.wing_name]=wing.capacity
    if _:
        batch_strengths = {}
        for batch in batches:
            batch_strengths[batch.batch] = batch.number_of_boys if gender=='Boys' else batch.number_of_girls
        current.mapping=matrix
        current.wing_room_capacities=wing_room_capacities
        current.batch_strengths=batch_strengths
        current.save()
    return JsonResponse({'data':matrix, 'message': 'Success',
                         'batch_strengths': batch_strengths, 'wing_capacities': wing_capacities, 'wing_room_capacities': wing_room_capacities})


@csrf_exempt
def receive_from_sandbox(request):
    data = json.loads(request.body).get('payload')
    print(data)
    save_name=data['name']
    gender=data['gender']
    batch_strengths=data['batch_strengths']
    if gender not in save_name:
        save_name+=gender
    resave=bool(data.get('resave', False))
    print(resave)
    if not resave:
        if SavedMappings.objects.filter(name=save_name).exists():
            return JsonResponse({"message":"Choose a different name"}, status=303)
    
    data1=data['data']
    print(data1)
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
    if resave:
        SavedMappings.objects.filter(name=save_name).update(
            mapping=converted_data['data'], wing_room_capacities=converted_data['wing_room_capacities'],
            batch_strengths=batch_strengths)
    else:
        SavedMappings.objects.create(name=save_name,mapping=converted_data['data'], wing_room_capacities=converted_data['wing_room_capacities'],
                                     batch_strengths=batch_strengths)
    return JsonResponse({"message":"Success"})

def create_zero_matrix(gender):
    batches = Batch.objects.all()
    hostels = Hostel.objects.filter()
    matrix = []
    # Header row for the matrix
    header_row = ['Batch']
    for hostel in hostels:
        wings=hostel.wing_set.filter(wing_type=gender)
        header_row.extend([f'{wing.wing_name}' for wing in wings])
    matrix.append(header_row)
    for batch in batches:
        batch_row = [batch.batch]
        for hostel in hostels:
            wings=hostel.wing_set.filter(wing_type=gender)
            wing_data = []
            for wing in wings:
                wing_data.append(0)
            batch_row.extend(wing_data)
        matrix.append(batch_row)
    return matrix

@csrf_exempt
def get_saved_mappings(request):
    saved_mappings=SavedMappings.objects.all()
    saved_mappings_list=[json.loads(serialize('json', [mapping]))[0] for mapping in saved_mappings]
    print(saved_mappings_list)
    return JsonResponse({'message': 'Success', 'data': saved_mappings_list})

@csrf_exempt
def get_saved_mapping(request):
    name=request.GET.get('name')
    if name!='new':
        gender='Boys' if 'Boys' in name else 'Girls'
        if not SavedMappings.objects.filter(name=name).exists():
            return JsonResponse({'message': 'Invalid name'})
        mapping=SavedMappings.objects.get(name=name)
        wing_room_capacities=mapping.wing_room_capacities
        batch_strengths=mapping.batch_strengths
        data=mapping.mapping
    else:
        return create_saved_mapping(request)
        # gender=request.GET.get('gender')
        # if not gender:
        #     return JsonResponse({'message': 'Invalid Request'})
        # wing_room_capacities={}
        # print(gender)
        # for wing in Wing.objects.filter(wing_type=gender):
        #     temp=wing.room_set.filter(is_for_guests=False).values_list('room_occupancy', flat=True)
        #     wing_room_capacities[wing.wing_name]=temp[0] if len(temp) else 0
        # mapping=SavedMappings.objects.create(name=f'Current {gender}',mapping=create_zero_matrix(gender), wing_room_capacities=wing_room_capacities)
        # data=mapping.mapping


    wing_capacities= {}
    for wing in Wing.objects.filter(wing_type=gender):
        wing_capacities[wing.wing_name]=wing.capacity
    return JsonResponse({'message': 'Success', 'data': data, 'wing_room_capacities': wing_room_capacities, 'batch_strengths': batch_strengths, 'wing_capacities': wing_capacities})

@csrf_exempt
def create_saved_mapping(request):
    name=request.GET.get('name')
    gender=request.GET.get('gender')
    if SavedMappings.objects.filter(name=name).exists():
        return JsonResponse({'message': 'Name Already Exists'})
    if not SavedMappings.objects.filter(name=f'Current {gender}').exists():
        if Batch.objects.all().count()>0 and Wing.objects.all().count()>0:
            def any_room_has_student():
                for room in Room.objects.filter(is_for_guests=False):
                    if room.student_set.all().count():
                        return True
                return False
            if any_room_has_student():
                return sandbox(request)
            else:
                wing_room_capacities={}
                for wing in Wing.objects.filter(wing_type=gender):
                    temp=wing.room_set.filter(is_for_guests=False).values_list('room_occupancy', flat=True)
                    wing_room_capacities[wing.wing_name]=temp[0] if len(temp) else 0
                wing_capacities= {}
                for wing in Wing.objects.filter(wing_type=gender):
                    wing_capacities[wing.wing_name]=wing.capacity
                batch_strengths = {}
                for batch in Batch.objects.all():
                    batch_strengths[batch.batch] = batch.number_of_boys if gender=='Boys' else batch.number_of_girls
                mapping=SavedMappings.objects.create(name=f'Current {gender}',mapping=create_zero_matrix(gender), wing_room_capacities=wing_room_capacities, batch_strengths=batch_strengths)
                return JsonResponse({'message': 'Success', 'data': mapping.mapping, 'wing_room_capacities': mapping.wing_room_capacities, 'wing_capacities': wing_capacities, 'batch_strengths': batch_strengths})
        else:
            return JsonResponse({'message': 'No data to create mapping'})

    if gender not in name:
        name+=gender
    wing_room_capacities={}
    # print(gender)
    for wing in Wing.objects.filter(wing_type=gender):
        temp=wing.room_set.filter(is_for_guests=False).values_list('room_occupancy', flat=True)
        wing_room_capacities[wing.wing_name]=temp[0] if len(temp) else 0
    wing_capacities= {}
    for wing in Wing.objects.filter(wing_type=gender):
        wing_capacities[wing.wing_name]=wing.capacity
    batch_strengths = {}
    for batch in Batch.objects.all():
        batch_strengths[batch.batch] = batch.number_of_boys if gender=='Boys' else batch.number_of_girls
    mapping=SavedMappings.objects.create(name=name,mapping=create_zero_matrix(gender), wing_room_capacities=wing_room_capacities, batch_strengths=batch_strengths)
    return JsonResponse({'message': 'Success', 'data': mapping.mapping, 'wing_room_capacities': mapping.wing_room_capacities, 'wing_capacities': wing_capacities, 'batch_strengths': batch_strengths})
@csrf_exempt
def check_mapping_validity(request):
    name=request.GET.get('name')
    if not SavedMappings.objects.filter(name=name).exists():
        return JsonResponse({'message': 'Invalid name'})
    gender=name.split(' ')[1]
    data=SavedMappings.objects.get(name=name).mapping
    absent_batches=[]
    incomplete_batches=[]
    for row in data[1:]:
        batch_name=row[0]
        total_students=sum(row[1:])
        try:
            batch=Batch.objects.get(batch=batch_name)
        except Batch.DoesNotExist:
            absent_batches.append(batch_name)
        if gender=='Boys':
            if total_students!=batch.number_of_boys:
                incomplete_batches.append(batch_name)
        else:
            if total_students!=batch.number_of_girls:
                incomplete_batches.append(batch_name)
    if not absent_batches and not incomplete_batches:
        return JsonResponse({'message': 'Success'}, status=200)
    return JsonResponse({'message': 'Changes Required', 'absent_batches': absent_batches, 'incomplete_batches': incomplete_batches}, status=303)

@csrf_exempt
def apply_saved_mapping(request):
    name=request.GET.get('name')
    if not SavedMappings.objects.filter(name=name).exists():
        return JsonResponse({'message': 'Invalid name'})
    data=SavedMappings.objects.get(name=name).mapping
    hostels=data[0][1:]
    # ----------update room capacities
    wing_room_capacities=SavedMappings.objects.get(name=name).wing_room_capacities
    for wing in wing_room_capacities:
        x=Wing.objects.get(wing_name=wing)
        rooms=x.room_set.filter(is_for_guests=False)
        rooms.update(room_occupancy=wing_room_capacities[wing])
        for room in rooms:
            post_save.send(sender=Room, instance=room)
    # ----------remove those batches whose allotment is same
    temp=name.split(' ')[1]
    print(temp)
    current, _=SavedMappings.objects.get_or_create(name=f'Current {temp}')
    if _:
        current.mapping=create_zero_matrix(temp)
        current.save()
    existing_dict={b[0]:b[1:] for b in current.mapping}
    new_dict={b[0]:b[1:] for b in data}
    filtered_batches=[batch for batch in existing_dict if existing_dict[batch]!=new_dict[batch]]
    filtered_data=[]
    filtered_data.append(data[0])
    for b, v in existing_dict.items():
        v1=new_dict[b]
        if v1 and v1!=v:
            filtered_data.append([b]+v1)
    # ----------create copy of current for future reference
    SavedMappings.objects.create(name=f'X-Current {temp}',mapping=current.mapping, wing_room_capacities=current.wing_room_capacities)
    # ----------clear all rooms for re-allotment
    students=Student.objects.filter(student_room__hostel_wing__wing_name__in=hostels, student_batch__batch__in=filtered_batches)
    for student in students:
        student.student_room=None
        student.save()
    # ----------update student rooms
    for i in range(1, len(filtered_data)):
        batch=filtered_data[i][0]
        array_distribution=filtered_data[i][1:]
        gender='Male' if temp=='Boys' else 'Female'
        students=Student.objects.filter(student_batch__batch=batch, student__gender=gender)
        students=list(students)
        random.shuffle(students)
        grps=[[] for _ in range(0, len(array_distribution))]
        total_students = len(students)
        remaining_students = total_students
        for j, count in enumerate(array_distribution):
            grp_size=min(int(count), remaining_students)
            grps[j]=students[:grp_size]
            students=students[grp_size:]
            remaining_students-=grp_size
        print(grps)
        for j, grp in enumerate(grps):
            wing=Wing.objects.get(wing_name=filtered_data[0][j+1])
            rooms=list(wing.room_set.filter(is_for_guests=False).order_by('floor'))
            while len(grp):
                for room in rooms:
                    if room.current_occupancy==0 or (room.current_occupancy<room.room_occupancy and room.student_set.all()[0].student_batch==batch):
                        while room.current_occupancy<room.room_occupancy and len(grp):
                            student=grp.pop()
                            student.student_room=room
                            student.save()
                            room.save()
    # set current mapping to new mapping
    current.mapping=filtered_data
    current.save()
    return JsonResponse({'message': 'Success'})

            
    '''
     matrix = [
        ["Batch", "Chenab East", "Chenab West", "Beas West", "Beast East", "Satluj East", "Satluj West", "Brahmaputra Boys", "T6 Boys"],
        ["2019B", 2, 1, 2, 0, 2, 1, 2, 1],
        ["2020B", 1, 0, 2, 2, 1, 2, 1, 6],
        ["2021B", 2, 1, 2, 3, 1, 0, 1, 2],
        ["2022B", 0, 1, 0, 0, 1, 3, 4, 3],
        ["2023B", 1, 2, 1, 0, 2, 0, 4, 3],
        ["2021M", 0, 0, 4, 4, 1, 2, 2, 3],
        ["2022M", 0, 0, 0, 2, 0, 1, 2, 6],
        ["2023M", 0, 2, 2, 0, 2, 3, 3, 3],
        ["2020Z", 0, 2, 1, 1, 2, 0, 4, 2],
        ["2021Z", 1, 0, 3, 1, 2, 3, 1, 6],
        ["2022Z", 2, 1, 3, 1, 2, 1, 2, 0],
        ["2023Z", 1, 0, 1, 0, 2, 0, 1, 5]
    ]
    '''    

@csrf_exempt
def delete_saved_mapping(req, name):
    if SavedMappings.objects.filter(name=name).exists():
        SavedMappings.objects.get(name=name).delete()
        return JsonResponse({'message': 'Success'})
    return JsonResponse({'message': 'Invalid name'})

@csrf_exempt
# @staff_required
def circulars(request):
    print("here")
    if request.method == 'GET':
        circulars = Circular.objects.all().values('id','text', 'url')  
        circulars_list = list(circulars) 
        return JsonResponse(circulars_list, safe=False)  
    elif request.method == 'POST':
        print("here2")
        data = json.loads(request.body)  # Load the request data
        circular = Circular(text=data['text'], url=data['url']) 
        circular.save() 
        circulars = Circular.objects.all().values('id','text', 'url')  
        circulars_list = list(circulars) 
        return JsonResponse(circulars_list, safe=False) 
    elif request.method == 'DELETE':
        data = json.loads(request.body)
        for id in data['ids']:
            try:
                print("deleting")
                circular = Circular.objects.get(id=id)
                circular.delete()
            except Circular.DoesNotExist:
                pass
        circulars = Circular.objects.all().values('id', 'text', 'url')  
        circulars_list = list(circulars) 
        return JsonResponse(circulars_list, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
