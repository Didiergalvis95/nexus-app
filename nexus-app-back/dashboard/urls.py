from django.urls import path, include
from rest_framework import routers
from dashboard import views

router = routers.DefaultRouter()
router.register(r'empleados', views.EmpleadoViewSet)
router.register(r'ventas', views.VentaViewSet)
router.register(r'productos', views.ProductoViewSet)

urlpatterns=[
    path('',include(router.urls)),
    path('crear-empleados/', views.crear_empleados, name='crear_empleados'),
    path('crear-ventas/', views.crear_ventas, name='crear_ventas'),
    path('crear-productos/', views.crear_productos, name='crear_productos')
]