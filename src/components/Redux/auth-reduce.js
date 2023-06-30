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
				isAuth: true,
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
	return (dispatch) => {
		authAPI.login(email, password, rememberMe)
			.then(data => {
				if (data.resultCode === 0) {
					dispatch(getAuthMeThunkCreator())
				}
			});
	}

}

export const logout = () => {
	return (dispatch) => {
		authAPI.logout()
			.then(data => {
				if (data.resultCode === 0) {
					dispatch(getAuthMeThunkCreator(null, null, null, false))
				}
			});
	}

}

export default authReducer;
