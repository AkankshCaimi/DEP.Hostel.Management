from django.db.models.signals import post_save, pre_save, pre_delete, post_delete
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from .models import Application_Final, Student, Room

@receiver(pre_save, sender=Student)
def update_room_occupancy(sender, instance, **kwargs):
    # Check if student_room is changed
    if instance.pk:
        try:
            # print('im here')
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
    if instance.student_room is not None and instance.student_room_id:
        room = instance.student_room
        if room.current_occupancy >= room.room_occupancy:
            raise ValidationError("Room occupancy is full.")
        room.current_occupancy = Student.objects.filter(student_room=room).count() + 1
        room.save()

@receiver(pre_save, sender=Application_Final)
def allot_room(sender, instance, **kwargs):
    if instance.room:
        room = instance.room
        if room.current_occupancy >= room.room_occupancy:
            raise ValidationError("Room occupancy is full.")
        room.current_occupancy = Student.objects.filter(student_room=room).count()+ Application_Final.objects.filter(room=room).count() + 1
        room.save()


@receiver(pre_save, sender=Student)
def update_batch_strength(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Student.objects.get(pk=instance.pk)
            if old_instance.student_batch != instance.student_batch:
                old_instance.student_batch.number_of_students -= 1
                if old_instance.student.gender=='Male':
                    old_instance.student_batch.number_of_boys -= 1
                else:
                    old_instance.student_batch.number_of_girls -= 1
                old_instance.student_batch.save()
            elif old_instance.student_batch == instance.student_batch:
                return
        except Student.DoesNotExist:
            pass

    if instance.student_batch:
        instance.student_batch.number_of_students += 1
        if instance.student.gender == 'Male':
            instance.student_batch.number_of_boys += 1
        else:
            instance.student_batch.number_of_girls += 1
        instance.student_batch.save()
        
@receiver(pre_delete, sender=Student)
def update_room_occupancy_on_delete(sender, instance, **kwargs):
    if instance.student_room:
        room = instance.student_room
        room.current_occupancy = Student.objects.filter(student_room=room).count() - 1
        room.save()


@receiver(pre_delete, sender=Student)
def update_batch_strength_on_delete(sender, instance, **kwargs):
    print('here')
    print(instance.student_batch.number_of_students)
    if instance.student_batch:
        instance.student_batch.number_of_students -= 1
        if instance.student.gender=='Male':
            instance.student_batch.number_of_boys -= 1
        else:
            instance.student_batch.number_of_girls -= 1
        instance.student_batch.save()

@receiver([post_save, post_delete], sender=Room)
def update_hostel_and_wing(sender, instance, **kwargs):
    if instance.is_for_guests:
        return
    instance.hostel_wing.capacity = instance.hostel_wing.get_capacity()
    instance.hostel_wing.current_capacity = instance.hostel_wing.get_current_capacity()
    instance.hostel_wing.save()
    instance.hostel.capacity = instance.hostel.get_capacity()
    instance.hostel.current_capacity = instance.hostel.get_current_capacity()
    instance.hostel.save()