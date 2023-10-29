import {authAPI, ResultCodesEnum, securityAPI} from "../../api/api.ts";

// Определение констант для типов действий
const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

type initialStateType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean | false,
    captchaUrl: string | null, // if null? значит капча не обязательна
}

// Исходное состояние для редюсера
const initialState: initialStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null, // if null? значит капча не обязательна
}

// Редюсер для управления состоянием авторизации
const authReducer = (state = initialState, action): initialStateType => {
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

type SetAuthUserDataActionPayloadType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof  SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
// Action creators (создатели действий)
export const setAuthUserData = (id: number, login: string, email: string, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {id, login, email, isAuth}, // Упрощенный синтаксис для создания объекта
});

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl},
})
// Асинхронные action creators (действия, которые выполняют асинхронные операции)
export const getAuthUserData = () => {
    return async (dispatch: any) => {
        try {
            const data = await authAPI.getAuthMe()
            if (data.resultCode === ResultCodesEnum.Success) {
                const {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        try {
            const response = await authAPI.login(email, password, rememberMe, captcha);
            if (response.data.resultCode === ResultCodesEnum.Success) {
                // авторизовались и получаем дополнительные данные
                dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
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
            if (response.data.resultCode === ResultCodesEnum.Success) {
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
