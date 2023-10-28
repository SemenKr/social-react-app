"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Users_tsx_1 = require("./Users.tsx");
var Preloader_1 = require("../common/Preloader/Preloader");
var users_reducer_1 = require("../Redux/users-reducer");
var withAuthRedirect_1 = require("../hoc/withAuthRedirect");
var redux_1 = require("redux");
var users_selectors_1 = require("../Redux/users-selectors");
var UsersContainer = /** @class */ (function (_super) {
    __extends(UsersContainer, _super);
    function UsersContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onPageChange = function (pageNumber) {
            var pageSize = _this.props.pageSize;
            _this.props.requestUsers(pageNumber, pageSize);
        };
        return _this;
    }
    UsersContainer.prototype.componentDidMount = function () {
        var _a = this.props, currentPage = _a.currentPage, pageSize = _a.pageSize;
        this.props.requestUsers(currentPage, pageSize);
    };
    UsersContainer.prototype.render = function () {
        return (<>
                {this.props.isFetching ? <Preloader_1.default /> : null}
                <h2>{this.props.pageTitle}</h2>
                <Users_tsx_1.default onPageChange={this.onPageChange} totalUsersCount={this.props.totalUsersCount} pageSize={this.props.pageSize} currentPage={this.props.currentPage} users={this.props.users} unfollow={this.props.unfollow} follow={this.props.follow} isFetching={this.props.isFetching} followingInProgress={this.props.followingInProgress} toggleIsFollowing={this.props.toggleIsFollowing}/>
            </>);
    };
    return UsersContainer;
}(react_1.Component));
// принимает весь state и меняет
var mapStateToProps = function (state) {
    return {
        users: (0, users_selectors_1.getUsers)(state),
        pageSize: (0, users_selectors_1.getPageSize)(state),
        totalUsersCount: (0, users_selectors_1.getTotalUsersCount)(state),
        currentPage: (0, users_selectors_1.getCurrentPage)(state),
        isFetching: (0, users_selectors_1.getIsFetching)(state),
        followingInProgress: (0, users_selectors_1.getFollowingInProgress)(state),
    };
};
// TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
exports.default = (0, redux_1.compose)((0, react_redux_1.connect)(mapStateToProps, {
    setCurrentPage: users_reducer_1.setCurrentPage,
    toggleIsFollowing: users_reducer_1.toggleIsFollowing,
    requestUsers: users_reducer_1.getUsersThunkCreator,
    unfollow: users_reducer_1.unfollowThunkCreator,
    follow: users_reducer_1.followThunkCreator,
}), withAuthRedirect_1.withAuthRedirect)(UsersContainer);
