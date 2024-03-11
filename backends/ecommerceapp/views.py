from .products import products
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Product
from django.contrib.auth.models import User
from .serializer import ProductSerializer, UserSerializer, UserSerializedWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAdminUser, IsAuthenticated

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello Scott')

@api_view(['GET'])
def getProducts(request):
    products= Product.objects.all()
    serializedProducts =ProductSerializer(products, many=True)
    return Response(serializedProducts.data)

@api_view(['GET'])
def getProduct(request, pk):
    product=Product.objects.get(_id=pk)
    serializedProduct=ProductSerializer(product, many=False)
    return Response(serializedProduct.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user= request.user
    serializedUser= UserSerializer(user, many=False)
    return Response(serializedUser.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user= User.objects.all()
    serializedUser= UserSerializer(user, many=True)
    return Response(serializedUser.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.username

        return token
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializedUser = UserSerializedWithToken(self.user).data
        for k,v in serializedUser.items():
            data[k] = v

        return data