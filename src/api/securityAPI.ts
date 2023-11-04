// Объект, содержащий функции для работы с безопасностью
import {instance} from "./api.ts";

type GetCaptureUrl = {
    url: string
}
export const securityAPI = {
    // Функция для получения URL капчи
    getCaptchaUrl() {
        return instance.get<GetCaptureUrl>('/security/get-captcha-url');
    }
}
