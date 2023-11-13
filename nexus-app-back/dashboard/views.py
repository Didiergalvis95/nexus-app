from django.http import JsonResponse, HttpResponse
from django.core.files.base import ContentFile
from rest_framework import viewsets
from rest_framework.decorators import api_view
from .serializer import *
from .models import *
from unidecode import unidecode
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import base64 as b64
import pandas as pd
import os

# Create your views here.
class AnimeViewSet(viewsets.ModelViewSet):
    queryset=Anime.objects.all()
    serializer_class= AnimeSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset=Venta.objects.all()
    serializer_class= VentaSerializer

class TipoViewSet(viewsets.ModelViewSet):
    queryset=Tipo.objects.all()
    serializer_class= TipoSerializer

class EstadisticaViewSet(viewsets.ModelViewSet):
    queryset=Estadistica.objects.all()
    serializer_class= EstadisticaSerializer

@api_view(['POST'])
def crear_info(request):
    try:
        file_base64 = request.data['file']
        file_bytes = b64.b64decode(file_base64)
        
        path = os.path.join('nexus_app_back/exports/', 'anime.xlsx')

        with open(path, 'wb') as file:
            file.write(file_bytes)
        
        df = pd.read_excel(path)

        encabezados = [unidecode(header.strip().replace('ñ', 'nh')) for header in df.columns]

        print(encabezados)
        
        df.columns = encabezados

        for _, row in df.iterrows():
            anime, anime_validate  = Anime.objects.get_or_create(
                nombre = row['Nombre'],
                defaults ={
                    'autor': row['Autor'],
                    'anho_creacion': row['Anho creacion']
                }
            )
            if not anime_validate:
                continue
            tipo, tipo_validate = Tipo.objects.get_or_create(
                nombre = row['Tipo']
            )
            venta, venta_validate = Venta.objects.get_or_create(
                anime = anime,
                cantidad = row['Cantidad']
            )
        return JsonResponse({'message': 'Archivo procesado exitosamente', 'columnas': df.columns.tolist()})
    except Exception as e:
        print(f'Error en el servidor: {str(e)}')
        return JsonResponse({'message': 'Error en el servidor'}, status=500)

def generar_grafico(request, nombre):
    try:
        tipo = Tipo.objects.get(nombre=nombre)
        estadisticas = Estadistica.objects.filter(tipo=tipo)

        if estadisticas:
            nombres_anime = [estadistica.anime.nombre for estadistica in estadisticas]
            cantidades = [float(estadistica.cantidad) for estadistica in estadisticas]

            plt.bar(nombres_anime, cantidades)
            plt.xlabel('Nombre del Anime')
            plt.ylabel('Cantidad')
            plt.title(f'Gráfico de Estadísticas - {tipo.nombre}')
            plt.xticks(rotation=45, ha='right')
            plt.ticklabel_format(style='plain', axis='y')
            
            plt.tight_layout()
            path = os.path.join('nexus_app_back/exports/img', f'{nombre}.png')

            plt.savefig(path, format='png')
            plt.close()

            return JsonResponse({'message': 'Imagen guardada con exito'})
        else:
            return JsonResponse({'message': 'No hay estadísticas para generar el gráfico'})
    except Tipo.DoesNotExist:
        return JsonResponse({'message': f'Tipo con nombre {nombre} no encontrado'}, status=404)
    except Exception as e:
        print(f'Error en el servidor: {str(e)}')
        return JsonResponse({'message': 'Error en el servidor'}, status=500)