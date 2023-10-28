"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var navBar_reducer_1 = require("./navBar-reducer");
var profile_reducer_1 = require("./profile-reducer");
var dialogs_reducer_1 = require("./dialogs-reducer");
var users_reducer_1 = require("./users-reducer");
var auth_reduce_1 = require("./auth-reduce");
var redux_thunk_1 = require("redux-thunk");
var app_reduce_1 = require("./app-reduce");
var reducers = (0, redux_1.combineReducers)({
    navBar: navBar_reducer_1.default,
    profilePage: profile_reducer_1.default,
    dialogPage: dialogs_reducer_1.default,
    usersPage: users_reducer_1.default,
    auth: auth_reduce_1.default,
    app: app_reduce_1.default,
});
// @ts-ignore
var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
var store = (0, redux_1.legacy_createStore)(reducers, /* preloadedState, */ composeEnhancers((0, redux_1.applyMiddleware)(redux_thunk_1.default)));
// @ts-ignore
window.__store__ = store;
exports.default = store;
