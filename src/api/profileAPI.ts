import {instance} from "./api.ts";
import { ProfileType} from "src/types/types.ts";

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then((response: ProfileType )=> response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId).catch((e) => {
            console.error('An error occurred:', e);
        });
    },
    updateStatus(status) {
        return instance.put('profile/status', {status: status});
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
