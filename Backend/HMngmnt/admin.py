# Register your models here.
from django.contrib import admin
from .models import Application, Application_Final, Caretaker, Faculty, CustomUser, Student, Warden, Hostel, Room, Circular, Batch, Wing, SavedMappings
from django.contrib.auth.admin import UserAdmin

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ("email", "is_staff", "is_active","name", "gender")
    list_filter = ("email", "is_staff", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("name", "gender")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

class FacultyAdmin(admin.ModelAdmin):
    list_display = ('department', 'is_hod')
    # search_fields = ('faculty_name', 'faculty_department')
    list_filter = ('is_hod',)

class HostelAdmin(admin.ModelAdmin):
    list_display = ('hostel_name', 'capacity', 'current_capacity')
class WingAdmin(admin.ModelAdmin):
    list_display = ('wing_name', 'capacity', 'current_capacity')
class BatchAdmin(admin.ModelAdmin):
    list_display = ('batch', 'number_of_students', 'number_of_girls', 'number_of_boys')
class StudentAdmin(admin.ModelAdmin):
    list_display = ('student_roll', 'student_room')
    list_filter = ('student_roll',)
    search_fields = ('student_roll',)

class StudentInline(admin.TabularInline):
    model = Student
    extra = 0
    fields = ('student_roll',)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_no', 'get_students')
    inlines = [StudentInline]
    fieldsets = (
        ("Room Info", {"fields": ("room_no", "room_occupancy", "hostel_wing", "current_occupancy")}),
    )
    def get_students(self, obj):
        return ", ".join([student.student.name for student in obj.student_set.all()])
# Register your custom admin class
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Application)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Warden)
admin.site.register(Wing, WingAdmin)
admin.site.register(Hostel, HostelAdmin)
admin.site.register(Room, RoomAdmin)
admin.site.register(Caretaker)
admin.site.register(Application_Final)
admin.site.register(Circular)
admin.site.register(Batch, BatchAdmin)
admin.site.register(SavedMappings)


