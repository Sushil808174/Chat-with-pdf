from django.urls import path
from .views import RegisterView,LoginView
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
]
