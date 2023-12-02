// Объект, содержащий функции для работы с безопасностью
import {instance} from "./api";

type GetCaptchaURLResponseType = {
    url: string
}

export const securityAPI = {
    // Функция для получения URL капчи
    async getCaptchaUrl() {
        let res = await instance.get<GetCaptchaURLResponseType>(`/security/get-captcha-url`);
        return res.data;
    }

}
