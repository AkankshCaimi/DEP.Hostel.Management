from .models import Application, Faculty

def add_fac(name):
    faculty = Faculty(faculty_name=name)
    faculty.save()
    return faculty