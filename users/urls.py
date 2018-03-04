from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('profile/<str:sap_id>/', views.view_profile, name='view_profile'),
    path('index/', views.index, name='index'),
    path('requests/<str:sap_id>/', views.send_request, name='send_request'),
    path('requests/<int:pk>/accept/', views.accept_request, name='accept_request'),
    path('requests/<int:pk>/reject/', views.reject_request, name='reject_request'),
    path('requests/<int:pk>/cancel/', views.cancel_request, name='cancel_request'),
    path('search/', views.search, name='search'),
    path('relationship/terminate/<int:pk>/', views.terminate_relationship, name='terminate_relationship'),
    path('mentor/', views.mentor, name='mentor'),
    path('project/add/', views.create_project, name='project_add'),
    # path('project/<int:pk>/update', views.update_project, name='project_update'),
    path('project/<int:pk>/update', views.UpdateProject.as_view(), name='project_update'),
    path('project/<int:pk>/delete', views.delete_project, name='project_delete')
]
