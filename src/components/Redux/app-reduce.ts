// Определение констант для типов действий
import { getAuthUserData } from './auth-reduce';
import {InferActionsTypes} from "./redux-store";


const initialState = {
	initialized: false, // Начальное состояние: приложение не инициализировано
};

type initialStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>


// Редуктор приложения
const appReducer = (state: initialStateType = initialState, action: ActionTypes): initialStateType => {
	switch (action.type) {
		case 'SN/APP/SET_INITIALIZED':
			// Обработка действия SET_INITIALIZED: установка флага initialized в true
			return { ...state, initialized: true };
		default:
			return state;
	}
};

export const actions = {
	initializedSuccess: () => ({type: 'SN/APP/SET_INITIALIZED',} as const),
}


// Действие для инициализации приложения
export const initializeApp = () => async (dispatch: any) => {
	await dispatch(getAuthUserData()); // Вызов функции для получения данных пользователя
	dispatch(actions.initializedSuccess()); // Вызов действия initializedSuccess для установки флага initialized в true
};

export default appReducer; // Экспорт редуктора
