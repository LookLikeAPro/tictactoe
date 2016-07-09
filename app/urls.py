from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView
from app.utils.url import generate_patterns
import app.views
from django.contrib import admin

from app.apis import game_api

urls = {
	'api': {
		'games': {
			'': game_api.GameList,
			'(?P<id>[-\w]{1,20})': game_api.GameDetail,
		},
		'moves': {
			'': game_api.MoveList,
			'(?P<id>[-\w]{1,20})': game_api.MoveDetail,
		}
	},
	'': app.views.app
}

urlpatterns = [
	url(r'^admin/', include(admin.site.urls )),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += generate_patterns(urls)
