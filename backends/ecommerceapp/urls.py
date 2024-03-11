from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from . import views

urlpatterns = [
    path('', views.getRoutes, name="getRoutes"),
    path('products/', views.getProducts, name="getProducts"),
    path('product/<str:pk>', views.getProduct, name="getProduct"),
    path('users/login/', TokenObtainPairView.as_view(serializer_class=views.MyTokenObtainPairSerializer), name='token_obtain_pair'),
    path('user/profile/', views.getUserProfile, name="getUserProfile"),
    path('users/', views.getUsers, name="getUsers"),
    path('users/register/', views.registerUser, name="registerUser"),
    path('activate/<uidb64>/<token>', views.ActivateAccountView.as_view(), name="activate"),
]