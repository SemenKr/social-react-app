import {instance, ResponseType} from "./api.ts";


interface MyDataType {
	id: number;
	email: string;
	login: string;
}

export interface LoginApiResponseType {
	userId: number
}


export const authAPI = {
    getAuthMe() {
        return instance.get<ResponseType<MyDataType>>('/auth/me')
            .then(response => response.data);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginApiResponseType>>('/auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)

    },
    logout() {
        return instance.delete('/auth/login')
    }
}
