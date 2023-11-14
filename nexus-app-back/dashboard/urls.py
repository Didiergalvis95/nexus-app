from django.urls import path, include
from rest_framework import routers
from dashboard import views, utils

router = routers.DefaultRouter()
router.register(r'anime', views.AnimeViewSet)
router.register(r'venta', views.VentaViewSet)
router.register(r'estadistica', views.EstadisticaViewSet)
router.register(r'tipo', views.TipoViewSet)

urlpatterns=[
    path('',include(router.urls)),
    path('crear_info', views.crear_info, name='crear_info'),
    path('exportar_csv/<str:nombre>/', utils.exportar_csv, name='exportar_csv'),
    path('generar_grafico/<str:nombre>/', views.generar_grafico, name='generar_grafico'),
    path('generar_pdf/<str:nombre>/', views.generar_pdf, name='generar_pdf')
]