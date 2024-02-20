from django.core.serializers import serialize
import json

def get_user_dict(user, params):
    user_json=serialize('json', [user])
    user_json=json.loads(user_json[1:-1])['fields']
    user_json={key: value for key, value in user_json.items() if key in params}
    return user_json