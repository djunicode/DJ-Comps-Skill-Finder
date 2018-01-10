from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


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
class User(AbstractUser):
    # Manually check uniqueness during input
    sap_id = models.CharField(max_length=15, unique=True)
    # Fixed format of mobile like 1234567890
    message = 'Phone number should be of 10 digits'
    phone_regex = RegexValidator(regex=r'^[1-9][0-9]{9}$', message=message)
    mobile = models.CharField(validators=[phone_regex], max_length=10, unique=True)
    photo = models.FileField(upload_to=path, blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    years = (
        ('FE', 'First Year'),
        ('SE', 'Second Year'),
        ('TE', 'Third Year'),
        ('BE', 'Fourth Year'),
    )
    year = models.CharField(max_length=2, choices=years, default='FE')
    skill_1 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_1')
    skill_2 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_2')
    skill_3 = models.ForeignKey(Skill, on_delete=models.SET_NULL, null=True, blank=True, related_name='skill_3')
