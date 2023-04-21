import React from 'react';
import p from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

	return (
		<div className={p.mainContent}>
			<div className={p.mainContent__top}>
				<img className={p.mainContent__top_img} src="img/profile-bg.jpg" alt="" />
			</div>
			<ProfileInfo description='Something about me' />
			<MyPosts posts={props.postsData.postsData} newPostText={props.postsData.newPostText} dispatcher={props.dispatcher} />
		</div>
	);
};

export default Profile;
