import {userAPI} from "../../api/api";

const ActionTypes = {
    UPDATE_FOLLOWING_STATUS: 'UPDATE_FOLLOWING_STATUS',
    SET_USERS: 'SET_USERS',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT: 'SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING: 'TOGGLE_IS_FOLLOWING',
}


// Reducer
const initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_FOLLOWING_STATUS:
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId ? {...user, followed: action.isFollowing} : user
                )
            }
        case ActionTypes.SET_USERS:
            return {...state, users: action.users}
        case ActionTypes.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case ActionTypes.SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case ActionTypes.TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case ActionTypes.TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
};

// Action creators and async actions
export const updateFollowingStatus = (isFollowing, userId) => ({
    type: ActionTypes.UPDATE_FOLLOWING_STATUS, isFollowing, userId
});

export const setUsers = users => ({type: ActionTypes.SET_USERS, users});

export const setCurrentPage = currentPage => ({
    type: ActionTypes.SET_CURRENT_PAGE, currentPage
});

export const setTotalUsersCount = totalUsersCount => ({
    type: ActionTypes.SET_TOTAL_USERS_COUNT, count: totalUsersCount
});

export const toggleIsFetching = isFetching => ({
    type: ActionTypes.TOGGLE_IS_FETCHING, isFetching
});

export const toggleIsFollowing = (isFetching, userId) => ({
    type: ActionTypes.TOGGLE_IS_FOLLOWING, isFetching, userId
});

export const getUsersThunkCreator = (currentPage, pageSize) => dispatch => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));

    userAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
}

export const unfollowThunkCreator = userId => async dispatch => {
    dispatch(toggleIsFollowing(true, userId));
    dispatch(toggleIsFetching(true));

    try {
        const data = await userAPI.deleteFollow(userId);

        if (data.resultCode === 0) {
            dispatch(updateFollowingStatus(false, userId));
        }
    } catch (error) {
        console.error(error);
    } finally {
        dispatch(toggleIsFollowing(false, userId));
        dispatch(toggleIsFetching(false));
    }
};

export const followThunkCreator = (userId) => async dispatch => {
    dispatch(toggleIsFollowing(true, userId));
    dispatch(toggleIsFetching(true));

    try {
        const data = await userAPI.postFollow(userId);

        if (data.resultCode === 0) {
            dispatch(updateFollowingStatus(true, userId));
        }
    } finally {
        dispatch(toggleIsFollowing(false, userId));
        dispatch(toggleIsFetching(false));
    }
}

export default usersReducer;