from django.contrib import admin

# Register your models here.

from .models import Mini


@admin.register(Mini)
class Mini_Admin(admin.ModelAdmin):
    list_display = ('cod',)
