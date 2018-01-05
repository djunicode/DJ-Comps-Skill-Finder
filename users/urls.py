__author__ = 'Parth Shah'

from django.urls import path
from users import views
from django.contrib.auth.views import LogoutView
from django.urls import reverse_lazy
app_name = 'users'

urlpatterns = [
    path('', views.LoginFormView.as_view(), name='user-login'),
    path('registration/', views.RegisterFormView.as_view(), name='user-registration'),
    path('profile/', views.view_profile, name='view_profile'),
    path('profile/edit/', views.UpdationFormView.as_view(), name='edit_profile'),
    path('logout/', LogoutView.as_view(next_page=reverse_lazy('users:user-login')), name='user-logout'),
]
