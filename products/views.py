from django.shortcuts import render, redirect, get_object_or_404
from .models import Product
from .forms import ProductForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum, Count
from django.db.models import Q
from django.forms.models import model_to_dict
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
import random
import string

@login_required
def product_list_view(request):
    query = request.GET.get('q')

    products = Product.objects.all().order_by('name')

    if query:
        products = products.filter(
            Q(name__icontains=query) | Q(sku__icontains=query)
        )

    context = {
        'products': products
    }
    return render(request, 'product_list.html', context)

@login_required
def product_create_view(request):
    form = ProductForm()
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'Produto adicionado com sucesso!')
            return redirect('product-list')
    context = {
        'form': form
    }
    return render(request, 'product_form.html', context)

@login_required
def product_update_view(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, 'Produto atualizado com sucesso!')
            return redirect('product-list')
    else:
        form = ProductForm(instance=product)
    context = {
        'form': form
    }
    return render(request, 'product_form.html', context)

@login_required
def product_delete_view(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        messages.warning(request, 'Este produto não existe mais ou já foi deletado.')
        return redirect('product-list')

    if request.method == 'POST':
        product_data = model_to_dict(product)
        if product.image:
            product_data['image'] = product.image.name
        else:
            product_data['image'] = None

        request.session['recently_deleted_product'] = product_data

        product_name = product.name
        product.delete()

        undo_url = reverse('product-undo-delete')
        message_text = f'Produto "{product_name}" deletado. <a href="{undo_url}" class="alert-link">Desfazer</a>'
        messages.success(request, mark_safe(message_text), extra_tags='danger undo-alert')

        return redirect('product-list')

    context = {
        'product': product
    }
    return render(request, 'product_confirm_delete.html', context)

def credits_view(request):
    return render(request, 'credits.html')

@login_required
def dashboard_view(request):
    total_products = Product.objects.count()
    total_items_in_stock = Product.objects.aggregate(total_sum=Sum('quantity'))
    low_stock_products = Product.objects.filter(quantity__lte=5).order_by('quantity')

    context = {
        'total_products': total_products,
        'total_items_in_stock': total_items_in_stock['total_sum'] or 0,
        'low_stock_products': low_stock_products,
    }
    return render(request, 'dashboard.html', context)

@login_required
def undo_delete_view(request):
    deleted_product_data = request.session.get('recently_deleted_product')

    if deleted_product_data:
        deleted_product_data.pop('id', None) 
        Product.objects.create(**deleted_product_data)
        del request.session['recently_deleted_product']
        messages.success(request, 'Ação desfeita! O produto foi restaurado.')
    else:
        messages.warning(request, 'Nenhuma ação para desfazer.')

    return redirect('product-list')

def search_products_api(request):
    query = request.GET.get('q', '')
    products = []
    if query:
        product_queryset = Product.objects.filter(
            Q(name__icontains=query) | Q(sku__icontains=query)
        ).order_by('name')
        products = list(product_queryset.values('id', 'name', 'sku', 'quantity'))
    return JsonResponse({'products': products})

@login_required
def product_detail_view(request, pk):
    product = get_object_or_404(Product, pk=pk)
    context = {
        'product': product
    }
    return render(request, 'product_detail.html', context)

def register_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Cadastro realizado com sucesso! Você já está logado.')
            return redirect('dashboard')
    else:
        form = UserCreationForm()

    context = {
        'form': form
    }
    return render(request, 'register.html', context)

@login_required
def generate_random_products_view(request):
    if request.method == 'POST':
        adjectives = ['Potente', 'Elegante', 'Moderno', 'Compacto', 'Profissional', 'Gamer', 'Sem Fio', 'Inteligente']
        nouns = ['Notebook', 'Mouse', 'Teclado', 'Monitor', 'Cadeira', 'Headset', 'Webcam', 'Microfone']
        descriptions = [
            'Um produto de alta qualidade, projetado para durar e oferecer a melhor experiência.',
            'Ideal para setups profissionais e para quem busca performance e design.',
            'A escolha perfeita para o dia a dia, combinando funcionalidade e estilo.',
            'Feito com materiais premium, este item vai superar suas expectativas.'
        ]

        num_to_create = random.randint(1, 3)
        products_created = 0

        for _ in range(num_to_create):
            name = f"{random.choice(nouns)} {random.choice(adjectives)}"
            quantity = random.randint(1, 150)
            description = random.choice(descriptions)

            while True:
                sku = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
                if not Product.objects.filter(sku=sku).exists():
                    break
            Product.objects.create(
                name=name,
                sku=sku,
                description=description,
                quantity=quantity
            )
            products_created += 1

        messages.success(request, f'{products_created} produto(s) aleatório(s) foram adicionado(s) com sucesso!')

    return redirect('product-list')