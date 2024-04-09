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
    payment_proof= models.FileField(upload_to='documents/', default=None, null=True, blank=True)
    payment_id= models.CharField(max_length=100, default='None', null=True, blank=True)
    status = models.CharField(max_length=100, default='Pending Faculty Approval')
    comments = models.CharField(max_length=300, default='None')
    
    def __str__(self):
        return f"Application id: {self.application_id}"
    def get_faculty_name(self):
        return self.faculty.faculty.name
    def get_student_name(self):
        return self.student.name

class Hostel(models.Model):
    hostel_no = models.CharField(auto_created=True, primary_key=True, max_length=20)
    hostel_name = models.CharField(max_length=100)
    hostel_type = models.CharField(max_length=100)
    capacity = models.IntegerField(default=1)
    current_capacity = models.IntegerField(default=0)
    def get_capacity(self):
        return sum([wing.capacity for wing in self.wing_set.all()])
    def get_current_capacity(self):
        return sum([wing.current_capacity for wing in self.wing_set.all()])
    def __str__(self):
        return self.hostel_name

class Wing(models.Model):
    wing_name= models.CharField(max_length=100, primary_key=True)
    hostel=models.ForeignKey(Hostel, on_delete=models.CASCADE)
    wing_type = models.CharField(max_length=100) # Male, Female, Mixed
    num_floors = models.IntegerField(default=1)
    capacity = models.IntegerField(default=1)
    current_capacity = models.IntegerField(default=0)
    def get_capacity(self):
        return sum([room.room_occupancy for room in self.room_set.all()])
    def get_current_capacity(self):
        return sum([room.current_occupancy for room in self.room_set.all()])
    def __str__(self):
        return self.wing_name


class Room(models.Model):
    room_no = models.CharField(primary_key=True, max_length=20)
    floor= models.IntegerField(default=0)
    hostel_wing= models.ForeignKey(Wing, on_delete=models.CASCADE, default=None)
    hostel=models.ForeignKey(Hostel, on_delete=models.CASCADE, default=None)
    room_occupancy = models.IntegerField(default=1)
    current_occupancy = models.IntegerField(default=0)

    def __str__(self):
        return self.room_no
    def save(self, *args, **kwargs):
        if self.current_occupancy > self.room_occupancy:
            raise ValidationError("Room occupancy is full.")
        if self.hostel_wing.hostel != self.hostel:
            raise ValidationError("Hostel Wing and Hostel do not match.")
        super().save(*args, **kwargs)

class Application_Final(models.Model):
    application= models.OneToOneField(Application, on_delete=models.CASCADE, primary_key=True, default=None)
    hostel= models.ForeignKey(Hostel, on_delete=models.CASCADE, default=None, null=True)
    room= models.ForeignKey(Room, on_delete=models.CASCADE, default=None, null=True)
    occupied_date_range= models.CharField(max_length=100, default='None')

class Batch(models.Model):
    batch = models.CharField(primary_key=True,max_length=20, default="None")
    number_of_students = models.IntegerField(default=0)
    number_of_girls= models.IntegerField(default=0)
    number_of_boys= models.IntegerField(default=0)
    def __str__(self):
        return str(self.batch)

class Student(models.Model):
    student= models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
    department = models.CharField(max_length=100)
    student_phone = models.CharField(max_length=10)
    student_roll = models.CharField(max_length=15)
    student_year = models.IntegerField(default=None)
    student_room = models.ForeignKey(Room, on_delete=models.CASCADE, null=True, blank=True, default=None)
    student_batch = models.ForeignKey(Batch, on_delete=models.CASCADE, default=None, null=True, blank=True)
    # def save(self, *args, **kwargs):
    #     if self.student_room is not None:
    #         if self.student_room.current_occupancy >= self.student_room.room_occupancy:
    #             raise ValidationError("Room occupancy is full.")
    #     super().save(*args, **kwargs)

    def __str__(self):
        return self.student.name


class Warden(models.Model):
    warden = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
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
        return self.warden.name

class Caretaker(models.Model):
    caretaker = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True, default=None)
    hostel = models.OneToOneField(Hostel, on_delete=models.CASCADE, default=None, null=True, blank=True)

    def __str__(self):
        return self.hostel.hostel_name
    
    