import {AppStateType} from "./redux-store";
import { createSelector } from 'reselect'
// Селектор для получения массива пользователей из состояния
export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

// Создание селектора с использованием reselect. Этот селектор фильтрует пользователей (пока просто возвращает все пользователей)
export const getUsersSelector = createSelector(
    getUsers,// Селектор для получения пользователей
    (users) => {
    return users.filter(u => true)  // Фильтрация пользователей (в данном случае, возвращаются все пользователи)

})


// Далее идут селекторы для получения других данных из состояния:

// Получение размера страницы (pageSize)
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

// Получение общего количества пользователей (totalUsersCount)
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

// Получение текущей страницы (currentPage)
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

// Получение флага isFetching, указывающего на загрузку данных
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

// Получение массива идентификаторов пользователей, для которых выполняется какая-либо операция (followingInProgress)
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
