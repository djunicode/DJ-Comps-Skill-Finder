from django import forms
from .models import MentorRequest, Project, Skill


class MentorRequestForm(forms.ModelForm):
    class Meta():
        model = MentorRequest
        fields = ['message']

class ProjectForm(forms.ModelForm):
    all_skills = Skill.objects.all()
    skills_used = forms.ModelMultipleChoiceField(queryset=all_skills, widget=forms.CheckboxSelectMultiple, label='Skills Used')
    class Meta:
        model = Project
        fields = ['name', 'skills_used', 'description', 'link']
