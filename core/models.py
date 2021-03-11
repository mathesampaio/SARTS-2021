from django.db import models
import uuid

# SIGNALS
from django.db.models import signals
from django.template.defaultfilters import slugify

# Create your models here.

class Mini(models.Model):
    cod = models.IntegerField('Cod')
    datetime = models.CharField('Datetime', max_length=100)
    time_series = models.FloatField('Series')

    def __str__(self):
        return "%d" % (self.cod)