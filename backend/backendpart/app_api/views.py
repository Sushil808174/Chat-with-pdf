# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from django.shortcuts import HttpResponse
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth import authenticate, login
# from django.views.decorators.csrf import csrf_exempt
# from .serializers import RegisterSerializer

# def home(request):
#     return HttpResponse("Hello World!")

# @api_view(['POST'])
# @csrf_exempt
# def register_view(request):
#     if request.method == 'POST':
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# @csrf_exempt
# def login_view(request):
#     if request.method == 'POST':
#         username = request.data.get('username')
#         password = request.data.get('password')
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             login(request, user)
#             return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
#         return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



from rest_framework.views import APIView
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .RegisterSerializer import RegisterSerializer
from .LoginSerializer import LoginSerializer

def home(request):
    return HttpResponse("Hello World!")

# @api_view(['POST'])
# @csrf_exempt
class LoginView(APIView):
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['email'], password=serializer.validated_data['password'])
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)