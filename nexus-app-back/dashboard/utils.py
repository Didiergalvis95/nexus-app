import csv
import pandas as pd
from django.http import HttpResponse
from .models import *
from django.shortcuts import render

encabezados = [
    'anime__nombre', 'anime__autor', 'tipo__nombre', 'cantidad'
]

def exportar_csv(request, nombre):
    estadisticas = Estadistica.objects.filter(tipo__nombre=nombre)

    print(estadisticas)

    data = estadisticas.values_list(*encabezados)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{nombre}.csv"'

    with open(f'nexus_app_back/exports/{nombre}.csv', mode='w', newline='', encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)
        writer.writerow(encabezados)
        writer.writerows(data)

    return response
