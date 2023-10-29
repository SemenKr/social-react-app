import {profileAPI} from "../../api/api.ts";
import {PhotosType, PostsDataType, ProfileType} from "../../types/types";
// Определение типов действий (action types)
const ADD_POST = 'ADD-POST'; // Тип действия для добавления поста
const SET_USER_PROFILE = 'SET-USER-PROFILE'; // Тип действия для установки профиля пользователя
const SET_STATUS = 'SET-STATUS'; // Тип действия для установки статуса
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'; // Тип действия для успешного сохранения фотографии
const SET_PROFILE_DATA_SUCCESS = 'SET-PROFILE-DATA-SUCCESS'; // Тип действия для успешного сохранения данных профиля

// Начальное состояние (initial state) для редюсера
const initialState = {
    postsData: [
        // Массив постов
        {
            id: 1,
            message: 'Привет, мои дорогие подписчики! Я так рада, что вы зашли на мой блог. Здесь я буду писать о моей жизни, о моих путешествиях и о том, что меня вдохновляет. Буду рада вашим комментариям и предложениям!',
            likesCount: 12,
            src: 'https://i.pravatar.cc/150?img=1',
        },
        {
            id: 2,
            message: 'Приветствую всех, кто зашел на мой блог! Я специализируюсь на теме здоровья и фитнеса, и буду рад делиться с вами своим опытом и знаниями. Надеюсь, что мои статьи помогут вам быть здоровыми и счастливыми!',
            likesCount: 11111,
            src: 'https://i.pravatar.cc/300?img=2',
        },
        {
            id: 3,
            message: 'Привет, друзья! Я очень люблю путешествовать и открывать новые места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.',
            likesCount: 33,
            src: 'https://i.pravatar.cc/300?img=3',
        },
        {
            id: 4,
            message: 'Привет, друзья! Я очень ... места. В моем блоге я буду рассказывать о своих приключениях и делиться с вами полезными советами о том, как лучше всего планировать свои путешествия.',
            likesCount: 3,
            src: 'https://i.pravatar.cc/300?img=4',
        },
    ] as Array<PostsDataType>,
    newPostText: '' as string | null, // Текст нового поста
    profile: null as ProfileType | null, // Профиль пользователя
    status: 'double click here to change status', // Статус по умолчанию
};

export type InitialStateType = typeof initialState

// Action creators (Создатели действий)
type AddPostActionCreatorActionType = {
    type: typeof ADD_POST,
    text: string
}
export const addPostActionCreator = (text: string): AddPostActionCreatorActionType => ({type: ADD_POST, text});

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile});

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type SavePhotoSuccessActionType = {
    type: typeof SET_PHOTO_SUCCESS,
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SET_PHOTO_SUCCESS, photos});


// Thunks (Асинхронные действия)
export const getProfileUserThunk = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getProfileUser(userId);
        dispatch(setUserProfile(data));
    } catch (error) {
        console.error('Failed to get user profile:', error);
    }
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    const response: any = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        } else {
            // Если resultCode не равен 0, обрабатываем ошибку
            console.error('Failed to update status:', response.data.messages);
        }
    } catch (error) {
        console.error('Error while updating status:', error.message);

        if (error.response) {
            // Если есть ответ от сервера, проверяем статус ошибки HTTP
            console.error('HTTP Status:', error.response.status);
            console.error('HTTP Status Text:', error.response.statusText);
        } else {
            // В случае, если нет ответа от сервера
            console.error('No response from server');
        }
    }
};


export const savePhoto = (photoFile: string) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photoFile);
    if (response.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.photos));
    }
};

export const saveProfileData = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfileData(profileData);
    if (response.data.resultCode === 0) {
        dispatch(getProfileUserThunk(userId));
    }
};


// Редюсер принимает текущее состояние (state) и действие (action), возвращает новое состояние.
const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: Date.now(),
                message: action.text,
                likesCount: 12,
                src: 'https://i.pravatar.cc/150?img=5',
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost], // Добавление нового поста в массив
                newPostText: '', // Сброс текста нового поста
            };
        case SET_USER_PROFILE: // Установка профиля пользователя
            return {...state, profile: action.profile};
        case SET_STATUS: // Установка статуса
            return {...state, status: action.status};
        case SET_PHOTO_SUCCESS: // Установка новых фотографий в профиль
            return {
                ...state,
                profile: {...state.profile, photos: action.photos},
            };
        case SET_PROFILE_DATA_SUCCESS: // Установка новых данных профиля
            return {
                ...state,
                profile: {...state.profile, profile: action.profile} as ProfileType,
            };
        default:
            return state;
    }
};

export default profileReducer;
