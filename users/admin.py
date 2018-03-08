from django.contrib import admin
from .models import CustomUser, Skill, MentorRequest, Relationship, Project
from .models import Hackathon, HackathonTeam, HackathonTeamRequest
from .models import ProjectTeam, ProjectTeamRequest

admin.site.register(CustomUser)
admin.site.register(Skill)
admin.site.register(MentorRequest)
admin.site.register(Relationship)
admin.site.register(Project)
admin.site.register(Hackathon)
admin.site.register(HackathonTeam)
admin.site.register(HackathonTeamRequest)
admin.site.register(ProjectTeam)
admin.site.register(ProjectTeamRequest)
