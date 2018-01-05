__author__ = 'Parth Shah'

from users.models import User, Skill
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.validators import MinLengthValidator, MaxLengthValidator


class LoginForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput)
    email = forms.EmailField(widget=forms.EmailInput)

    class Meta:
        model = User
        fields = ['email', 'password']



class RegistrationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    email = forms.EmailField(widget=forms.EmailInput)
    sap_id = forms.CharField(validators=[MaxLengthValidator(11), MinLengthValidator(11)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    mobile = forms.CharField(validators=[MaxLengthValidator(10), MinLengthValidator(10)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))

    class Meta:
        model = User
        fields = ['email', 'sap_id', 'mobile']


    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2


    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(RegistrationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        #active = False #Incase want to use email verification method for first login.
        if commit:
            user.save()
        return user


class UpdationForm(forms.ModelForm):
    all_skills = Skill.objects.all()
    full_name = forms.CharField()
    photo = forms.FileField()
    email = forms.EmailField(widget=forms.EmailInput)
    sap_id = forms.CharField(validators=[MaxLengthValidator(11), MinLengthValidator(11)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    mobile = forms.CharField(validators=[MaxLengthValidator(10), MinLengthValidator(10)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    #year = forms.ModelChoiceField(queryset=User.years, label='Enter the Course Year', required=True, initial='First Year')
    skill_1 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 1st Skill', required=False)
    skill_2 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 2nd Skill', required=False)
    skill_3 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 3rd Skill', required=False)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'mobile', 'photo', 'year', 'sap_id', 'skill_1', 'skill_2', 'skill_3']


'''
class SkillAdditionForm(forms.ModelForm):
    all_skills = Skill.objects.all()
    skill_1 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 1st Skill', required=False)
    skill_2 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 2nd Skill', required=False)
    skill_3 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 3rd Skill', required=False)

    class Meta:
        model = User
        fields = ['skill_1', 'skill_2', 'skill_3']
'''

class UserAdminCreationForm(forms.ModelForm):
    #for creating user in Admin
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)
    sap_id = forms.CharField(validators=[MaxLengthValidator(11), MinLengthValidator(11)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    mobile = forms.CharField(validators=[MaxLengthValidator(10), MinLengthValidator(10)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))

    class Meta:
        model = User
        fields = ['email', 'sap_id', 'mobile', 'password',]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserAdminCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user



class UserAdminChangeForm(forms.ModelForm):
    #for user updation in Admin
    all_skills = Skill.objects.all()
    password = ReadOnlyPasswordHashField()
    full_name = forms.CharField()
    photo = forms.FileField()
    email = forms.EmailField(widget=forms.EmailInput)
    sap_id = forms.CharField(validators=[MaxLengthValidator(11), MinLengthValidator(11)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    mobile = forms.CharField(validators=[MaxLengthValidator(10), MinLengthValidator(10)], widget=forms.TextInput(attrs={'pattern': '[0-9]+'}))
    # year = forms.ModelChoiceField(queryset=User.years, label='Enter the Course Year', required=True, initial='First Year')
    skill_1 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 1st Skill', required=False)
    skill_2 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 2nd Skill', required=False)
    skill_3 = forms.ModelChoiceField(queryset=all_skills, label='Enter your 3rd Skill', required=False)
    class Meta:
        model = User
        fields = ('full_name', 'email', 'password',  'mobile', 'photo', 'year', 'sap_id', 'skill_1', 'skill_2', 'skill_3', 'active', 'admin')

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]
