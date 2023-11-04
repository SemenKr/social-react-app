// Импорт необходимых зависимостей из другого модуля api.ts
import { GetItemsType, instance, APIResponseType } from "./api.ts";

// Определение типа данных для пользователя
export type User = {
    name: string;
    id: number;
    photos: {
        small: string | null;
        large: string | null;
    };
    status: string | null;
    followed: boolean;
}

// Экспорт объекта userAPI
export const userAPI = {
    // Метод для получения списка пользователей
    async getUsers(currentPage: number = 1, pageSize: number = 6): Promise<GetItemsType> {
        // Выполнение GET-запроса к API для получения пользователей
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize} `);
        // Возвращение данных из ответа
        return response.data;
    },
    // Метод для отправки POST-запроса на подписку за пользователем
    postFollow(userId: number) {
        // Выполнение POST-запроса на подписку
        return instance.post<APIResponseType>(`follow/` + userId, {})
            .then((response: APIResponseType<User>) => response.data);
    },
    // Метод для отправки DELETE-запроса на отписку от пользователя
    deleteFollow(userId: number) {
        // Выполнение DELETE-запроса на отписку
        return instance.delete(`follow/` + userId)
            .then((response: APIResponseType) => response.data) as Promise<APIResponseType>;
    },
}
