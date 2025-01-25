import datetime
from rest_framework import generics, views, permissions, response, status, decorators
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from django.conf import settings
from .models import *
from .serializers import *

import logging

logger = logging.getLogger(__name__)


class SpendingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = SpendingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        if self.request.method == "GET":
            from_date = self.request.query_params.get("from")
            to_date = self.request.query_params.get("to")
            if from_date and to_date:
                return Spending.objects.filter(
                    timestamp__range=(
                        datetime.datetime.strptime(from_date, "%d.%m.%Y"),
                        datetime.datetime.strptime(to_date, "%d.%m.%Y"),
                    )
                )
            return Spending.objects.none()
        return Spending.objects.all()

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)
    
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user.id)

class SpendingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer
    permission_classes = [permissions.IsAuthenticated]


class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]


class RegistrationView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('login')
        password = request.data.get('password')

        if not username or not password:
            return response.Response(
                {"error": "Please provide both username and password."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            resp = response.Response({"message": "Login successful.", "user": CustomUserSerializer(user).data}, status=status.HTTP_200_OK)
            resp.set_cookie(
                key="sessionid",
                value=request.session._get_or_create_session_key(),
                domain="127.0.0.1" if settings.DEBUG else f'.{settings.HOST}'
            )
            return resp
        else:
            return response.Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )

class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return response.Response({"message": "Logout successful."}, status=status.HTTP_200_OK)

class CSRFTokenView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        csrf_token = get_token(request)
        resp = response.Response(status=status.HTTP_200_OK)
        resp.set_cookie(
            key='csrftoken',
            value=csrf_token,
            domain="127.0.0.1" if settings.DEBUG else f'.{settings.HOST}'
        )
        return resp

class CurrentUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return response.Response(data=CustomUserSerializer(self.request.user).data)

@decorators.api_view(["GET", "POST"])
def check_cookie_view(request):
    logger.error(request.META.get('HTTP_COOKIE'))
    logger.error(request.COOKIES.get("sessionid"))
    logger.error(request.COOKIES.get("csrftoken"))
    print(request.META.get('HTTP_COOKIE'))
    print(request.COOKIES.get("sessionid"))
    print(request.COOKIES.get("csrftoken"))
    return response.Response(status=status.HTTP_200_OK, data={
        "cookie": request.META.get('HTTP_COOKIE')
    })