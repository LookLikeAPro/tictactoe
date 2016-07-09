import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tictactoe.settings")

import tictactoe.startup as startup
startup.run()

application = get_wsgi_application()
