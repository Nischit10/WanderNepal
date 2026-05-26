# WanderNepal - Full Codebase Documentation

This document provides a comprehensive overview of the WanderNepal project, including the purpose of each file and the complete source code.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Root Files](#project-root-files)
   - [.gitignore](#gitignore)
   - [INSTALLATION.md](#installationmd)
   - [README.md](#readmemd)
3. [Backend Configuration](#backend-configuration)
   - [backend/manage.py](#backendmanagepy)
   - [backend/core/urls.py](#backendcoreurlspy)
   - [backend/core/settings/base.py](#backendcoresettingsbasepy)
   - [backend/core/settings/local.py](#backendcoresettingslocalpy)
4. [API Application (Backend)](#api-application-backend)
   - [backend/api/models/user.py](#backendapimodelsuserpy)
   - [backend/api/serializers/signup.py](#backendapiserializerssignuppy)
   - [backend/api/serializers/signin.py](#backendapiserializerssigninpy)
   - [backend/api/views/signup.py](#backendapiviewssignuppy)
   - [backend/api/views/signin.py](#backendapiviewssigninpy)
   - [backend/api/urls.py](#backendapiurlspy)
   - [backend/api/migrations/0001_initial.py](#backendapimigrations0001_initialpy)
5. [Dependencies](#dependencies)
   - [requirements/base.txt](#requirementsbasetxt)
   - [requirements/local.txt](#requirementslocaltxt)

---

## Project Overview
WanderNepal is a Django-based web application with a REST API for user authentication (Sign Up and Sign In). It uses MySQL as its primary database and follows a modular settings structure for different environments (base and local).

---

## Project Root Files

### .gitignore
**Purpose:** Specifies which files and directories should be ignored by Git (e.g., virtual environments, cache, sensitive database files).

```text
# Virtual environment
venv/
.venv/
env/
bin/
include/
lib/
share/
pyvenv.cfg

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Django
local_settings.py
db.sqlite3
db.sqlite3-journal
media/
static/

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Misc
.DS_Store
```

---

### INSTALLATION.md
**Purpose:** Detailed guide for developers to set up the project locally, including database configuration and environment setup.

```markdown
# Installation Guide - WanderNepal

This guide will help you set up and run the WanderNepal project on your local machine.

## Prerequisites

Before starting, ensure you have the following installed:
- [Python 3.10+](https://www.python.org/downloads/)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)
- Git (optional, for cloning)

---

## 1. Setup the Repository

Clone the project repository or download the source code:
```bash
git clone <repository_url>
cd WanderNepal
```

---

## 2. Configure Virtual Environment

Create and activate a Python virtual environment to manage dependencies:

**Windows:**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

Install the required Python packages:
```bash
pip install -r requirements/local.txt
```

---

## 4. Database Setup

1.  Open your MySQL terminal or a GUI like MySQL Workbench.
2.  Create a new database:
    ```sql
    CREATE DATABASE nepal_sanctuary;
    ```
3.  The project is configured to connect to MySQL with the following default settings in `backend/core/settings/local.py`:
    - **NAME**: `nepal_sanctuary`
    - **USER**: `root`
    - **PASSWORD**: `8778`
    - **HOST**: `localhost`
    - **PORT**: `3306`

---

## 5. Run Migrations

Navigate to the `backend/` directory and apply the database migrations:
```bash
cd backend
python manage.py migrate
```

---

## 6. Create an Admin User (Optional)

To access the Django Admin panel, create a superuser:
```bash
python manage.py createsuperuser
```

---

## 7. Run the Development Server

Start the Django development server:
```bash
python manage.py runserver
```

The application will be available at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
```

---

### README.md
**Purpose:** Quick start guide for backend setup.

```markdown
# WanderNepal
TeamE

## Backend Setup

1.  **Virtual Environment**: A virtual environment `venv` is created in the root directory.
2.  **Activate Virtual Environment**:
    - Windows: `.\venv\Scripts\activate`
    - Unix/macOS: `source venv/bin/activate`
3.  **Install Requirements**: `pip install -r requirements.txt`
4.  **Run Database Migrations**:
    - Navigate to the `backend/` directory.
    - `python manage.py migrate`
5.  **Start Development Server**: `python manage.py runserver`
```

---

## Backend Configuration

### backend/manage.py
**Purpose:** Django's command-line utility for administrative tasks like running the server, creating migrations, and managing the database.

```python
#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.local')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
```

---

### backend/core/urls.py
**Purpose:** The main URL routing file for the entire project. It routes requests to the admin panel and the `api/` application.

```python
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

---

### backend/core/settings/base.py
**Purpose:** Contains common settings for all environments (development, production, etc.). It defines installed apps, middleware, template configurations, and internationalization.

```python
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

AUTH_USER_MODEL = 'api.User'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static and Media files
STATIC_URL = 'static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

### backend/core/settings/local.py
**Purpose:** Environment-specific settings for local development, including the database connection details (MySQL) and security keys.

```python
from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-it(*gn%)4sbh@9m8p2j3b*!rcxr3n@z=1&6_b5%d=5%7jmt%72'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nepal_sanctuary',
        'USER': 'root',
        'PASSWORD': '8778',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

## API Application (Backend)

### backend/api/models/user.py
**Purpose:** Defines the custom User model by extending `AbstractUser`. It uses the `email` field for authentication instead of the default `username`.

```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, blank=True, null=True) # Optional

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return self.email
```

---

### backend/api/serializers/signup.py
**Purpose:** Handles the validation and creation of new users. It ensures passwords match and securely hashes the password using `set_password()`.

```python
from rest_framework import serializers
from api.models import User

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
            validated_data.pop('confirm_password')
            user = User(
                email=validated_data['email'],
                full_name=validated_data['full_name']
            )
            user.set_password(validated_data['password'])
            user.save()
            return user
```

---

### backend/api/serializers/signin.py
**Purpose:** Validates user credentials during the sign-in process and handles authentication logic.

```python
from rest_framework import serializers
from django.contrib.auth import authenticate

class SigninSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")
            data['user'] = user
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")
        
        return data
```

---

### backend/api/views/signup.py
**Purpose:** API endpoint for user registration. It receives POST requests and uses `SignupSerializer` to create a user.

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api.serializers import SignupSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

---

### backend/api/views/signin.py
**Purpose:** API endpoint for user login. It validates credentials and returns an authentication token upon success.

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from api.serializers import SigninSerializer

class SigninView(APIView):
    def post(self, request):
        serializer = SigninSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "full_name": user.full_name,
                "message": "Login successful"
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

---

### backend/api/urls.py
**Purpose:** Defines the API-specific URL patterns for the `api` app.

```python
from django.urls import path
from .views import SignupView, SigninView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('signin/', SigninView.as_view(), name='signin'),
]
```

---

### backend/api/migrations/0001_initial.py
**Purpose:** The first database migration file that creates the `User` table in the database based on the custom user model.

```python
# Generated by Django 6.0.3 on 2026-03-31 16:11

import django.contrib.auth.models
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('full_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(blank=True, max_length=150, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
```

---

## Dependencies

### requirements/base.txt
**Purpose:** Lists the core Python packages required to run the project.

```text
django
djangorestframework
django-cors-headers
mysqlclient
asgiref
sqlparse
tzdata
requests
```

---

### requirements/local.txt
**Purpose:** Includes base requirements and adds any development-specific tools.

```text
-r base.txt
# Add development-only tools here (e.g., debug-toolbar)
```
