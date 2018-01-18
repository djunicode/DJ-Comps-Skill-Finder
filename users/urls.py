from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('profile/<str:sap_id>/', views.view_profile, name='view_profile'),
    path('profile/<int:pk>/update/', views.update_profile, name='update_profile'),
]
