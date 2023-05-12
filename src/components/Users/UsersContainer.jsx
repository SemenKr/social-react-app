import React, {Component} from "react";
import {connect} from "react-redux";
import axios from 'axios';
import Users from './Users';
import {followActionCreator, setCurrentPageActionCreator, setUsersActionCreator, unfollowActionCreator, setTotalUsersCountActionCreator} from "../Redux/users-reducer";

class UsersContainer extends Component {

	componentDidMount() {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize} `)
			.then(response => {
				this.props.setUsers(response.data.items);
				this.props.setTotalUsersCount(response.data.totalCount);

			});
	}

	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize} `)
			.then(response => {
				this.props.setUsers(response.data.items);

			});
	}

	render() {

		return <Users onPageChange={this.onPageChange}
			totalUsersCount={this.props.totalUsersCount}
			pageSize={this.props.pageSize}
			currentPage={this.props.currentPage}
			users={this.props.users}
			unfollow={this.props.unfollow}
			follow={this.props.follow}
		/>
	}
}

// принимает весь state и меняет
let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
	}
};

// передает дочерней компоненте callbacks
let mapDispatchToProps = (dispatch) => {
	return {
		follow: (userId) => {
			// диспатчим объект action
			dispatch(followActionCreator(userId))
		},
		unfollow: (userId) => {
			// диспатчим объект action
			dispatch(unfollowActionCreator(userId))
		},
		setUsers: (users) => {
			dispatch(setUsersActionCreator(users))
		},
		setCurrentPage: (pageNumber) => {
			dispatch(setCurrentPageActionCreator(pageNumber))
		},
		setTotalUsersCount: (totalCount) => {
			dispatch(setTotalUsersCountActionCreator(totalCount))
		},
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);