from django.contrib import admin
from users.models import Skill, User
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from users.forms import UserAdminCreationForm, UserAdminChangeForm
# Register your models here.

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.

    list_display = ('full_name', 'email', 'year', 'admin')
    list_filter = ('admin', 'year', 'active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('full_name', 'sap_id', 'mobile', 'photo', 'year')}),
        ('Skills', {'fields': ('skill_1', 'skill_2', 'skill_3')}),
        ('Permissions', {'fields': ('admin', 'staff', 'active',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'sap_id', 'mobile', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)


admin.site.register(Skill)
