import {authAPI} from "../../api/api";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
	id: null,
	login: null,
	email: null,
	isAuth: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.payload,// склеиваем 2 объекта state и data из action.data
			}
		default:
			return state;

	}


}

export const setAuthUserData = (id, login, email, isAuth) => ({type: SET_USER_DATA, payload: {id: id, login: login, email: email, isAuth}});

export const getAuthMeThunkCreator = () => {
	return (dispatch) => {
		authAPI.getAuthMe()
			.then(data => {
				if (data.resultCode === 0) {
					let {id, login, email} = data.data;
					dispatch(setAuthUserData(id, login, email, true));
				}
			});
	}
}

export const login = (email, password, rememberMe) => {
	return async (dispatch) => {
		try {
			const response = await authAPI.login(email, password, rememberMe);
			if (response.data.resultCode === 0) {
				dispatch(getAuthMeThunkCreator());
			} else {
				throw new Error("Ошибка входа. Проверьте введенные данные.");
			}
		} catch (error) {
			throw error;
		}
	};
};



export const logout = () => {
	return (dispatch) => {
		authAPI.logout()
			.then(response => {
				if (response.data.resultCode === 0) {
					dispatch(setAuthUserData(null, null, null, false));
				}
			});
	};
}

export default authReducer;
