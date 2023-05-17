import React, {Component} from "react";
import {connect} from "react-redux";
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {follow, setCurrentPage, setUsers, unfollow, setTotalUsersCount, toggleIsFetching} from "../Redux/users-reducer";
import {getUsers} from '../../api/api';

class UsersContainer extends Component {

	componentDidMount() {
		this.props.toggleIsFetching(true);
		getUsers(this.props.currentPage, this.props.pageSize)
			.then(data => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(data.items);
				this.props.setTotalUsersCount(data.totalCount);

			});
	}

	onPageChange = (pageNumber) => {
		this.props.setCurrentPage(pageNumber)
		this.props.toggleIsFetching(true);

		getUsers(pageNumber, this.props.pageSize)
			.then(data => {
				this.props.toggleIsFetching(false);
				this.props.setUsers(data.items);

			});
	}

	render() {

		return (
			<>
				{this.props.isFetching ? <Preloader /> : null}
				<Users onPageChange={this.onPageChange}
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					users={this.props.users}
					unfollow={this.props.unfollow}
					follow={this.props.follow}
					isFetching={this.props.isFetching}
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
	}
};

// передает дочерней компоненте callbacks
// let mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			// диспатчим объект action
// 			dispatch(followActionCreator(userId))
// 		},
// 		unfollow: (userId) => {
// 			// диспатчим объект action
// 			dispatch(unfollowActionCreator(userId))
// 		},
// 		setUsers: (users) => {
// 			dispatch(setUsersActionCreator(users))
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageActionCreator(pageNumber))
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCountActionCreator(totalCount))
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingActionCreator(isFetching))
// 		},
// 	}

// }

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);