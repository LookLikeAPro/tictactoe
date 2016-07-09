import thunk from "redux-thunk";
import callAPIMiddleware from "utils/callAPIMiddleware";
import rootReducer from "reducers/rootReducer";
import {applyMiddleware, compose, createStore} from "redux";
import {browserHistory} from "react-router";
import {routerMiddleware} from "react-router-redux";

function _configureStore(initialState) {
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, callAPIMiddleware, routerMiddleware(browserHistory))
		)
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("reducers/rootReducer", () => {
			const nextReducer = require("reducers/rootReducer");
			store.replaceReducer(nextReducer);
		});
	}
	return store;
}

export default _configureStore;
