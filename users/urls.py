from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    # path('register_skills/', views.register_skills, name='register_skills'),
    path('profile/<int:pk>/', views.view_profile, name='view_profile'),
    path('profile/<int:pk>/update/', views.update_profile, name='update_profile'),
]
