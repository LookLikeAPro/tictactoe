import React from "react";
import {Route, IndexRoute, Redirect, IndexRedirect} from "react-router";

import Application from "containers/Application";
import HomePage from "containers/HomePage";
import NotFoundPage from "containers/NotFoundPage";

export default (store) => {
	return (
		<Route>
			<Route path="/" component={Application}>
				<IndexRoute component={HomePage} />
			</Route>
			<Route path="*" component={NotFoundPage}/>
		</Route>
	);
};
