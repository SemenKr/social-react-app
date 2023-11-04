// Импорты из других модулей и файлов
import {ResultCodesEnum} from "../../api/api.ts";
import {authAPI} from "../../api/authAPI.ts";
import {securityAPI} from "../../api/securityAPI.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

type initialStateType = typeof initialState

// Типы действий, которые могут быть выполнены в редюсере
type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionTypes>


// Исходное состояние для редюсера авторизации
const initialState = {
    id: null,           // ID пользователя
    login: null,         // Логин пользователя
    email: null,         // Электронная почта пользователя
    isAuth: false,       // Флаг, указывающий, авторизован ли пользователь
    captchaUrl: null,   // URL капчи, если она требуется (если null, капча не требуется)
}


// Action creators (создатели действий) для установки данных пользователя и URL капчи
export const actions = {
    setAuthUserData: (id: number, login: string, email: string, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: {id, login, email, isAuth},
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl},
    } as const)
}

// Редюсер для управления состоянием авторизации
const authReducer = (state = initialState, action: ActionTypes): initialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            // Обновляем состояние, объединяя текущее состояние и данные из action.payload
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

// Асинхронные action creators (действия, которые выполняют асинхронные операции)
export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.getAuthMe();
            if (data.resultCode === ResultCodesEnum.Success) {
                const {id, login, email} = data.data;
                dispatch(actions.setAuthUserData(id, login, email, true));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password, rememberMe, captcha);
            if (response.data.resultCode === ResultCodesEnum.Success) {
                await dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                    await dispatch(getCaptchaUrl());
                }
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
};

export const logout = (): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await authAPI.logout();
            if (response.data.resultCode === ResultCodesEnum.Success) {
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            console.error(error);
        }
    };
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        try {
            const response = await securityAPI.getCaptchaUrl();
            const captchaUrl = response.data.url;
            dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
        } catch (error) {
            console.error(error);
        }
    };
};

export default authReducer;
