from .products import products
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializer import ProductSerializer

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