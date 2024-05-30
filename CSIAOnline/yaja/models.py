from django.db import models

# Create your models here.
class Monday(models.Model):
    period1 = models.CharField(max_length=50)
    period2 = models.CharField(max_length=50)
    period3 = models.CharField(max_length=50)
    student_id = models.CharField(max_length=10, null=True, blank=True)

class Tuesday(models.Model):
    period1 = models.CharField(max_length=50)
    period2 = models.CharField(max_length=50)
    period3 = models.CharField(max_length=50)
    student_id = models.CharField(max_length=10, null=True, blank=True)

class Wednesday(models.Model):
    period1 = models.CharField(max_length=50)
    period2 = models.CharField(max_length=50)
    period3 = models.CharField(max_length=50)
    student_id = models.CharField(max_length=10, null=True, blank=True)

class Thursday(models.Model):
    period1 = models.CharField(max_length=50)
    period2 = models.CharField(max_length=50)
    period3 = models.CharField(max_length=50)
    student_id = models.CharField(max_length=10, null=True, blank=True)

