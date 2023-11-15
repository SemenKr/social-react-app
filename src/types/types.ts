export type PostsDataType = {
    id: number
    message: string
    likesCount: number
    src: string
}
export type ProfileContactType = {
    facebook: string;
    website: string;
    vk: string;
    twitter: string;
    instagram: string;
    youtube: string;
    github: string;
    mainLink: string;
};
export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ProfileContactType,
    photos: PhotosType
    aboutMe: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}


export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}


