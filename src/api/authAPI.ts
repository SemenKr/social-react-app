import { instance, APIResponseType } from "./api.ts";

// Определение интерфейса для данных, получаемых при вызове /auth/me
interface MyDataType {
    id: number;
    email: string;
    login: string;
}

// Определение интерфейса для данных, получаемых при вызове /auth/login
export interface LoginApiResponseType {
    userId: number;
}

// Экспорт объекта authAPI
export const authAPI = {
    // Метод для выполнения GET-запроса к /auth/me
    getAuthMe() {
        return instance.get<APIResponseType<MyDataType>>('/auth/me')
            .then(response => response.data);
    },
    // Метод для выполнения POST-запроса к /auth/login
    // Принимает параметры email, password, rememberMe (со значением по умолчанию false) и captcha (со значением по умолчанию null)
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginApiResponseType>>('/auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    // Метод для выполнения DELETE-запроса к /auth/login
    logout() {
        return instance.delete('/auth/login');
    }
}
