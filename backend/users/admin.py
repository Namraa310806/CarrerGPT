from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
	ordering = ("email",)
	list_display = ("email", "name", "is_staff", "is_superuser")
	fieldsets = (
		(None, {"fields": ("email", "password", "name")}),
		(_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
		(_("Important dates"), {"fields": ("last_login", "date_joined")}),
	)
	add_fieldsets = (
		(None, {
			"classes": ("wide",),
			"fields": ("email", "name", "password1", "password2", "is_staff", "is_superuser"),
		}),
	)
	search_fields = ("email", "name")
	filter_horizontal = ("groups", "user_permissions")

	def get_form(self, request, obj=None, **kwargs):
		form = super().get_form(request, obj, **kwargs)
		form.base_fields["password"].help_text = None
		return form
