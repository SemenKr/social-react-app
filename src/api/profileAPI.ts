import {instance, APIResponseType} from "./api.ts";
import {PhotosType, ProfileType} from "../types/types";

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then((response )=> response.data);
    },
    getStatus(userId) {
        return instance.get<string>(`profile/status/` + userId).catch((e) => {
            console.error('An error occurred:', e);
        });
    },
    updateStatus(status) {
        return instance.put<APIResponseType<PhotosType>>('profile/status', {status: status});
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData)
            .then(res => res.data)
    },
    saveProfileData(profileData) {
        console.log('Api profile', profileData);
        return instance.put('profile/', profileData);
    }
}
