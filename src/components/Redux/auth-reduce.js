import {authAPI} from "../../api/api";

const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {
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

export const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {id: id, login: login, email: email, isAuth}
});

export const getAuthUserData = () => {
    return async (dispatch) => {
        try {
            const data = await authAPI.getAuthMe();
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        } catch (error) {
			console.error(error);
        }
    }
}

export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password, rememberMe);
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                throw new Error("Ошибка входа. Проверьте введенные данные.");
            }
        } catch (error) {
			console.error(error);
        }
    };
};


export const logout = () => {
    return async (dispatch) => {
		try {
			const response = await authAPI.logout();
			if (response.data.resultCode === 0) {
				dispatch(setAuthUserData(null, null, null, false));
			}
		} catch (error) {
			console.error(error);
		}
    };
}

export default authReducer;
