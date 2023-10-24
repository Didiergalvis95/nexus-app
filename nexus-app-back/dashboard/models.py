from collections.abc import Iterable
from django.db import models
from django.core.validators import MinValueValidator

# Create your models here.
class Empleado(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(
        max_length=50,
        null=False
    )
    apellido = models.CharField(
        max_length=100, 
        null=False
    )
    salario_mensual = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        null=False,
        validators=[
            MinValueValidator(0)
        ]
    )
    deudas = models.BooleanField(default=False)
    retefuente = models.DecimalField(
        max_digits=3,
        decimal_places=2
    )
    correo = models.EmailField(null=False)
    telefono = models.IntegerField(null=False)
    cargo = models.CharField(
        max_length=50,
        null=False
    )

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50,
        null=False
    )
    costo_unitario = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        null=False,
        validators=[
            MinValueValidator(0)
        ]
    )
    iva = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    

class Venta(models.Model):
    orden = models.CharField(
        primary_key=True, 
        max_length=7,
        unique=True
    )
    cliente = models.CharField(
        max_length=100,
        null=False
    )
    costo = models.DecimalField(
        max_digits=10,
        decimal_places=0,
        null=False,
        validators=[
            MinValueValidator(0)
        ]
    )

    def save(self, *args, **kwargs):
        if not self.orden:
            last_orden = Venta.objects.all().order_by('-orden').first()
            if last_orden.orden:
                last_number = int(last_orden.orden[3:])  
                next_number = last_number + 1
            else:
                next_number = 1

            self.orden = f"NXA{next_number:04d}"
        super(Venta, self).save(*args, **kwargs)
        
        
#class estadisticas(models.Model):
    
