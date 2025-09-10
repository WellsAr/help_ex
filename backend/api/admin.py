from django.contrib import admin
from .models import User, Project, Submission, Comment

admin.site.register(User)
admin.site.register(Project)
admin.site.register(Submission)
admin.site.register(Comment)