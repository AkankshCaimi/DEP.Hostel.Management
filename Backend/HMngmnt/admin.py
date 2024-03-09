# Register your models here.
from django.contrib import admin
from .models import Application, Faculty, CustomUser, Student, Warden, Hostel, Room
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


# Register your custom admin class
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Application)
admin.site.register(Faculty)
admin.site.register(Student)
admin.site.register(Warden)
admin.site.register(Hostel)
admin.site.register(Room)


