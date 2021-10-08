# Generated by Django 3.2.7 on 2021-10-06 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0007_student'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='project',
        ),
        migrations.AddField(
            model_name='project',
            name='students',
            field=models.ManyToManyField(blank=True, related_name='project_students', to='projects.Student'),
        ),
    ]
