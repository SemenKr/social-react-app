import {userAPI} from "../../api/api.ts";
import {UserType} from "../../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";


// Исходное состояние (initial state) редуктора
const initialState = {
    users: [] as Array<UserType>, // Список пользователей
    pageSize: 6, // Количество пользователей на странице
    totalUsersCount: 0, // Общее количество пользователей
    currentPage: 1, // Текущая страница
    isFetching: false, // Индикатор загрузки данных
    followingInProgress: [] as Array<number>, // Массив ID пользователей, с которыми ведется взаимодействие
};

type InitialStateType = typeof initialState // Тип для исходного состояния

type ActionTypes = InferActionsTypes<typeof actions>

// Определение типов для исходного состояния и действий с использованием InferActionsTypes.
export const actions = {
    updateFollowingStatus: (isFollowing: boolean, userId: number) => ({
        type: 'UPDATE_FOLLOWING_STATUS',
        isFollowing,
        userId
    } as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),

    setCurrentPage: (currentPage: number) => ({
        type: 'SET_CURRENT_PAGE', currentPage
    } as const),

    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount
    } as const),

    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING', isFetching
    } as const),

    toggleIsFollowing: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING', isFetching, userId
    } as const),
}

// Создание action creators с использованием соглашения "action creators должны быть чистыми функциями".
const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "UPDATE_FOLLOWING_STATUS":
            return {
                ...state,
                users: state.users.map(user =>
                    user.id === action.userId ? {...user, followed: action.isFollowing} : user
                )
            }
        case "SET_USERS":
            return {...state, users: action.users}
        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.count}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING":
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



// Реализация редуктора, который обрабатывает различные действия.
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>; //  означает, что ваша thunk возвращает Promise<void>, работает с состоянием типа AppStateType, и принимает действия типа ActionsTypes.

// Определение типа для thunks с использованием ThunkAction.
export const getUsersThunkCreator =
    (currentPage: number, pageSize: number): ThunkType =>
        async (dispatch: Dispatch<ActionTypes>) => {
            dispatch(actions.setCurrentPage(currentPage));
            dispatch(actions.toggleIsFetching(true));
            const data = await userAPI.getUsers(currentPage, pageSize);
            const {items, totalCount} = data;
            dispatch(actions.toggleIsFetching(false));
            dispatch(actions.setUsers(items));
            dispatch(actions.setTotalUsersCount(totalCount));
        }
// Асинхронный action creator (thunk) для отмены подписки на пользователя
export const unfollowThunkCreator =
    (userId: number): ThunkType =>
        async (dispatch: Dispatch<ActionTypes>) => {
            dispatch(actions.toggleIsFollowing(true, userId));
            dispatch(actions.toggleIsFetching(true));

            try {
                const data = await userAPI.deleteFollow(userId);

                if (data.resultCode === 0) {
                    dispatch(actions.updateFollowingStatus(false, userId));
                }
            } catch (error) {
                console.error(error);
            } finally {
                dispatch(actions.toggleIsFollowing(false, userId));
                dispatch(actions.toggleIsFetching(false));
            }
        };
// Асинхронный action creator (thunk) для отмены подписки на пользователя

export const followThunkCreator =
    (userId: number): ThunkType =>
        async (dispatch: Dispatch<ActionTypes>) => {
            dispatch(actions.toggleIsFollowing(true, userId));
            dispatch(actions.toggleIsFetching(true));

            try {
                const data = await userAPI.postFollow(userId);

                if (data.resultCode === 0) {
                    dispatch(actions.updateFollowingStatus(true, userId));
                }
            } finally {
                dispatch(actions.toggleIsFollowing(false, userId));
                dispatch(actions.toggleIsFetching(false));
            }
        }

export default usersReducer;
