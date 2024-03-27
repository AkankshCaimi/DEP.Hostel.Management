from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .models import Student

@receiver(pre_save, sender=Student)
def update_room_occupancy(sender, instance, **kwargs):
    # Check if student_room is changed
    if instance.pk:
        try:
            print('im here')
            old_instance = Student.objects.get(pk=instance.pk)
            if old_instance.student_room != instance.student_room:
                previous_room = old_instance.student_room
                if previous_room:
                    # Decrease current_occupancy of previous room
                    previous_room.current_occupancy = Student.objects.filter(student_room=previous_room).count() - 1
                    previous_room.save()
            elif old_instance.student_room == instance.student_room:
                return
            
        except Student.DoesNotExist:
            pass

    # Check if student_room is assigned
    if instance.student_room_id:
        room = instance.student_room
        if room.current_occupancy >= room.room_occupancy:
            raise ValidationError("Room occupancy is full.")
        room.current_occupancy = Student.objects.filter(student_room=room).count() + 1
        room.save()
