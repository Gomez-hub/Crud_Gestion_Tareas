from rest_framework import viewsets
from django.http import HttpResponse
from .models import Tareas
from .serializer import TareasSerializer


class TareasViewSet(viewsets.ModelViewSet):
    queryset = Tareas.objects.all()
    serializer_class = TareasSerializer

