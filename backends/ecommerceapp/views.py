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
from django.contrib.auth.hashers import make_password
from rest_framework import status

#for sending mails and generating token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import generate_token, TokenGenerator
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View

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

@api_view(['POST'])
def registerUser(request):
    data=request.data
    try:
        user=User.objects.create(
            first_name=data['firstName'],
            last_name=data['lastName'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password']),
            is_active=False,
            is_staff=False
        )
        
        #generate token for sending mail
       
        email_subject = "Activate Your Account"
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = generate_token.make_token(user)

        message_content = render_to_string(
            "activate.html",
            {   
                'user': user,
                'domain': '127.0.0.1:8000',
                'uid': uid,
                'token': token
            }
        )
        email_message=EmailMessage(email_subject,message_content,settings.EMAIL_HOST_USER, [data['email']])
        email_message.send()
        serializedUser = UserSerializedWithToken(user, many=False)

        return Response(serializedUser.data,status=status.HTTP_200_OK)
    except Exception as e:
        message={'Error Message': str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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

class ActivateAccountView(View):
    def get(self,request,uidb64,token):
        try:
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as e:
            user=None
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefailed.html")