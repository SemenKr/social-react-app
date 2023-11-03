import {instance} from "./api.ts";

interface User {
    name: string;
    id: number;
    photos: {
        small: string | null;
        large: string | null;
    };
    status: string | null;
    followed: boolean;
}

interface UsersData {
    items: User[];
    totalCount: number;
    error: string | null;
}

export const userAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 6) {
        return instance.get<UsersData>(`users?page=${currentPage}&count=${pageSize} `)
            .then(response => response.data);
    },
    deleteFollow(userId: number) {
        return instance.delete(`follow/` + userId)
            .then(response => response.data);
    },
    postFollow(userId: number) {
        return instance.post(`follow/` + userId, {},)
            .then(response => response.data);
    },
}
