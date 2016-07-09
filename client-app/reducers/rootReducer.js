import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import games from "./games";

const rootReducer = combineReducers({
	routing: routerReducer,
	games
});

export default rootReducer;
