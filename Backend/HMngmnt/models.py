from django.db import models

# Create your models here.
# class Application(models.Model):
#     app_id = models.AutoField(primary_key=True)
#     student_name = models.CharField(max_length=100)
    
class Faculty(models.Model):
    faculty_name = models.CharField(max_length=100, primary_key=True)
    faculty_email = models.EmailField(max_length=100)
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
    def __str__(self):
        return self.name

