from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import Tareas
from .serializer import TareasSerializer


class TareasViewSet(APIView):
    def get(self, request):
        tareas = Tareas.objects.all()
        serializer = TareasSerializer(tareas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TareasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def put(self, request, pk):
        tarea = Tareas.objects.get(id=pk)
        serializer = TareasSerializer(tarea, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, pk):
        tarea = Tareas.objects.get(id=pk)
        tarea.delete()
        return HttpResponse('Tarea eliminada')


# class TareasViewSet(viewsets.ModelViewSet):
#     queryset = Tareas.objects.all()
#     #ghjkf
#     serializer_class = TareasSerializer

