from django.contrib import admin
from .models import WaitList

@admin.register(WaitList)
class WaitListAdmin(admin.ModelAdmin):
    list_display = ("email", "name", "updated_at", "comment")
    ordering = ("-updated_at",)
