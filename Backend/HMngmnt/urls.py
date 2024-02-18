from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('internship', views.internship, name='internship'),
    path('signup', views.signup_ep, name='signup'),
    path('login', views.login_ep, name='login'),
    path('onlyadmin', views.admin_view, name='onlyadmin')
    # path('user', views.user_view, name='user')
]