import { getAuthUserData } from './auth-reduce';

// Определение констант для типов действий
const ActionTypes = {
	SET_INITIALIZED: 'SET_INITIALIZED', // Тип действия для установки флага initialized
};

// Определение начального состояния приложения
type initialStateType = {
	initialized: boolean; // Флаг, указывающий на инициализацию приложения
};

const initialState: initialStateType = {
	initialized: false, // Начальное состояние: приложение не инициализировано
};

// Редуктор приложения
const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
	switch (action.type) {
		case ActionTypes.SET_INITIALIZED:
			// Обработка действия SET_INITIALIZED: установка флага initialized в true
			return { ...state, initialized: true };
		default:
			return state;
	}
};

// Определение типа действия initializedSuccessActionType
type initializedSuccessActionType = {
	type: typeof ActionTypes.SET_INITIALIZED; // Определение типа действия SET_INITIALIZED
}

// Действие для установки флага initialized в true
export const initializedSuccess = (): initializedSuccessActionType => ({
	type: ActionTypes.SET_INITIALIZED,
});

// Действие для инициализации приложения
export const initializeApp = () => async (dispatch: any) => {
	await dispatch(getAuthUserData()); // Вызов функции для получения данных пользователя
	dispatch(initializedSuccess()); // Вызов действия initializedSuccess для установки флага initialized в true
};

export default appReducer; // Экспорт редуктора
