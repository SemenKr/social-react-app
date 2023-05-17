import {combineReducers, legacy_createStore as createStore} from "redux";
import navBarReducer from "./navBar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from './auth-reduce';

let reducers = combineReducers({
	navBar: navBarReducer,
	profilePage: profileReducer,
	dialogPage: dialogsReducer,
	usersPage: usersReducer,
	auth: authReducer,
})
let store = createStore(reducers);

window.store = store;
export default store; 