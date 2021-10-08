from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from .models import Photo

def upload_photos(images, project):
    num = 1
    for img in images:
        instance = Photo.objects.create(project=project, number=num)
        num += 1
        instance.save()
        
        i = Image.open(img)
        i = i.convert('RGB')
        thumb_io = BytesIO()
        i.save(thumb_io, format='JPEG', quality=60)
        inmemory_uploaded_file = InMemoryUploadedFile(thumb_io, None, 'foo.jpeg', 'image/jpeg', thumb_io.tell(), None)
        instance.photo = inmemory_uploaded_file
        
        i = Image.open(img)
        i = i.convert('RGB')
        i.thumbnail((400,400))
        thumb_io = BytesIO()
        i.save(thumb_io, format='JPEG', quality=60)
        inmemory_uploaded_file = InMemoryUploadedFile(thumb_io, None, 'foo.jpeg', 'image/jpeg', thumb_io.tell(), None)
        instance.thumbnail = inmemory_uploaded_file
        
        instance.save()