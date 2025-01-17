from rest_framework import generics
from .models import *
from .serializers import *


class SpendingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
