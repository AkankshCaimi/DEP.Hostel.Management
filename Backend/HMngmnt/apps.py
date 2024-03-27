from django.apps import AppConfig


class HmngmntConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'HMngmnt'

    def ready(self):
        import HMngmnt.signals
