import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

	return (
		<>
			<ProfileInfo profile={props.profile}
						 status={props.status}
						 updateStatus={props.updateStatus}
						 isOwner = {props.isOwner}
						 savePhoto={props.savePhoto}
						 saveProfileData={props.saveProfileData}
			/>
			<MyPostsContainer />
		</>
	);
};

export default Profile;
