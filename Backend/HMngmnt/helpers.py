from django.core.serializers import serialize
import json
import base64
from .models import CustomUser, Faculty
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