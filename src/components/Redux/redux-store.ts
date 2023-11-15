import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import navBarReducer from "./navBar-reducer";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from './auth-reduce';
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import appReduce from "./app-reduce";

// Импортируем необходимые зависимости для настройки Redux.
let rootReducers = combineReducers({
    navBar: navBarReducer,
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReduce,
})

// Создаем корневой редуктор, объединяя редукторы для каждой части состояния.
type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>;


// Тип InferActionsTypes позволяет извлечь типы действий (action types) из объекта, содержащего action creators.
export type InferActionsTypes<T> = T extends {[key: string]: (...arg: any[]) => infer U} ? U : never
// Тип InferActionsTypes<T> представляет собой удобный способ извлечения типов действий (action types) из объекта, содержащего создателей действий (action creators). Обычно этот тип используется в Redux-приложениях для автоматического определения типов действий, созданных с помощью action creators.
// T - это тип объекта, который содержит в себе action creators.
// { [key: string]: (...args: any[]) => infer U } - это сигнатура типа, описывающая объект, где ключи - это строки (action types), а значения - это функции, которые могут принимать разные аргументы и возвращать некоторый результат, описанный типом U.
//  infer U - это ключевое слово infer, которое извлекает тип U из типа функции.
//  Таким образом, InferActionsTypes принимает объект с action creators и возвращает тип, который представляет собой объединение всех возможных типов, возвращаемых этими action creators. Это позволяет легко определять типы для редюсеров и улучшает статическую проверку типов в Redux-приложениях.

// Реализация редуктора, который обрабатывает различные действия.
export type BaseThunkType<ActionTypes extends Action,
    ReturnType = Promise<void>> = ThunkAction<ReturnType,
    AppStateType, unknown, ActionTypes>

// Создаем утилиты для работы с типами действий.

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Определяем расширение для Redux DevTools (если доступно).
const store = createStore(rootReducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleWare)))
// Создаем Redux-хранилище, передавая корневой редуктор, DevTools расширение и middleware redux-thunk.
// @ts-ignore
window.__store__ = store;
// Делаем хранилище доступным в глобальной области видимости (для отладки).
export default store;

