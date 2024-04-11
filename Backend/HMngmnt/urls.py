from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('internship', views.internship, name='internship'),
    path('update_payment', views.update_payment, name='update_payment'),
    path('circulars/', views.circulars, name='circulars'),
    path('signup', views.signup_ep, name='signup'),
    path('login', views.login_ep, name='login'),
    path('logout', views.logout_ep, name='logout'),
    path('get_user_info', views.get_user_info, name='get_user_info'),
    path('add_users', views.add_users, name='add_users'),
    path('get_applications', views.get_applications, name='get_applications'),
    path('get_application_status', views.get_application_status, name='get_application_status'),
    path('view_final_applications', views.view_final_applications, name='view_final_applications'),
    path('view_applications', views.view_applications, name='view_applications'),
    path('get_application/<int:id>', views.get_application, name='get_application'),
    path('update_application', views.update_application, name='update_application'),
    path('get_hostels', views.get_hostels, name='get_hostels'),
    path('get_hostel_rooms/<int:hostel_no>', views.get_hostel_rooms, name='get_hostel_rooms'),
    path('add_rooms', views.add_rooms, name='add_rooms'),
    # path('get_rooms', views.get_rooms, name='get_rooms'),
    path('send_email', views.send_email, name='send_email'),
    path('generate_pdf', views.generate_pdf, name='generate_pdf'),
    path('test', views.download_pdf, name='test')
]