# products/views.py

from django.shortcuts import render, redirect, get_object_or_404
from .models import Product
from .forms import ProductForm

# VIEW 1: Listar produtos
def product_list_view(request):
    products = Product.objects.all().order_by('name')
    context = {
        'products': products
    }
    return render(request, 'product_list.html', context)

# VIEW 2: Criar produtos
def product_create_view(request):
    form = ProductForm()
    if request.method == 'POST':
        form = ProductForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('product-list')
    context = {
        'form': form
    }
    return render(request, 'product_form.html', context)

# VIEW 3: Atualizar produtos
def product_update_view(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, instance=product)
        if form.is_valid():
            form.save()
            return redirect('product-list')
    else:
        form = ProductForm(instance=product)
    context = {
        'form': form
    }
    return render(request, 'product_form.html', context)

def product_delete_view(request, pk):
    # Busca o produto a ser deletado
    product = get_object_or_404(Product, pk=pk)

    # Se a requisição for POST, o usuário confirmou a deleção
    if request.method == 'POST':
        product.delete()
        # Redireciona para a lista de produtos
        return redirect('product-list')

    # Se a requisição for GET, apenas mostra a página de confirmação
    context = {
        'product': product
    }
    return render(request, 'product_confirm_delete.html', context)

def credits_view(request):
    return render(request, 'credits.html')