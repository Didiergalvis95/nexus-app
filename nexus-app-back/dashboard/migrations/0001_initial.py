# Generated by Django 4.2.6 on 2023-11-13 19:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('autor', models.CharField(max_length=100)),
                ('anho_creacion', models.CharField(max_length=4)),
            ],
        ),
        migrations.CreateModel(
            name='Tipo',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(default='N/A', max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.DecimalField(decimal_places=0, max_digits=10)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ventas_anime', to='dashboard.anime')),
            ],
        ),
        migrations.CreateModel(
            name='Estadistica',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('cantidad', models.PositiveIntegerField(default=0)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='animes', to='dashboard.anime')),
                ('tipo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tipos', to='dashboard.tipo')),
            ],
        ),
    ]
