from django.urls import path, include
from .views import *


urlpatterns = [
    path("auth/", include("rest_framework.urls")),
    path("spending/", SpendingListCreateAPIView.as_view()),
    path("spending/<int:pk>", SpendingRetrieveUpdateDestroyAPIView.as_view()),
    path("category/", CategoryListCreateAPIView.as_view()),
    path("category/<int:pk>", CategoryRetrieveUpdateDestroyAPIView.as_view()),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("csrf/", CSRFTokenView.as_view()),
    path("registration/", RegistrationView.as_view()),
]