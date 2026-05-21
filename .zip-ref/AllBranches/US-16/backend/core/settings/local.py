from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-it(*gn%)4sbh@9m8p2j3b*!rcxr3n@z=1&6_b5%d=5%7jmt%72'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'nepal_sanctuary',
        'USER': 'root',          # Your MySQL username
        'PASSWORD': '8778',  # Your MySQL password
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
