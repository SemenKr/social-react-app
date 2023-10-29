import {userAPI} from "../../api/api";
import {UserType} from "../../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

// Определение констант для типов действий (action types)
const ActionTypes = {
    UPDATE_FOLLOWING_STATUS: 'UPDATE_FOLLOWING_STATUS', // Обновление статуса "подписан/не подписан"
    SET_USERS: 'SET_USERS', // Установка списка пользователей
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE', // Установка текущей страницы
    SET_TOTAL_USERS_COUNT: 'SET_TOTAL_USERS_COUNT', // Установка общего количества пользователей
    TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING', // Включение/выключение индикатора загрузки
    TOGGLE_IS_FOLLOWING: 'TOGGLE_IS_FOLLOWING', // Включение/выключение индикатора подписки
};

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

const usersReducer = (state = initialState, action: any): InitialStateType => {
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

// Типизация Actions
type ActionsTypes =
    UpdateFollowingStatusAction
    | SetUsersAction
    | SetCurrentPageAction
    | SetTotalUsersCountAction
    | ToggleIsFetchingAction
    | ToggleIsFollowingAction

interface UpdateFollowingStatusAction {
    type: typeof ActionTypes.UPDATE_FOLLOWING_STATUS;
    isFollowing: boolean;
    userId: number;
}

interface SetUsersAction {
    type: typeof ActionTypes.SET_USERS;
    users: Array<UserType>;
}

interface SetCurrentPageAction {
    type: typeof ActionTypes.SET_CURRENT_PAGE;
    currentPage: number;
}

interface SetTotalUsersCountAction {
    type: typeof ActionTypes.SET_TOTAL_USERS_COUNT;
    count: number;
}

interface ToggleIsFetchingAction {
    type: typeof ActionTypes.TOGGLE_IS_FETCHING;
    isFetching: boolean;
}

interface ToggleIsFollowingAction {
    type: typeof ActionTypes.TOGGLE_IS_FOLLOWING;
    isFetching: boolean;
    userId: number;
}

// Создание и экспорт action creators и асинхронных action creators (thunks)
export const updateFollowingStatus = (isFollowing: boolean, userId: number): UpdateFollowingStatusAction => ({
    type: ActionTypes.UPDATE_FOLLOWING_STATUS,
    isFollowing,
    userId
});

export const setUsers = (users: Array<UserType>): SetUsersAction => ({type: ActionTypes.SET_USERS, users});

export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({
    type: ActionTypes.SET_CURRENT_PAGE, currentPage
});

export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAction => ({
    type: ActionTypes.SET_TOTAL_USERS_COUNT, count: totalUsersCount
});

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({
    type: ActionTypes.TOGGLE_IS_FETCHING, isFetching
});

export const toggleIsFollowing = (isFetching: boolean, userId: number): ToggleIsFollowingAction => ({
    type: ActionTypes.TOGGLE_IS_FOLLOWING, isFetching, userId
});

// Асинхронные action creators (thunks) для получения данных о пользователях
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>; //  означает, что ваша thunk возвращает Promise<void>, работает с состоянием типа AppStateType, и принимает действия типа ActionsTypes.
export const getUsersThunkCreator =
    (currentPage: number, pageSize: number): ThunkType =>
        async (dispatch: Dispatch<ActionsTypes>) => {
            dispatch(setCurrentPage(currentPage));
            dispatch(toggleIsFetching(true));
            const data = await userAPI.getUsers(currentPage, pageSize);
            const {items, totalCount} = data;
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(items));
            dispatch(setTotalUsersCount(totalCount));
        }
// Асинхронный action creator (thunk) для отмены подписки на пользователя
export const unfollowThunkCreator =
    (userId: number): ThunkType =>
        async (dispatch: Dispatch<ActionsTypes>) => {
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
// Асинхронный action creator (thunk) для подписки на пользователяType =

export const followThunkCreator =
    (userId: number): ThunkType =>
        async (dispatch: Dispatch<ActionsTypes>) => {
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
