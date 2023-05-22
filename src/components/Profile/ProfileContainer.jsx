import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileUserThunk, setUserProfile} from "../Redux/profile-reducer";
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
		this.props.getProfileUserThunk(userId)

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

export default connect(mapStateToProps, {setUserProfile,getProfileUserThunk})(WithUrlDataContainerComponent);
