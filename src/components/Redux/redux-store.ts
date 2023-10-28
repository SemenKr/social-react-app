import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
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

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare)))

// @ts-ignore
window.__store__ = store;
export default store;

