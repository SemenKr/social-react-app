import React, {Component} from "react";
import {connect} from "react-redux";
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {
    setCurrentPage,
    toggleIsFollowing, getUsersThunkCreator, unfollowThunkCreator, followThunkCreator
} from "../Redux/users-reducer";

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize )
        console.log(this.props.totalUsersCount)
    }

    render() {

        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users onPageChange={this.onPageChange}
                       totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       users={this.props.users}
                       unfollow={this.props.unfollow}
                       follow={this.props.follow}
                       isFetching={this.props.isFetching}
                       followingInProgress={this.props.followingInProgress}
					   toggleIsFollowing={this.props.toggleIsFollowing}

                />
            </>
        )
    }
}

// принимает весь state и меняет
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

export default connect(mapStateToProps, {
    setCurrentPage,
    toggleIsFollowing,
    getUsers: getUsersThunkCreator,
    unfollow: unfollowThunkCreator,
    follow : followThunkCreator,
})(UsersContainer);