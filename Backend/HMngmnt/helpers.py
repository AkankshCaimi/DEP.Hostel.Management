from django.core.serializers import serialize
import json
import base64
from .models import CustomUser, Faculty
import pandas as pd
def get_user_dict(user, params):
    user_json=serialize('json', [user])
    user_json=json.loads(user_json[1:-1])['fields']
    user_json={key: value for key, value in user_json.items() if key in params}
    if user_json.get('is_staff')==True and user_json.get('is_superuser')==False:
        user_json['is_hod']=Faculty.objects.get(faculty=user).is_hod

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