from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Nome")
    sku = models.CharField(max_length=100, unique=True, verbose_name="SKU")
    description = models.TextField(blank=True, null=True, verbose_name="Descrição")
    quantity = models.PositiveIntegerField(default=0, verbose_name="Quantidade em Estoque")

    image = models.ImageField(upload_to='product_images/', blank=True, null=True, verbose_name="Imagem do Produto")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name