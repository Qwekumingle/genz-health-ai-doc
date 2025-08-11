from django.db import models
from django.utils import timezone

class WaitList(models.Model):
    id = models.AutoField(primary_key = True)
    email = models.EmailField(unique=True)
    name = models.TextField(max_length=30)
    comment = models.TextField(blank=True)
    date = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ['-updated_at']

    def append_comment(self, new_comment):
        """Append new comment with timestamp if provided."""
        if not new_comment.strip():  # skip if comment is empty
            return

        timestamp = timezone.now().strftime("%Y-%m-%d %H:%M:%S")
        if self.comment:
            self.comment += f"\n[{timestamp}] {new_comment}"
        else:
            self.comment = new_comment  # no timestamp for first comment
        self.save(update_fields=['comment', 'updated_at'])


    def __str__(self):
        return f"{self.name} <{self.email}>"
