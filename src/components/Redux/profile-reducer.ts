import { profileAPI } from "../../api/api";

// Определение типов действий (action types)
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';
const SET_PROFILE_DATA_SUCCESS = 'SET-PROFILE-DATA-SUCCESS';

// Action creators
export const addPostActionCreator = (text) => ({ type: ADD_POST, text });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos });
export const setProfileData = (profileData) => ({ type: SET_PROFILE_DATA_SUCCESS, profileData });

// Thunks
export const getProfileUserThunk = (userId) => async (dispatch) => {
	try {
		const data = await profileAPI.getProfileUser(userId);
		dispatch(setUserProfile(data));
	} catch (error) {
		console.error('Failed to get user profile:', error);
	}
};

export const getStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
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




export const savePhoto = (photoFile) => async (dispatch) => {
	const response = await profileAPI.savePhoto(photoFile);
	if (response.resultCode === 0) {
		dispatch(savePhotoSuccess(response.data.photos));
	}
};

export const saveProfileData = (profileData) => async (dispatch, getState) => {
	const userId = getState().auth.id;
	const response = await profileAPI.saveProfileData(profileData);
	if (response.data.resultCode === 0) {
		dispatch(getProfileUserThunk(userId));
	}
};

// Начальное состояние (initial state) для редюсера
const initialState = {
	postsData: [],
	newPostText: '',
	profile: null,
	status: 'double click here to change status',
};

// Редюсер принимает текущее состояние (state) и действие (action), возвращает новое состояние.
const profileReducer = (state = initialState, action) => {
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
				postsData: [...state.postsData, newPost],
				newPostText: '',
			};
		case SET_USER_PROFILE:
			return { ...state, profile: action.profile };
		case SET_STATUS:
			return { ...state, status: action.status };
		case SET_PHOTO_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
			};
		case SET_PROFILE_DATA_SUCCESS:
			return {
				...state,
				profile: { ...state.profile, profile: action.profile },
			};
		default:
			return state;
	}
};

export default profileReducer;
