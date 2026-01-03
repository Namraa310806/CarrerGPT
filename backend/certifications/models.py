from django.db import models

class Certification(models.Model):
    name = models.CharField(max_length=255)
    organization = models.CharField(max_length=255)
    issue_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    credential_id = models.CharField(max_length=255, null=True, blank=True)
    credential_url = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name