from django.db import models


# Create your models here.
class Tareas(models.Model):
    Titulo = models.CharField(max_length=100)
    Fecha = models.DateField()
    Descripcion = models.TextField(max_length=200)


def __str__(self):
    return self.Titulo
    
