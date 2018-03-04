from django.contrib import admin
from .models import CustomUser, Skill, Interest, Project, MentorRequest, Relationship

admin.site.register(CustomUser)
admin.site.register(Skill)
admin.site.register(Interest)
admin.site.register(Project)
admin.site.register(MentorRequest)
admin.site.register(Relationship)
