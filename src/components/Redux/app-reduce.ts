import { getAuthUserData } from './auth-reduce';

const ActionTypes = {
	SET_INITIALIZED: 'SET_INITIALIZED',
};

type initialStateType = {
	initialized: boolean;
};

const initialState: initialStateType = {
	initialized: false,
};

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.SET_INITIALIZED:
			return { ...state, initialized: true };
		default:
			return state;
	}
};

type initializedSuccessType = {
	type: typeof ActionTypes.SET_INITIALIZED
}

export const initializedSuccess = (): initializedSuccessType => ({
	type: ActionTypes.SET_INITIALIZED,
});

export const initializeApp = () => async (dispatch) => {
	await dispatch(getAuthUserData());
	dispatch(initializedSuccess());
};

export default appReducer;