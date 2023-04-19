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
			<MyPosts posts={props.postsData} newPostText={props.newPostText} addPost={props.addPost} updateNewPostText={props.updateNewPostText} />
		</div>
	);
};

export default Profile;
