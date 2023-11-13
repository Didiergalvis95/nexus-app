from rest_framework import serializers
from .models import *

class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = '__all__'

class VentaSerializer(serializers.ModelSerializer):
    anime = AnimeSerializer(read_only=True)
    class Meta:
        model = Venta
        fields = '__all__'

class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = '__all__'

class EstadisticaSerializer(serializers.ModelSerializer):
    anime = AnimeSerializer(read_only=True)
    tipo = TipoSerializer(read_only=True)
    class Meta:
        model = Estadistica
        fields = '__all__'