"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var users_module_scss_1 = require("./users.module.scss");
var User_1 = require("./User");
var Pagination_tsx_1 = require("../ui/Pagination.tsx");
var Users = function (_a) {
    var totalUsersCount = _a.totalUsersCount, pageSize = _a.pageSize, followingInProgress = _a.followingInProgress, unfollow = _a.unfollow, follow = _a.follow, props = __rest(_a, ["totalUsersCount", "pageSize", "followingInProgress", "unfollow", "follow"]);
    var _b = (0, react_1.useState)(props.currentPage), currentPage = _b[0], setCurrentPage = _b[1];
    // Используем useEffect для синхронизации обоих экземпляров Pagination
    (0, react_1.useEffect)(function () {
        setCurrentPage(props.currentPage);
    }, [props.currentPage]);
    var onPageChange = function (pageNumber) {
        setCurrentPage(pageNumber);
        props.onPageChange(pageNumber);
    };
    return (<section className={users_module_scss_1.default.users}>
            <h3 className={users_module_scss_1.default.users__title}>Users</h3>
            <Pagination_tsx_1.default totalUsersCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange}/>
            <ul className={users_module_scss_1.default.users__List}>
                {props.users.map(function (user) { return <User_1.default user={user} key={user.id} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}/>; })}

            </ul>
        </section>);
};
exports.default = Users;
