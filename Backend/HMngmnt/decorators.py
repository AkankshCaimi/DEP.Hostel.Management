from functools import wraps
from django.http import JsonResponse
from jwt import decode, exceptions
from django.conf import settings

def validate_token(token):
    try:
        payload = decode(token, 'secret', algorithms="HS256")
        return payload
    except exceptions.DecodeError as identifier:
        # return JsonResponse({'error': 'Token is invalid'}, status=400)
        return None
    except exceptions.ExpiredSignatureError as identifier:
        # return JsonResponse({'error': 'Token is expired'}, status=400)
        return None
    
def token_required(f):
    @wraps(f)
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('secret')
        if not token:
            return JsonResponse({'error': 'Token is missing'}, status=300)
        user= validate_token(token)
        if user is None or user.get('id') is None:
            return JsonResponse({'error': 'User is not found'}, status=301)
        return f(request, *args, **kwargs)
    return wrapper

def admin_required(f):
    @wraps(f)
    def wrapper(request, *args, **kwargs):
        token = request.COOKIES.get('secret')
        if not token:
            return JsonResponse({'error': 'Token is missing'}, status=300)
        user= validate_token(token)
        if user is None or user.get('id') is None:
            return JsonResponse({'error': 'User is not found'}, status=301)
        if user.get('role') != 'admin':
            return JsonResponse({'error': 'User is not admin'}, status=302)
        return f(request, *args, **kwargs)
    return wrapper
        