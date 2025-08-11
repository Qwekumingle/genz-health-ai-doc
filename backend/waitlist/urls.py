from django.urls import path
from .views import waitlist_signup

urlpatterns = [
    path('api/join/', waitlist_signup, name='waitlist-signup'),
]