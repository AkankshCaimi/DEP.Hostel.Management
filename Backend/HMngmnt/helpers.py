from django.core.serializers import serialize
import json
import base64
from .models import CustomUser, Faculty, Hostel, Student, Wing, Room, Batch, Warden, Caretaker
import pandas as pd
import re

def extract_roll_number_info(roll_number):
    pattern = r'(\d{4}|\d{2})([A-Za-z]{3})(\d{4})'
    match = re.search(pattern, roll_number)

    if match:
        year = match.group(1)
        batch = match.group(2)
        return (year + batch.lower()[2], year+batch.lower()+match.group(3))  # Concatenating year and batch
    else:
        return None  # Return None if the roll number doesn't match the pattern

# Test cases
print(extract_roll_number_info("2023ABC1234"))  # Output: 2023ABC
print(extract_roll_number_info("syam.21CSZ0018@iitrpr.ac.in"))  # Output: 22XYZ

def get_user_dict(user):
    roles=[]
    user_json={}
    if hasattr(user, 'student'):
        roles.append('student')
        roles.append('college student')
    elif hasattr(user, 'faculty'):
        roles.append('faculty')
        fac=user.faculty
        if hasattr(fac, 'warden'):
            warden=fac.warden
            if warden.is_chief_warden:
                roles.append('chief warden')
            else:
                roles.append('warden')
    elif user.is_superuser:
        roles.append('admin')
    elif user.is_staff:
        roles.append('staff')
        if hasattr(user, 'caretaker'):
            roles.append('caretaker')
            user_json['hostel']=user.caretaker.hostel.hostel_no
            user_json['hostel_name']=user.caretaker.hostel.hostel_name
    else:
        roles.append('outside student')
        roles.append('student')
    
    user_json['name']=user.name
    user_json['email']=user.email
    user_json['roles']=roles
    user_json['is_superuser']=user.is_superuser
    user_json['is_staff']=user.is_staff
    if 'faculty' in roles:
        user_json['department']=user.faculty.department
        user_json['is_hod']=user.faculty.is_hod
    # print(user_json)
    return user_json

def handle_file_attachment(field):
    try:
        with open(field, 'rb') as f:
            content=base64.b64encode(f.read()).decode('utf-8')
        # print(content[:100])
        return content
    except:
        return None
    
def parse_xl(file, type):
    try:
        df = pd.read_excel(file)

        # Print column names
        # print(df.columns)

        # Print the first few rows (you can change 'head(5)' to any number)
        # print(df.head(5))

        # Extract and process data
        users = []
        if type == 'faculty':
            for index, row in df.iterrows():
                name = row['Name']
                email = row['Email']
                department = row['Department']
                gender=row['Gender']
                phone=row['Phone']
                hod_status = bool(row['is_HOD'])  # Convert to boolean if necessary
                users.append((name, email, department, hod_status, gender, phone))
        elif type == 'student':
            for index, row in df.iterrows():
                name = row['Name']
                email = row['Email']
                department = row['Department']
                gender=row['Gender']
                phone=row['Phone']
                year = row['Year']
                room_no = row['Room No']
                users.append((name, email, department, gender, phone, year, room_no))

        return users
    except Exception as e:
        # print(e)
        return None
    

def room_allocation(incoming_batch, outgoing_batch, type):
    if type=="btech":
        # get all hostels
        hostels = Hostel.objects.all()
        # keep 3rd year students constant
        # transfer 2nd year to 4th year
        # put 1st year in 2nd year

