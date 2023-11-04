import {PhotosType, PostsDataType, ProfileType} from "../../types/types";
import {profileAPI} from "../../api/profileAPI.ts";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

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
        // Другие посты...
    ] as Array<PostsDataType>,
    newPostText: '' as string | null, // Текст нового поста
    profile: null as ProfileType | null, // Профиль пользователя
    status: 'double click here to change status', // Статус по умолчанию
};

export type InitialStateType = typeof initialState

type ActionTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionTypes>

export const actions = {
    addPostActionCreator: (text: string) => ({type: 'ADD_POST', text} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SET_PHOTO_SUCCESS', photos} as const),
}

// Thunks (Асинхронные действия)
export const getProfileUserThunk = (userId: number) => async (dispatch: any) => {
    try {
        const data = await profileAPI.getProfileUser(userId);
        dispatch(actions.setUserProfile(data));
    } catch (error) {
        console.error('Failed to get user profile:', error);
    }
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const response: any = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response.data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status));
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

export const savePhoto = (photoFile: File): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(photoFile);
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.photos));
    }
};

export const saveProfileData = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfileData(profileData);
    if (response.data.resultCode === 0) {
        if (userId != null) {
            dispatch(getProfileUserThunk(userId));
        } else {
            throw new Error("userId cant be null");
        }
    }
};

// Редюсер принимает текущее состояние (state) и действие (action), возвращает новое состояние.
const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_POST":
            // Создаем новый пост
            const newPost = {
                id: Date.now(), // Уникальный идентификатор поста
                message: action.text, // Текст поста
                likesCount: 12, // Количество лайков по умолчанию
                src: 'https://i.pravatar.cc/150?img=5', // URL аватара
            };
            return {
                ...state,
                postsData: [...state.postsData, newPost], // Добавление нового поста в массив
                newPostText: '', // Сброс текста нового поста
            };
        case "SET_USER_PROFILE": // Установка профиля пользователя
            return {...state, profile: action.profile};
        case "SET_STATUS": // Установка статуса
            return {...state, status: action.status};
        case "SET_PHOTO_SUCCESS": // Установка новых фотографий в профиль
            return {
                ...state,
                profile: {...state.profile, photos: action.photos},
            };
        default:
            return state;
    }
};

export default profileReducer;
