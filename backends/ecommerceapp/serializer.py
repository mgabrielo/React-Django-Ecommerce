from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        # fields= '__all__'
        fields= (
            'user',
            'productname',
            'image',
            'productbrand',
            'productcategory',
            'productinfo',
            'rating',
            'price',
            'stockcount',
            'numReviews',
            'createdAt',
            '_id',
        )

class UserSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField(read_only=True)
    id=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields= ('id', 'email', 'username', 'isAdmin', 'name')
    
    def get_name(self,obj):
        firstname=obj.first_name
        lastname=obj.last_name
        name= f"{firstname} {lastname}".strip()
        if not name :
            name='Set your Name'
            return name
        else:
            return name
    
    def get_id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff
    
class UserSerializedWithToken(serializers.ModelSerializer):
    token= serializers.SerializerMethodField(read_only=True)
    id=serializers.SerializerMethodField(read_only=True)
    name=serializers.SerializerMethodField(read_only=True)
    isAdmin=serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=User
        fields= ('id', 'email', 'username', 'name', 'isAdmin', 'token' )
    
    def get_token(self,obj):
        token= RefreshToken.for_user(obj)
        return str(token.access_token) 
    def get_name(self,obj):
        firstname=obj.first_name
        lastname=obj.last_name
        name= f"{firstname} {lastname}".strip()
        if not name :
            name='Set your Name'
            return name
        else:
            return name
    
    def get_id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff