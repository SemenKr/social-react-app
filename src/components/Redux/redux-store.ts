import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import navBarReducer from "./navBar-reducer.ts";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from './auth-reduce.ts';
import thunkMiddleWare from "redux-thunk";
import appReduce from "./app-reduce.ts";

// Импортируем необходимые зависимости для настройки Redux.
let reducers = combineReducers({
    navBar: navBarReducer,
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReduce,
})

// Создаем корневой редуктор, объединяя редукторы для каждой части состояния.
type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

// Определяем типы для корневого редуктора и для всего состояния приложения.

type PropertiesTipes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<PropertiesTipes<T>>

// Создаем утилиты для работы с типами действий.

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Определяем расширение для Redux DevTools (если доступно).
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare)))
// Создаем Redux-хранилище, передавая корневой редуктор, DevTools расширение и middleware redux-thunk.
// @ts-ignore
window.__store__ = store;
// Делаем хранилище доступным в глобальной области видимости (для отладки).
export default store;

