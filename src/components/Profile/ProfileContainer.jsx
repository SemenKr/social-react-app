import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserThunk, getStatus, setUserProfile, updateStatus} from "../Redux/profile-reducer";
import {useParams} from "react-router-dom";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


// const withRouter = WrappedComponent => props => {
// 	const params = useParams();
// 	// etc... other react-router-dom v6 hooks
// 	return (
// 		<WrappedComponent
// 			{...props}
// 			params={params}
// 		// etc...
// 		/>
// 	);
// };

function withRouter(Component) {
	function ComponentWithRouterProp(props) {
		// let location = useLocation();
		// let navigate = useNavigate();
		let params = useParams();
		return (
			<Component
				{...props}
				router={{params }}
			/>
		);
	}

	return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.router.params.userId; // Извлечение значения userId из объекта params
		if (!userId) {
			userId = 2;
		}
		this.props.getProfileUserThunk(userId);
		this.props.getStatus(userId);
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
});

// при помощи compose ProfileContainer j,рабатывает в withAuthRedirect, потом в withRouter и потом отправляет в connect с пропсами
export default compose(
	connect(mapStateToProps, {setUserProfile,getProfileUserThunk, getStatus, updateStatus}),
	withRouter,
	withAuthRedirect,
)(ProfileContainer)
