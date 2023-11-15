// Объект, содержащий функции для работы с безопасностью
import {instance} from "./api";

type GetCaptchaURLResponseType = {
    url: string
}

export const securityAPI = {
    // Функция для получения URL капчи
    getCaptchaUrl() {
        return instance.get<GetCaptchaURLResponseType>(`/security/get-captcha-url`)
            .then(res=>res.data)
    }

}
