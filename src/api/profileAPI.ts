import { instance, APIResponseType } from "./api"; // Уберите расширение файла из импорта
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
    savePhoto(photoFile: File) { // Добавлен тип для photoFile
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData)
            .then((res) => res.data);
    },
    saveProfileData(profileData: any) { // Добавлен тип для profileData
        console.log('API профиля', profileData);
        return instance.put('profile/', profileData);
    },
};
