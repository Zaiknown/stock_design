# products/forms.py
from django import forms
from .models import Product

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        # Define os campos do modelo que você quer no formulário
        fields = ['name', 'sku', 'description', 'quantity']