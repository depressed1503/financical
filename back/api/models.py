from django.db import models


class Spending(models.Model):
    sum = models.FloatField(verbose_name="Сумма")
    timestamp = models.DateTimeField(verbose_name="Время")
    name = models.CharField(verbose_name="Название", max_length=140)
    text = models.TextField(verbose_name="Заметка")
    category = models.ForeignKey(to="Category", on_delete=models.SET_NULL, null=True, blank=True)

class Category(models.Model):
    name = models.CharField(verbose_name="Название", max_length=140)
    color = models.CharField(verbose_name="Цвет в формате #FFFFFF", max_length=7)
