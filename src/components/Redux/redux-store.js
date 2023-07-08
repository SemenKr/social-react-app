import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import navBarReducer from "./navBar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from './auth-reduce';
import thunkMiddleWare from "redux-thunk";
import appReduce from "./app-reduce";

let reducers = combineReducers({
	navBar: navBarReducer,
	profilePage: profileReducer,
	dialogPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
	app: appReduce,
})
let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;
export default store;
