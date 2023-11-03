// Объект, содержащий функции для работы с безопасностью
import {instance} from "./api.ts";

export const securityAPI = {
    // Функция для получения URL капчи
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url');
    }
}
