import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect, useDispatch, useSelector} from "react-redux";
import {
	getProfileUserThunk,
	getStatus,
	savePhoto,
	saveProfileData,
	setUserProfile,
	updateStatus
} from "../Redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


// Функция для получения данных профиля и статуса
const fetchUserProfileData = (dispatch, userId, authorisedUserId, navigate) => {
	if (!userId) {
		if (!authorisedUserId) {
			navigate("/login");
		} else {
			dispatch(getProfileUserThunk(authorisedUserId));
			dispatch(getStatus(authorisedUserId));
		}
	} else {
		dispatch(getProfileUserThunk(userId));
		dispatch(getStatus(userId));
	}
};
const ProfileContainer = (props) => {
	// const location = useLocation();
	// const navigate = useNavigate();
	const params = useParams();
	const authorisedUserId = useSelector(state => state.auth.id);
	const profile = useSelector(state => state.profilePage.profile);
	const status = useSelector(state => state.profilePage.status);
	const dispatch = useDispatch();
	const { userId } = params;



	useEffect(() => {
		const parsedUserId = +userId;
		fetchUserProfileData(dispatch, parsedUserId, authorisedUserId);
	}, [dispatch, userId, authorisedUserId]);

	const handleStatusUpdate = (newStatus) => {
		dispatch(updateStatus(newStatus));
	};

	return (
		<Profile
			profile={profile}
			status={status}
			updateStatus={handleStatusUpdate}
			isOwner={!userId}
			savePhoto={props.savePhoto}
			saveProfileData={props.saveProfileData}
		/>
	);
};

 withAuthRedirect(ProfileContainer);
const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorisedUserId: state.auth.id,
	isAuth: state.auth.isAuth
});

// wrapper to   router's v6 hooks in class component (to use HOC pattern, like in router v5)
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

export default compose(
	withRouter,
	withAuthRedirect,
	connect(mapStateToProps, { setUserProfile, getProfileUserThunk, getStatus, updateStatus, savePhoto, saveProfileData }),
)(ProfileContainer);
