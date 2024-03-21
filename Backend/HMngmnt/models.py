from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
# Create your models here.

    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    # data_from_google = models.BooleanField(default=False)
    name= models.CharField(max_length=100, default='None')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    gender = models.CharField(max_length=100, default='Not Specified')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        return self

class Faculty(models.Model):
    faculty= models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
    department = models.CharField(max_length=100)
    faculty_phone = models.CharField(max_length=10)
    is_hod = models.BooleanField(default=False)
    def __str__(self):
        return self.faculty.name

class Application(models.Model):
    application_id= models.AutoField(primary_key=True)
    student= models.ForeignKey(CustomUser, on_delete=models.CASCADE, default=None)
    affiliation = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, default=None)
    arrival = models.DateField()
    departure = models.DateField()
    instiId= models.FileField(upload_to='documents/')
    letter= models.FileField(upload_to='documents/')
    status = models.CharField(max_length=100, default='Pending Faculty Approval')

    def __str__(self):
        return f"Application id: {self.application_id}"
    def get_faculty_name(self):
        return self.faculty.faculty.name
    def get_student_name(self):
        return self.student.name

class Application_Final(models.Model):
    application= models.OneToOneField(Application, on_delete=models.CASCADE, primary_key=True, default=None)

class Hostel(models.Model):
    hostel_no = models.CharField(primary_key=True, max_length=20)
    hostel_name = models.CharField(max_length=100)
    hostel_type = models.CharField(max_length=100) # Male, Female, Mixed
    num_floors = models.IntegerField(default=1)
    capacity = models.IntegerField(default=1)
    def __str__(self):
        return self.hostel_name

class Room(models.Model):
    room_no = models.CharField(primary_key=True, max_length=20)
    floor= models.IntegerField(default=1)
    hostel= models.ForeignKey(Hostel, on_delete=models.CASCADE, default=None)
    room_occupancy = models.IntegerField(default=1)
    current_occupancy = models.IntegerField(default=0)

class Student(models.Model):
    student= models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
    department = models.CharField(max_length=100)
    student_phone = models.CharField(max_length=10)
    student_roll = models.CharField(max_length=15)
    student_year = models.IntegerField(default=None)
    student_room = models.OneToOneField(Room, on_delete=models.CASCADE, null=True, blank=True, default=None)
    is_backlog = models.BooleanField(default=False)
    def __str__(self):
        return self.student.name


class Warden(models.Model):
    warden = models.OneToOneField(Faculty, on_delete=models.CASCADE, primary_key=True, default=None)
    hostel = models.OneToOneField(Hostel, on_delete=models.CASCADE, default=None, null=True, blank=True)
    is_chief_warden = models.BooleanField(default=False, null=True, blank=True)

    def clean(self):
        if self.hostel and self.is_chief_warden:
            raise ValidationError("A Warden cannot be both associated with a hostel and be a Chief Warden simultaneously.")
        elif not self.hostel and not self.is_chief_warden:
            raise ValidationError("A Warden must be associated with either a hostel or be a Chief Warden.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.warden.faculty.name

class Caretaker(models.Model):
    caretaker = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
    hostel = models.OneToOneField(Hostel, on_delete=models.CASCADE, default=None, null=True, blank=True)

    def __str__(self):
        return self.hostel.hostel_name
    
    