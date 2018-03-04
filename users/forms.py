from django import forms
from .models import MentorRequest, HackathonTeam, HackathonTeamRequest, Skill, Project
from django.core.exceptions import ValidationError
from .models import ProjectTeam, ProjectTeamRequest


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


class HackathonTeamForm(forms.ModelForm):
    class Meta:
        model = HackathonTeam
        exclude = ['leader', 'current_members', 'closed']

    def clean(self):
        cleaned_data = super(HackathonTeamForm, self).clean()
        if HackathonTeam.objects.filter(hackathon=cleaned_data.get("hackathon"),
                                        name=cleaned_data.get("name")).exists():
            raise forms.ValidationError("A team with the same name already exists.")
        return cleaned_data


class HackathonTeamRequestForm(forms.ModelForm):
    skills = forms.ModelMultipleChoiceField(queryset=None)

    def __init__(self, team=None, *args, **kwargs):
        super(HackathonTeamRequestForm, self).__init__(*args, **kwargs)
        if team:
            self.fields['skills'].queryset = team.skills_required

    class Meta:
        model = HackathonTeamRequest
        fields = ['skills', 'message']


class ProjectTeamForm(forms.ModelForm):
    class Meta:
        model = ProjectTeam
        exclude = ['leader', 'current_members', 'closed', 'project']

    def clean(self):
        cleaned_data = super(ProjectTeamForm, self).clean()
        # Allowing only one team per project
        if ProjectTeam.objects.filter(project=cleaned_data.get("project")).exists():
            raise forms.ValidationError("A project team already exists for this project.")
        return cleaned_data


class ProjectTeamRequestForm(forms.ModelForm):
    skills = forms.ModelMultipleChoiceField(queryset=None)

    def __init__(self, team=None, *args, **kwargs):
        super(ProjectTeamRequestForm, self).__init__(*args, **kwargs)
        if team:
            self.fields['skills'].queryset = team.skills_required

    class Meta:
        model = ProjectTeamRequest
        fields = ['skills', 'message']
