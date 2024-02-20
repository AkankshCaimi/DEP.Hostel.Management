from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _
# Create your models here.

    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    # data_from_google = models.BooleanField(default=False)
    name= models.CharField(max_length=100)
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
    faculty_phone = models.CharField(max_length=10)
    is_hod = models.BooleanField(default=False)

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
    
    # class Meta:
    #     ordering = ['name']
    #     constraints = [
    #         models.UniqueConstraint(fields=['name', 'email'], name='unique_student')
    #     ]
    def __str__(self):
        return f"Application id: {self.application_id}"

class Application_Final(models.Model):
    application= models.OneToOneField(Application, on_delete=models.CASCADE, primary_key=True, default=None)
    faculty_approval = models.BooleanField(default=False)