from rest_framework import serializers
from .models import Tareas
#from .serializer import TareasSerializer    

class TareasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tareas
        fields = '__all__'  # ['id', 'Titulo', 'Fecha', 'Descripcion']