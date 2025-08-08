from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import register_user, LogoutUser, current_user


urlpatterns = [
    path("register/", register_user),
    path("login/", TokenObtainPairView.as_view(), name='login'),
    path("user/", current_user, name="current-user"),
    path("logout/", LogoutUser.as_view(), name='logout'),
]
