from django.shortcuts import render, redirect
from django.views import generic
from django.views.generic import View, CreateView
from django.contrib.auth.views import LoginView
from django.contrib.auth import login, authenticate
from django.urls import reverse_lazy
#from users.forms import UpdationForm
from users.models import Skill,User
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from users import forms
from  django.contrib.auth.forms import UserChangeForm

# Create your views here.
'''
class RegisterFormView(View):
    form_class = forms.RegistrationForm
    template_name = 'users/registration_form.html'

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})


    def post(self, request):
        form = self.form_class(request.POST)

        if form.is_valid():
            user = form.save(commit=False)

            email = form.cleaned_data['email']
            sap_id = form.cleaned_data['sap_id']
            mobile = form.cleaned_data['mobile']
            #active = False         #Incase we want to add email-verification later.
            password = form.cleaned_data['password']
            user.set_password(password)

            user.save()

            user = authenticate(email=email, password=password)

            if user is not None:
                if user.is_active:
                    login(request, user)
                    return render(request, 'users/updation_form.html', {'user': user})
                else:
                    return render(request, self.template_name,
                                  {'error_message': 'Your account has been disabled', 'form': form})
            else:
                return render(request, self.template_name, {'error_message': 'Invalid login', 'form': form})

'''


class RegisterFormView(CreateView):
    form_class = forms.RegistrationForm
    template_name = 'users/registration_form.html'
    success_url = reverse_lazy('users:edit_profile')


class LoginFormView(View):
    form_class = forms.LoginForm
    template_name = 'users/login_form.html'

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})


    def post(self, request):
        form = self.form_class(request.POST)

        email = self.request.POST['email']
        password = self.request.POST['password']

        user = authenticate(email=email, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                return render(request, 'users/profile.html', {'user': user})
            else:
                return render(request, self.template_name,
                              {'error_message': 'Your account has been disabled', 'form': form})
        else:
            return render(request, self.template_name, {'error_message': 'Invalid login', 'form': form})


@login_required
def view_profile(request):
    args = {'user': request.user}
    return render(request, 'users/profile.html', args)


'''
@login_required
def edit_profile(request):
    if request.method == 'POST':
        form = UpdationForm(request.POST, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('users:edit_profile')

    else:
        form = UpdationForm(instance=request.user)
        context = {'form': form}
        return render(request, 'users/updation_form.html', context)
'''


class UpdationFormView(LoginRequiredMixin, View):
    form_class = forms.UpdationForm
    template_name = 'users/updation_form.html'

    def get(self, request):
        form = self.form_class(instance=request.user)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST, request.FILES, instance=request.user)

        if form.is_valid():
            form.save()
            return redirect('users:view_profile')
        else:
            return render(request, self.template_name, {'error_message': 'Invalid Form', 'form': form})

