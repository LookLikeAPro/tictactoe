import routes from "routes";
import React from "react";

import {RoutingContext, match} from "react-router";
import {Provider} from "react-redux";
import store from "store";

import createLocation from "history/lib/createLocation";
import createHistory from "history/lib/createMemoryHistory";

export default class MainRenderer {
	render(path, body, callback) {
		var data = JSON.parse(body.toString());
		const location = createLocation(path);
		const history = createHistory({ entries: [location] });
		match({routes, location}, (err, redirectLocation, renderProps) => {
			const InitialComponent = (
				<Provider store={store}>
					<RoutingContext {...renderProps} children={routes} history={history} location={location} />
				</Provider>
			);
			const componentHTML = React.renderToString(InitialComponent);
			const HTML = `<div id='content'>${componentHTML}</div>`;
			callback(null, HTML);
		});
	}
}
