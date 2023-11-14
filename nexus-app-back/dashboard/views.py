from django.http import JsonResponse, HttpResponse, FileResponse
from django.core.files.base import ContentFile
from rest_framework import viewsets
from rest_framework.decorators import api_view
from .serializer import *
from .models import *
from unidecode import unidecode
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import Table, TableStyle
from io import BytesIO
from urllib.parse import quote
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
            estadistica, estadistica_validate = Estadistica.objects.get_or_create(
                    tipo=tipo,
                    anime=anime,
                    cantidad=row['Cantidad'],
                    venta=venta
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

            response = FileResponse(open(path, 'rb'), content_type='image/png')
            response['Content-Disposition'] = f'filename="{nombre}.png"'

            return response
        else:
            return JsonResponse({'message': 'No hay estadísticas para generar el gráfico'})
    except Tipo.DoesNotExist:
        return JsonResponse({'message': f'Tipo con nombre {nombre} no encontrado'}, status=404)
    except Exception as e:
        print(f'Error en el servidor: {str(e)}')
        return JsonResponse({'message': 'Error en el servidor'}, status=500)
    

def generar_pdf(request, nombre):
    archivo_csv = f"nexus_app_back/exports/{nombre}.csv"
    imagen = f"nexus_app_back/exports/img/{nombre}.png"
    try:
        
        df = pd.read_csv(archivo_csv)
    
        pdf_buffer = BytesIO()
        pdf = canvas.Canvas(pdf_buffer, pagesize=letter)

        width, height = letter
        table_width = 350
        table_height = 200
        x = (width - table_width) / 2
        y = height - 300

        pdf.setFont("Helvetica-Bold", 14)
        pdf.drawCentredString(width / 2, height - 30, f'Informe - {nombre}')

        table_data = [df.columns] + [df.iloc[i].tolist() for i in range(len(df))]
        table = Table(table_data)
        table.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), '#77BFF'),
                                   ('TEXTCOLOR', (0, 0), (-1, 0), (1, 1, 1, 1)),
                                   ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                                   ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                                   ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                                   ('BACKGROUND', (0, 1), (-1, -1), '#DDDDDD'),
                                   ('GRID', (0, 0), (-1, -1), 1, colors.black)]))

        table.wrapOn(pdf, table_width, table_height)
        table.drawOn(pdf, x, y)

        pdf.drawInlineImage(imagen, x=100, y=100, width=400, height=300)

        footer_text = "Todos los derechos reservado - nexusapp"
        pdf.setFont("Helvetica", 8)
        pdf.drawRightString(letter[0] - 20, 20, footer_text)

        pdf.showPage()

        path = os.path.join('nexus_app_back/exports', f'{nombre}.pdf')

        pdf.save()

        with open(path, 'wb') as pdf_file:
            pdf_buffer.seek(0)
            pdf_file.write(pdf_buffer.read())

        pdf_buffer.close()

        with open(path, 'rb') as pdf_file:
            response = HttpResponse(pdf_file.read(), content_type='application/pdf')
            response['Content-Disposition'] = f'filename="{nombre}.pdf"'

        return response
    except Tipo.DoesNotExist:
        return JsonResponse({'message': f'Tipo con nombre {nombre} no encontrado'}, status=404)
    except Exception as e:
        print(f'Error en el servidor: {str(e)}')
        return JsonResponse({'message': 'Error en el servidor'}, status=500)