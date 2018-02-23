from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.urls import reverse
from .models import CustomUser, Skill, MentorRequest, Relationship, Project, Interest
from .models import Hackathon, HackathonTeam, HackathonTeamRequest
from .models import ProjectTeam, ProjectTeamRequest
from django.contrib.auth.decorators import login_required
from .forms import MentorRequestForm, HackathonTeamForm, HackathonTeamRequestForm
from .forms import ProjectTeamForm, ProjectTeamRequestForm
import django_filters
from itertools import chain


def login(request):
    if request.user.is_authenticated:
            return render(request, 'users/test.html', {})
    else:
        if request.method == 'POST':
            username = request.POST.get('username', '')
            password = request.POST.get('password', '')
            user = authenticate(username=username, password=password)
            if user:
                if user.is_active:
                    auth_login(request, user)
                    if request.POST.get('next'):
                        return redirect(request.POST.get('next'))
                    return render(request, 'users/test.html', {})
                else:
                    error = 'The account has been disabled.'
                    return render(request, 'users/login.html',
                                  {'error': error})
            else:
                error = 'Invalid Username/Password'
                return render(request, 'users/login.html', {'error': error})
        else:
            return render(request, 'users/login.html', {})


def logout(request):
    auth_logout(request)
    return redirect(reverse('users:login'))


def register(request):
    if request.user.is_authenticated:
        return render(request, 'users/test.html', {})
    else:
        if request.method == 'POST':
            # Username and email fields will have the same data
            username = request.POST.get('email', '')
            password = request.POST.get('password', '')
            sap_id = request.POST.get('sap_id', '')
            mobile = request.POST.get('mobile')
            errors = {}
            # Check if no other user has the same email id
            if CustomUser.objects.filter(username=username).exists():
                errors['email_error'] = 'The email is already in use by another account.'
            # Check for uniqueness of SAP ID
            if CustomUser.objects.filter(sap_id=sap_id).exists():
                errors['sap_error'] = 'The SAP ID is already in use by another account.'
            # Check for uniqueness of Mobile No.
            if CustomUser.objects.filter(mobile=mobile).exists():
                errors['mobile_error'] = 'The mobile number is already in use by another account.'
            if len(errors) > 0:
                return render(request, 'users/register.html', errors)
            else:
                email = request.POST.get('email', '')
                first_name = request.POST.get('first_name', '')
                last_name = request.POST.get('last_name', '')
                user = CustomUser.objects.create(username=username, email=email, sap_id=sap_id, mobile=mobile,
                                                 first_name=first_name, last_name=last_name)
                user.is_superuser = False
                user.is_staff = False
                user.set_password(password)
                user.save()
                auth_login(request, user)
                return redirect('users:update_profile', pk=user.id)
        else:
            return render(request, 'users/register.html', {})


@login_required(login_url='users:login')
def view_profile(request, sap_id):
    user = get_object_or_404(CustomUser, sap_id=sap_id)
    requests_sent = user.requests_sent.filter(sender__sap_id=sap_id, accepted=False, rejected=False)
    requests_received = user.requests_received.filter(receiver__sap_id=sap_id, accepted=False, rejected=False)
    current_mentors = user.mentee.filter(mentee__sap_id=sap_id)
    current_mentees = user.mentor.filter(mentor__sap_id=sap_id)
    pending_requests = request.user.requests_sent.filter(accepted=False, rejected=False).count()
    context = {'user': user, 'requests_sent': requests_sent, 'requests_received': requests_received,
               'current_mentors': current_mentors, 'current_mentees': current_mentees,
               'pending_requests': pending_requests}
    return render(request, 'users/profile.html', context)


@login_required(login_url='users:login')
def update_profile(request):
    if request.method != 'POST':
        return render(request, 'users/update_profile.html', {})
    else:
        request.user.first_name = request.POST.get('first_name')
        request.user.last_name = request.POST.get('last_name')
        mobile = request.POST.get('mobile')
        sap_id = request.POST.get('sap_id')
        errors = {}
        if CustomUser.objects.filter(mobile=mobile).exists():
            if CustomUser.objects.filter(mobile=mobile)[0].id != request.user.id:
                errors['mobile_error'] = 'The mobile number is already in use by another account.'
        if CustomUser.objects.filter(sap_id=sap_id).exists():
            if CustomUser.objects.filter(sap_id=sap_id)[0].id != request.user.id:
                errors['sap_error'] = 'The SAP ID is already in use by another account.'
        if len(errors) > 0:
            return render(request, 'users/update_profile.html', errors)
        request.user.mobile = mobile
        request.user.sap_id = sap_id
        request.user.photo = request.FILES.get('photo', None)
        request.user.bio = request.POST.get('bio')
        request.user.year = request.POST.get('year')
        try:
            request.user.skill_1 = Skill.objects.get(skill=request.POST.get('skill_1'))
        except Skill.DoesNotExist:
            request.user.skill_1 = None
        try:
            request.user.skill_2 = Skill.objects.get(skill=request.POST.get('skill_2'))
        except Skill.DoesNotExist:
            request.user.skill_2 = None
        try:
            request.user.skill_3 = Skill.objects.get(skill=request.POST.get('skill_3'))
        except Skill.DoesNotExist:
            request.user.skill_3 = None
        # Adding interests, currently 3
        for i in range(3):
            try:
                s = 'interest_' + str(i + 1)
                interest = Skill.objects.get(skill=request.POST.get(s))
                interest = Interest.objects.create(interest=interest, user=request.user)
            except Skill.DoesNotExist:
                interest = None
        request.user.twitter_url = request.POST.get('twitter')
        request.user.linkedin_url = request.POST.get('linkedin')
        request.user.github_url = request.POST.get('github')
        request.user.behance_url = request.POST.get('behance')
        request.user.save()
        return redirect('users:view_profile', sap_id=sap_id)


@login_required(login_url='users:login')
def send_request(request, sap_id):
    if request.method == 'POST':
        receiver = get_object_or_404(CustomUser, sap_id=sap_id)
        if request.user.id == receiver.id:
            return redirect('users:view_profile', sap_id=request.user.sap_id)
        skill_id = request.POST.get('skill_set_select')
        try:
            skill = Skill.objects.get(id=skill_id)
        except Skill.DoesNotExist:
            skill = None
        MentorRequest.create_request(sender=request.user, receiver=receiver, skill=skill,
                                     message=request.POST.get('messsage', ''))
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:view_profile', sap_id=request.user.sap_id)


@login_required(login_url='users:login')
def accept_request(request, pk):
    if request.method == 'POST':
        mentor_request = get_object_or_404(MentorRequest, id=pk)
        mentor_request.accept()
        mentor_request.save()
        mentee = mentor_request.sender
        mentor = mentor_request.receiver
        skill = mentor_request.skill
        Relationship.objects.add_relationship(mentor, mentee, skill)
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:view_profile', sap_id=request.user.sap_id)


@login_required(login_url='users:login')
def reject_request(request, pk):
    if request.method == 'POST':
        mentor_request = get_object_or_404(MentorRequest, id=pk)
        mentor_request.reject()
        mentor_request.save()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:view_profile', sap_id=request.user.sap_id)


@login_required(login_url='users:login')
def cancel_request(request, pk):
    if request.method == 'POST':  # Improve security here by checking if the sender is the one logged in OR POST
        mentor_request = get_object_or_404(MentorRequest, id=pk)
        mentor_request.delete()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:view_profile', sap_id=request.user.sap_id)


@login_required
def terminate_relationship(request, pk, template_name='#'):
    if request.method == 'POST':
        try:
            relationship = Relationship.objects.get(id=pk)
            Relationship.objects.remove_relationship(pk)
            return redirect('users:view_profile', sap_id=request.user.sap_id)
        except (Relationship.DoesNotExist, CustomUser.DoesNotExist, Skill.DoesNotExist):
            return render(request, 'users/profile.html', {'error_message': 'Relationship Does not Exist'})

    return render(request, template_name, {'pk': pk})


def f7(seq):
    seen = set()
    seen_add = seen.add
    return [x for x in seq if not(x in seen or seen_add(x))]


@login_required(login_url='users:login')
def search(request):
    user = request.user
    qs = []
    queryset = CustomUser.objects.filter(is_mentor=True)
    if not request.GET.get('skill'):
        interests = user.user_interests.filter(is_now_skill=False)
        for i in interests:
            q1 = queryset.filter(skill_1=i.interest)
            q2 = queryset.filter(skill_2=i.interest)
            q3 = queryset.filter(skill_3=i.interest)
            qs += list(chain(q1, q2, q3))
        qs = f7(qs)
        return render(request, 'users/search.html', {'qs': qs, 'skills': Skill.objects.all()})
    skill = request.GET.get('skill')
    q1 = queryset.filter(skill_1__id=skill)
    q2 = queryset.filter(skill_2__id=skill)
    q3 = queryset.filter(skill_3__id=skill)
    qs = f7(list(chain(q1, q2, q3)))
    return render(request, 'users/search.html', {'qs': qs, 'skills': Skill.objects.all(), 's': int(skill)})


# @login_required(login_url='users:login')
# def add_hackathon(request):
#     if request.method == 'GET':
#         return render(request, 'users/create_hackathon.html', {})
#     name = request.POST.get('name')
#     url = request.POST.get('url')
#     date = request.POST.get('date')
#     if Hackathon.objects.filter(name__iexact=name, date=date).exists():
#         return render(request, 'users/create_hackathon.html', {'error': 'This Hackathon already exists.'})
#     elif Hackathon.objects.filter(url=url, date=date).exists():
#         return render(request, 'users/create_hackathon.html', {'error': 'This Hackathon already exists.'})
#     description = request.POST.get('description', '')
#     hackathon = Hackathon.create(request.user, name, date, url, description)
#     hackathon.save()
#     return redirect('users:view_hackathon', pk=hackathon.id)
#
#
# def view_hackathon(request, pk):
#     hackathon = get_object_or_404(Hackathon, id=pk)
#     return render(request, 'users/view_hackathon.html', {'hackathon': hackathon})

# if HackathonTeam.objects.filter(name__iexact=name, hackathon=hackathon).exists():
@login_required(login_url='users:login')
def add_hackathon_team(request):
    if request.method == 'POST':
        form = HackathonTeamForm(request.POST)
        if form.is_valid():
            team = form.save(commit=False)
            team.leader = request.user
            team.save()
            form.save_m2m()
            return redirect('users:view_hackathon_team', pk=team.id)
        else:
            return render(request, 'users/add_hackathon_team.html', {'form': form,
                                                                     'hackathons': Hackathon.objects.all(),
                                                                     'skills': Skill.objects.all(),
                                                                     'error': 'A team with the same name exists.'})
    else:
        form = HackathonTeamForm()
    return render(request, 'users/add_hackathon_team.html', {'form': form, 'hackathons': Hackathon.objects.all(),
                                                             'skills': Skill.objects.all()})


@login_required(login_url='users:login')
def view_hackathon_team(request, pk):
    team = get_object_or_404(HackathonTeam, id=pk)
    return render(request, 'users/view_hackathon_team.html', {'team': team})


@login_required(login_url='users:login')
def send_hackteam_request(request, pk):
    try:
        team = HackathonTeam.objects.get(id=pk)
    except HackathonTeam.DoesNotExist:  # redirecting to login as a placeholder
        return redirect('users:login')
    if request.user in team.current_members.all() or request.user == team.leader:
        return redirect('users:login')
    # Checking if a pending request exists
    if HackathonTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
        return redirect('users:login')
    if request.method == 'POST':
        form = HackathonTeamRequestForm(team, request.POST)  # This is a bit of a hack
        if form.is_valid():
            hack_request = form.save(commit=False)
            hack_request.sender = request.user
            hack_request.team = team
            hack_request.save()
            form.save_m2m()
            return redirect('users:view_hackathon_team', pk=pk)
    else:
        form = HackathonTeamRequestForm(team=team)
    return render(request, 'users/send_hackathon_team_request.html', {'form': form, 'team': team})


@login_required(login_url='users:login')
def accept_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.accepted = True
        hack_request.team.add_member(hack_request.sender)
        hack_request.save()
        return redirect('users:view_hackathon_team', pk=hack_request.team.id)
    return redirect('users:login')


@login_required(login_url='users:login')
def reject_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.rejected = True
        hack_request.save()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:login')


@login_required(login_url='users:login')
def cancel_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.delete()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:login')


@login_required(login_url='users:login')
def add_project_team(request, pk):
    try:
        project = Project.objects.get(id=pk)
    except Project.DoesNotExist:
        return redirect('users:login')
    if ProjectTeam.objects.filter(project=project):
        return redirect('users:login')
    if request.user != project.creator:
        return redirect('users:login')
    if request.method == 'POST':
        form = ProjectTeamForm(request.POST)
        print(form['skills_required'])
        if form.is_valid():
            team = form.save(commit=False)
            team.leader = request.user
            team.project = project
            team.save()
            form.save_m2m()
            return redirect('users:view_project_team', pk=team.id)
        else:
            return render(request, 'users/add_project_team.html', {'form': form, 'project': project})
    else:
        form = ProjectTeamForm()
    return render(request, 'users/add_project_team.html', {'form': form, 'project': project,
                                                           'skills': Skill.objects.all()})


@login_required(login_url='users:login')
def view_project_team(request, pk):
    team = get_object_or_404(ProjectTeam, id=pk)
    return render(request, 'users/view_project_team.html', {'team': team})


@login_required(login_url='users:login')
def send_project_team_request(request, pk):
    try:
        team = ProjectTeam.objects.get(id=pk)
    except ProjectTeam.DoesNotExist:  # redirecting to login as a placeholder
        return redirect('users:login')
    if request.user in team.current_members.all() or request.user == team.leader:
        return redirect('users:login')
    # Checking if a pending request exists
    if ProjectTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
        return redirect('users:login')
    if request.method == 'POST':
        form = ProjectTeamRequestForm(team, request.POST)  # This is a bit of a hack
        if form.is_valid():
            project_request = form.save(commit=False)
            project_request.sender = request.user
            project_request.team = team
            project_request.save()
            form.save_m2m()
            return redirect('users:view_project_team', pk=pk)
    else:
        form = ProjectTeamRequestForm(team=team)
    return render(request, 'users/send_project_team_request.html', {'form': form, 'team': team})


@login_required(login_url='users:login')
def accept_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.accepted = True
        project_request.team.add_member(project_request.sender)
        project_request.save()
        return redirect('users:view_project_team', pk=project_request.team.id)
    return redirect('users:login')


@login_required(login_url='users:login')
def reject_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.rejected = True
        project_request.save()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:login')


@login_required(login_url='users:login')
def cancel_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.delete()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:login')


# class UserFilter(django_filters.FilterSet):
#     skill = django_filters.ModelChoiceFilter(queryset=Skill.objects.all(), name='skill_1', label='Skill',method='chk')
#
#     # This is a hack, but it'll work till I can figure out a better way.
#     def chk(self, queryset, name, value):
#         q1 = queryset.filter(skill_1=value)
#         q2 = queryset.filter(skill_2=value)
#         q3 = queryset.filter(skill_3=value)
#         l1 = f7(list(chain(q1, q2, q3)))
#         return l1
#
#     class Meta:
#         model = CustomUser
#         fields = ['skill']
#
#     @property
#     def qs(self):
#         parent = super(UserFilter, self).qs
#         ans = []
#         for user in parent:
#             if user.is_mentor and user.mentor.all().count() < 3:
#                 ans.append(user)
#         return ans
#
#
# def search(request):
#     f = UserFilter(request.GET, queryset=CustomUser.objects.all())
#     return render(request, 'users/search.html', {'filter': f})
