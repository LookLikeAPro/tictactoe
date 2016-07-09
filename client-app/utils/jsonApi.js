export function callApi(url, params) {
	return new Promise(function(resolve, reject) {
		fetch(url, params).then(function(response) {
			response.json().then(function(json) {
				resolve(json, response.status);
			});
		});
	});
}
