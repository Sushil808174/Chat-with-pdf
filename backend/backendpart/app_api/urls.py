from django.urls import path
from .views import RegisterView,LoginView,LogoutView,PDFDetailView,AskQuestionView,PDFHistoryView,AskQuestionViewWithPdfId
from . import views
urlpatterns = [
    path('',views.home,name='home'),
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('upload-pdf/', views.upload_pdf, name='upload_pdf'),
    path('pdf/<int:pk>/', PDFDetailView.as_view(), name='pdf-detail'),
    path('ask-question/', AskQuestionView.as_view(), name='ask-question'),
    path('ask-question-withId/', AskQuestionViewWithPdfId.as_view(), name='ask-question-withId'),
    path('pdf-history/', PDFHistoryView.as_view(), name='pdf-history'),
] 
