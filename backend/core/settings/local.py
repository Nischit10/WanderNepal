from .base import *

SECRET_KEY = 'django-insecure-it(*gn%)4sbh@9m8p2j3b*!rcxr3n@z=1&6_b5%d=5%7jmt%72'

DEBUG = True

ALLOWED_HOSTS = ['*']

# SQLite — no MySQL needed locally
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS — local dev only: allow browser from any origin (DEBUG is True above).
CORS_ALLOW_ALL_ORIGINS = True

# DRF Token Auth
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}