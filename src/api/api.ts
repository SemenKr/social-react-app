// Импортируем библиотеку axios для выполнения HTTP-запросов
import axios from 'axios';
import {UserType} from "../types/types";

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

export type APIResponseType<Data = {}, ResultCode = ResultCodeEnum> = {
    data: Data
    resultCode: ResultCode
    messages: Array<string>
}


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10,
}


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

