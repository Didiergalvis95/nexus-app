import csv
import pandas as pd
from django.http import HttpResponse, JsonResponse
from .models import *
from django.shortcuts import render

nombres = [
    'Juan', 'María', 'Carlos', 'Laura', 'José', 'Ana', 'Pedro', 'Isabel',
    'Luis', 'Sofía', 'Andrés', 'Lucía', 'Javier', 'Carmen', 'Miguel', 'Elena',
    'Ricardo', 'Patricia', 'Fernando', 'Silvia'
]
apellidos = ['Carvajal Casillas', 'Arisizabal Florez', 'González Pérez', 'Rodríguez López',
    'Martínez Sánchez', 'Fernández González', 'López Pérez', 'Díaz García',
    'Hernández Rodríguez', 'Gómez Pérez', 'Pérez García', 'Sánchez López',
    'Ramírez López', 'Torres Sánchez', 'Díaz Martínez', 'Fernández Pérez',
    'Torres Rodríguez', 'Sánchez García', 'García Díaz', 'López González'
]
productos = [
    'Smartphone', 'Laptop', 'Auriculares inalámbricos', 'Televisor LED',
    'Cámara digital', 'Altavoz Bluetooth', 'Reloj inteligente', 'Tableta',
    'Impresora láser', 'Refrigerador', 'Cafetera', 'Licuadora',
    'Juego de sartenes', 'Máquina de ejercicio', 'Bicicleta de montaña',
    'Zapatos deportivos', 'Vestido de noche', 'Perfume', 'Gafas de sol', 'Maleta de viaje'
]

def exportar_csv(request, nombre_archivo):
    if nombre_archivo == 'empleados':
        modelo = Empleado
        lista_nombres = ['id','nombre', 'apellido', 'salario_mensual', 'deudas', 'retefuente', 'correo', 'telefono', 'cargo']
    elif nombre_archivo == 'productos':
        modelo = Producto
        lista_nombres = ['id','nombre', 'costo_unitario', 'iva']
    elif nombre_archivo == 'ventas':
        modelo = Venta
        lista_nombres = ['orden', 'cliente', 'costo']

    data = modelo.objects.values_list(*lista_nombres)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f'attachment; filename="{nombre_archivo}.csv"'

    with open(f'nexus_app_back/exports/{nombre_archivo}.csv', mode='w', newline='', encoding='utf-8') as archivo_csv:
        writer = csv.writer(archivo_csv)
        writer.writerow(lista_nombres)
        writer.writerows(data)

    with open(f'nexus_app_back/exports/{nombre_archivo}.csv', 'rb') as csv_file:
        response.write(csv_file.read())
    return response

def analisis(request, nombre_archivo):
    archivo= f"nexus_app_back/exports/{nombre_archivo}.csv"
    try:
        df = pd.read_csv(archivo)
        
        estadisticas = df.head(50).to_html()
        
        return render(request, 'analisis.html', {'nombre_archivo': nombre_archivo, 'estadisticas': estadisticas})
    except FileNotFoundError:
        return JsonResponse({'error': f"El archivo {nombre_archivo} no existe o no es un archivo CSV válido."})