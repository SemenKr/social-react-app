import React, {useEffect} from 'react';
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../Redux/profile-reducer";
import {useParams} from "react-router-dom";

function ProfileContainer(props) {
	const {userId} = useParams();
	const currUserId = userId ? userId : '/2'; // Если userId не определен, используется значение "2"

	useEffect(() => {
		axios
			.get(`https://social-network.samuraijs.com/api/1.0/profile/` + currUserId)
			.then((response) => {
				props.setUserProfile(response.data);
			});
	}, [currUserId, props.setUserProfile]);

	return (
		<Profile {...props} profile={props.profile} />
	);
}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
});

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);
