const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
}

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				// копируем state и пробегаемся по всем users
				...state,
				users: state.users.map(user => {
					// если id user совпадает с userID из action то возвращаем копию объекта user и добавляем followed: true
					if (user.id === action.userId) {
						return {...user, followed: true}
					}
					return user
				})
			}

		case UNFOLLOW:
			return {
				...state,// копируем state и пробегаемся по всем users
				users: state.users.map(user => {
					// если id user совпадает с userID из action то возвращаем копию объекта user и добавляем followed: false
					if (user.id === action.userId) {
						return {...user, followed: false}
					}
					return user
				})
			}
		case SET_USERS: {
			// для добавления users мы будем брать копию state и в users будем к копии users добавлять users из action
			return {...state, users: action.users}
		}
		case SET_CURRENT_PAGE: {
			return {...state, currentPage: action.currentPage}
		}
		case SET_TOTAL_USERS_COUNT: {
			return {...state, totalUsersCount: action.count}
		}
		default:
			return state;

	}


}

export const followActionCreator = userId => ({type: FOLLOW, userId});
export const unfollowActionCreator = userId => ({type: UNFOLLOW, userId});
export const setUsersActionCreator = users => ({type: SET_USERS, users});
export const setCurrentPageActionCreator = currentPage => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCountActionCreator = totalUsersCount => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

export default usersReducer;