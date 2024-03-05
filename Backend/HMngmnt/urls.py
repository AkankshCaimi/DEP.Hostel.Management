from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('internship', views.internship, name='internship'),
    path('signup', views.signup_ep, name='signup'),
    path('login', views.login_ep, name='login'),
    path('logout', views.logout_ep, name='logout'),
    path('get_user_info', views.get_user_info, name='get_user_info'),
    path('add_students', views.add_students, name='add_students'),
    path('get_applications', views.get_applications, name='get_applications'),
    path('get_application_status', views.get_application_status, name='get_application_status'),
    path('view_applications', views.view_applications, name='view_applications'),
    path('get_application/<int:id>', views.get_application, name='get_application_status'),
    # path('onlyadmin', views.admin_view, name='onlyadmin')
    # path('user', views.user_view, name='user')
]