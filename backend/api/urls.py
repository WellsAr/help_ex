# api/urls.py
from django.urls import path
from .views import (UserListView, UserDetailView, ProjectListView, ProjectDetailView, SubmissionListCreateView,
                     SubmissionDetailView, CommentListCreateView, CommentListCreateView, CommentDetailView)

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/<int:pk>/', ProjectDetailView.as_view(), name='project-detail'),
    path('submissions/', SubmissionListCreateView.as_view(), name='submission-list'),
    path('submissions/<int:pk>/', SubmissionDetailView.as_view(), name='submission-detail'),
    path('comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]
