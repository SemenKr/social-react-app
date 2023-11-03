import {GetItemsType, instance, ResponseType} from "./api.ts";


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

export const userAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 6): Promise<GetItemsType> {
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize} `);
        return response.data
    },
    postFollow(userId: number) {
        return instance.post(`follow/` + userId, {},)
            .then((response: ResponseType<User>) => response.data);
    },
    deleteFollow(userId: number) {
        return instance.delete(`follow/` + userId)
            .then((response: ResponseType) => response.data) as Promise<ResponseType>;
    },
}
