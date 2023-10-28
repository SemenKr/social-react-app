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
exports.addChatItemActionCreator = void 0;
// Определение константы для типа action
var ADD_CHAT_ITEM = 'ADD-CHAT-ITEM';
// Начальное состояние стейта
var initialState = {
    dialogData: [
        { id: 1, name: 'Andrew' },
        { id: 2, name: 'Alex' },
        { id: 3, name: 'Nadine' },
        { id: 4, name: 'Tony' },
        { id: 5, name: 'Felix' },
        { id: 6, name: 'Uliana' },
    ],
    chatData: [
        {
            id: 1,
            message: 'Hi World ...',
            alt: 'Alt of img',
            ava: 1
        },
        { id: 2, message: 'Hi Sam ...', alt: 'Alt of img', ava: 2, },
        { id: 3, message: 'omg lol ...', alt: 'Alt of img', ava: 1, },
        {
            id: 4,
            message: 'Totally boring text for test this element and bla bla bla bla?',
            alt: 'Alt of img',
            ava: 2,
        },
        { id: 5, message: 'Hi World ...', alt: 'Alt of img', ava: 1, },
        { id: 6, message: 'omg lol ...', alt: 'Alt of img', ava: 2, },
    ],
};
// Редуктор для обработки действий
var dialogsReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ADD_CHAT_ITEM: {
            var newChatItem = {
                id: Date.now(),
                message: action.text,
                alt: 'Alt of img',
                ava: 1,
            };
            return __assign(__assign({}, state), { chatData: __spreadArray(__spreadArray([], state.chatData, true), [newChatItem], false) });
        }
        default:
            return state;
    }
};
var addChatItemActionCreator = function (text) { return ({ type: ADD_CHAT_ITEM, text: text }); };
exports.addChatItemActionCreator = addChatItemActionCreator;
exports.default = dialogsReducer;
