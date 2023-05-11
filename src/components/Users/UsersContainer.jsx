import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../Redux/users-reducer";

// принимает весь state и меняет
let mapStateToProps = (state) => {
	return {
		users: state.usersPage.users
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
		}
	}

}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
export default UsersContainer;