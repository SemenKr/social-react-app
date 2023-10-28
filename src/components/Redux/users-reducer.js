"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followThunkCreator = exports.unfollowThunkCreator = exports.getUsersThunkCreator = exports.toggleIsFollowing = exports.toggleIsFetching = exports.setTotalUsersCount = exports.setCurrentPage = exports.setUsers = exports.updateFollowingStatus = void 0;
var api_1 = require("../../api/api");
// Определение констант для типов действий (action types)
var ActionTypes = {
    UPDATE_FOLLOWING_STATUS: 'UPDATE_FOLLOWING_STATUS',
    SET_USERS: 'SET_USERS',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_TOTAL_USERS_COUNT: 'SET_TOTAL_USERS_COUNT',
    TOGGLE_IS_FETCHING: 'TOGGLE_IS_FETCHING',
    TOGGLE_IS_FOLLOWING: 'TOGGLE_IS_FOLLOWING', // Включение/выключение индикатора подписки
};
// Исходное состояние (initial state) редуктора
var initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [], // Массив ID пользователей, с которыми ведется взаимодействие
};
var usersReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ActionTypes.UPDATE_FOLLOWING_STATUS:
            return __assign(__assign({}, state), { users: state.users.map(function (user) {
                    return user.id === action.userId ? __assign(__assign({}, user), { followed: action.isFollowing }) : user;
                }) });
        case ActionTypes.SET_USERS:
            return __assign(__assign({}, state), { users: action.users });
        case ActionTypes.SET_CURRENT_PAGE:
            return __assign(__assign({}, state), { currentPage: action.currentPage });
        case ActionTypes.SET_TOTAL_USERS_COUNT:
            return __assign(__assign({}, state), { totalUsersCount: action.count });
        case ActionTypes.TOGGLE_IS_FETCHING:
            return __assign(__assign({}, state), { isFetching: action.isFetching });
        case ActionTypes.TOGGLE_IS_FOLLOWING:
            return __assign(__assign({}, state), { followingInProgress: action.isFetching
                    ? __spreadArray(__spreadArray([], state.followingInProgress, true), [action.userId], false) : state.followingInProgress.filter(function (id) { return id !== action.userId; }) });
        default:
            return state;
    }
};
// Создание и экспорт action creators и асинхронных action creators (thunks)
var updateFollowingStatus = function (isFollowing, userId) { return ({ type: ActionTypes.UPDATE_FOLLOWING_STATUS, isFollowing: isFollowing, userId: userId }); };
exports.updateFollowingStatus = updateFollowingStatus;
var setUsers = function (users) { return ({ type: ActionTypes.SET_USERS, users: users }); };
exports.setUsers = setUsers;
var setCurrentPage = function (currentPage) { return ({
    type: ActionTypes.SET_CURRENT_PAGE,
    currentPage: currentPage
}); };
exports.setCurrentPage = setCurrentPage;
var setTotalUsersCount = function (totalUsersCount) { return ({
    type: ActionTypes.SET_TOTAL_USERS_COUNT, count: totalUsersCount
}); };
exports.setTotalUsersCount = setTotalUsersCount;
var toggleIsFetching = function (isFetching) { return ({
    type: ActionTypes.TOGGLE_IS_FETCHING,
    isFetching: isFetching
}); };
exports.toggleIsFetching = toggleIsFetching;
var toggleIsFollowing = function (isFetching, userId) { return ({
    type: ActionTypes.TOGGLE_IS_FOLLOWING,
    isFetching: isFetching,
    userId: userId
}); };
exports.toggleIsFollowing = toggleIsFollowing;
// Асинхронные action creators (thunks) для получения данных о пользователях
var getUsersThunkCreator = function (currentPage, pageSize) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var data, items, totalCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch((0, exports.setCurrentPage)(currentPage));
                dispatch((0, exports.toggleIsFetching)(true));
                return [4 /*yield*/, api_1.userAPI.getUsers(currentPage, pageSize)];
            case 1:
                data = _a.sent();
                items = data.items, totalCount = data.totalCount;
                dispatch((0, exports.toggleIsFetching)(false));
                dispatch((0, exports.setUsers)(items));
                dispatch((0, exports.setTotalUsersCount)(totalCount));
                return [2 /*return*/];
        }
    });
}); }; };
exports.getUsersThunkCreator = getUsersThunkCreator;
// Асинхронный action creator (thunk) для отмены подписки на пользователя
var unfollowThunkCreator = function (userId) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch((0, exports.toggleIsFollowing)(true, userId));
                dispatch((0, exports.toggleIsFetching)(true));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, 4, 5]);
                return [4 /*yield*/, api_1.userAPI.deleteFollow(userId)];
            case 2:
                data = _a.sent();
                if (data.resultCode === 0) {
                    dispatch((0, exports.updateFollowingStatus)(false, userId));
                }
                return [3 /*break*/, 5];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 5];
            case 4:
                dispatch((0, exports.toggleIsFollowing)(false, userId));
                dispatch((0, exports.toggleIsFetching)(false));
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); }; };
exports.unfollowThunkCreator = unfollowThunkCreator;
// Асинхронный action creator (thunk) для подписки на пользователя
var followThunkCreator = function (userId) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch((0, exports.toggleIsFollowing)(true, userId));
                dispatch((0, exports.toggleIsFetching)(true));
                _a.label = 1;
            case 1:
                _a.trys.push([1, , 3, 4]);
                return [4 /*yield*/, api_1.userAPI.postFollow(userId)];
            case 2:
                data = _a.sent();
                if (data.resultCode === 0) {
                    dispatch((0, exports.updateFollowingStatus)(true, userId));
                }
                return [3 /*break*/, 4];
            case 3:
                dispatch((0, exports.toggleIsFollowing)(false, userId));
                dispatch((0, exports.toggleIsFetching)(false));
                return [7 /*endfinally*/];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.followThunkCreator = followThunkCreator;
exports.default = usersReducer;
