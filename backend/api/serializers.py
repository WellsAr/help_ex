# api/serializers.py
from rest_framework import serializers
from .models import User, Project, Submission, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class ProjectSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    supervisor = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'student', 'supervisor', 'created_at']


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ['id', 'project', 'file', 'version', 'uploaded_at']



class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'submission', 'author', 'text', 'selection_range', 'created_at']
