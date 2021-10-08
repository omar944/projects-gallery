import os

def upload_to(instance, filename, name):
    base, extension = os.path.splitext(filename.lower())
    return f"{instance.pk}/{name}{extension}"


def upload_book(instance, filename):
    return upload_to(instance, filename, 'book')


def upload_presentation(instance, filename):
    return upload_to(instance, filename, 'presentation')


def upload_photo(instance, filename):
    base, extension = os.path.splitext(filename.lower())
    return f"{instance.project.pk}/photos/{instance.number}{extension}"

def upload_thumbnail(instance, filename):
    base, extension = os.path.splitext(filename.lower())
    return f"{instance.project.pk}/thumbnails/{instance.number}{extension}"