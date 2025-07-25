# Generated by Django 5.2.4 on 2025-07-22 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Nome')),
                ('sku', models.CharField(max_length=100, unique=True, verbose_name='SKU')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Descrição')),
                ('quantity', models.PositiveIntegerField(default=0, verbose_name='Quantidade em Estoque')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
