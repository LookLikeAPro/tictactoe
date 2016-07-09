import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import injectTapEventPlugin from "react-tap-event-plugin";
import store from "store";
import routes from "routes";

injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
		<Provider store={store} key="provider">
			<Router children={routes(store)} history={history}/>
		</Provider>,
	document.getElementById("content")
);
