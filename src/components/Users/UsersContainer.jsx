import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setCurrentPageActionCreator, setUsersActionCreator, unfollowActionCreator, setTotalUsersCountActionCreator} from "../Redux/users-reducer";

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


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;