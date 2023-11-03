import {instance} from "./api.ts";

export const userAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 6) {
        return instance.get(`users?page=${currentPage}&count=${pageSize} `)
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
