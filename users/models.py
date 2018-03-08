from django.db import models, IntegrityError
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from datetime import datetime
from django.urls import reverse


# Creating a Skill model for allowing a user to have multiple unique skills
class Skill(models.Model):
    skill = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.skill


# Creating a custom path for storing the user photos
# Example : /MEDIA_ROOT/photos/1234567890/abc.jpg
def path(instance, filename):
    return 'photos/{0}/{1}'.format(instance.mobile, filename)


# Creating a custom User model
class CustomUser(AbstractUser):
    # Manually check uniqueness during input
    sap_id = models.CharField(max_length=15, unique=True)
    mobile = models.CharField(max_length=10, unique=True)
    photo = models.FileField(upload_to=path, blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    years = (
        ('FE', 'First Year'),
        ('SE', 'Second Year'),
        ('TE', 'Third Year'),
        ('BE', 'Fourth Year'),
        ('AL', 'Alumini'),
    )
    year = models.CharField(max_length=2, choices=years, default='FE')
    is_mentor = models.BooleanField(default=False)
    skill_1 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_1')
    skill_2 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_2')
    skill_3 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_3')
    interest_1 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='interest_1')
    interest_2 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='interest_2')
    interest_3 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='interest_3')
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    behance_url = models.URLField(blank=True, null=True)
    stack_url = models.URLField(blank=True, null=True)


# class Interest(models.Model):
#     interest = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='skill_interests')
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_interests')
#     is_now_skill = models.BooleanField(default=False)
#
#     def __str__(self):
#         return self.user.username + ": " + self.interest.skill


class Project(models.Model):
    name = models.CharField(max_length=50)
    skills_used = models.ManyToManyField(Skill)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    description = models.CharField(max_length=200, null=True, blank=True)
    link = models.URLField(null=False, blank=False)

    def __str__(self):
        return self.name


# I need help here. Should the guy who created the project be the only one to create a project team? => YESSSS
class ProjectTeam(models.Model):
    name = models.CharField(max_length=30)
    leader = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='project_leader_teams')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='project_teams')
    current_members = models.ManyToManyField(CustomUser, related_name='member_project_teams')
    skills_required = models.ManyToManyField(Skill, related_name='project_requirements')
    vacancies = models.PositiveIntegerField(default=0)
    closed = models.BooleanField(default=False)
    description = models.TextField(max_length=300, null=True, blank=True)

    def __str__(self):
        return str(self.project.name) + ": " + self.name + ": " + str(self.leader.username)

    @classmethod
    def create(cls, name, leader, project, current_members=None, skills_required=None):
        team, created = cls.objects.get_or_create(name=name,
                                                  leader=leader,
                                                  project=project)
        if created:
            team.skills_required.add(skills_required)
        team.save()

    def add_member(self, member):
            self.current_members.add(member)
            self.save()


class ProjectTeamRequest(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='project_requests_sent')
    team = models.ForeignKey(ProjectTeam, on_delete=models.CASCADE, related_name='project_requests_received')
    skills = models.ManyToManyField(Skill, related_name='project_team_requests')
    created_on = models.DateTimeField(default=datetime.now)
    message = models.TextField(blank=True, null=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    def __str__(self):
        return self.sender.username + ' --> ' + self.team.name

    @classmethod
    def create(cls, sender, team, skills=None, message=''):
        request, created = cls.objects.get_or_create(sender=sender, team=team, message=message)
        if created:
            request.skills.add(skills)
        request.save()

    def accept(self):
        self.accepted = True
        self.save()

    def reject(self):
        self.rejected = False
        self.save()


class Hackathon(models.Model):
    name = models.CharField(max_length=100)
    url = models.URLField(null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    date = models.DateField(blank=True, null=True)  # Keeping it null and blank just to simplify creation of Hackathons
    created_on = models.DateTimeField(default=datetime.now)
    creator = models.ForeignKey(CustomUser, null=True, blank=True, on_delete=models.SET_NULL, related_name='hackathons')

    def __str__(self):
        return self.name

    @classmethod
    def create(cls, creator, name, date=None, url=None, description=''):
        hackathon, created = cls.objects.get_or_create(name=name,
                                                       date=date,
                                                       url=url,
                                                       description=description,
                                                       creator=creator)
        if created:
            hackathon.save()

    def add_member(self, member):
        self.current_members.add(member)
        self.save()


class HackathonTeam(models.Model):
    name = models.CharField(max_length=30)
    leader = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='leader_teams')
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name='hack_teams')
    vacancies = models.PositiveIntegerField(default=0)
    current_members = models.ManyToManyField(CustomUser, related_name='member_teams')
    skills_required = models.ManyToManyField(Skill, related_name='hack_requirements')
    cutoff_date = models.DateTimeField(null=True, blank=True)  # Someone may not wish to have a cut-off date
    closed = models.BooleanField(default=False)
    description = models.TextField(max_length=300, blank=True, null=True)

    def __str__(self):
        return self.hackathon.name + ": " + self.name

    @classmethod
    def create(cls, name, leader, hackathon, current_members=None, skills_required=None, cutoff_date=None, vacancies=0):
        team, created = cls.objects.get_or_create(name=name,
                                                  leader=leader,
                                                  hackathon=hackathon,
                                                  vacancies=vacancies,
                                                  cutoff_date=cutoff_date)
        if created:
            team.skills_required.add(skills_required)
        team.save()

    def add_member(self, member):
            self.current_members.add(member)
            self.save()


class HackathonTeamRequest(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='hack_requests_sent')
    team = models.ForeignKey(HackathonTeam, on_delete=models.CASCADE, related_name='hack_requests_received')
    skills = models.ManyToManyField(Skill, related_name='hack_team_requests')
    created_on = models.DateTimeField(default=datetime.now)
    message = models.TextField(blank=True, null=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    def __str__(self):
        return self.sender.username + ' --> ' + self.team.name

    @classmethod
    def create(cls, sender, team, skills=None, message=''):
        request, created = cls.objects.get_or_create(sender=sender, team=team, message=message)
        if created:
            request.skills.add(skills)
        request.save()

    def accept(self):
        self.accepted = True
        self.save()

    def reject(self):
        self.rejected = False
        self.save()


class MentorRequest(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='requests_sent')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='requests_received')
    skill = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='requests')
    created_on = models.DateTimeField(default=datetime.now)
    message = models.TextField(blank=True, null=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    def __str__(self):
        return self.sender.username + " --> " + self.receiver.username

    @classmethod
    def create_request(cls, sender, receiver, skill, message=''):
        mentor_request, created = MentorRequest.objects.get_or_create(sender=sender,
                                                                      receiver=receiver,
                                                                      message=message,
                                                                      skill=skill,
                                                                      accepted=False,
                                                                      rejected=False)

    def accept(self):
        self.accepted = True

    def reject(self):
        self.rejected = True


class RelationshipManager(models.Manager):

    def get_all_mentees(self, user):
        try:
            mentees = Relationship.objects.filter(mentor=user).all()
        except Relationship.DoesNotExist:
            mentees = []
        return mentees

    def get_all_mentors(self, user):
        try:
            mentors = Relationship.objects.filter(mentee=user).all()
        except Relationship.DoesNotExist:
            mentors = []
        return mentors

    def add_relationship(self, mentor, mentee, skill):
        if mentor == mentee:
            raise ValidationError("Users cannot mentor themselves")

        relation, created = Relationship.objects.get_or_create(mentor=mentor, mentee=mentee, skill=skill)

        if created is False:
            raise IntegrityError("Relationship Already Exists")

        return relation

    def remove_relationship(self, pk):
        try:
            relationship = Relationship.objects.get(pk=pk)
            relationship.delete()
            return True
        except Relationship.DoesNotExist:
            return False


class Relationship(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)
    mentor = models.ForeignKey(CustomUser, related_name='mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(CustomUser, related_name='mentee', on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, related_name='mentoring_skill', on_delete=models.CASCADE)

    objects = RelationshipManager()

    class Meta:
        unique_together = ('mentor', 'mentee')

    def __str__(self):
        return '%s mentors %s for %s' % (self.mentor, self.mentee, self.skill)

    def save(self, *args, **kwargs):
        if self.mentor == self.mentee:
            raise ValidationError("Users can not mentor themselves")
        super(Relationship, self).save(*args, **kwargs)
