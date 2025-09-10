# api/views.py
from rest_framework import generics
from .models import User, Project, Submission, Comment
from .serializers import UserSerializer, ProjectSerializer, SubmissionSerializer, CommentSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import permissions


# User list and detail
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Project list and detail
class ProjectListView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class SubmissionListCreateView(generics.ListCreateAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    parser_classes = (MultiPartParser, FormParser)

class SubmissionDetailView(generics.RetrieveDestroyAPIView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
