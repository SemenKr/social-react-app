// Импортируем библиотеку axios для выполнения HTTP-запросов
import axios from 'axios';
import {User} from "./userAPI";

// Создаем экземпляр axios с настройками
export const instance = axios.create({
    // Базовый URL для всех запросов к API
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    // Включаем передачу куки (Cookies) в запросах
    withCredentials: true,
    // Заголовки, отправляемые в каждом запросе
    headers: {
        'API-KEY': 'b1ffcda1-585a-49b2-92cc-e80819ea450a',
    }
});

// Перечисление (enum) для кодов результатов запросов
export enum ResultCodesEnum {
    Success = 0,         // Успешный результат
    Error = 1,           // Ошибка
    CaptchaIsRequired = 10 // Требуется ввод капчи
}

export type GetItemsType = {
    items: Array<User>
    totalCount: number;
    error: string | null;
}

export interface ResponseType<D = {}, RC = ResultCodesEnum> {
    data: D
    messages: Array<string>
    resultCode: RC
}
