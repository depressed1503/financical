from rest_framework import generics, views, permissions, response, status
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from .models import *
from .serializers import *


class SpendingListCreateAPIView(generics.ListCreateAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class SpendingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Spending.objects.all()
    serializer_class = SpendingSerializer

class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

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
                httponly=True,
                secure=False,
                samesite='Lax'
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
        resp = response.Response({"csrfToken": csrf_token}, status=status.HTTP_200_OK)
        resp.set_cookie(
            key='csrftoken',
            value=csrf_token,
            httponly=False,
            secure=False,
            samesite='Lax'
        )
        return resp

class CurrentUserView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return response.Response(data=CustomUserSerializer(self.request.user).data)
