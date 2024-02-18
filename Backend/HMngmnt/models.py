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

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        return self

class Faculty(models.Model):
    faculty_name = models.CharField(max_length=100)
    faculty_email = models.EmailField(max_length=100, primary_key=True)
    faculty_phone = models.CharField(max_length=10)
    is_hod = models.BooleanField(default=False)

class Application(models.Model):
    application_id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    gender = models.CharField(max_length=100)
    affiliation = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=10)
    email = models.EmailField(max_length=100)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    arrival = models.DateField()
    departure = models.DateField()
    instiId= models.FileField(upload_to='documents/')
    letter= models.FileField(upload_to='documents/')
    status = models.CharField(max_length=100, default='Pending Faculty Approval')
    
    class Meta:
        ordering = ['name']
        constraints = [
            models.UniqueConstraint(fields=['name', 'email'], name='unique_student')
        ]
    def __str__(self):
        return self.name

