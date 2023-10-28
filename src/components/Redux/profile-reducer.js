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
exports.saveProfileData = exports.savePhoto = exports.updateStatus = exports.getStatus = exports.getProfileUserThunk = exports.savePhotoSuccess = exports.setStatus = exports.setUserProfile = exports.addPostActionCreator = void 0;
var api_1 = require("../../api/api");
// Определение типов действий (action types)
var ADD_POST = 'ADD-POST'; // Тип действия для добавления поста
var SET_USER_PROFILE = 'SET-USER-PROFILE'; // Тип действия для установки профиля пользователя
var SET_STATUS = 'SET-STATUS'; // Тип действия для установки статуса
var SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS'; // Тип действия для успешного сохранения фотографии
var SET_PROFILE_DATA_SUCCESS = 'SET-PROFILE-DATA-SUCCESS'; // Тип действия для успешного сохранения данных профиля
// Начальное состояние (initial state) для редюсера
var initialState = {
    postsData: [
        // Массив постов
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
    status: 'double click here to change status', // Статус по умолчанию
};
var addPostActionCreator = function (text) { return ({ type: ADD_POST, text: text }); };
exports.addPostActionCreator = addPostActionCreator;
var setUserProfile = function (profile) { return ({ type: SET_USER_PROFILE, profile: profile }); };
exports.setUserProfile = setUserProfile;
var setStatus = function (status) { return ({ type: SET_STATUS, status: status }); };
exports.setStatus = setStatus;
var savePhotoSuccess = function (photos) { return ({ type: SET_PHOTO_SUCCESS, photos: photos }); };
exports.savePhotoSuccess = savePhotoSuccess;
// Thunks (Асинхронные действия)
var getProfileUserThunk = function (userId) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.profileAPI.getProfileUser(userId)];
            case 1:
                data = _a.sent();
                dispatch((0, exports.setUserProfile)(data));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Failed to get user profile:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.getProfileUserThunk = getProfileUserThunk;
var getStatus = function (userId) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.profileAPI.getStatus(userId)];
            case 1:
                response = _a.sent();
                dispatch((0, exports.setStatus)(response.data));
                return [2 /*return*/];
        }
    });
}); }; };
exports.getStatus = getStatus;
var updateStatus = function (status) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, api_1.profileAPI.updateStatus(status)];
            case 1:
                response = _a.sent();
                if (response.data.resultCode === 0) {
                    dispatch((0, exports.setStatus)(status));
                }
                else {
                    // Если resultCode не равен 0, обрабатываем ошибку
                    console.error('Failed to update status:', response.data.messages);
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error while updating status:', error_2.message);
                if (error_2.response) {
                    // Если есть ответ от сервера, проверяем статус ошибки HTTP
                    console.error('HTTP Status:', error_2.response.status);
                    console.error('HTTP Status Text:', error_2.response.statusText);
                }
                else {
                    // В случае, если нет ответа от сервера
                    console.error('No response from server');
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.updateStatus = updateStatus;
var savePhoto = function (photoFile) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, api_1.profileAPI.savePhoto(photoFile)];
            case 1:
                response = _a.sent();
                if (response.resultCode === 0) {
                    dispatch((0, exports.savePhotoSuccess)(response.data.photos));
                }
                return [2 /*return*/];
        }
    });
}); }; };
exports.savePhoto = savePhoto;
var saveProfileData = function (profileData) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = getState().auth.id;
                return [4 /*yield*/, api_1.profileAPI.saveProfileData(profileData)];
            case 1:
                response = _a.sent();
                if (response.data.resultCode === 0) {
                    dispatch((0, exports.getProfileUserThunk)(userId));
                }
                return [2 /*return*/];
        }
    });
}); }; };
exports.saveProfileData = saveProfileData;
// Редюсер принимает текущее состояние (state) и действие (action), возвращает новое состояние.
var profileReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_POST:
            var newPost = {
                id: Date.now(),
                message: action.text,
                likesCount: 12,
                src: 'https://i.pravatar.cc/150?img=5',
            };
            return __assign(__assign({}, state), { postsData: __spreadArray(__spreadArray([], state.postsData, true), [newPost], false), newPostText: '' });
        case SET_USER_PROFILE: // Установка профиля пользователя
            return __assign(__assign({}, state), { profile: action.profile });
        case SET_STATUS: // Установка статуса
            return __assign(__assign({}, state), { status: action.status });
        case SET_PHOTO_SUCCESS: // Установка новых фотографий в профиль
            return __assign(__assign({}, state), { profile: __assign(__assign({}, state.profile), { photos: action.photos }) });
        case SET_PROFILE_DATA_SUCCESS: // Установка новых данных профиля
            return __assign(__assign({}, state), { profile: __assign(__assign({}, state.profile), { profile: action.profile }) });
        default:
            return state;
    }
};
exports.default = profileReducer;
