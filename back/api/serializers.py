from rest_framework import serializers
from .models import *


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = CustomUser
    
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class SpendingSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Spending

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Category
