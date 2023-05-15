import React, {useEffect} from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../Redux/profile-reducer";
import {useParams} from "react-router-dom";

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
		axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
			.then(response => {
				// debugger;
				this.props.setUserProfile(response.data);
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
