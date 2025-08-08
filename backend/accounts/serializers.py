from rest_framework import serializers
from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'firstname', 'lastname', 'password', 'terms']

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

