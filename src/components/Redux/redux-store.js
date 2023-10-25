import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import navBarReducer from "./navBar-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer";
import authReducer from './auth-reduce.ts';
import thunkMiddleWare from "redux-thunk";
import appReduce from "./app-reduce.ts";

let reducers = combineReducers({
	navBar: navBarReducer,
	profilePage: profileReducer,
	dialogPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReduce,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare)))

window.store = store;
export default store;
