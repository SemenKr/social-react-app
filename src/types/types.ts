export type PostsDataType = {
    id: number
    message: string
    likesCount: number
    src: string
}

export type ProfileType = {
    aboutMe: string;
    contacts: {
        facebook: string;
        website: string;
        vk: string;
        twitter: string;
        instagram: string;
        youtube: string;
        github: string;
        mainLink: string;
    };
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    userId: number;
    photos: {
        small: string;
        large: string;
    };
}

export type PhotosType = {
    small: string | null;
    large: string | null;
}

export type UserType = {
    id: number
    name: string
    status: string
    followed: boolean
    photos: PhotosType
}


