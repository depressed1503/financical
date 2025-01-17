from rest_framework import serializers
from .models import *


class SpendingSerializer(serializers.ModelSerializer):
    class Meta:
        field = '__all__'
        model = Spending

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        field = '__all__'
        model = Category