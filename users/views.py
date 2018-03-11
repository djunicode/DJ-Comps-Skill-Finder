from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.urls import reverse
from .models import CustomUser, Skill, MentorRequest, Relationship, Project
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView, UpdateView, DeleteView
from itertools import chain
import json
from django.forms import model_to_dict
from django.core import serializers
from users.forms import ProjectForm
from .models import Hackathon, HackathonTeam, HackathonTeamRequest
from .models import ProjectTeam, ProjectTeamRequest
from .forms import MentorRequestForm, HackathonTeamForm, HackathonTeamRequestForm
from .forms import ProjectTeamForm, ProjectTeamRequestForm
# from django.db.models import Q


def process_user(u):
    current_user = model_to_dict(u)
    current_user['password'] = ''
    if current_user['photo']:
        current_user['photo'] = current_user['photo'].url
    # current_user = json.dumps(current_user, indent=4, default=str)
    return current_user


@ensure_csrf_cookie
def login(request):
    if request.user.is_authenticated:
        return render(request, 'users/test.html', {})
    else:
        if request.method == 'POST':
            if 'login' in request.POST:
                username = request.POST.get('email', '')
                password = request.POST.get('password', '')
                user = authenticate(username=username, password=password)
                if user:
                    if user.is_active:
                        auth_login(request, user)
                        if request.POST.get('next'):
                            return redirect(request.POST.get('next'))
                        return redirect('users:view_profile', sap_id=user.sap_id)
                    else:
                        error = 'The account has been disabled.'
                        return render(request, 'users/login.html',
                                      {'error': error})
                else:
                    error = 'Invalid Username/Password'
                    return render(request, 'users/login.html', {'error': error})
            elif 'register' in request.POST:
                # [TODO] Add a year field in both the front-end and the back-end
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
                    return render(request, 'users/login.html', errors)
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
                    return redirect('users:update_profile')
        else:
            return render(request, 'users/login.html', {})


def logout(request):
    auth_logout(request)
    return redirect(reverse('users:login'))


@login_required(login_url='users:login')
def view_profile(request, sap_id):
    context = {}
    user = get_object_or_404(CustomUser, sap_id=sap_id)
    context['user'] = json.dumps(process_user(user), indent=4, default=str)
    # requests_sent = user.requests_sent.filter(sender__sap_id=sap_id, accepted=False, rejected=False)
    # requests_received = user.requests_received.filter(receiver__sap_id=sap_id, accepted=False, rejected=False)
    # current_mentors = user.mentee.filter(mentee__sap_id=sap_id)
    # current_mentees = user.mentor.filter(mentor__sap_id=sap_id)
    if user.skill_1:
        context['skill1'] = user.skill_1.skill
    else:
        context['skill1'] = ''
    if user.skill_2:
        context['skill2'] = user.skill_2.skill
    else:
        context['skill2'] = ''
    if user.skill_3:
        context['skill3'] = user.skill_3.skill
    else:
        context['skill3'] = ''
    if user.interest_1:
        context['interest1'] = user.interest_1.skill
    else:
        context['interest1'] = ''
    if user.interest_2:
        context['interest2'] = user.interest_2.skill
    else:
        context['interest2'] = ''
    if user.interest_3:
        context['interest3'] = user.interest_3.skill
    else:
        context['interest3'] = ''
    # interests = Interest.objects.filter(user__sap_id=sap_id)
    # interests = [i.interest.skill for i in interests]
    # context['interests'] = json.dumps(interests, indent=4, default=str)
    projects = Project.objects.filter(creator__sap_id=sap_id)
    projects = [json.dumps(p, indent=4, default=str) for p in projects]
    context['projects'] = projects
    # context = {'user': user, 'requests_sent': requests_sent, 'requests_received': requests_received,
    #            'current_mentors': current_mentors, 'current_mentees': current_mentees, 'interests': interests,
    #            'projects': projects}
    print(context)
    return render(request, 'users/profile.html', {'prop': context})


# Test profile view
# @login_required(login_url='users:login')
# def view_profile(request, sap_id):
#     user = get_object_or_404(CustomUser, sap_id=sap_id)
#     return render(request, 'users/test.html', {'user': user, 'projects': Project.objects.filter(creator=user)})


@login_required(login_url='users:login')
def view_teams_landing(request):
    return render(request, 'users/teams_landing.html', {})


@login_required(login_url='users:login')
def view_dashboard(request):
    context = {}
    user = request.user
    context['user'] = json.dumps(process_user(request.user), indent=4, default=str)
    received = []
    sent = []
    for r in user.requests_received.filter(accepted=False, rejected=False):
        x = process_user(r.sender)
        if r.skill:
            x['skill'] = r.skill.skill
        else:
            x['skill'] = ''
        x['request_id'] = r.id
        received.append(x)
    for r in user.requests_sent.filter(accepted=False, rejected=False):
        x = process_user(r.receiver)
        x['request_id'] = r.id
        if r.skill:
            x['skill'] = r.skill.skill
        else:
            x['skill'] = ''
        sent.append(x)
    received = json.dumps(received, indent=4, default=str)
    sent = json.dumps(sent, indent=4, default=str)
    context['mentor_requests_received'] = received
    context['mentor_requests_sent'] = sent
    received_hackathon_requests = []
    for team in request.user.leader_teams.all():
        for r in team.hack_requests_received.filter(accepted=False, rejected=False):
            x = model_to_dict(r)
            x['team_name'] = team.name
            x['sender_name'] = r.sender.first_name
            x['sender_sap'] = r.sender.sap_id
            x['hackathon_name'] = team.hackathon.name
            received_hackathon_requests.append(x)
    sent_hackathon_requests = request.user.hack_requests_sent.filter(accepted=False, rejected=False)
    temp = []
    for r in sent_hackathon_requests:
        x = model_to_dict(r)
        x['team_name'] = r.team.name
        x['leader_name'] = r.team.leader.first_name
        x['hackathon_name'] = r.team.hackathon.name
        temp.append(x)
    context['hackathon_requests_received'] = json.dumps(received_hackathon_requests, indent=4, default=str)
    context['hackathon_requests_sent'] = json.dumps(temp, indent=4, default=str)
    received_project_requests = []
    for team in request.user.project_leader_teams.all():
        for r in team.project_requests_received.filter(accepted=False, rejected=False):
            x = model_to_dict(r)
            x['team_name'] = team.name
            x['sender_name'] = r.sender.first_name
            x['sender_sap'] = r.sender.sap_id
            x['project_name'] = team.project.name
            received_project_requests.append(x)
    sent_project_requests = request.user.project_requests_sent.filter(accepted=False, rejected=False)
    temp = []
    for r in sent_project_requests:
        x = model_to_dict(r)
        x['team_name'] = r.team.name
        x['leader_name'] = r.team.leader.first_name
        x['project_name'] = r.team.project.name
        temp.append(x)
    context['project_requests_received'] = json.dumps(received_project_requests, indent=4, default=str)
    context['project_requests_sent'] = json.dumps(temp, indent=4, default=str)
    return render(request, 'users/dashboard.html', {'prop': context})


@login_required(login_url='users:login')
def mentor(request):
    user = request.user
    sap_id = user.sap_id
    print("skks")
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
        skill_set = Skill.objects.all().order_by('skill')
        list_skill = {}
        skills = []
        reverse_link = {}
        # for skill in skill_set:
        #     skills[str(skill.pk)] = skill.skill
        # # skill_set = list(skill_set)
        # # skill_set = serializers.serialize('json', skill_set)
        # # print(skill_set)
        # print(skills)
        for skill in skill_set:
            skills.append({'id': skill.id, 'skill': skill.skill})
            list_skill[skill.id] = skill.skill
        skills = json.dumps(skills, indent=4, default=str)
        list_skill = json.dumps(list_skill, indent=4, default=str)
        current_user = CustomUser.objects.get(sap_id=request.user.sap_id)
        # print(current_user.__dict__)
        current_user = model_to_dict(current_user)
        current_user['password'] = ''
        # print(current_user)
        if current_user['photo']:
            current_user['photo'] = current_user['photo'].url
        # else:
        # current_user['photo'] = ''
        current_user = json.dumps(current_user, indent=4, default=str)
        # current_user = dumps(current_user, indent=4, default=json_serial)
        # print(current_user)
        context = {'user': current_user, 'skills': skills, 'list_skills': list_skill}
        context = json.dumps(context)
        # print(context)
        return render(request, 'users/update_profile.html', {'prop': context})
    else:
        # request.user.first_name = request.POST.get('first_name')
        # request.user.last_name = request.POST.get('last_name')
        mobile = request.POST.get('mob')
        sap_id = request.POST.get('sap_id')
        print("sap_id", request.POST)
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
        # request.user.photo = request.FILES.get('photo', None)
        request.user.bio = request.POST.get('bio')
        request.user.year = request.POST.get('year')
        if request.POST.get('year') == 'FE':
            request.user.is_mentor = False
        else:
            request.user.is_mentor = True
        try:
            request.user.skill_1 = Skill.objects.get(id=request.POST.get('skill1'))
        except Skill.DoesNotExist:
            request.user.skill_1 = None
        try:
            request.user.skill_2 = Skill.objects.get(id=request.POST.get('skill2'))
            print(request.user.skill_2)
        except Skill.DoesNotExist:
            request.user.skill_2 = None
        print(request.POST.get('bio'))
        try:
            request.user.skill_3 = Skill.objects.get(id=request.POST.get('skill3'))
        except Skill.DoesNotExist:
            request.user.skill_3 = None
        try:
            request.user.interest_1 = Skill.objects.get(id=request.POST.get('interest1'))
        except Skill.DoesNotExist:
            request.user.interest_1 = None
        try:
            request.user.interest_2 = Skill.objects.get(id=request.POST.get('interest2'))
        except Skill.DoesNotExist:
            request.user.interest_2 = None
        try:
            request.user.interest_3 = Skill.objects.get(id=request.POST.get('interest3'))
        except Skill.DoesNotExist:
            request.user.interest_3 = None
        # Adding interests, currently 3
        # for i in range(3):
        #     try:
        #         s = 'interest_' + str(i + 1)
        #         interest = Skill.objects.get(skill=request.POST.get(s))
        #         interest = Interest.objects.create(interest=interest, user=request.user)
        #     except Skill.DoesNotExist:
        #         interest = None
        request.user.twitter_url = request.POST.get('twitter')
        request.user.linkedin_url = request.POST.get('linkedIn')
        request.user.github_url = request.POST.get('github')
        request.user.behance_url = request.POST.get('behance')
        request.user.stack_url = request.POST.get('stack')
        request.user.save()
        return redirect('users:view_profile', sap_id=sap_id)


@login_required(login_url='users:login')
def image_upload(request):
    print("Inside the view")
    if request.method == 'POST':
        print("Inside the post ", request.FILES)
        request.user.photo = request.FILES.get('photo', None)
        print("Request.User.Photo = ", request.user.photo)
        request.user.save()
        return redirect('users:update_profile')
    return redirect('users:update_profile')


def index(request):
    component = 'pages/index.js'
    return render(request, 'users/index.html', {'component': component})


@login_required(login_url='users:login')
def send_request(request, sap_id):
    if request.method == 'POST':
        receiver = get_object_or_404(CustomUser, sap_id=sap_id)
        if request.user.id == receiver.id:
            return redirect('users:search')
        # [TODO] To be used when we have a skill dropdown
        # skill_id = request.POST.get('skill_set_select')
        # try:
        #     skill = Skill.objects.get(id=skill_id)
        # except Skill.DoesNotExist:
        #     skill = None
        # MentorRequest.create_request(sender=request.user, receiver=receiver, skill=skill,
        #                              message=request.POST.get('messsage', ''))
        r = MentorRequest(sender=request.user, receiver=receiver)
        r.save()
        return redirect('users:search')
    return redirect('users:search')


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
        return redirect('users:search')
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:search')
    # return redirect('users:view_profile', sap_id=request.user.sap_id)


@login_required(login_url='users:login')
def reject_request(request, pk):
    if request.method == 'POST':
        mentor_request = get_object_or_404(MentorRequest, id=pk)
        mentor_request.reject()
        mentor_request.save()
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
        return redirect('users:search')
    # return redirect('users:view_profile', sap_id=request.user.sap_id)
    return redirect('users:search')


@login_required(login_url='users:login')
def cancel_request(request, pk):
    if request.method == 'POST':  # Improve security here by checking if the sender is the one logged in OR POST
        mentor_request = get_object_or_404(MentorRequest, id=pk)
        mentor_request.delete()
        return redirect('users:search')
    return redirect('users:search')


@login_required(login_url='users:login')
def terminate_relationship(request, pk, template_name='#'):
    if request.method == 'POST':
        try:
            relationship = Relationship.objects.get(id=pk)
            Relationship.objects.remove_relationship(pk)
            return redirect('users:view_profile', sap_id=request.user.sap_id)
        except (Relationship.DoesNotExist, CustomUser.DoesNotExist, Skill.DoesNotExist):
            return view_profile(request, request.user.sap_id, error_message='Relationship Does not Exist')
            # return render(request, 'users/profile.html', {'error_message': 'Relationship Does not Exist'})

    return render(request, template_name, {'pk': pk})


@login_required
def create_project(request):
    form = ProjectForm(request.POST or None)
    if form.is_valid():
        project = form.save(commit=False)
        project.creator = request.user
        if Project.objects.filter(name=request.POST.get('name'), creator=request.user).exists():
            error = 'Project already Listed'
            context = {'form': form, 'error': error}
            return render(request, 'users/project_form.html', context)
        project.save()
        return redirect('users:view_profile', sap_id=request.user.sap_id)
    context = {'form': form}
    return render(request, 'users/project_form.html', context)


class UpdateProject(LoginRequiredMixin, UpdateView):
    template_name = 'users/project_form.html'
    form_class = ProjectForm
    model = Project

    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.creator = self.request.user
        self.object.save()
        form.save_m2m()
        return redirect('users:view_profile', sap_id=self.request.user.sap_id)


# @login_required
# def update_project(request, pk):
#     if request.method == 'GET':
#         form = ProjectForm(instance=Project.objects.get(pk=pk))
#         return render(request, 'users/project_form.html', {'form': form})
#     else:
#         form = ProjectForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('users:view_profile', sap_id=request.user.sap_id)
#         error = 'Invalid Entry'
#         return render(request, 'users/project_form.html', {'form': form, 'error': error})


@login_required
def delete_project(request, pk):
    project = get_object_or_404(Project, pk=pk)
    project.delete()
    return redirect('users:view_profile', sap_id=request.user.sap_id)


def f7(seq):
    seen = set()
    seen_add = seen.add
    return [x for x in seq if not(x in seen or seen_add(x))]


@login_required(login_url='users:login')
def search(request):
    context = {}
    user = request.user
    qs = []
    queryset = CustomUser.objects.filter(is_mentor=True)
    received = []
    sent = []
    for r in user.requests_received.filter(accepted=False, rejected=False):
        x = process_user(r.sender)
        x['request_id'] = r.id
        received.append(x)
    for r in user.requests_sent.filter(accepted=False, rejected=False):
        x = process_user(r.receiver)
        x['request_id'] = r.id
        sent.append(x)
    received = json.dumps(received, indent=4, default=str)
    sent = json.dumps(sent, indent=4, default=str)
    context['received'] = received
    context['sent'] = sent
    if not request.GET.get('skill'):
        interests = []
        if request.user.interest_1 is not None:
            interests.append(request.user.interest_1)
        if request.user.interest_2 is not None:
            interests.append(request.user.interest_2)
        if request.user.interest_3 is not None:
            interests.append(request.user.interest_3)
        # interests = user.user_interests.filter(is_now_skill=False)
        for i in interests:
            q1 = queryset.filter(skill_1=i.id)
            q2 = queryset.filter(skill_2=i.id)
            q3 = queryset.filter(skill_3=i.id)
            qs += list(chain(q1, q2, q3))
        qs = f7(qs)
        second = []
        third = []
        for u in qs:
            current_user = process_user(u)
            if u.year == 'SE':
                second.append(current_user)
            elif u.year == 'TE':
                third.append(current_user)
        second = json.dumps(second, indent=4, default=str)
        third = json.dumps(third, indent=4, default=str)
        context['second'] = second
        context['third'] = third
        return render(request, 'users/search.html', {'prop': context})
        # return render(request, 'users/search.html', {'qs': qs, 'skills': Skill.objects.all()})
    skill = request.GET.get('skill')
    q1 = queryset.filter(skill_1__skill__icontains=skill)
    q2 = queryset.filter(skill_2__skill__icontains=skill)
    q3 = queryset.filter(skill_3__skill__icontains=skill)
    qs = f7(list(chain(q1, q2, q3)))
    second = []
    third = []
    for u in qs:
        current_user = process_user(u)
        if u.year == 'SE':
            second.append(current_user)
        elif u.year == 'TE':
            third.append(current_user)
    second = json.dumps(second, indent=4, default=str)
    third = json.dumps(third, indent=4, default=str)
    context['second'] = second
    context['third'] = third
    return render(request, 'users/search.html', {'prop': context})
    # return render(request, 'users/search.html', {'qs': qs, 'skills': Skill.objects.all(), 's': int(skill)})


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
    context = {}
    list_hack = {}
    list_skill = {}
    context['user'] = json.dumps(process_user(request.user), indent=4, default=str)
    hackathons = [model_to_dict(h) for h in Hackathon.objects.all()]
    for h in hackathons:
        list_hack[h['id']] = h['name']
    context['hackathons'] = json.dumps(hackathons, indent=4, default=str)
    context['list_hack'] = json.dumps(list_hack, indent=4, default=str)
    skill_set = Skill.objects.all().order_by('skill')
    skills = []

    for skill in skill_set:
        skills.append({'id': skill.id, 'skill': skill.skill})
        list_skill[skill.id] = skill.skill
    skills = json.dumps(skills, indent=4, default=str)
    context['skills'] = skills
    context['error'] = ''
    context['list_skills'] = json.dumps(list_skill, indent=4, default=str)
    if request.method == 'POST':
        print(request.POST)
        form = HackathonTeamForm(request.POST)
        if form.is_valid():
            team = form.save(commit=False)
            team.leader = request.user
            team.save()
            form.save_m2m()
            return redirect('users:view_hackathon_team', pk=team.id)
        else:
            # [TODO] Convert the hackathon queryset to a smaller one according to date
            context['error'] = 'A team with the same name exists.'
            return render(request, 'users/add_hackathon_team.html', {'prop': context})
            # return render(request, 'users/add_hackathon_team.html', {'form': form,
            #                                                          'hackathons': Hackathon.objects.all(),
            #                                                          'skills': Skill.objects.all(),
            #                                                          'error': 'A team with the same name exists.'})
    else:
        form = HackathonTeamForm()
        return render(request, 'users/add_hackathon_team.html', {'prop': context})
    # return render(request, 'users/add_hackathon_team.html', {'form': form, 'hackathons': Hackathon.objects.all(),
    #                                                          'skills': Skill.objects.all()})


@login_required(login_url='users:login')
def view_hackathon_team(request, pk):
    team = get_object_or_404(HackathonTeam, id=pk)
    return render(request, 'users/view_hackathon_team.html', {'team': team})


# @login_required(login_url='users:login')
# def send_hackteam_request(request, pk):
#     try:
#         team = HackathonTeam.objects.get(id=pk)
#     except HackathonTeam.DoesNotExist:  # redirecting to login as a placeholder
#         return redirect('users:login')
#     if request.user in team.current_members.all() or request.user == team.leader:
#         return redirect('users:login')
#     # Checking if a pending request exists
#     if HackathonTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
#         return redirect('users:login')
#     if request.method == 'POST':
#         form = HackathonTeamRequestForm(team, request.POST)  # This is a bit of a hack
#         if form.is_valid():
#             hack_request = form.save(commit=False)
#             hack_request.sender = request.user
#             hack_request.team = team
#             hack_request.save()
#             form.save_m2m()
#             return redirect('users:view_hackathon_team', pk=pk)
#     else:
#         form = HackathonTeamRequestForm(team=team)
#     return render(request, 'users/send_hackathon_team_request.html', {'form': form, 'team': team,
#                                                                       'skills': team.skills_required.all()})


@login_required(login_url='users:login')
def all_hackathon_teams(request):
    context = {}
    user = process_user(request.user)
    context['user'] = json.dumps(user, indent=4, default=str)
    requests_received = []
    for team in request.user.leader_teams.all():
        for r in team.hack_requests_received.filter(accepted=False, rejected=False):
            x = model_to_dict(r)
            x['team_name'] = team.name
            x['sender_name'] = r.sender.first_name
            requests_received.append(x)
    requests_sent = request.user.hack_requests_sent.filter(accepted=False, rejected=False)
    temp = []
    for r in requests_sent:
        x = model_to_dict(r)
        x['team_name'] = r.team.name
        x['leader_name'] = r.team.leader.first_name
        temp.append(x)
    context['requests_received'] = json.dumps(requests_received, indent=4, default=str)
    context['requests_sent'] = json.dumps(temp, indent=4, default=str)
    # teams = HackathonTeam.objects.filter(closed=False).filter(~Q(leader=request.user))
    # teams = HackathonTeam.objects.filter(closed=False).exclude(leader=request.user)
    teams = HackathonTeam.objects.filter(closed=False).order_by('-id')
    temp = []
    for team in teams:
        x = model_to_dict(team)
        x['leader_name'] = team.leader.first_name
        x['leader_sap'] = team.leader.sap_id
        x['disabled'] = ''
        if team.hack_requests_received.filter(sender=request.user, accepted=False, rejected=False):
            x['disabled'] = 'disabled'
        elif team in request.user.leader_teams.all() or team in request.user.member_teams.all():
            x['disabled'] = 'disabled'
        temp.append(x)
    # teams = [model_to_dict(team) for team in teams]
    list_hack = {}
    for h in Hackathon.objects.all():
        list_hack[h.id] = h.name
    context['list_hack'] = json.dumps(list_hack)
    context['teams'] = json.dumps(temp, indent=4, default=str)
    skills_dict = {}
    for skill in Skill.objects.all().order_by('skill'):
        skills_dict[skill.id] = skill.skill
    context['skills_dict'] = json.dumps(skills_dict, indent=4, default=str)
    if request.method == 'POST':
        print("post request bouncing off of the same url")
    return render(request, 'users/all_hackathon_teams.html', {'prop': context})


@login_required(login_url='users:login')
def send_hackteam_request(request, pk):
    if request.method == 'GET':
        return redirect('users:all_hackathon_teams')
    try:
        team = HackathonTeam.objects.get(id=pk)
    except HackathonTeam.DoesNotExist:  # redirecting to login as a placeholder
        return redirect('users:login')
    if request.user in team.current_members.all() or request.user == team.leader:
        return redirect('users:login')
    # Checking if a pending request exists
    if HackathonTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
        return redirect('users:login')
    r = HackathonTeamRequest(team=team, sender=request.user)
    r.save()
    return redirect('users:all_hackathon_teams')


@login_required(login_url='users:login')
def accept_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.accepted = True
        hack_request.team.vacancies -= 1
        hack_request.team.save()
        hack_request.save()
        if hack_request.team.vacancies <= 0:
            hack_request.team.closed = True
            hack_request.team.save()
            for r in hack_request.team.hack_requests_received.filter(accepted=False, rejected=False):
                r.rejected = True
                r.save()
        hack_request.team.add_member(hack_request.sender)
        hack_request.save()
        # return redirect('users:view_hackathon_team', pk=hack_request.team.id)
        return redirect('users:all_hackathon_teams')
    return redirect('users:all_hackathon_teams')


@login_required(login_url='users:login')
def reject_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.rejected = True
        hack_request.save()
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
        return redirect('users:all_hackathon_teams')
    return redirect('users:all_hackathon_teams')


@login_required(login_url='users:login')
def cancel_hack_request(request, pk):
    if request.method == 'POST':
        hack_request = get_object_or_404(HackathonTeamRequest, id=pk)
        hack_request.delete()
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
        return redirect('users:all_hackathon_teams')
    return redirect('users:all_hackathon_teams')


@login_required(login_url='users:login')
def add_project_team(request):
    projects = Project.objects.filter(creator=request.user)
    result = []
    p = {}
    hack = {}
    list_skill = {}
    for project in projects:
        if not ProjectTeam.objects.filter(project=project).exists():
            p = {}
            p['id'] = project.id
            p['name'] = project.name
            p = json.dumps(p, default=str)
            result.append(p)
            hack[str(project.id)] = project.name
    projects = result
    if request.method == 'POST':
        project = Project.objects.get(id=int(request.POST.get('project')))
        if ProjectTeam.objects.filter(project=project).exists():
            return redirect('users:login')
        # if request.user != project.creator:
        #     return redirect('users:login')
        form = ProjectTeamForm(request.POST)
        print(form['skills_required'])
        if form.is_valid():
            team = form.save(commit=False)
            team.leader = request.user
            # team.project = project
            team.save()
            form.save_m2m()
            return redirect('users:view_project_team', pk=team.id)
        else:
            print(request.POST)
            return redirect('users:add_project_team')
    else:
        context = {}
        form = ProjectTeamForm()
        user = get_object_or_404(CustomUser, sap_id=request.user.sap_id)
        context['user'] = json.dumps(process_user(user), indent=4, default=str)
        context['projects'] = json.dumps(projects, indent=4, default=str)
        context['hack'] = json.dumps(hack, indent=4, default=str)
        skills = Skill.objects.all().order_by('skill')
        result = []
        r = {}
        for sk in skills:
            r = {}
            r['id'] = sk.id
            r['skill'] = sk.skill
            # r = json.dumps(r, indent=4, default=str)
            # print(r)
            result.append(r)
            list_skill[sk.id] = sk.skill
            # print(result)
        # skills = json.dumps(result, indent=4, default=str)
        # context['skills'] = skills
        skills = result
        # print(skills)
        context['skills'] = json.dumps(skills, indent=4, default=str)
        context['list_skills'] = json.dumps(list_skill, indent=4, default=str)
        print(context['skills'])
    return render(request, 'users/add_project_team.html', {'prop': context})


@login_required(login_url='users:login')
def view_project_team(request, pk):
    team = get_object_or_404(ProjectTeam, id=pk)
    return render(request, 'users/view_project_team.html', {'team': team})


# @login_required(login_url='users:login')
# def send_project_team_request(request, pk):
#     try:
#         team = ProjectTeam.objects.get(id=pk)
#     except ProjectTeam.DoesNotExist:  # redirecting to login as a placeholder
#         return redirect('users:login')
#     if request.user in team.current_members.all() or request.user == team.leader:
#         return redirect('users:login')
#     # Checking if a pending request exists
#     if ProjectTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
#         return redirect('users:login')
#     if request.method == 'POST':
#         form = ProjectTeamRequestForm(team, request.POST)  # This is a bit of a hack
#         if form.is_valid():
#             project_request = form.save(commit=False)
#             project_request.sender = request.user
#             project_request.team = team
#             project_request.save()
#             form.save_m2m()
#             return redirect('users:view_project_team', pk=pk)
#     else:
#         form = ProjectTeamRequestForm(team=team)
#     return render(request, 'users/send_project_team_request.html', {'form': form, 'team': team,
#                                                                     'skills': team.skills_required.all})

@login_required(login_url='users:login')
def send_project_team_request(request, pk):
    if request.method == 'GET':
        return redirect('users:all_hackathon_teams')
    try:
        team = ProjectTeam.objects.get(id=pk)
    except ProjectTeam.DoesNotExist:  # redirecting to login as a placeholder
        return redirect('users:login')
    if request.user in team.current_members.all() or request.user == team.leader:
        return redirect('users:login')
    # Checking if a pending request exists
    if ProjectTeamRequest.objects.filter(team=team, sender=request.user, accepted=False, rejected=False).exists():
        return redirect('users:login')
    r = ProjectTeamRequest(team=team, sender=request.user)
    r.save()
    return redirect('users:project_team_join')


@login_required(login_url='users:login')
def accept_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.accepted = True
        project_request.team.vacancies -= 1
        project_request.team.save()
        project_request.save()
        if project_request.team.vacancies <= 0:
            project_request.team.closed = True
            project_request.team.save()
            for r in project_request.team.project_requests_received.filter(accepted=False, rejected=False):
                r.rejected = True
                r.save()
        project_request.team.add_member(project_request.sender)
        project_request.save()
        # return redirect('users:view_project_team', pk=project_request.team.id)
        return redirect('users:project_team_join')
    return redirect('users:project_team_join')


@login_required(login_url='users:login')
def reject_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.rejected = True
        project_request.save()
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
        return redirect('users:project_team_join')
    return redirect('users:project_team_join')


@login_required(login_url='users:login')
def cancel_project_request(request, pk):
    if request.method == 'POST':
        project_request = get_object_or_404(ProjectTeamRequest, id=pk)
        project_request.delete()
        # return redirect('users:view_profile', sap_id=request.user.sap_id)
        return redirect('users:project_team_join')
    return redirect('users:project_team_join')


@login_required(login_url='users:login')
def project_join_view(request):
    context = {}
    user = process_user(request.user)
    context['user'] = json.dumps(user, indent=4, default=str)
    # teams = ProjectTeam.objects.filter(closed=False).exclude(leader=request.user)
    teams = ProjectTeam.objects.filter(closed=False).order_by('-id')
    result = []
    # teams = [model_to_dict(team) for team in teams]
    for team in teams:
        x = model_to_dict(team)
        x['leader_name'] = team.leader.first_name
        x['leader_sap'] = team.leader.sap_id
        x['disabled'] = ''
        if team.project_requests_received.filter(sender=request.user, accepted=False, rejected=False):
            x['disabled'] = 'disabled'
        elif team in request.user.project_leader_teams.all() or team in request.user.member_project_teams.all():
            x['disabled'] = 'disabled'
        result.append(x)
    teams = result
    list_hack = {}
    for p in Project.objects.all():
        list_hack[p.id] = p.name
    context['list_hack'] = json.dumps(list_hack)
    context['teams'] = json.dumps(teams, indent=4, default=str)
    skills_dict = {}
    for skill in Skill.objects.all().order_by('skill'):
        skills_dict[skill.id] = skill.skill
    context['skills_dict'] = json.dumps(skills_dict, indent=4, default=str)
    if request.method != 'POST':
        user = request.user
        received = []
        sent = []
        head = ProjectTeam.objects.filter(leader=user)
        for h in head:
            for r in h.project_requests_received.filter(accepted=False, rejected=False):
                received.append(process_user(r.sender))
        for r in user.project_requests_sent.filter(accepted=False, rejected=False):
            team = model_to_dict(r.team)
            sent.append(team)
        received = json.dumps(received, indent=4, default=str)
        sent = json.dumps(sent, indent=4, default=str)
        context['received'] = received
        context['sent'] = sent
        print(context)
        return render(request, 'users/project_join.html', {'prop': context})
    if request.method == 'POST':
        print("post request bouncing off of the same url")

# @login_required
# class ProjectUpdate(LoginRequiredMixin, UpdateView):
#     model = Project
#     fields = ['name', 'skills_used', 'description', 'link']
#
# class ProjectDelete(LoginRequiredMixin, DeleteView):
#     model = Project
#     success_url = reverse_lazy('users:view_profile')
#
# class ProjectDelete(LoginRequiredMixin, DeleteView):
#     model = Project
#     success_url = reverse(view_profile, args=[])

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
