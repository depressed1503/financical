from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    email = models.EmailField(unique=True)

class Spending(models.Model):
    user = models.ForeignKey(to='CustomUser', on_delete=models.CASCADE)
    sum = models.FloatField(verbose_name="Сумма")
    timestamp = models.DateTimeField(verbose_name="Время")
    name = models.CharField(verbose_name="Название", max_length=140)
    text = models.TextField(verbose_name="Заметка")
    category = models.ForeignKey(to="Category", on_delete=models.SET_NULL, null=True, blank=True)

class Category(models.Model):
    user = models.ForeignKey(to='CustomUser', on_delete=models.CASCADE)
    name = models.CharField(verbose_name="Название", max_length=140)
    color = models.CharField(verbose_name="Цвет в формате #FFFFFF", max_length=7)
    icon = models.CharField(verbose_name="Иконка", max_length=3)
