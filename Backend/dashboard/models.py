from django.db import models

class Appointment(models.Model):
    patient_name = models.CharField(max_length=255)
    age = models.IntegerField()
    file = models.FileField(upload_to='appointments/', null=True, blank=True)

    def __str__(self):
        return f"{self.patient_name} - {self.age}"
