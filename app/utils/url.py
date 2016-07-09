from collections import OrderedDict
from django.conf.urls import url

def generate_patterns(urls, prefix=''):
	def url_sort_key(t):
		#Put id matching at end
		if '(' in t[0]:
			return 1000
		#put empty even further behind
		if t[0]=='':
			return 1001
		return -len(t[0])
	if prefix != '':
		prefix += '/'
	urls = OrderedDict(sorted(urls.items(), key=url_sort_key))
	patterns = []
	for key, subset in urls.items():
		if isinstance(subset, dict):
			patterns += generate_patterns(subset, prefix+key)
		else:
			if type(subset).__name__ == 'type':
				subset = subset.as_view()
			elif type(subset).__name__ == 'function':
				pass
			if prefix == '/' or key == '':
				patterns.append(url(r'^'+prefix[:-1]+key, subset))
			else:
				patterns.append(url(r'^'+prefix+key, subset))
	return patterns
