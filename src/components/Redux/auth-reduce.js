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
				...action.data,// склеиваем 2 объекта state и data из action.data
				isAuth: true,
			}
		default:
			return state;

	}


}

export const setAuthUserData = (id, login, email) => ({type: SET_USER_DATA, data: {id: id, login: login, email: email}});

export default authReducer;