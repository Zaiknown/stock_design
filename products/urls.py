from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('list/', views.product_list_view, name='product-list'),
    path('add/', views.product_create_view, name='product-add'),
    path('edit/<int:pk>/', views.product_update_view, name='product-update'),
    path('delete/<int:pk>/', views.product_delete_view, name='product-delete'),
    path('credits/', views.credits_view, name='credits'),
    path('undo-delete/', views.undo_delete_view, name='product-undo-delete'),
    path('api/search-products/', views.search_products_api, name='api-search-products'),
    path('product/<int:pk>/', views.product_detail_view, name='product-detail'),
    path('register/', views.register_view, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('generate-random/', views.generate_random_products_view, name='product-generate-random'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)