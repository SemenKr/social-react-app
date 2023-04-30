import React from 'react';
import p from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";

const Profile = (props) => {

	return (
		<div className={p.mainContent}>
			<div className={p.mainContent__top}>
				<img className={p.mainContent__top_img} src="img/profile-bg.jpg" alt="" />
			</div>
			<ProfileInfo description='Something about me' />
			<MyPostsContainer store={props.store} />
		</div>
	);
};

export default Profile;
