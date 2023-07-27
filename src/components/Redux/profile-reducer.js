import {profileAPI} from "../../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';

const initialState = {
	postsData: [
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
	],
	newPostText: '',
	profile: null,
	status: '',
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST: {
			let newPost = {
				id: Date.now(),
				message: action.text,
				likesCount: 12,
				src: 'https://i.pravatar.cc/150?img=5',
			};
			return {
				...state,
				postsData: [...state.postsData, newPost],
				newPostText: '',

			}
		}
		case SET_USER_PROFILE: {
			return {...state, profile: action.profile}
		}
		case SET_STATUS: {
			return {...state, status: action.status}
		}
		default:
			return state;

	}


}

export const addPostActionCreator = (text) => ({type: ADD_POST, text});

export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status})

export const getProfileUserThunk = (userId) => {
	return async dispatch => {
		try	{
			const data = await profileAPI.getProfileUser(userId);
			dispatch(setUserProfile(data));
		} catch (error) {
			console.error('Failed to get user profile:', error);
		}
	}
}

export const getStatus = userId => (dispatch) => {
	profileAPI.getStatus(userId)
		.then(response => {
			dispatch(setStatus(response.data))
		})
}

export const updateStatus = status => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setStatus(status))
	}
}



export default profileReducer;
