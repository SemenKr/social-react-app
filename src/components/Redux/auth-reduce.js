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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCaptchaUrl = exports.logout = exports.login = exports.getAuthUserData = exports.getCaptchaUrlSuccess = exports.setAuthUserData = void 0;
var api_1 = require("../../api/api");
// Определение констант для типов действий
var SET_USER_DATA = 'SET_USER_DATA';
var GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
// Исходное состояние для редюсера
var initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null, // if null? значит капча не обязательна
};
// Редюсер для управления состоянием авторизации
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return __assign(__assign({}, state), action.payload);
        default:
            return state;
    }
};
// Action creators (создатели действий)
var setAuthUserData = function (id, login, email, isAuth) { return ({
    type: SET_USER_DATA,
    payload: { id: id, login: login, email: email, isAuth: isAuth }, // Упрощенный синтаксис для создания объекта
}); };
exports.setAuthUserData = setAuthUserData;
var getCaptchaUrlSuccess = function (captchaUrl) { return ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: captchaUrl },
}); };
exports.getCaptchaUrlSuccess = getCaptchaUrlSuccess;
// Асинхронные action creators (действия, которые выполняют асинхронные операции)
var getAuthUserData = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, id, login_1, email, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.authAPI.getAuthMe()];
                case 1:
                    data = _b.sent();
                    if (data.resultCode === 0) {
                        _a = data.data, id = _a.id, login_1 = _a.login, email = _a.email;
                        dispatch((0, exports.setAuthUserData)(id, login_1, email, true));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.getAuthUserData = getAuthUserData;
var login = function (email, password, rememberMe, captcha) {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.authAPI.login(email, password, rememberMe, captcha)];
                case 1:
                    response = _a.sent();
                    if (response.data.resultCode === 0) {
                        // авторизовались и получаем дополнительные данные
                        dispatch((0, exports.getAuthUserData)());
                    }
                    else {
                        if (response.data.resultCode === 10) {
                            dispatch((0, exports.getCaptchaUrl)());
                        }
                        throw new Error("Ошибка входа. Проверьте введенные данные.");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.login = login;
var logout = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.authAPI.logout()];
                case 1:
                    response = _a.sent();
                    if (response.data.resultCode === 0) {
                        dispatch((0, exports.setAuthUserData)(null, null, null, false));
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.logout = logout;
var getCaptchaUrl = function () {
    return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
        var response, captchaUrl, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, api_1.securityAPI.getCaptchaUrl()];
                case 1:
                    response = _a.sent();
                    captchaUrl = response.data.url;
                    dispatch((0, exports.getCaptchaUrlSuccess)(captchaUrl)); // Вызываем action creator для сохранения URL капчи в состоянии
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports.getCaptchaUrl = getCaptchaUrl;
exports.default = authReducer;
