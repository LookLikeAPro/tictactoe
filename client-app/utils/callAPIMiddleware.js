function callAPIMiddleware({ dispatch, getState }) {
	return function(next) {
		return function(action) {
			const {
				types,
				callAPI,
				shouldCallAPI = () => true,
				payload = {}
				} = action;
			if (!types) {
				// Normal action: pass it on
				return next(action);
			}

			if (
				!Array.isArray(types) ||
				types.length !== 3 ||
				!types.every(type => typeof type === "string")
			) {
				throw new Error("Expected an array of three string types.");
			}

			if (typeof callAPI !== "string" && typeof callAPI !== "object") {
				throw new Error("Expected fetch to be a string or object.");
			}

			if (!shouldCallAPI(getState())) {
				return null;
			}

			const [requestType, successType, failureType] = types;

			dispatch(Object.assign({}, payload, {
				type: requestType
			}));
			var fetchMethod;
			if (typeof callAPI === "string") {
				var fetchParams = {
					headers: {}
				};
				fetchMethod = ()=>fetch(callAPI, fetchParams);
			}
			else if (typeof callAPI === "object") {
				var fetchParams = {
					method: callAPI.method || "get",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					body: JSON.stringify(callAPI.data)
				};
				fetchMethod = ()=>fetch(callAPI.url, fetchParams);
			}
			return fetchMethod()
				.then(function(response) {
					response.json().then(function(json) {
						if (response.status >= 200 && response.status < 300) {
							dispatch(Object.assign({}, payload, {
								type: successType,
								data: json
							}));
						}
						else {
							dispatch(Object.assign({}, payload, {
								type: failureType,
								error: json
							}));
						}
					});
				});
		};
	};
}

export default callAPIMiddleware;
