# Generated by Django 3.2.7 on 2021-09-30 23:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='project_name',
            field=models.CharField(max_length=100, verbose_name='project_name'),
        ),
    ]
