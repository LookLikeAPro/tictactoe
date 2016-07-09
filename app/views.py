from django.http import HttpResponse
from django.views.generic import View
from django.template import RequestContext, loader
from subprocess import call
from django.conf import settings

import socket
import urllib.request

class app(View):
	def get(self, request, *args, **kwargs):
		# if settings.DEBUG:
		# 	template = loader.get_template('app-hotreload.html')
		# 	return HttpResponse(template.render())
		template = loader.get_template('app.html')
		return HttpResponse(template.render())
