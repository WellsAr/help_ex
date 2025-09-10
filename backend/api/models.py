from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Extend default Django user to include role
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('supervisor', 'Supervisor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.username} ({self.role})"


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    student = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="student_projects"
    )
    supervisor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="supervised_projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Submission(models.Model):
    project = models.ForeignKey(
        'Project', on_delete=models.CASCADE, related_name='submissions'
    )
    file = models.FileField(upload_to='submissions/')
    version = models.PositiveIntegerField(default=1)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Auto-increment version if a new submission for this project exists
        if not self.pk:  # Only when creating a new submission
            last_submission = Submission.objects.filter(project=self.project).order_by('-version').first()
            if last_submission:
                self.version = last_submission.version + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.project.title} - v{self.version}"


class Comment(models.Model):
    submission = models.ForeignKey(
        'Submission', on_delete=models.CASCADE, related_name='comments'
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments'
    )
    text = models.TextField()
    selection_range = models.JSONField(null=True, blank=True)  # store highlighted text positions
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author.username} on v{self.submission.version}"
