from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['full_name', 'email', 'password', 'confirm_password']

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
            # Remove confirm_password so we don't try to save it to the DB
            validated_data.pop('confirm_password')
            
            # 1. Create the user object (but don't save to DB yet)
            user = User(
                email=validated_data['email'],
                full_name=validated_data['full_name']
                # Notice we leave 'password' out of here
            )
            
            # 2. Use set_password() to securely hash the password
            user.set_password(validated_data['password'])
            
            # 3. Save the user to the database
            user.save()
            
            return user