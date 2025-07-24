from django import forms
from .models import Product
from ckeditor.widgets import CKEditorWidget 

class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorWidget(), label="Descrição", required=False)

    class Meta:
        model = Product
        fields = ['name', 'sku', 'description', 'quantity', 'image']