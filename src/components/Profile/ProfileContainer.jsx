import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserThunk, getStatus, setUserProfile, updateStatus} from "../Redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

	componentDidMount() {
		let userIdFromPath = +this.props.router.params.userId
		let authorisedUserId = this.props.authorisedUserId


		if (userIdFromPath) {
			this.props.getProfileUserThunk(userIdFromPath)
			this.props.getStatus(userIdFromPath)

		} else {

			if (this.props.isAuth && authorisedUserId) {
				this.props.getProfileUserThunk(authorisedUserId)
				this.props.getStatus(authorisedUserId)
			}
		}
	}

	render() {
		return (
			<Profile
				{...this.props}
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus} />
		);
	}
}
const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorisedUserId: state.auth.id,
	isAuth: state.auth.isAuth
});

// wrapper to use react router's v6 hooks in class component (to use HOC pattern, like in router v5)
function withRouter(Component) {

	function ComponentWithRouterProp(props) {
		let location = useLocation()
		let navigate = useNavigate()
		let params = useParams()

		return <Component
			{...props}
			router={{location, navigate, params}} />
	}

	return ComponentWithRouterProp
}

// при помощи compose ProfileContainer j,рабатывает в withAuthRedirect, потом в withRouter и потом отправляет в connect с пропсами
export default compose(
	withRouter,
	withAuthRedirect,
	connect(mapStateToProps, {setUserProfile,getProfileUserThunk, getStatus, updateStatus}),
)(ProfileContainer)
