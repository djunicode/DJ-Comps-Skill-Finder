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
    )
    year = models.CharField(max_length=2, choices=years, default='FE')
    is_mentor = models.BooleanField(default=False)
    skill_1 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_1')
    skill_2 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_2')
    skill_3 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_3')
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    behance_url = models.URLField(blank=True, null=True)


class Interest(models.Model):
    interest = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='skill_interests')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user_interests')
    is_now_skill = models.BooleanField(default=False)

    def __str__(self):
        return self.interest.skill


class Project(models.Model):
    name = models.CharField(max_length=50)
    skills_used = models.ManyToManyField(Skill)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='creator')
    description = models.CharField(max_length=200, null=True, blank=True)
    link = models.URLField(null=False, blank=False)

    def get_absolute_url(self):
        return reverse('users:view_profile', kwargs={'pk': self.pk})


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
