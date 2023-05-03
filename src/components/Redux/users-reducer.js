const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';

let initialState = {
     users: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                // копируем state и пробегаемся по всем users
                ...state,
                users: state.users.map(user => {
                    // если id user совпвдвет с userID из action то возвращаем копию обьекта user и добавляем followed: true
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
                    // если id user совпвдвет с userID из action то возвращаем копию обьекта user и добавляем followed: false
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS: {
            // для добавления users мы будем брать копию state и в users будем к копии users добавлять users из action
            return { ...state, users: [...action.users] }
        }
        default:
            return state;

    }


}

export const followActionCreator = userId => ({type: FOLLOW, userId});
export const unfollowActionCreator = userId => ({type: UNFOLLOW, userId});
export const setUsersActionCreator = users => ({type: SET_USERS, users});

export default usersReducer;