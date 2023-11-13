from django.db import models

# Create your models here.
class Anime(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(
        max_length=100,
        unique=True
    )
    autor = models.CharField(
        max_length=100,
        null= False
    )
    anho_creacion = models.CharField(max_length=4,null=False)

    def __str__(self):
        return f'{self.id} {self.nombre} {self.autor} {self.anho_creacion}'

class Venta(models.Model):
    id = models.AutoField(primary_key=True)
    anime = models.ForeignKey('Anime', on_delete=models.CASCADE, related_name='ventas_anime')
    cantidad = models.DecimalField(null=False, 
        decimal_places=0,
        max_digits=10
    )

    def __str__(self):
        return f'{self.id} {self.anime} {self.cantidad}'


class Estadistica(models.Model):
    id = models.AutoField(primary_key=True)
    tipo = models.ForeignKey('Tipo', on_delete=models.CASCADE, related_name='tipos')
    anime = models.ForeignKey('Anime', on_delete=models.CASCADE, related_name='animes')
    cantidad = models.PositiveIntegerField(null=False, default=0)

    def __str__(self):
        return f'{self.id} {self.tipo} {self.anime} {self.cantidad}'

class Tipo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre= models.CharField(max_length=50,default='N/A')

    def __str__(self):
        return f'{self.id} {self.nombre}'