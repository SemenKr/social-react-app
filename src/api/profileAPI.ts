import { instance, APIResponseType } from "./api";
import { PhotosType, ProfileType } from "../types/types";

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then((response) => response.data);
    },
    getStatus(userId: number) { // Добавлен тип для userId
        return instance.get<string>(`profile/status/` + userId)
            .then((response) => response.data)
            .catch((e: any) => { // Добавлен тип для параметра catch
                console.error('Произошла ошибка:', e);
            });
    },
    updateStatus(status: string) { // Добавлен тип для status
        return instance.put<APIResponseType<PhotosType>>('profile/status', { status });
    },
    async savePhoto(photoFile: any) { // Добавлен тип для photoFile
        // @ts-ignore
        const formData = new FormData();
        formData.append('image', photoFile);
        const res = await instance.put(`profile/photo`, formData);
        return res.data;
    },
    saveProfileData(profileData: any) { // Добавлен тип для profileData
        console.log('API профиля', profileData);
        return instance.put('profile/', profileData);
    },
};
