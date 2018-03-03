import json
from django.core import serializers
from django.forms import model_to_dict
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.urls import reverse
from .models import CustomUser, Skill
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic import TemplateView


@ensure_csrf_cookie
def login(request):
    if request.user.is_authenticated:
        skill_set = Skill.objects.all()
        skill_set = list(skill_set)
        skill_set = serializers.serialize('json', skill_set)
        current_user = CustomUser.objects.get(sap_id=request.user.sap_id)
        print(current_user.__dict__)
        current_user = model_to_dict(current_user)
        print(current_user)
        if current_user['photo']:
            current_user['photo'] = current_user['photo'].url
        current_user = json.dumps(current_user, indent=4, default=str)
        print(current_user)
        skill_set = json.dumps(skill_set)
        context = {'user': current_user, 'skills': skill_set}
        context = json.dumps(context)
        print(context)
        return render(request, 'users/login.html', {'prop': context})
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
                        return render(request, 'users/test.html', {})
                    else:
                        error = 'The account has been disabled.'
                        return render(request, 'users/login.html',
                                      {'error': error})
                else:
                    error = 'Invalid Username/Password'
                    return render(request, 'users/login.html', {'error': error})
            elif 'register' in request.POST:
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
            skill_set = Skill.objects.all()
            skill_set = list(skill_set)
            skill_set = serializers.serialize('json', skill_set)
            current_user = CustomUser.objects.get(sap_id=request.user.sap_id)
            print(current_user.__dict__)
            current_user = model_to_dict(current_user)
            print(current_user)
            if current_user['photo']:
                current_user['photo'] = current_user['photo'].url
            current_user = json.dumps(current_user, indent=4, default=str)
            print(current_user)
            skill_set = json.dumps(skill_set)
            context = {'user': current_user, 'skills': skill_set}
            context = json.dumps(context)
            print(context)
            return render(request, 'users/login.html', {'prop': context})


def logout(request):
    auth_logout(request)
    return redirect(reverse('users:login'))


@login_required(login_url='users:login')
def view_profile(request, sap_id):
    user = get_object_or_404(CustomUser, sap_id=sap_id)
    return render(request, 'users/profile.html', {'user': user})


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
        request.user.save()
        return redirect('users:view_profile', sap_id=sap_id)


def index(request):
    component = 'pages/index.js'
    return render(request, 'users/index.html', {'component': component})
