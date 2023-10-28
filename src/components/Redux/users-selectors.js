"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFollowingInProgress = exports.getIsFetching = exports.getCurrentPage = exports.getTotalUsersCount = exports.getPageSize = exports.getUsers = void 0;
var getUsers = function (state) {
    return state.usersPage.users;
};
exports.getUsers = getUsers;
var getPageSize = function (state) {
    return state.usersPage.pageSize;
};
exports.getPageSize = getPageSize;
var getTotalUsersCount = function (state) {
    return state.usersPage.totalUsersCount;
};
exports.getTotalUsersCount = getTotalUsersCount;
var getCurrentPage = function (state) {
    return state.usersPage.currentPage;
};
exports.getCurrentPage = getCurrentPage;
var getIsFetching = function (state) {
    return state.usersPage.isFetching;
};
exports.getIsFetching = getIsFetching;
var getFollowingInProgress = function (state) {
    return state.usersPage.followingInProgress;
};
exports.getFollowingInProgress = getFollowingInProgress;
