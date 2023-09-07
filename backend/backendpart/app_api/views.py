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



from rest_framework.views import APIView,exception_handler
from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from .RegisterSerializer import RegisterSerializer
from .LoginSerializer import LoginSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import PDFDocument
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from .PdfDocumentSerializer import PDFDocumentSerializer
from .Data import PdfUtils
from django.contrib.auth.models import User


def home(request):
    return HttpResponse("Hello World!")

# @api_view(['POST'])
class LoginView(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            # try:
            #     user  = User.objects.get(username=username,password=password)
            # except:
            #     return Response({'message' : 'You need to register first'})    
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
            else:
                return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                user.is_superuser = True  # Make the user a superuser
                user.save()
                return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                print("Exception:", e)
                return Response({'message': 'Error during registration'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print("Validation errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        request.auth.delete()
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    
@api_view(['POST'])
@csrf_exempt
def upload_pdf(request):
    if request.method == 'POST':
        title = request.POST.get('title', '')
        pdf_content = request.FILES.get('file')
        print(title)
        print(pdf_content)
        if pdf_content:
            pdf_reader = PdfReader(pdf_content)
            text_content = ""
            for page in pdf_reader.pages:
                text_content += page.extract_text()
            # print("this is text ==========================",text_content)
            PdfUtils.data = text_content
            print(PdfUtils.data)
            # Convert pdf_content to text and process as needed
            # For example, you can use libraries like PyMuPDF or pdf2txt to extract text
            
            # Save the PDFDocument instance to the database
            pdf_document = PDFDocument.objects.create(
                title=title,
                # uploaded_by=None,  # Since there's no authentication, set uploaded_by to None
                embedding=text_content  # Replace this with the extracted text content
            )
            print(pdf_content)
            print("pdf success")
            return Response({'message': 'PDF uploaded successfully'})
        else:
            print("pdf not find")
            return Response({'message': 'PDF file not provided'}, status=400)

    print("invalid")
    return Response({'message': 'Invalid request method'}, status=405)


class PDFDetailView(APIView):
    def get(self, request, pk, format=None):
        try:
            pdf_document = PDFDocument.objects.get(pk=pk)
            serializer = PDFDocumentSerializer(pdf_document)
            PdfUtils.data = serializer.data['embedding']
            print(PdfUtils.data)
            print(type(PdfUtils.data))
            return Response({'embedding': pdf_document.embedding,'message':"success"})
        except PDFDocument.DoesNotExist:
            return Response({'message': 'PDF not found'}, status=status.HTTP_404_NOT_FOUND)
        

class AskQuestionView(APIView):
    def post(self, request, format=None):
        question = request.data.get('question', '')

        if question:
            load_dotenv()
            print("before divide into chunks", PdfUtils.data)
            text_splitter = CharacterTextSplitter(
                separator="\n",
                chunk_size = 1000,
                chunk_overlap = 200,
                length_function = len
            )

            chunks = text_splitter.split_text(PdfUtils.data)
            embeddings = OpenAIEmbeddings()
            document = FAISS.from_texts(chunks,embeddings)
            similarSearch = document.similarity_search(question)
            print(similarSearch)
            llm = OpenAI()
            chain = load_qa_chain(llm,chain_type="stuff")
            answer = chain.run(input_documents=similarSearch,question=question)


            # print(answer)  # Print answer_array for debugging

            
            # print('Received question:', question)
            return Response({'answer': answer}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Question not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
class AskQuestionViewWithPdfId(APIView):
    def get(self, request, format=None):
        pdf_id = request.query_params.get('pdfId', None)
        if pdf_id:
            try:
                pdf_document = PDFDocument.objects.get(pk=pdf_id)
                PdfUtils.data = pdf_document.embedding
                print("this is history click event ")
                print(PdfUtils.data)
                # Process the PDF content and return the response as needed
                # For example, you can extract questions and answers here

                return Response({'message': "Successfully retrieved PDF content",'title':pdf_document.title}, status=status.HTTP_200_OK)

            except PDFDocument.DoesNotExist:
                return Response({'message': 'PDF not found'}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'message': 'Invalid data provided'}, status=status.HTTP_400_BAD_REQUEST)

class PDFHistoryView(APIView):
    def get(self, request, format=None):
        pdf_documents = PDFDocument.objects.all().order_by('-upload_date')
        pdf_history = []

        for pdf_document in pdf_documents:
            serializer = PDFDocumentSerializer(pdf_document)
            pdf_entry = {
                'id': pdf_document.id,
                'title': pdf_document.title,
                # 'uploaded_by': pdf_document.uploaded_by.username,
                'upload_date': pdf_document.upload_date,
                'embeddings': pdf_document.embedding,
                'questions_and_answers': []  # Populate this list with questions and answers
            }
            pdf_history.append(pdf_entry)

        return Response(pdf_history)
