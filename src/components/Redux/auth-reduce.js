import {authAPI, securityAPI} from "../../api/api";

// Определение констант для типов действий
const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

// Исходное состояние для редюсера
const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null, // if null? значит капча не обязательна
}

// Редюсер для управления состоянием авторизации
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload, // Объединяем текущее состояние и данные из action.payload
            }
        default:
            return state;
    }
}

// Action creators (создатели действий)
export const setAuthUserData = (id, login, email, isAuth) => ({
    type: SET_USER_DATA,
    payload: {id, login, email, isAuth}, // Упрощенный синтаксис для создания объекта
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl},
})
// Асинхронные action creators (действия, которые выполняют асинхронные операции)
export const getAuthUserData = () => {
    return async (dispatch) => {
        try {
            const data = await authAPI.getAuthMe();
            if (data.resultCode === 0) {
                const {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const login = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password, rememberMe, captcha);
            if (response.data.resultCode === 0) {
                // авторизовались и получаем дополнительные данные
                dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                }
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

export const getCaptchaUrl = () => {
    return async (dispatch) => {
        try {
            const response = await securityAPI.getCaptchaUrl();
            const captchaUrl = response.data.url;
            dispatch(getCaptchaUrlSuccess(captchaUrl)); // Вызываем action creator для сохранения URL капчи в состоянии
        } catch (error) {
            console.error(error);
        }
    };
};

export default authReducer;
