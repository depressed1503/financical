import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "django-insecure-_pos#a0@b0qfe%w0)qkvjp4d-r(c4mhl+*jiez&o%8e!l3-97-")

DEBUG = os.environ.get("DEBUG", 'True').lower() in ('true', '1', 't',)
HOST = os.environ.get("HOST", "financical.ru")

ALLOWED_HOSTS = [
	"127.0.0.1",
	"localhost",
	"financical.ru"
]


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
    'corsheaders',
]

MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
	'api.middlewares.CSRFDebugMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'back.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'back.wsgi.application'
if DEBUG:
	DATABASES = {
		'default': {
			'ENGINE': 'django.db.backends.sqlite3',
			'NAME': BASE_DIR / 'db.sqlite3',
		}
	}
else:
	DATABASES = {
		"default": {
			"ENGINE": "django.db.backends.postgresql",
			"NAME": os.environ.get("DATABASE_NAME", "mydatabase"),
			"USER": os.environ.get("DATABASE_USER", "myuser"),
			"PASSWORD": os.environ.get("DATABASE_PASSWORD", "mypassword"),
			"HOST": os.environ.get("DATABASE_HOST", "localhost"),
			"PORT": os.environ.get("DATABASE_PORT", 5431),
		}
	}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CSRF Settings
CSRF_COOKIE_NAME = 'csrftoken'
CSRF_COOKIE_HTTPONLY = False  # Recommended for security
CSRF_COOKIE_DOMAIN = None if DEBUG else f'.{HOST}'
CSRF_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SAMESITE = 'None'
CSRF_USE_SESSIONS = False

# Session Settings
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_HTTPONLY = False  # Recommended for security
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_DOMAIN = None if DEBUG else f'.{HOST}'

CORS_ALLOWED_ORIGINS = [
	f'https://{HOST}',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5555',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5555',
    'http://127.0.0.1',
	'http://localhost',
]

CSRF_TRUSTED_ORIGINS = [
	f'https://{HOST}',
    'http://localhost:3000',
    'http://localhost:5173',
    "http://localhost:5555",
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5555',
    'http://127.0.0.1',
	'http://localhost',
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_HEADERS = ['X-CSRFToken', 'Content-Type', 'Authorization']
CORS_EXPOSE_HEADERS = ['X-CSRFToken']
CORS_ORIGIN_WHITELIST = [
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5555',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://localhost:5555',
    'http://localhost:3000',
	f'https://{HOST}',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny'
    ],
}

AUTH_USER_MODEL = 'api.CustomUser'


MEDIA_URL = "/media/"
MEDIA_ROOT = "media/" if DEBUG else "/vol/media/"
STATIC_URL = "/api_static/"
STATIC_ROOT = "static/" if DEBUG else "/vol/static/"
UNICODE_JSON = True

if not DEBUG:
	SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = not DEBUG

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {"class": "logging.StreamHandler"},
        "file": {
            "class": "logging.FileHandler",
            "filename": "general.log",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "": {
            "handlers": ["console", "file"],
            "level": os.environ.get("DJANGO_LOG_LEVEL", "INFO"),
        }
    },
    "formatters": {
        "verbose": {
            "format": "{asctime} ({levelname})- {name}- {message}",
            "style": "{",
        }
    },
}
