from rest_framework import viewsets
from django.http import JsonResponse
from django.db.utils import IntegrityError
from .serializer import *
from .utils import *
from .models import *
import random as rd

# Create your views here.
class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset=Empleado.objects.all()
    serializer_class= EmpleadoSerializer

class VentaViewSet(viewsets.ModelViewSet):
    queryset=Venta.objects.all()
    serializer_class= VentaSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset=Producto.objects.all()
    serializer_class= ProductoSerializer

def generar_numero_telefono():
    numero_telefono = ''.join([str(rd.randint(0, 9)) for _ in range(10)])
    return numero_telefono

def crear_empleados(request):
    try:
        for _ in range(1):
            nombre = rd.choice(nombres)
            apellido = rd.choice(apellidos)
            salario = rd.randint(1160000, 18000000)
            deudas = rd.choice([True, False])
            retefuente = 1 if salario > 6000000 else 0
            edad = rd.randint(22, 60)
            correo = nombre+ str(edad)+"@correo.com"
            numero_telefono = generar_numero_telefono()
            cargo = rd.choice(['Desarrollador Junior', 'Desarrollador Intermedio', 
                'Arquitecto', 'Desarrollador Avanzado'
            ])
            empleado = Empleado(
                nombre= nombre, 
                apellido=apellido,
                salario_mensual=salario,
                deudas= deudas,
                retefuente= retefuente,
                correo= correo,
                telefono= numero_telefono,
                cargo= cargo
            )
            empleado.save()
        response_data = {"success": True, "message": "¡Empleados creados con éxito!"}
    except IntegrityError:
        response_data = {"success": False, "message": "Error: Ya existe un empleado con los mismos datos en la base de datos."}
    except Exception as e:
        response_data = {"success": False, "message": f"Error inesperado: {str(e)}"}
    return JsonResponse(response_data)

""" def orden_personalizada():
    for numero in range(1):
        numero_formateado = f"NXA{numero:04d}"
        yield numero_formateado
"""
def crear_ventas(request):
    try:
        #orden_seq = orden_personalizada()
        for _ in range(5):
            nombre = rd.choice(nombres)
            apellido = rd.choice(apellidos)
            cliente = nombre + " " + apellido
            costo = rd.randint(150000, 800000)
            #orden = next(orden_seq)
            venta = Venta(
                #orden= orden,
                cliente= cliente, 
                costo= costo
            )
            venta.save()
        response_data = {"success": True, "message": "¡Ventas creadas con éxito!"}
    except IntegrityError:
        response_data = {"success": False, "message": "Error: Ya existe una venta con los mismos datos en la base de datos."}
    except Exception as e:
        response_data = {"success": False, "message": f"Error inesperado: {str(e)}"}
    return JsonResponse(response_data)

def crear_productos(request):
    try:
        for _ in range(3000):
            nombre = rd.choice(productos)
            costo = rd.randint(50000, 800000)
            iva = costo * 0.19

            producto = Producto(
                #orden= orden,
                nombre= nombre, 
                costo_unitario= costo,
                iva= iva
            )
            producto.save()
        response_data = {"success": True, "message": "¡Productos creados con éxito!"}
    except IntegrityError:
        response_data = {"success": False, "message": "Error: Ya existe un producto con los mismos datos en la base de datos."}
    except Exception as e:
        response_data = {"success": False, "message": f"Error inesperado: {str(e)}"}
    return JsonResponse(response_data)
