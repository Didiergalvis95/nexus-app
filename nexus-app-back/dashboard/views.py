from rest_framework import viewsets
from django.http import HttpResponse
from .serializer import *
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

def crear_empleados(request):
    for _ in range(1):
        nombre = rd.choice(nombres)
        apellido = rd.choice(apellidos)
        salario = rd.randint(1160000, 18000000)
        deudas = rd.choice([True, False])
        if salario > 6000000:
            retefuente = 1
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
    return HttpResponse("¡Empleados creados con exito!")

""" def orden_personalizada():
    for numero in range(1):
        numero_formateado = f"NXA{numero:04d}"
        yield numero_formateado
"""
def crear_ventas(request):
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
    return HttpResponse("Ventas creadas con exito!")

def crear_productos(request):
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
    return HttpResponse("Productos creados con exito!")