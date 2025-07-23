# products/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list_view, name='product-list'),
    path('add/', views.product_create_view, name='product-add'),
    path('edit/<int:pk>/', views.product_update_view, name='product-update'),
    path('delete/<int:pk>/', views.product_delete_view, name='product-delete'),
    path('credits/', views.credits_view, name='credits'),
]