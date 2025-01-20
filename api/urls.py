from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TareasViewSet
from rest_framework.documentation import include_docs_urls 

router = DefaultRouter()
router.register(r'items', TareasViewSet)  # Registra el ViewSet con el prefijo 'items'

urlpatterns = [
    path('api/', include(router.urls)),  
    path('docs',  include_docs_urls(title='My API documentation')),
]