from django.urls import path, include
from .views import *

urlpatterns = [
    path("auth/", include("rest_framework.urls")),
    path("spending/", SpendingListCreateAPIView.as_view()),
    path("category/", CategoryListCreateAPIView.as_view()),
]