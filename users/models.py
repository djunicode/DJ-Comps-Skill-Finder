from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser,BaseUserManager
from django.core.mail import send_mail
from django.core.validators import MinLengthValidator, MaxLengthValidator

# Create your models here.

class Skill(models.Model):
    skill = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.skill



class UserManager(BaseUserManager):
    def create_user(self, email, sap_id, mobile, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError("Users must have an email address")
        if not sap_id:
            raise ValueError("Users must have an SAP ID")
        if not mobile:
            raise ValueError("Users must have an mobile no.")
        if not password:
            raise ValueError("Users must have a password")

        user_obj = self.model(
            email=self.normalize_email(email),
            sap_id=sap_id,
            mobile=mobile,
        )
        user_obj.set_password(password)  # change user password
        user_obj.staff = is_staff
        user_obj.admin = is_admin
        user_obj.active = is_active
        user_obj.save(using=self._db)
        return user_obj

    def create_staffuser(self, email, sap_id, mobile, password=None):
        user = self.create_user(
            email,
            sap_id=sap_id,
            mobile=mobile,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, email, sap_id, mobile, password=None):
        user = self.create_user(
            email,
            sap_id=sap_id,
            mobile=mobile,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user






class User(AbstractBaseUser):
    full_name = models.CharField(max_length=255, blank=True, null=True)
    sap_id = models.CharField(max_length=11, unique=True, validators=[MaxLengthValidator(11), MinLengthValidator(11)])
    mobile = models.CharField(max_length=10, unique=True, validators=[MaxLengthValidator(10), MinLengthValidator(10)])
    years = (('FE', 'First Year',),
             ('SE', 'Second Year'),
             ('TE', 'Third Year'),
             ('BE', 'Fourth Year'))
    year = models.CharField(max_length=2, choices=years, default='FE')
    photo = models.FileField(null=True, blank=True)
    skill_1 = models.ForeignKey(Skill, on_delete=models.CASCADE, null=True, blank=True, related_name='skill_1')
    skill_2 = models.ForeignKey(Skill, on_delete=models.CASCADE, null=True, blank=True, related_name='skill_2')
    skill_3 = models.ForeignKey(Skill, on_delete=models.CASCADE, null=True, blank=True, related_name='skill_3')
    email = models.EmailField(max_length=255, unique=True, null=False, blank=False)
    active = models.BooleanField(default=True)  # can login
    staff = models.BooleanField(default=False)  # staff user non superuser
    admin = models.BooleanField(default=False)  # superuser

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['sap_id', 'mobile']

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)