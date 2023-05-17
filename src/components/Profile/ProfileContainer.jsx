import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setUserProfile} from "../Redux/profile-reducer";
import {useParams} from "react-router-dom";
import {getProfileUser} from '../../api/api';

const withRouter = WrappedComponent => props => {
	const params = useParams();
	// etc... other react-router-dom v6 hooks
	return (
		<WrappedComponent
			{...props}
			params={params}
		// etc...
		/>
	);
};

class ProfileContainer extends React.Component {
	componentDidMount() {
		let userId = this.props.params.userId;
		if (!userId) {
			userId = 2;
		}
		getProfileUser(userId)
			.then(data => {
				// debugger;
				this.props.setUserProfile(data);
			});
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} />
		);
	}


}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);
