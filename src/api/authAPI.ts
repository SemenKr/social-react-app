import {instance, ResultCodesEnum} from "./api.ts";

interface MyDataType {
	id: number;
	email: string;
	login: string;
}

export interface MyApiResponseType {
	resultCode: ResultCodesEnum;
	messages: Array<string>;
	data: MyDataType;
}

export interface LoginApiResponseType {
	resultCode: ResultCodesEnum;
	messages: Array<string>;
	fieldsErrors: Array<string>
	data:  {
		userId: number
	};
}


export const authAPI = {
    getAuthMe() {
        return instance.get<MyApiResponseType>('/auth/me')
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginApiResponseType>('/auth/login', {email, password, rememberMe, captcha})

    },
    logout() {
        return instance.delete('/auth/login')
    }
}
